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
import { AnimatePresence, motion } from "framer-motion"; // fix: correct import

import useAuth from "@/Hooks/useAuth";

export default function Header() {
  const { isLoading } = use(AuthContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const onLogout = () => {
    logout();
  };

  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
      {/* Logo + Site Name */}
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold">SCMS</span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-4">
        <Link to="/" className="text-gray-700 hover:text-black">
          Home
        </Link>
        <Link to="/courts" className="text-gray-700 hover:text-black">
          Courts
        </Link>

        {isLoading ? (
          // Skeleton while loading
          <Skeleton className="h-10 w-10 rounded-full animate-pulse" />
        ) : !user ? (
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
        ) : (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Avatar
                onClick={toggleDropdown}
                className="cursor-pointer transition-shadow hover:shadow-lg hover:rounded-full"
              >
                <AvatarImage
                  src={user?.photoURL}
                  alt={user?.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <AvatarFallback>
                  {user.displayName ? user.displayName.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <AnimatePresence>
              {isOpen && (
                <DropdownMenuContent asChild sideOffset={10}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-2"
                  >
                    <div className=" py-1 text-sm text-gray-700">
                      {user.displayName}
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout}>
                      Logout
                    </DropdownMenuItem>
                  </motion.div>
                </DropdownMenuContent>
              )}
            </AnimatePresence>
          </DropdownMenu>
        )}
      </nav>
    </header>
  );
}
