import { useState } from "react";
import { CreateAccount } from "./components/CreateAccount";
import { ViewBalance } from "./components/ViewBalance";
import { TransferFunds } from "./components/TransferFunds";

function App() {
  const [activeTab, setActiveTab] = useState<"create" | "view" | "transfer">(
    "create"
  );
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAccountCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleTransferComplete = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/20"></div>
      
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50 animate-slide-in">
        <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-0">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 mb-4 sm:mb-6">
            <div className="flex items-center flex-shrink-0 animate-scale-in">
              <img
                src="/triplea-logo.svg"
                alt="TripleA"
                className="h-8 sm:h-10 w-auto transition-transform hover:scale-110"
              />
            </div>
            <div className="flex-1 text-center sm:text-left animate-fade-in">
              <h1 className="text-xl sm:text-2xl font-bold text-triplea-navy bg-gradient-to-r from-triplea-navy to-triplea-navy/70 bg-clip-text">
                Account Management System
              </h1>
              <p className="text-xs sm:text-sm text-triplea-gray mt-1 flex items-center justify-center sm:justify-start gap-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="hidden sm:inline">Manage accounts and execute internal transfers</span>
                <span className="sm:hidden">Quick account transfers</span>
              </p>
            </div>
          </div>

          <nav className="flex justify-center border-b-2 border-gray-200/50 -mx-4 sm:mx-0">
            <button
              className={`group relative flex-1 max-w-xs px-3 sm:px-8 py-3 sm:py-4 text-xs sm:text-base font-medium transition-all duration-300 border-b-3 cursor-pointer ${
                activeTab === "create"
                  ? "text-triplea-navy border-b-triplea-green-muted font-semibold"
                  : "text-triplea-gray border-b-transparent hover:text-triplea-navy hover:bg-gradient-to-t hover:from-triplea-green/5 hover:to-transparent"
              }`}
              onClick={() => setActiveTab("create")}
            >
              <span className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Create Account</span>
                <span className="sm:hidden">Create</span>
              </span>
              {activeTab === "create" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-triplea-green-muted to-transparent animate-pulse"></span>
              )}
            </button>
            <button
              className={`group relative flex-1 max-w-xs px-3 sm:px-8 py-3 sm:py-4 text-xs sm:text-base font-medium transition-all duration-300 border-b-3 cursor-pointer ${
                activeTab === "view"
                  ? "text-triplea-navy border-b-triplea-green-muted font-semibold"
                  : "text-triplea-gray border-b-transparent hover:text-triplea-navy hover:bg-gradient-to-t hover:from-triplea-green/5 hover:to-transparent"
              }`}
              onClick={() => setActiveTab("view")}
            >
              <span className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="hidden sm:inline">View Balance</span>
                <span className="sm:hidden">Balance</span>
              </span>
              {activeTab === "view" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-triplea-green-muted to-transparent animate-pulse"></span>
              )}
            </button>
            <button
              className={`group relative flex-1 max-w-xs px-3 sm:px-8 py-3 sm:py-4 text-xs sm:text-base font-medium transition-all duration-300 border-b-3 cursor-pointer ${
                activeTab === "transfer"
                  ? "text-triplea-navy border-b-triplea-green-muted font-semibold"
                  : "text-triplea-gray border-b-transparent hover:text-triplea-navy hover:bg-gradient-to-t hover:from-triplea-green/5 hover:to-transparent"
              }`}
              onClick={() => setActiveTab("transfer")}
            >
              <span className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span className="hidden sm:inline">Transfer Funds</span>
                <span className="sm:hidden">Transfer</span>
              </span>
              {activeTab === "transfer" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-triplea-green-muted to-transparent animate-pulse"></span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 max-w-4xl w-full mx-auto">
        <div className="animate-fade-in">
          {activeTab === "create" && (
            <CreateAccount onAccountCreated={handleAccountCreated} />
          )}
          {activeTab === "view" && <ViewBalance key={refreshKey} />}
          {activeTab === "transfer" && (
            <TransferFunds onTransferComplete={handleTransferComplete} />
          )}
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 py-4 sm:py-6 text-center text-xs sm:text-sm text-triplea-gray mt-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-triplea-green animate-pulse"></div>
            <p className="font-medium">Backend API: http://localhost:8860</p>
          </div>
        </div>
        <p className="mt-2 text-xs opacity-60 px-4">Powered by TripleA Account Transfer System</p>
      </footer>
    </div>
  );
}

export default App;
