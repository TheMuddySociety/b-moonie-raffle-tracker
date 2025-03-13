
export interface Winner {
  id: string;
  walletAddress: string;
  displayAddress: string;
  prize: string;
  date: string;
  amount: number;
}

export interface RaffleEntry {
  walletAddress: string;
  displayAddress: string;
  amount: number;
}

export interface RaffleData {
  totalEntries: number;
  lastUpdated: string;
  currentRound: number;
  endDate: string;
}
