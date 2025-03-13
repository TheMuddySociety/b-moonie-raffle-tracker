
import { Trophy } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-6">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="bg-bmoonie-gradient p-3 rounded-lg shadow-lg">
            <Trophy size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-bmoonie-gradient">
              B-Moonie Raffle Tracker
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Collection:</span>
          <a 
            href={`https://solscan.io/token/9JXzbUZVAMb6wiDq8dWUw9GbszsYqLQE2pLaPoS5m7d7`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-mono bg-secondary px-3 py-1 rounded-md hover:bg-muted transition-colors"
          >
            9JXz...m7d7
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
