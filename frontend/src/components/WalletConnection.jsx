import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import { useState } from 'react';

const WalletConnection = ({ onBetPlace }) => {
  const { publicKey, sendTransaction, connected } = useWallet();
  const [betAmount, setBetAmount] = useState(0.1);
  const [loading, setLoading] = useState(false);

  const placeBet = async (walletPick) => {
    if (!connected) return;
    setLoading(true);

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: "YOUR_TREASURY_WALLET", // Add your treasury wallet
          lamports: betAmount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction);
      await connection.confirmTransaction(signature);
      onBetPlace(walletPick, betAmount);
    } catch (err) {
      console.error('Betting error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700" />
      
      {connected && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(parseFloat(e.target.value))}
              className="w-32 px-4 py-2 bg-navy-900/50 border border-blue-500/20 rounded-lg"
              step={0.1}
              min={0.1}
            />
            <span className="text-blue-400">SOL</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => placeBet('wallet1')}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Bet on Wallet 1
            </button>
            <button
              onClick={() => placeBet('wallet2')}
              disabled={loading}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg"
            >
              Bet on Wallet 2
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnection; 