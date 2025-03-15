
import { useState } from "react";
import { UserPlus, Upload, Trash, Check, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RaffleEntry } from "@/types";
import { shortenAddress } from "@/lib/formatters";
import { useToast } from "@/hooks/use-toast";

const WalletEntryForm = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [bulkWallets, setBulkWallets] = useState("");
  const [walletEntries, setWalletEntries] = useState<RaffleEntry[]>([
    // Sample data
    {
      walletAddress: "8xrt45EpUDrYdYYVMnVnKjE5TxQQ4X7oXhNFJrJyjA4P",
      displayAddress: "8xrt45...yjA4P",
      amount: 3
    },
    {
      walletAddress: "2e9ZN3kLY7JzNXBWENKvbRpR3xS1wMSUAfAb9LPT4oPb",
      displayAddress: "2e9ZN3...T4oPb",
      amount: 1
    }
  ]);
  const { toast } = useToast();

  const handleAddWallet = () => {
    if (walletAddress.trim() === "") return;
    
    // Simple validation - in a real app, you'd validate the Solana address format
    if (walletAddress.length < 32) {
      toast({
        title: "Invalid Wallet",
        description: "Please enter a valid Solana wallet address",
        variant: "destructive"
      });
      return;
    }
    
    // Check if wallet already exists
    const existingEntry = walletEntries.find(entry => entry.walletAddress === walletAddress);
    if (existingEntry) {
      toast({
        title: "Wallet Already Exists",
        description: "This wallet is already in the raffle entries",
        variant: "destructive"
      });
      return;
    }
    
    // Add the wallet
    const newEntry: RaffleEntry = {
      walletAddress,
      displayAddress: shortenAddress(walletAddress),
      amount: 1 // Default to 1 NFT
    };
    
    setWalletEntries([...walletEntries, newEntry]);
    setWalletAddress("");
    
    toast({
      title: "Wallet Added",
      description: "Wallet has been added to the raffle entries"
    });
  };

  const handleBulkAdd = () => {
    if (bulkWallets.trim() === "") return;
    
    const addresses = bulkWallets
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length >= 32); // Simple validation
    
    if (addresses.length === 0) {
      toast({
        title: "No Valid Addresses",
        description: "Please enter valid Solana wallet addresses",
        variant: "destructive"
      });
      return;
    }
    
    // Process valid addresses
    const newEntries: RaffleEntry[] = [];
    let duplicates = 0;
    
    addresses.forEach(address => {
      // Check if wallet already exists
      const existingEntry = [...walletEntries, ...newEntries].find(
        entry => entry.walletAddress === address
      );
      
      if (!existingEntry) {
        newEntries.push({
          walletAddress: address,
          displayAddress: shortenAddress(address),
          amount: 1 // Default to 1 NFT
        });
      } else {
        duplicates++;
      }
    });
    
    if (newEntries.length > 0) {
      setWalletEntries([...walletEntries, ...newEntries]);
      setBulkWallets("");
      
      toast({
        title: "Wallets Added",
        description: `Added ${newEntries.length} wallets to the raffle entries${
          duplicates > 0 ? ` (${duplicates} duplicates skipped)` : ""
        }`
      });
    } else {
      toast({
        title: "No New Wallets",
        description: "All wallets are already in the raffle entries",
        variant: "destructive"
      });
    }
  };

  const handleRemoveWallet = (walletAddress: string) => {
    setWalletEntries(walletEntries.filter(entry => entry.walletAddress !== walletAddress));
    
    toast({
      title: "Wallet Removed",
      description: "Wallet has been removed from the raffle entries"
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus size={20} className="text-bmoonie-purple" />
              Add Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Solana wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
                <Button onClick={handleAddWallet}>
                  <Check size={16} className="mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} className="text-bmoonie-purple" />
              Bulk Add Wallets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter one wallet address per line"
                value={bulkWallets}
                onChange={(e) => setBulkWallets(e.target.value)}
                rows={5}
              />
              <Button onClick={handleBulkAdd} className="w-full">
                <Upload size={16} className="mr-2" />
                Import Wallets
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List size={20} className="text-bmoonie-purple" />
            Raffle Entries ({walletEntries.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto">
            {walletEntries.length > 0 ? (
              <div className="space-y-2">
                {walletEntries.map((entry, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                  >
                    <div className="font-mono text-sm truncate max-w-[70%]">
                      {entry.walletAddress}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-secondary px-2 py-1 rounded-full">
                        {entry.amount} NFT{entry.amount !== 1 ? 's' : ''}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveWallet(entry.walletAddress)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <p>No wallet entries yet. Add some wallets to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletEntryForm;
