
import { Award } from "lucide-react";
import { formatDate } from "@/lib/formatters";
import { Winner } from "@/types";

const WinnersTable = ({ winners }: { winners: Winner[] }) => {
  return (
    <div className="w-full bg-card rounded-xl p-4 shadow-md border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Award size={20} className="text-bmoonie-pink" />
        <h2 className="text-lg font-semibold">Recent Winners</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-muted">
              <th className="text-left py-3 px-2 text-sm text-muted-foreground font-medium">Wallet</th>
              <th className="text-left py-3 px-2 text-sm text-muted-foreground font-medium">Entries</th>
              <th className="text-left py-3 px-2 text-sm text-muted-foreground font-medium">Prize</th>
              <th className="text-left py-3 px-2 text-sm text-muted-foreground font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner) => (
              <tr key={winner.id} className="border-b border-muted hover:bg-muted/30 transition-colors">
                <td className="py-3 px-2">
                  <a 
                    href={`https://solscan.io/account/${winner.walletAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-foreground hover:text-bmoonie-blue transition-colors"
                  >
                    {winner.displayAddress}
                  </a>
                </td>
                <td className="py-3 px-2 text-sm">{winner.amount}</td>
                <td className="py-3 px-2">
                  <span className="text-sm font-semibold text-bmoonie-purple">
                    {winner.prize}
                  </span>
                </td>
                <td className="py-3 px-2 text-sm text-muted-foreground">
                  {formatDate(winner.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinnersTable;
