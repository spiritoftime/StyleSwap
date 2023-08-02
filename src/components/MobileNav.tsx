import { Link } from "react-router-dom";
import logo from "../assets/logo-removebg-preview.png";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
const MobileNav = ({ navItems }) => {
  return (
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
          {navItems.map((item, index) => (
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
  );
};

export default MobileNav;
