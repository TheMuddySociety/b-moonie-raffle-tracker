
import { useState, useEffect } from "react";
import { Search, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { shortenAddress } from "@/lib/formatters";
import { useToast } from "@/hooks/use-toast";
import { COLLECTION_ADDRESS } from "@/lib/mockData";
import { useWallet } from "@solana/wallet-adapter-react";

const EntryChecker = () => {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [entryResult, setEntryResult] = useState<{
    walletAddress: string;
    displayAddress: string;
    entries: number;
  } | null>(null);
  const { toast } = useToast();
  const { publicKey, connected } = useWallet();

  useEffect(() => {
    if (connected && publicKey) {
      setAddress(publicKey.toString());
      // Optionally auto-check entries when wallet connects
      // handleCheckEntries(publicKey.toString());
    }
  }, [connected, publicKey]);

  const handleCheckEntries = (addressToCheck: string) => {
    if (!addressToCheck) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate random entries for demo
      const randomEntries = Math.floor(Math.random() * 15);
      
      if (addressToCheck.length >= 32) {
        setEntryResult({
          walletAddress: addressToCheck,
          displayAddress: shortenAddress(addressToCheck),
          entries: randomEntries
        });
        
        if (randomEntries > 0) {
          toast({
            title: "Entries found!",
            description: `You have ${randomEntries} B-Moonies entered in the current raffle.`,
          });
        } else {
          toast({
            title: "No entries found",
            description: "You don't have any B-Moonies entered in the current raffle.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Invalid address",
          description: "Please enter a valid Solana wallet address.",
          variant: "destructive"
        });
        setEntryResult(null);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCheckEntries(address);
  };

  return (
    <div className="w-full bg-card rounded-xl p-4 shadow-md border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Wallet size={20} className="text-bmoonie-blue" />
        <h2 className="text-lg font-semibold">Check Your Entries</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="wallet-address" className="text-sm font-medium">
            Your Solana Wallet Address
          </label>
          <div className="flex space-x-2">
            <Input
              id="wallet-address"
              placeholder="Enter your wallet address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1"
              disabled={connected && publicKey}
            />
            <Button type="submit" disabled={isLoading} className="bg-bmoonie-gradient hover:opacity-90 transition-opacity">
              {isLoading ? "Checking..." : "Check"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {connected ? "Using connected wallet address" : "Enter your Solana wallet address to check how many B-Moonies you have entered"}
          </p>
        </div>
      </form>
      
      {entryResult && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium">Wallet</h3>
              <a
                href={`https://solscan.io/account/${entryResult.walletAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-foreground hover:text-bmoonie-blue transition-colors"
              >
                {entryResult.displayAddress}
              </a>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-medium">Entries</h3>
              <p className="text-xl font-bold text-bmoonie-pink">{entryResult.entries}</p>
            </div>
          </div>
          
          {entryResult.entries > 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Good luck in the raffle! The more entries you have, the higher your chances of winning.
            </p>
          ) : (
            <div className="mt-3 flex items-start gap-2">
              <Search size={16} className="text-muted-foreground mt-0.5" />
              <p className="text-sm text-muted-foreground">
                No entries found. Purchase or transfer B-Moonies to this wallet to participate.
                <a 
                  href={`https://magiceden.io/marketplace/${COLLECTION_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-bmoonie-blue hover:underline mt-1"
                >
                  View collection on Magic Eden →
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EntryChecker;
