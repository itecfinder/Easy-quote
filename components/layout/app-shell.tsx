"use client";

import { AppShell } from "@/components/layout/app-shell";
import DashboardScreen from "@/components/screens/dashboard-screen";

export default function HomePage() {
  return (
    <AppShell>
      <DashboardScreen />
    </AppShell>
  );
}
