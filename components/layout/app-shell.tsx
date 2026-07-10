'use client';

import { AppProvider } from '@/context/app-context';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background flex">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />

          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
