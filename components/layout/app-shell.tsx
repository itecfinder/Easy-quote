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

          <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-x-hidden">
            <div className="max-w-5xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
