
import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { formatNumber, relativeTime } from "@/lib/formatters";
import { RaffleData } from "@/types";

const EntryCounter = ({ raffleData }: { raffleData: RaffleData }) => {
  const [displayedCount, setDisplayedCount] = useState(raffleData.totalEntries);
  
  // Simulate real-time entries by randomly increasing the count
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIncrease = Math.floor(Math.random() * 3);
      if (randomIncrease > 0) {
        setDisplayedCount(prev => prev + randomIncrease);
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-card rounded-xl p-6 shadow-md border border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-bmoonie-purple/10 to-transparent opacity-30" />
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={20} className="text-bmoonie-purple" />
          <h2 className="text-lg font-semibold">Live Entry Count</h2>
        </div>
        
        <div className="flex flex-col items-center justify-center py-6">
          <div className="text-5xl font-bold bg-clip-text text-transparent bg-bmoonie-gradient animate-pulse-glow">
            {formatNumber(displayedCount)}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            B-Moonies in current raffle
          </p>
        </div>
        
        <div className="text-xs text-muted-foreground text-right mt-4">
          Last updated: {relativeTime(raffleData.lastUpdated)}
        </div>
      </div>
    </div>
  );
};

export default EntryCounter;
