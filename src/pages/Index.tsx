
import { useEffect } from "react";
import Header from "@/components/Header";
import EntryCounter from "@/components/EntryCounter";
import WinnersTable from "@/components/WinnersTable";
import EntryChecker from "@/components/EntryChecker";
import RaffleTimer from "@/components/RaffleTimer";
import Footer from "@/components/Footer";
import { mockWinners, mockRaffleData } from "@/lib/mockData";

const Index = () => {
  useEffect(() => {
    document.title = "B-Moonie Raffle Tracker";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <EntryCounter raffleData={mockRaffleData} />
            <RaffleTimer raffleData={mockRaffleData} />
          </div>
          
          <div className="flex flex-col gap-6">
            <EntryChecker />
            <WinnersTable winners={mockWinners} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
