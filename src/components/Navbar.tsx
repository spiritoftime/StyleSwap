import React, { useState } from "react";
import logo from "../assets/logo-removebg-preview.png";
import { Link, useNavigate, useMatch } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/context/appContext";
import { ProfileIcon } from "./ProfileIcon";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { convertToTitleCase } from "@/utils/convertText";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileNav from "./mobileNav";
const Navbar = () => {
  const { authDetails } = useAppContext();
  const navigate = useNavigate();
  const otherPageItems = [
    { title: "Transform", href: "/playground", disabled: false },
    { title: "Collage", href: "/collage", disabled: false },
    { title: "AMA", href: "/ama", disabled: false },
    { title: "Buy Credits", href: "/credits", disabled: false },
  ];
  const landingPageItems = [
    {
      title: "Features",
      href: `${window.location.pathname}#features`,
      disabled: false,
    },
    { title: "Transform", href: "/playground", disabled: false },
    { title: "Collage", href: "/collage", disabled: false },
    { title: "AMA", href: "/ama", disabled: false },
    { title: "Buy Credits", href: "/credits", disabled: false },
  ];
  const homePageMatch = useMatch("/");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <nav className="flex items-center justify-between py-8 mx-6 border-b border-black sm:mx-12">
      <div className="items-center hidden gap-6 md:flex ">
        <Link to="/">
          <div className="flex flex-col items-center ">
            <img className="h-[50px]" src={logo} alt="StyleSwap Logo" />
            <span className="font-bold">StyleSwap</span>
          </div>
        </Link>
        {homePageMatch && (
          <div className="items-center hidden gap-6 md:flex">
            {landingPageItems.map((item, index) => (
              <Link
                key={index}
                to={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
        {!homePageMatch && (
          <div className="items-center hidden gap-6 md:flex">
            {otherPageItems.map((item, index) => (
              <Link
                key={index}
                to={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-60"
                )}
              >
                {item.title}
              </Link>
            ))}
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
        <MobileNav navItems={otherPageItems} />
      )}
      {homePageMatch && showMobileMenu && (
        <MobileNav navItems={landingPageItems} />
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
