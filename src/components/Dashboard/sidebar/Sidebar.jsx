"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "../TeamSwitcher";
import { NavMain } from "../NavMain";
import { NavUser } from "../NavUser";
import { NavProjects } from "../NavProject";
import useAuth from "@/Hooks/useAuth";
import Swal from "sweetalert2";

// This is sample data.

export function AppSidebar({ navMain, ...props }) {
  const { user } = useAuth();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will log out from this app",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        LogOut();
        Swal.fire(
          "Log out sucesfull",
          "You have loged out sucessfully",
          "success"
        );
      }
    });
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
