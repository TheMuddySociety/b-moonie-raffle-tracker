
import { FC } from "react";
import { Link } from "react-router-dom";
import { Shield, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader: FC<AdminHeaderProps> = ({ onLogout }) => {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-bmoonie-purple" />
          <span className="font-bold text-lg">B-Moonie Admin</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <Home size={16} className="mr-2" />
              Back to Site
            </Link>
          </Button>
          
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
