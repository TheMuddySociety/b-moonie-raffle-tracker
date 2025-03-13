
import { Winner, RaffleData } from '@/types';
import { shortenAddress } from './formatters';

// Collection address for B-Moonie
export const COLLECTION_ADDRESS = '9JXzbUZVAMb6wiDq8dWUw9GbszsYqLQE2pLaPoS5m7d7';

// Mock winners
export const mockWinners: Winner[] = [
  {
    id: '1',
    walletAddress: '2JD4KzFRX9GkXPT58h3SgXPFA5j5NqNc3zMB4FhfBY4L',
    displayAddress: shortenAddress('2JD4KzFRX9GkXPT58h3SgXPFA5j5NqNc3zMB4FhfBY4L'),
    prize: '500 SOL',
    date: '2023-10-15T10:30:00Z',
    amount: 3
  },
  {
    id: '2',
    walletAddress: '8FQUTcRbaQh5JyLteFdAdT8HbxiCUQNxHRuKpRqXBvDC',
    displayAddress: shortenAddress('8FQUTcRbaQh5JyLteFdAdT8HbxiCUQNxHRuKpRqXBvDC'),
    prize: '300 SOL',
    date: '2023-11-01T14:45:00Z',
    amount: 5
  },
  {
    id: '3',
    walletAddress: '61WZzLjmMRkfPNYvvA5Jj5jm1TebQBSN31aCzPFLXQVP',
    displayAddress: shortenAddress('61WZzLjmMRkfPNYvvA5Jj5jm1TebQBSN31aCzPFLXQVP'),
    prize: '800 SOL',
    date: '2023-12-05T09:15:00Z',
    amount: 10
  },
  {
    id: '4',
    walletAddress: 'H7vZzWtWLGxjdBF85v6ZXyVhbRGJYKj7MD2vtAYgGqhm',
    displayAddress: shortenAddress('H7vZzWtWLGxjdBF85v6ZXyVhbRGJYKj7MD2vtAYgGqhm'),
    prize: '1000 SOL',
    date: '2024-01-20T16:30:00Z',
    amount: 2
  },
  {
    id: '5',
    walletAddress: '5PwrVKxVcQp2XrVZ8uWuZxMCmBpTXQZQPDfnFX63HKEg',
    displayAddress: shortenAddress('5PwrVKxVcQp2XrVZ8uWuZxMCmBpTXQZQPDfnFX63HKEg'),
    prize: '450 SOL',
    date: '2024-02-10T11:00:00Z',
    amount: 7
  },
  {
    id: '6',
    walletAddress: 'BX8ZJcLbhdNiXKAH7QXPEtbUf72Uggdr8Ga8Rv29cdhY',
    displayAddress: shortenAddress('BX8ZJcLbhdNiXKAH7QXPEtbUf72Uggdr8Ga8Rv29cdhY'),
    prize: '250 SOL',
    date: '2024-03-05T13:20:00Z',
    amount: 4
  }
];

// Mock raffle data
export const mockRaffleData: RaffleData = {
  totalEntries: 6824,
  lastUpdated: new Date().toISOString(),
  currentRound: 7,
  endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days from now
};
