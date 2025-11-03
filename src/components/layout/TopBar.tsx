import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TopBarProps {
  role?: string;
}

export const TopBar = ({ role }: TopBarProps) => {
  const roleLabels: Record<string, string> = {
    director: "Director",
    "senior-manager": "Senior PR Manager",
    "junior-manager": "Junior Manager",
    creator: "Content Creator",
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 border-b border-border bg-card/95 backdrop-blur-sm z-10 flex items-center justify-end px-6">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">
            {roleLabels[role || ""] || "User"}
          </p>
          <p className="text-xs text-muted-foreground">{role?.replace("-", " ")}</p>
        </div>
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
