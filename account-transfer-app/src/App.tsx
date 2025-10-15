import { useState } from "react";
import { CreateAccount } from "./components/CreateAccount";
import { ViewBalance } from "./components/ViewBalance";
import { TransferFunds } from "./components/TransferFunds";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TabType } from "./types/enums";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.CREATE);

  const handleAccountCreated = () => {
    // can handle some after account creation logic here
  };

  const handleTransferComplete = () => {
    // can handle some after transfer logic here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/20"></div>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 max-w-4xl w-full mx-auto">
        <div className="animate-fade-in">
          {activeTab === TabType.CREATE && (
            <CreateAccount onAccountCreated={handleAccountCreated} />
          )}
          {activeTab === TabType.VIEW && <ViewBalance />}
          {activeTab === TabType.TRANSFER && (
            <TransferFunds onTransferComplete={handleTransferComplete} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
