import React, { useState } from "react";
import logo from "../assets/logo-removebg-preview.png";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useAppContext } from "@/context/appContext";
import { ProfileIcon } from "./ProfileIcon";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { convertToTitleCase } from "@/utils/convertText";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
const Navbar = () => {
  const { authDetails } = useAppContext();
  const navigate = useNavigate();
  const items = [
    { title: "Features", href: "/#features", disabled: false },
    { title: "Pricing", href: "/pricing", disabled: false },
    { title: "Blog", href: "/blog", disabled: false },
    { title: "Documentation", href: "/docs", disabled: false },
  ];
  const homePageMatch = useMatch("/");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <nav className="flex items-center justify-between py-8 mx-6 sm:mx-12">
      <div className="items-center hidden gap-6 md:flex ">
        <Link to="/">
          <div className="items-center gap-4 ">
            <img className="h-[50px]" src={logo} alt="StyleSwap Logo" />
            <span className="font-bold">StyleSwap</span>
          </div>
        </Link>
        {homePageMatch && (
          <div className="items-center hidden gap-6 md:flex">
            <a
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
              href="/#features"
            >
              Features
            </a>
            <Link
              to="/playground"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
            >
              Transform
            </Link>
            <a
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
              href="/#FAQ"
            >
              FAQ
            </a>
          </div>
        )}
        {!homePageMatch && (
          <div className="items-center hidden gap-6 md:flex ">
            <Link
              to="/playground"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
            >
              Transform
            </Link>
            <Link
              to="/collage"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
            >
              Collage
            </Link>
            <Link
              to="/ama"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
            >
              AMA
            </Link>
            <Link
              to="/credits"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
            >
              Buy Credits
            </Link>
          </div>
        )}
      </div>
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? (
          <X />
        ) : (
          <img className="h-[24px]" src={logo} alt="StyleSwap Logo" />
        )}
        <span className="font-bold">Menu</span>
      </button>
      {!homePageMatch && showMobileMenu && (
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
          )}
        >
          <div className="relative z-20 grid gap-6 p-4 rounded-md shadow-md bg-popover text-popover-foreground">
            <Link to="/" className="flex items-center space-x-2">
              <img className="h-[24px]" src={logo} alt="StyleSwap Logo" />
              <span className="font-bold">StyleSwap</span>
            </Link>
            <nav className="grid grid-flow-row text-sm auto-rows-max">
              {items.map((item, index) => (
                <Link
                  key={index}
                  to={item.disabled ? "#" : item.href}
                  className={cn(
                    "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                    item.disabled && "cursor-not-allowed opacity-60"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      {authDetails.uid ? (
        <div className="flex items-center justify-end gap-2">
          <p className="hidden font-semibold sm:block ">
            {convertToTitleCase(authDetails.displayName)}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <ProfileIcon
                  imageURL={
                    authDetails.photoURL || "https://github.com/shadcn.png"
                  }
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/pictures")}>
                View pictures
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut(auth)}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link
          className="inline-flex items-center justify-center px-4 text-sm font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9"
          to="/login"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
