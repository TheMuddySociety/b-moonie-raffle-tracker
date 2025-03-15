
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Award, List, UserPlus, Edit, Trash, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminHeader from "@/components/AdminHeader";
import WalletEntryForm from "@/components/WalletEntryForm";
import RaffleManager from "@/components/RaffleManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockRaffleData } from "@/lib/mockData";

// Simple admin auth state (in a real app, this would use proper authentication)
const ADMIN_PASSWORD = "bmoonie123"; // This would be stored securely in a real application

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "B-Moonie Raffle Admin";
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      localStorage.setItem("bmoonie_admin", "true"); // Simple auth persistence
    } else {
      setError("Invalid password");
    }
  };

  // Check for saved auth state
  useEffect(() => {
    const savedAuth = localStorage.getItem("bmoonie_admin");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("bmoonie_admin");
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-bmoonie-purple" size={20} />
              Admin Login
            </CardTitle>
            <CardDescription>
              Enter your password to access the B-Moonie raffle admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full p-2 border rounded-md"
                />
                {error && <p className="text-destructive text-sm">{error}</p>}
              </div>
              <Button type="submit" className="w-full">Access Admin Panel</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader onLogout={handleLogout} />
      
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield size={24} className="text-bmoonie-purple" />
            B-Moonie Raffle Admin
          </h1>
          <p className="text-muted-foreground">
            Manage raffle entries, winners, and settings
          </p>
        </div>
        
        <Tabs defaultValue="wallets" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="wallets">
              <UserPlus size={16} className="mr-2" />
              Manage Wallets
            </TabsTrigger>
            <TabsTrigger value="raffles">
              <Award size={16} className="mr-2" />
              Raffle Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="wallets">
            <WalletEntryForm />
          </TabsContent>
          
          <TabsContent value="raffles">
            <RaffleManager raffleData={mockRaffleData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
