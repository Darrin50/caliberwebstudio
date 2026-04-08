'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from 'react';

export type PlanTier = 'starter' | 'growth' | 'domination';

interface PortalContextType {
  slug: string;
  businessName: string;
  plan: PlanTier;
  email: string;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

interface PortalProviderProps {
  children: ReactNode;
  slug: string;
  businessName: string;
  plan: PlanTier;
  email: string;
}

export function PortalProvider({
  children,
  slug,
  businessName,
  plan,
  email,
}: PortalProviderProps) {
  const value = useMemo(
    () => ({
      slug,
      businessName,
      plan,
      email,
    }),
    [slug, businessName, plan, email]
  );

  return (
    <PortalContext.Provider value={value}>
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal(): PortalContextType {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
}
