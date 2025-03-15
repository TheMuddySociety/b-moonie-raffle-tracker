
import { MoonStars } from "lucide-react";
import WalletConnectButton from "@/components/WalletConnectButton";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <MoonStars size={24} className="text-bmoonie-pink" />
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-bmoonie-gradient">
            B-Moonie Raffle
          </h1>
        </div>
        
        <WalletConnectButton />
      </div>
    </header>
  );
};

export default Header;
