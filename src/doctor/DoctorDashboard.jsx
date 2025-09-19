"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";


import { BarChart3 } from "lucide-react";
import HospitalDash from "@/hospital/HospitalDash";
import { SidebarLink } from "@/hospital/SidebarLink";
import DoctorDash from "./DoctorDash";
import PatientPage from "./PatientPage";
import InsightsPage from "./InsightsPage";

export function DoctorDashboard() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const links = [
    { label: "Dashboard", icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-[purple] dark:text-neutral-200" /> },
    { label: "Patients", icon: <IconUserBolt className="h-5 w-5 shrink-0 text-[green] dark:text-neutral-200" /> },
    { label: "Insights", icon: <BarChart3 className="h-5 w-5 shrink-0 text-[blue] dark:text-neutral-200"/> },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{
                    ...link,
                    onClick: () => setActiveTab(link.label),
                  }}
                  isActive={activeTab === link.label}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Dr. Rohan Teli",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "Dashboard" && <DoctorDash/>}
        {activeTab === "Patients" && <PatientPage/>}
        {activeTab === "Insights" && <InsightsPage/>}
      </div>
    </div>
  );
}

// Logo components
export const Logo = () => (
  <a
    href="#"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
  >
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    <span className="font-medium whitespace-pre text-black dark:text-white">
      Doctor Dashboard
    </span>
  </a>
);

export const LogoIcon = () => (
  <a
    href="#"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
  >
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
  </a>
);
