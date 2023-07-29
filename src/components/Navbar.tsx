import React from "react";
import logo from "../assets/logo-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
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
import { capitalizeWords } from "@/utils/capitalizeWords";
const Navbar = () => {
  const { authDetails } = useAppContext();
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between py-8 mx-16">
      <div className="flex items-center gap-6 ">
        <Link to="/">
          <img className="h-[50px]" src={logo} alt="StyleSwap Logo" />
        </Link>
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
        <Link
          to="/collage"
          className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
        >
          Collage
        </Link>
      </div>
      {authDetails.uid ? (
        <div className="flex items-center justify-end gap-2">
          <p className="text-color">
            {capitalizeWords(authDetails.displayName)}
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
