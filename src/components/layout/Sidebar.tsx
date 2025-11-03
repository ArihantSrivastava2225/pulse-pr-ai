import { NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, MessageSquare, TrendingUp, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  role?: string;
}

export const Sidebar = ({ role }: SidebarProps) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  const navItems = [
    { path: `/dashboard/${role}`, label: "Dashboard", icon: LayoutDashboard },
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/chat", label: "Chat", icon: MessageSquare },
    { path: "/insights", label: "AI Insights", icon: TrendingUp },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          PulsePR
        </h1>
        <p className="text-sm text-muted-foreground mt-1">AI-Powered PR Platform</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:bg-secondary"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};
