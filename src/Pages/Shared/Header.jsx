"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/Context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../../../src/assets/Images/Elite Athelics.jpeg";
import useAuth from "@/Hooks/useAuth";
import Swal from "sweetalert2";

export default function Header() {
  const { isLoading } = use(AuthContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will log out from this app",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await logout();
        if (result.success) {
          navigate("/login");
        }
        Swal.fire(
          "Log out sucesfull",
          "You have loged out sucessfully",
          "success"
        );
      }
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Elite Sports Club"
            height={50}
            width={50}
            className="rounded-md"
          />
          <span className="text-xl font-bold text-gray-900">
            Elite Sports Club
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link to="/courts" className="text-gray-700 hover:text-black">
            Courts
          </Link>

          {isLoading ? (
            <Skeleton className="h-10 w-10 rounded-full animate-pulse" />
          ) : !user ? (
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          ) : (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button onClick={toggleDropdown} className="outline-none">
                  <Avatar className="cursor-pointer hover:ring-2 ring-primary/50">
                    <AvatarImage
                      src={user?.photoURL}
                      alt={user?.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <AvatarFallback>
                      {user.displayName ? user.displayName.charAt(0) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <AnimatePresence>
                {isOpen && (
                  <DropdownMenuContent asChild sideOffset={8}>
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white shadow-lg rounded-md w-48 py-2 z-50"
                    >
                      <div className="px-3 py-2 border-b text-sm text-gray-700">
                        {user.displayName || user.email}
                      </div>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/dashboard"
                          className="px-3 py-2 w-full hover:bg-gray-100 text-sm cursor-pointer"
                        >
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogOut}
                        className="px-3 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    </motion.div>
                  </DropdownMenuContent>
                )}
              </AnimatePresence>
            </DropdownMenu>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMobile}
          className="md:hidden p-2 rounded-md border border-gray-200"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-md px-4 py-4 space-y-2"
          >
            <Link
              to="/"
              className="block text-gray-700 hover:text-black"
              onClick={toggleMobile}
            >
              Home
            </Link>
            <Link
              to="/courts"
              className="block text-gray-700 hover:text-black"
              onClick={toggleMobile}
            >
              Courts
            </Link>
            {!user ? (
              <Link
                to="/login"
                className="block text-gray-700 hover:text-black"
                onClick={toggleMobile}
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-700 hover:text-black"
                  onClick={toggleMobile}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogOut();
                    toggleMobile();
                  }}
                  className="block text-gray-700 hover:text-black"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
