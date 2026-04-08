/* ─── Portal Leads Route ────────────────────────────────────────── */
/* GET /api/portal/leads
   Fetch leads from internal data sources (contact forms, chatbot)    */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedClient } from '@/lib/portal/auth';
import type { Lead, LeadSummary } from '@/lib/portal/types';

/* ─── Helper: Load leads from JSON files ─── */
async function loadLeadsFromFile(slug: string): Promise<Lead[]> {
  try {
    const fs = await import('fs').then((m) => m.promises);
    const path = await import('path');

    const dataDir = path.join(process.cwd(), 'data', slug);
    const leadsFile = path.join(dataDir, 'leads.json');

    try {
      const content = await fs.readFile(leadsFile, 'utf-8');
      const data = JSON.parse(content);
      return Array.isArray(data) ? data : [];
    } catch {
      // File doesn't exist
      return [];
    }
  } catch {
    return [];
  }
}

/* ─── Helper: Load chatbot conversations ─── */
async function loadChatbotLeads(slug: string): Promise<Lead[]> {
  try {
    const fs = await import('fs').then((m) => m.promises);
    const path = await import('path');

    const dataDir = path.join(process.cwd(), 'data', slug);
    const chatbotDir = path.join(dataDir, 'chatbot-conversations');

    let conversationFiles: string[] = [];
    try {
      conversationFiles = await fs.readdir(chatbotDir);
    } catch {
      return [];
    }

    const leads: Lead[] = [];

    for (const file of conversationFiles) {
      if (!file.endsWith('.json')) continue;

      try {
        const content = await fs.readFile(
          path.join(chatbotDir, file),
          'utf-8'
        );
        const conversation = JSON.parse(content);

        // Extract lead info from conversation
        // Assumes conversation has: userId, email, phone, name, createdAt
        if (conversation.email || conversation.phone) {
          leads.push({
            id: conversation.userId || `chatbot-${Date.now()}`,
            name: conversation.name || 'Anonymous',
            email: conversation.email || '',
            phone: conversation.phone,
            source: 'chatbot',
            message: conversation.message || conversation.lastMessage,
            status: conversation.status || 'new',
            createdAt: conversation.createdAt || new Date().toISOString(),
            notes: conversation.notes,
          });
        }
      } catch (error) {
        console.error(`Error parsing chatbot conversation ${file}:`, error);
        continue;
      }
    }

    return leads;
  } catch {
    return [];
  }
}

/* ─── Helper: Calculate lead summary ─── */
function calculateLeadSummary(leads: Lead[]): LeadSummary {
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const converted = leads.filter((l) => l.status === 'converted').length;
  const conversionRate = leads.length > 0 ? (converted / leads.length) * 100 : 0;

  // Count leads by source
  const leadsBySource: Record<string, number> = {};
  leads.forEach((lead) => {
    leadsBySource[lead.source] = (leadsBySource[lead.source] || 0) + 1;
  });

  // Calculate leads over time (last 30 days, bucketed by day)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const leadsOverTime: Record<string, number> = {};

  leads
    .filter((l) => new Date(l.createdAt) >= thirtyDaysAgo)
    .forEach((lead) => {
      const date = new Date(lead.createdAt).toISOString().split('T')[0];
      leadsOverTime[date] = (leadsOverTime[date] || 0) + 1;
    });

  // Format for response
  const leadsOverTimeArray = Object.entries(leadsOverTime).map(([date, count]) => ({
    date,
    count,
  }));

  return {
    totalLeads: leads.length,
    newLeads,
    conversionRate: Math.round(conversionRate * 10) / 10,
    leadsBySource,
    leadsOverTime: leadsOverTimeArray,
  };
}

/* ═══════════════════════════════════════════════════════════════════
   GET /api/portal/leads
   ═══════════════════════════════════════════════════════════════════ */

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const client = await getAuthenticatedClient();

    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(
      parseInt(searchParams.get('limit') || '50', 10),
      100
    );
    const status = searchParams.get('status'); // filter by status if provided

    // Load leads from multiple sources
    const [fileLeads, chatbotLeads] = await Promise.all([
      loadLeadsFromFile(client.slug),
      loadChatbotLeads(client.slug),
    ]);

    // Combine and deduplicate leads
    const leadMap = new Map<string, Lead>();

    [...fileLeads, ...chatbotLeads].forEach((lead) => {
      // Use email or phone as key to deduplicate
      const key = lead.email || lead.phone || lead.id;
      if (key && !leadMap.has(key)) {
        leadMap.set(key, lead);
      }
    });

    let leads = Array.from(leadMap.values());

    // Filter by status if provided
    if (status && ['new', 'contacted', 'qualified', 'converted', 'lost'].includes(status)) {
      leads = leads.filter((l) => l.status === status);
    }

    // Sort by creation date (newest first)
    leads.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Apply limit
    const paginatedLeads = leads.slice(0, limit);

    // Calculate summary
    const summary = calculateLeadSummary(leads);

    const responseData = {
      leads: paginatedLeads,
      summary,
      pagination: {
        total: leads.length,
        returned: paginatedLeads.length,
        limit,
      },
    };

    return NextResponse.json({ success: true, data: responseData }, {
      status: 200,
    });
  } catch (error) {
    console.error('GET /api/portal/leads error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
