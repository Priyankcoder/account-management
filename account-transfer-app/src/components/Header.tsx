
import { PlusIcon, EyeIcon, TransferIcon, LightningIcon } from "./icons";
import tripleALogo from "../assets/images/triplea-logo.svg";
import { TabType } from "../types/enums";

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50 animate-slide-in">
      <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-0">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-16 mb-4 sm:mb-6">
          <div className="flex items-center flex-shrink-0 animate-scale-in">
            <img
              src={tripleALogo}
              alt="TripleA"
              className="h-8 sm:h-10 w-auto transition-transform hover:scale-110"
            />
          </div>
          <div className="flex-1 text-center sm:text-left animate-fade-in">
            <h1 className="text-xl sm:text-2xl font-bold text-triplea-navy bg-gradient-to-r from-triplea-navy to-triplea-navy/70 bg-clip-text">
              Account Management System
            </h1>
            <p className="text-xs sm:text-sm text-triplea-gray mt-1 flex items-center justify-center sm:justify-start gap-2">
              <LightningIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Manage accounts and execute internal transfers</span>
              <span className="sm:hidden">Quick account transfers</span>
            </p>
          </div>
        </div>

        <nav className="flex justify-center border-b-2 border-gray-200/50 -mx-4 sm:mx-0">
          <button
            className={`group relative flex-1 max-w-xs px-3 sm:px-8 py-3 sm:py-4 text-xs sm:text-base font-medium transition-all duration-300 border-b-3 cursor-pointer ${
              activeTab === TabType.CREATE
                ? "text-triplea-navy border-b-triplea-green-muted font-semibold"
                : "text-triplea-gray border-b-transparent hover:text-triplea-navy hover:bg-gradient-to-t hover:from-triplea-green/5 hover:to-transparent"
            }`}
            onClick={() => onTabChange(TabType.CREATE)}
          >
            <span className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Create Account</span>
              <span className="sm:hidden">Create</span>
            </span>
            {activeTab === TabType.CREATE && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-triplea-green-muted to-transparent animate-pulse"></span>
            )}
          </button>
          <button
            className={`group relative flex-1 max-w-xs px-3 sm:px-8 py-3 sm:py-4 text-xs sm:text-base font-medium transition-all duration-300 border-b-3 cursor-pointer ${
              activeTab === TabType.VIEW
                ? "text-triplea-navy border-b-triplea-green-muted font-semibold"
                : "text-triplea-gray border-b-transparent hover:text-triplea-navy hover:bg-gradient-to-t hover:from-triplea-green/5 hover:to-transparent"
            }`}
            onClick={() => onTabChange(TabType.VIEW)}
          >
            <span className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">View Balance</span>
              <span className="sm:hidden">Balance</span>
            </span>
            {activeTab === TabType.VIEW && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-triplea-green-muted to-transparent animate-pulse"></span>
            )}
          </button>
          <button
            className={`group relative flex-1 max-w-xs px-3 sm:px-8 py-3 sm:py-4 text-xs sm:text-base font-medium transition-all duration-300 border-b-3 cursor-pointer ${
              activeTab === TabType.TRANSFER
                ? "text-triplea-navy border-b-triplea-green-muted font-semibold"
                : "text-triplea-gray border-b-transparent hover:text-triplea-navy hover:bg-gradient-to-t hover:from-triplea-green/5 hover:to-transparent"
            }`}
            onClick={() => onTabChange(TabType.TRANSFER)}
          >
            <span className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <TransferIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Transfer Funds</span>
              <span className="sm:hidden">Transfer</span>
            </span>
            {activeTab === TabType.TRANSFER && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-triplea-green-muted to-transparent animate-pulse"></span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
