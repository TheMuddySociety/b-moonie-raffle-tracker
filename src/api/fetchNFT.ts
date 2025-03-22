import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi';
import { fetchAssetsByCollection } from '@metaplex-foundation/mpl-core';

export const fetchNFTs = async (walletAddress: string) => {
    // Create UMI instance
    const umi = createUmi('https://api.mainnet-beta.solana.com');
    
    try {
        // Convert wallet address to PublicKey
        const wallet = publicKey(walletAddress);
        
        // Fetch assets from the wallet
        const assets = await fetchAssetsByCollection(umi, wallet, {
            skipDerivePlugins: false,
        });

        // Format the assets for display
        const formattedNFTs = assets.map(asset => ({
            id: asset.id,
            name: asset.name,
            image: asset.image,
            collection: asset.collection,
            owner: asset.owner
        }));

        return formattedNFTs;
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        throw error;
    }
};