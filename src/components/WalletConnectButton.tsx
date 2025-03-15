
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';
import { shortenAddress } from '@/lib/formatters';

const WalletConnectButton = () => {
  const { wallet, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (publicKey) {
    return (
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-bmoonie-gradient/10 border-bmoonie-blue/20 text-foreground"
        >
          <Wallet size={16} />
          <span className="font-mono">{shortenAddress(publicKey.toString())}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleDisconnect}
          className="text-muted-foreground hover:text-destructive"
        >
          <LogOut size={16} />
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleConnect} 
      className="bg-bmoonie-gradient hover:opacity-90 transition-opacity"
    >
      <Wallet size={16} className="mr-2" />
      Connect Wallet
    </Button>
  );
};

export default WalletConnectButton;
