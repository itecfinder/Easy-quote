'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import type { Contractor, Estimate, ProjectData, ScanResult } from '@/lib/types';
import { emptyProject, emptyEstimate } from '@/lib/estimate-utils';

interface AppContextValue {
  contractor: Contractor | null;
  setContractor: (c: Contractor | null) => void;
  memberType: 'paid' | 'free' | 'new';
  setMemberType: (t: 'paid' | 'free' | 'new') => void;
  planId: number;
  setPlanId: (id: number) => void;
  project: ProjectData;
  setProject: (p: ProjectData) => void;
  scanResult: ScanResult | null;
  setScanResult: (s: ScanResult | null) => void;
  estimate: Estimate;
  setEstimate: (e: Estimate) => void;
  refreshKey: number;
  triggerRefresh: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contractor, setContractor] = useState<Contractor | null>(null);

  // Default values until contractor/profile is loaded
  const [memberType, setMemberType] = useState<'paid' | 'free' | 'new'>('new');
  const [planId, setPlanId] = useState(0);

  const [project, setProject] = useState<ProjectData>(emptyProject);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [estimate, setEstimate] = useState<Estimate>(emptyEstimate);
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <AppContext.Provider
      value={{
        contractor,
        setContractor,
        memberType,
        setMemberType,
        planId,
        setPlanId,
        project,
        setProject,
        scanResult,
        setScanResult,
        estimate,
        setEstimate,
        refreshKey,
        triggerRefresh,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }

  return ctx;
}
