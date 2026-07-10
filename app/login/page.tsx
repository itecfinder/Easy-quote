"use client";

import {
  ScanLine,
  FileText,
  Calculator,
  ArrowRight,
  FolderOpen,
} from "lucide-react";

import { useApp } from "@/context/AppContext";

export default function WelcomePage() {
  const { go } = useApp();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-600 via-sky-700 to-cyan-800 text-white p-12 flex-col justify-between">

        <div>
          <div className="flex items-center gap-3 text-3xl font-bold">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <ScanLine className="h-7 w-7" />
            </div>

            Estimator Pro
          </div>
        </div>


        <div className="space-y-6">

          <h1 className="text-5xl font-bold leading-tight">
            Create Accurate Estimates
            <br />
            From Any Project.
          </h1>


          <p className="text-lg text-sky-100">
            Capture projects, build material lists,
            calculate costs, and create professional
            estimates faster.
          </p>


          <div className="space-y-4 pt-4">

            <div className="flex items-center gap-3">
              <ScanLine className="h-5 w-5" />
              <span>
                Capture project details quickly
              </span>
            </div>


            <div className="flex items-center gap-3">
              <Calculator className="h-5 w-5" />
              <span>
                Calculate materials and labor
              </span>
            </div>


            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5" />
              <span>
                Generate professional estimates
              </span>
            </div>

          </div>

        </div>


        <div className="text-sm text-sky-200">
          Built for contractors
        </div>

      </div>



      {/* Action Panel */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6">

        <div className="w-full max-w-md space-y-6">


          <div className="lg:hidden flex items-center gap-3 text-2xl font-bold">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ScanLine className="h-6 w-6" />
            </div>

            Estimator Pro

          </div>



          <div className="rounded-xl border bg-white p-8 shadow-sm">

            <h2 className="text-3xl font-bold">
              Welcome Back
            </h2>


            <p className="mt-3 text-muted-foreground">
              Start a new project or continue
              working on your estimates.
            </p>



            <button
              onClick={() => go("project-capture")}
              className="mt-8 w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-4 text-lg font-semibold text-primary-foreground"
            >
              <ScanLine className="h-5 w-5" />

              New Project

              <ArrowRight className="h-5 w-5" />
            </button>



            <button
              onClick={() => go("dashboard")}
              className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg border px-5 py-4 text-lg font-semibold"
            >
              <FolderOpen className="h-5 w-5" />

              View Dashboard
            </button>


          </div>


        </div>

      </div>


    </div>
  );
}
