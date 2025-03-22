import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NFT {
  id: string;
  name: string;
  image: string;
  collection: string;
  owner: string;
}

interface NFTDisplayProps {
  nfts: NFT[];
}

const NFTDisplay = ({ nfts }: NFTDisplayProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {nfts.map(nft => (
      <Card key={nft.id}>
        <CardHeader>
          <CardTitle>{nft.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <img 
            src={nft.image} 
            alt={nft.name} 
            className="w-full h-48 object-cover rounded-lg"
          />
        </CardContent>
      </Card>
    ))}
  </div>
);

export default NFTDisplay;