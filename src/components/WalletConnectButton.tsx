
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';
import { shortenAddress } from '@/lib/formatters';
import { useState } from 'react';

const WalletConnectButton = () => {
  const { wallet, publicKey, disconnect } = useWallet();
  const [showDisconnect, setShowDisconnect] = useState(false);

  // Option 1: Using the default Solana wallet buttons (uncomment to use)
  /*
  return (
    <div className="flex gap-2">
      <WalletMultiButton />
      {publicKey && <WalletDisconnectButton />}
    </div>
  );
  */

  // Option 2: Custom styled buttons (currently active)
  if (publicKey) {
    return (
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-bmoonie-gradient/10 border-bmoonie-blue/20 text-foreground"
          onClick={() => setShowDisconnect(!showDisconnect)}
        >
          <Wallet size={16} />
          <span className="font-mono">{shortenAddress(publicKey.toString())}</span>
        </Button>
        {showDisconnect && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              disconnect();
              setShowDisconnect(false);
            }}
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut size={16} />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Button 
      onClick={() => {}} // Will use the WalletModalProvider
      className="bg-bmoonie-gradient hover:opacity-90 transition-opacity"
    >
      <WalletMultiButton className="bg-transparent border-0 hover:bg-transparent p-0 h-auto text-inherit text-white" />
    </Button>
  );
};

export default WalletConnectButton;
