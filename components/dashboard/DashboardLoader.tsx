"use client";

import dynamic from "next/dynamic";

const DashboardApp = dynamic(() => import("./DashboardApp").then((mod) => mod.DashboardApp), {
  ssr: false,
});

export function DashboardLoader() {
  return <DashboardApp />;
}
