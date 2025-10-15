
import { useState } from 'react';
import { apiService } from '../services/api';
import { validateAccountId, handleNumericInput, formatCurrency } from '../utils/validation';
import { INPUT_ERROR_CLASSES, INPUT_SUCCESS_CLASSES } from '../utils/styles';
import type { ApiError, Account } from '../types';
import {
  EyeIcon,
  WalletIcon,
  CheckIcon,
  AlertIcon,
  CheckCircleIcon,
  SearchIcon,
  SpinnerIcon,
  DollarIcon
} from './icons';

export const ViewBalance = () => {
  const [accountId, setAccountId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAccount(null);

    const validation = validateAccountId(accountId);
    if (validation) {
      setValidationError(validation);
      return;
    }

    setLoading(true);

    try {
      const accountData = await apiService.getAccountBalance(Number(accountId));
      setAccount(accountData);
    } catch (err) {
      setError((err as ApiError).message || 'Failed to retrieve account balance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-100 card-hover animate-scale-in">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-triplea-navy to-triplea-navy/80 rounded-lg">
          <EyeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-triplea-green" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-triplea-navy">View Account Balance</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="group">
          <label htmlFor="viewAccountId" className="block mb-2 text-sm sm:text-base text-triplea-navy font-semibold flex items-center gap-2">
            <WalletIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-triplea-green" />
            Account ID
          </label>
          <div className="relative">
            <input
              id="viewAccountId"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={accountId}
              onChange={(e) => {
                const numericValue = handleNumericInput(e.target.value);
                setAccountId(numericValue);
                if (validationError) {
                  setValidationError(null);
                }
              }}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 focus-glow ${
                validationError
                  ? INPUT_ERROR_CLASSES
                  : INPUT_SUCCESS_CLASSES
              } focus:outline-none placeholder:text-gray-400`}
              disabled={loading}
              placeholder="Enter account ID to check balance"
            />
            {accountId && !validationError && (
              <CheckIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-triplea-green animate-scale-in" />
            )}
          </div>
          {validationError && (
            <div className="flex items-center gap-1 text-red-600 text-sm mt-2 animate-slide-in">
              <AlertIcon className="w-4 h-4" />
              {validationError}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100/50 border-l-4 border-red-500 text-red-800 px-5 py-4 rounded-lg shadow-sm animate-slide-in flex items-start gap-3">
            <AlertIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {account && (
          <div className="relative overflow-hidden bg-gradient-to-br from-triplea-navy via-triplea-navy to-triplea-navy/90 text-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl mb-4 shadow-2xl border border-triplea-green/30 animate-scale-in">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(6, 252, 136, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 252, 136, 0.2) 0%, transparent 50%)'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <DollarIcon className="w-5 h-5 text-triplea-green" />
                <h3 className="text-sm uppercase tracking-widest opacity-90 font-semibold">Current Balance</h3>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-triplea-green bg-clip-text text-transparent">
                {formatCurrency(account.balance)}
              </div>
              <div className="flex items-center gap-2 text-sm opacity-75">
                <CheckCircleIcon className="w-4 h-4" />
                <span>Account ID: {account.account_id}</span>
              </div>
            </div>
            
            {/* Accent border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-triplea-green to-transparent"></div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-triplea-navy to-triplea-navy/90 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none btn-ripple relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
            {loading ? (
              <>
                <SpinnerIcon className="w-5 h-5" />
                Checking Balance...
              </>
            ) : (
              <>
                <SearchIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Check Balance
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-triplea-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>
    </div>
  );
};
