
import { FC, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { COLLECTION_ADDRESS } from '@/lib/mockData';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface NFT {
  name: string;
  image: string;
  mint: string;
}

const UserNFTs: FC = () => {
  const { publicKey, connected } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchNFTs = async () => {
      if (!publicKey || !connected) {
        setNfts([]);
        return;
      }
      
      setLoading(true);
      
      try {
        // In a real implementation, you would fetch NFTs from the user's wallet
        // For demo purposes, we'll create mock NFTs with a delay to simulate loading
        setTimeout(() => {
          // Generate 1-5 random NFTs
          const count = Math.max(1, Math.floor(Math.random() * 5));
          const mockNfts: NFT[] = [];
          
          for (let i = 1; i <= count; i++) {
            mockNfts.push({
              name: `B-Moonie #${Math.floor(Math.random() * 9999)}`,
              image: `https://picsum.photos/seed/${Math.random()}/200/200`,
              mint: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
            });
          }
          
          setNfts(mockNfts);
          setLoading(false);
          
          toast({
            title: "NFTs Loaded",
            description: `Found ${mockNfts.length} B-Moonies in your wallet!`,
          });
        }, 2000);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        toast({
          title: "Error Loading NFTs",
          description: "There was a problem fetching your B-Moonies.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [publicKey, connected, toast]);

  if (!connected || !publicKey) {
    return null;
  }

  return (
    <div className="w-full bg-card rounded-xl p-4 shadow-md border border-border">
      <h2 className="text-lg font-semibold mb-4">Your B-Moonies</h2>
      
      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col space-y-2">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : nfts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {nfts.map((nft, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="rounded-lg overflow-hidden aspect-square bg-muted relative">
                <img 
                  src={nft.image} 
                  alt={nft.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <p className="font-medium text-sm">{nft.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No B-Moonies found in your wallet.</p>
          <a 
            href={`https://magiceden.io/marketplace/${COLLECTION_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bmoonie-blue hover:underline mt-2 inline-block"
          >
            Buy on Magic Eden →
          </a>
        </div>
      )}
    </div>
  );
};

export default UserNFTs;
