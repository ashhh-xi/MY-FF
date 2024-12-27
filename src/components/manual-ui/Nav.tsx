import { FloatingNav } from "../ui/floating-navbar";

import { Home, Info, User } from "lucide-react";

export default function Page() {
  const navItems = [
    { name: "Home", link: "/", icon: <Home /> },
    { name: "About", link: "/about", icon: <Info /> },
    { name: "Dashboard", link: "/", icon: <Home /> },
    { name: "Cases", link: "/cases", icon: <Info /> },
    { name: "Contact Us ", link: "/", icon: <Home /> },
    { name: "Cases", link: "/cases", icon: <Info /> },
  ];

  return (
    <div>
      <FloatingNav navItems={navItems} />
    </div>
  );
}
