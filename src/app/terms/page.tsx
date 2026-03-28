import type { Metadata } from "next";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | Caliber Web Studio" },
  description:
    "Terms of Service for Caliber Web Studio, operated by High Caliber Operations LLC. Monthly web design and growth plans for Detroit small businesses.",
  alternates: { canonical: "https://caliberwebstudio.com/terms" },
  openGraph: {
    title: "Terms of Service | Caliber Web Studio",
    description:
      "Terms of Service for Caliber Web Studio — monthly website and growth plans for Detroit small businesses.",
    url: "https://caliberwebstudio.com/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "80px",
          background: "var(--bg)",
        }}
      >
        {/* Hero */}
        <section
          style={{
            padding: "clamp(60px, 10vw, 100px) clamp(20px, 6vw, 80px) 40px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  background: "var(--accent)",
                }}
              />
              Legal
            </div>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--white)",
                marginBottom: "20px",
              }}
            >
              Terms of Service
            </h1>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.75rem",
                color: "var(--dim)",
                letterSpacing: "0.05em",
              }}
            >
              Last Updated: March 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section
          style={{
            padding: "clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px)",
          }}
        >
          <div
            style={{
              maxWidth: "780px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "48px",
            }}
          >
            {/* Intro */}
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                }}
              >
                These Terms of Service ("Terms") govern your use of the services
                provided by{" "}
                <strong style={{ color: "var(--silver)" }}>
                  Caliber Web Studio
                </strong>
                , operated by{" "}
                <strong style={{ color: "var(--silver)" }}>
                  High Caliber Operations LLC
                </strong>{" "}
                ("Company," "we," "us," or "our"), a Michigan limited liability
                company based in Detroit, MI. By engaging our services or
                accessing our website at{" "}
                <span style={{ color: "var(--accent)" }}>
                  caliberwebstudio.com
                </span>
                , you agree to be bound by these Terms. Please read them
                carefully.
              </p>
            </div>

            <Section title="1. Services">
              <p>
                Caliber Web Studio provides digital services to small and
                medium-sized businesses, including but not limited to:
              </p>
              <ul>
                <li>Website design and development</li>
                <li>AI chatbot setup and integration</li>
                <li>Search engine optimization (SEO)</li>
                <li>Content creation and AI-assisted blogging</li>
                <li>Review management systems</li>
                <li>Social media management and auto-posting</li>
                <li>Google Business Profile (GBP) optimization</li>
              </ul>
              <p>
                Specific services, deliverables, and pricing are outlined in
                your selected subscription plan. We reserve the right to update,
                modify, or discontinue any service with reasonable notice.
              </p>
            </Section>

            <Section title="2. Subscription Plans &amp; Billing">
              <p>
                Our services are provided on a monthly subscription basis.
                Unless otherwise stated in writing:
              </p>
              <ul>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Initial Commitment:
                  </strong>{" "}
                  All plans begin with a 12-month initial commitment period.
                  During this period, the monthly fee will be billed
                  automatically each month.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Billing Cycle:
                  </strong>{" "}
                  Subscriptions are billed monthly on the same date each month.
                  Your first payment is due when you approve your live site
                  preview.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Cancellation:
                  </strong>{" "}
                  After the 12-month initial commitment, you may cancel at any
                  time by providing 30 days' written notice to{" "}
                  <a
                    href="mailto:darrin@caliberwebstudio.com"
                    style={{ color: "var(--accent)" }}
                  >
                    darrin@caliberwebstudio.com
                  </a>
                  . Cancellation during the initial 12-month commitment period
                  may result in an early termination fee equal to the remaining
                  monthly fees owed for that period.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    No Refunds:
                  </strong>{" "}
                  All fees paid are non-refundable except as required by
                  applicable law or as expressly stated in these Terms.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Price Changes:
                  </strong>{" "}
                  We may adjust pricing at the end of any commitment period with
                  30 days' advance written notice.
                </li>
              </ul>
            </Section>

            <Section title="3. 14-Day Live Preview">
              <p>
                Before your first payment is processed, we provide a{" "}
                <strong style={{ color: "var(--silver)" }}>
                  14-day live preview
                </strong>{" "}
                of your completed website. During this period:
              </p>
              <ul>
                <li>
                  You may request reasonable revisions at no additional charge.
                </li>
                <li>
                  If you are not satisfied and choose not to proceed, you may
                  notify us in writing before the end of the preview period and
                  no payment will be collected.
                </li>
                <li>
                  Approval — whether express or implied by requesting your site
                  go live — constitutes acceptance of the deliverable and
                  triggers the first billing cycle.
                </li>
              </ul>
            </Section>

            <Section title="4. 3-Business-Day Launch Guarantee">
              <p>
                We guarantee delivery of your initial website build within{" "}
                <strong style={{ color: "var(--silver)" }}>
                  3 business days
                </strong>{" "}
                of receiving your completed onboarding materials, including
                business information, brand assets, and any required content.
                This guarantee applies to standard website builds. Custom or
                complex projects may have a different timeline as agreed in
                writing. If we fail to deliver within the stated timeline for a
                standard build, you may request a one-month fee credit.
              </p>
            </Section>

            <Section title="5. Intellectual Property">
              <Subsection title="5.1 Client-Owned Content">
                <p>
                  You retain full ownership of all content you provide to us,
                  including but not limited to: business name and branding, logo
                  and brand assets, photos and images you supply, and written
                  content you create. We will not use your content for any
                  purpose other than delivering your contracted services.
                </p>
              </Subsection>
              <Subsection title="5.2 Company-Owned Assets">
                <p>
                  Caliber Web Studio retains ownership of all underlying code,
                  templates, frameworks, AI tooling, platform architecture, and
                  proprietary systems used to build and deliver your website and
                  services. Upon cancellation or termination, you are entitled
                  to export of your website content and data, but not to the
                  source code, templates, or platform infrastructure.
                </p>
              </Subsection>
              <Subsection title="5.3 License">
                <p>
                  During the term of your active subscription, we grant you a
                  non-exclusive, non-transferable license to use the website and
                  digital assets we create for you in connection with your
                  business. This license terminates upon cancellation or
                  termination of your subscription.
                </p>
              </Subsection>
            </Section>

            <Section title="6. Client Responsibilities">
              <p>You agree to:</p>
              <ul>
                <li>
                  Provide accurate, complete, and up-to-date information
                  required to perform the services.
                </li>
                <li>
                  Respond to communications and requests for approvals in a
                  timely manner. Delays on your end may delay project timelines.
                </li>
                <li>
                  Ensure that any content you provide (text, images, logos,
                  etc.) does not infringe upon third-party intellectual property
                  rights.
                </li>
                <li>
                  Maintain the confidentiality of any account credentials we
                  provide or you create for platform access.
                </li>
              </ul>
            </Section>

            <Section title="7. Acceptable Use">
              <p>
                You agree not to use our services for any unlawful, harmful, or
                abusive purpose. Prohibited uses include, but are not limited
                to:
              </p>
              <ul>
                <li>
                  Any activity that violates applicable local, state, federal,
                  or international law.
                </li>
                <li>
                  Transmitting spam, malware, or other malicious content.
                </li>
                <li>
                  Impersonating any person or entity or misrepresenting your
                  affiliation.
                </li>
                <li>
                  Using our AI chatbot or other tools to collect, process, or
                  store personal data in violation of applicable privacy laws.
                </li>
                <li>
                  Attempting to gain unauthorized access to our systems or
                  third-party services.
                </li>
              </ul>
              <p>
                Violation of this section may result in immediate termination of
                your account and services without refund.
              </p>
            </Section>

            <Section title="8. Limitation of Liability">
              <p>
                To the fullest extent permitted by applicable law, High Caliber
                Operations LLC and its officers, employees, agents, and
                affiliates shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages — including lost
                profits, lost revenue, loss of data, or loss of business
                opportunity — arising from your use of or inability to use our
                services, even if we have been advised of the possibility of
                such damages.
              </p>
              <p style={{ marginTop: "16px" }}>
                Our total aggregate liability to you for any claims arising
                under or related to these Terms shall not exceed the total
                amount of fees you paid to us in the 3 months preceding the
                event giving rise to the claim.
              </p>
            </Section>

            <Section title="9. Disclaimer of Warranties">
              <p>
                Our services are provided "as is" and "as available" without
                warranties of any kind, either express or implied, including but
                not limited to implied warranties of merchantability, fitness
                for a particular purpose, and non-infringement. We do not
                warrant that our services will be uninterrupted, error-free, or
                free of viruses or other harmful components. We do not guarantee
                specific business outcomes, search engine rankings, or revenue
                results from our services.
              </p>
            </Section>

            <Section title="10. Termination">
              <p>Either party may terminate the service relationship:</p>
              <ul>
                <li>
                  <strong style={{ color: "var(--silver)" }}>By You:</strong>{" "}
                  After the 12-month initial commitment period, with 30 days'
                  written notice. During the initial period, termination may
                  result in early termination fees as described in Section 2.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>By Us:</strong> We
                  may terminate your subscription immediately and without notice
                  if you materially breach these Terms, including non-payment or
                  violation of the Acceptable Use policy. We may also terminate
                  with 30 days' notice for any other reason.
                </li>
              </ul>
              <p>
                Upon termination, your access to client dashboards and
                platform-hosted services will be suspended. We will provide a
                reasonable opportunity to export your content data.
              </p>
            </Section>

            <Section title="11. Third-Party Services">
              <p>
                Our services may integrate with or rely on third-party platforms
                including but not limited to: Google (Analytics, Search Console,
                Business Profile), OpenAI, Vercel, Resend, Twilio, and Stripe.
                Your use of these platforms is subject to their respective terms
                of service and privacy policies. We are not responsible for the
                actions, availability, or policies of third-party providers.
              </p>
            </Section>

            <Section title="12. Governing Law &amp; Dispute Resolution">
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the{" "}
                <strong style={{ color: "var(--silver)" }}>
                  State of Michigan
                </strong>
                , without regard to its conflict of law provisions. Any dispute
                arising from or relating to these Terms shall first be
                attempted to be resolved through good-faith negotiation. If
                negotiation fails, disputes shall be resolved through binding
                arbitration in Detroit, MI, under the rules of the American
                Arbitration Association, except that either party may seek
                injunctive relief in a court of competent jurisdiction.
              </p>
            </Section>

            <Section title="13. Changes to These Terms">
              <p>
                We may update these Terms from time to time. We will notify you
                of material changes by email or by posting a notice on our
                website. Your continued use of our services after the effective
                date of revised Terms constitutes your acceptance of the
                changes.
              </p>
            </Section>

            <Section title="14. Contact">
              <p>
                If you have questions about these Terms, please contact us:
              </p>
              <div
                style={{
                  background: "var(--card-bg, rgba(255,255,255,0.04))",
                  border: "1px solid var(--border-color, rgba(255,255,255,0.08))",
                  borderRadius: "12px",
                  padding: "24px",
                  marginTop: "16px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.8rem",
                  color: "var(--dim)",
                  lineHeight: 1.9,
                  letterSpacing: "0.03em",
                }}
              >
                <strong style={{ color: "var(--silver)" }}>
                  High Caliber Operations LLC
                </strong>
                <br />
                dba Caliber Web Studio
                <br />
                Detroit, MI
                <br />
                <a
                  href="mailto:darrin@caliberwebstudio.com"
                  style={{ color: "var(--accent)" }}
                >
                  darrin@caliberwebstudio.com
                </a>
                <br />
                <a
                  href="https://caliberwebstudio.com"
                  style={{ color: "var(--accent)" }}
                >
                  caliberwebstudio.com
                </a>
              </div>
              <p style={{ marginTop: "24px" }}>
                Also see our{" "}
                <a href="/privacy" style={{ color: "var(--accent)" }}>
                  Privacy Policy
                </a>
                .
              </p>
            </Section>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .legal-section p {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0 0 14px 0;
        }
        .legal-section ul {
          margin: 12px 0 14px 0;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .legal-section ul li {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .legal-section a {
          transition: opacity 0.2s;
        }
        .legal-section a:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="legal-section">
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
          fontWeight: 800,
          color: "var(--silver)",
          letterSpacing: "-0.01em",
          marginBottom: "16px",
          paddingBottom: "10px",
          borderBottom: "1px solid var(--border)",
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div>{children}</div>
    </div>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--chrome)",
          marginBottom: "8px",
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h3>
      <div className="legal-section">{children}</div>
    </div>
  );
}
