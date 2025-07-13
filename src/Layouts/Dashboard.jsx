import { AuthContext } from "@/Context/AuthContext";
import useUserRole from "@/Hooks/useUserRole";
import React, { use, useState } from "react";
import { Link, Navigate, NavLink, Outlet, useLocation } from "react-router";

import {
  Users,
  BookOpen,
  LayoutDashboard,
  CreditCard,
  Megaphone,
  CalendarCheck,
  ShieldCheck,
  Trophy,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "@/components/Dashboard/sidebar/Sidebar";
import Loader from "@/components/loader/Loader";

const Dashboard = () => {
  const { isLoading } = use(AuthContext);
  const { role, roleLoading } = useUserRole();
  const [collapsed, setCollapsed] = useState(false);

  if (roleLoading || isLoading) return <Loader />;
  if (!role) return <Navigate to="/login" />;

  const sidebarConfig = {
    navMain: {
      admin: [
        {
          title: "Bookings",
          url: "#",
          icon: BookOpen,
          items: [
            { title: "Manage Bookings", url: "/dashboard/pending-bookings" },
            {
              title: "Confirmed Bookings",
              url: "/dashboard/all-confirmed-bookings",
            },
            {
              title: "Approved Bookings",
              url: "/dashboard/all-approved-bookings",
            },
          ],
        },
        {
          title: "Members",
          url: "#",
          icon: Users,
          items: [
            { title: "Manage Members", url: "/dashboard/manage-members" },
            { title: "All Users", url: "/dashboard/all-users" },
            { title: "Make Admin", url: "/dashboard/make-admin" },
          ],
        },
        {
          title: "Courts",
          url: "#",
          icon: Trophy,
          items: [
            { title: "Manage Courts", url: "/dashboard/manage-courts" },
            { title: "Add Courts", url: "/dashboard/add-courts" },
          ],
        },
        {
          title: "Coupons",
          url: "/dashboard/manage-coupons",
          icon: CreditCard,
          items: [
            { title: "Manage Coupons", url: "/dashboard/manage-coupons" },
            { title: "Add Coupons", url: "/dashboard/add-coupons" },
          ],
        },
        {
          title: "Announcements",
          url: "/dashboard/make-announcement",
          icon: Megaphone,
          items: [
            { title: "Make Announement", url: "/dashboard/make-announcement" },
            { title: "Announcements", url: "/dashboard/announcements" },
          ],
        },
        {
          title: "Profile",
          url: "/dashboard",
          icon: Users,
        },
      ],

      member: [
        {
          title: "My Bookings",
          url: "/dashboard/my-bookings",
          icon: CalendarCheck,
          items: [
            { title: "Pending", url: "/dashboard/my-pending-bookings" },
            { title: "Approved", url: "/dashboard/my-approved-bookings" },
            { title: "Confirmed", url: "/dashboard/my-confirmed-bookings" },
          ],
        },
        {
          title: "Payments",
          url: "#",
          icon: CreditCard,
          items: [
            { title: "Make Payment", url: "/dashboard/payment" },
            { title: "Payment History", url: "/dashboard/payment-history" },
          ],
        },
        {
          title: "Announcements",
          url: "/dashboard/announcements",
          icon: Megaphone,
        },
        {
          title: "Profile",
          url: "/dashboard",
          icon: Users,
        },
      ],

      user: [
        {
          title: "My Bookings",
          url: "/dashboard/my-pending-bookings",
          icon: CalendarCheck,
          items: [{ title: "Pending", url: "/dashboard/my-pending-bookings" }],
        },
        {
          title: "Announcements",
          url: "/dashboard/announcements",
          icon: Megaphone,
        },
        {
          title: "Profile",
          url: "/dashboard",
          icon: Users,
        },
      ],
    },
  };

  const navMain = sidebarConfig.navMain[role] || [];

  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <SidebarProvider>
      <AppSidebar navMain={navMain} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink>
                    <Link to={"/dashboard"}>Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbLink>
                  <Link
                    to={`/dashboard/${pathnames[1]}`}
                    className="capitalize"
                  >
                    {pathnames[1]}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
