
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { calculateTimeLeft, formatNumber } from "@/lib/formatters";
import { RaffleData } from "@/types";

const RaffleTimer = ({ raffleData }: { raffleData: RaffleData }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(raffleData.endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(raffleData.endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [raffleData.endDate]);

  return (
    <div className="w-full bg-card rounded-xl p-4 shadow-md border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Clock size={18} className="text-bmoonie-purple" />
          <span>Current Raffle</span>
        </h2>
        <div className="text-sm px-3 py-1 bg-secondary rounded-full">
          Round #{formatNumber(raffleData.currentRound)}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="bg-muted rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-bmoonie-pink">
            {timeLeft.days}
          </div>
          <div className="text-xs text-muted-foreground">Days</div>
        </div>
        <div className="bg-muted rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-bmoonie-pink">
            {timeLeft.hours}
          </div>
          <div className="text-xs text-muted-foreground">Hours</div>
        </div>
        <div className="bg-muted rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-bmoonie-pink">
            {timeLeft.minutes}
          </div>
          <div className="text-xs text-muted-foreground">Mins</div>
        </div>
        <div className="bg-muted rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-bmoonie-pink">
            {timeLeft.seconds}
          </div>
          <div className="text-xs text-muted-foreground">Secs</div>
        </div>
      </div>
    </div>
  );
};

export default RaffleTimer;
