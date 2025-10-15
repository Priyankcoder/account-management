
import { useState } from 'react';
import { apiService } from '../services/api';
import { validateAccountId, formatCurrency } from '../utils/validation';
import type { ApiError, Account } from '../types';

export const ViewBalance = () => {
  const [accountId, setAccountId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleNumericInput = (value: string): string => {
    // Allow only integers
    return value.replace(/[^0-9]/g, '');
  };

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
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-triplea-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-triplea-navy">View Account Balance</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="group">
          <label htmlFor="viewAccountId" className="block mb-2 text-sm sm:text-base text-triplea-navy font-semibold flex items-center gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-triplea-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
            Account ID
          </label>
          <div className="relative">
            <input
              id="viewAccountId"
              type="text"
              inputMode="numeric"
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
                  ? 'border-red-400 focus:border-red-500 bg-red-50/50'
                  : 'border-gray-200 focus:border-triplea-green-muted hover:border-gray-300 bg-white'
              } focus:outline-none placeholder:text-gray-400`}
              disabled={loading}
              placeholder="Enter account ID to check balance"
            />
            {accountId && !validationError && (
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-triplea-green animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          {validationError && (
            <div className="flex items-center gap-1 text-red-600 text-sm mt-2 animate-slide-in">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {validationError}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100/50 border-l-4 border-red-500 text-red-800 px-5 py-4 rounded-lg shadow-sm animate-slide-in flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
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
                <svg className="w-5 h-5 text-triplea-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-sm uppercase tracking-widest opacity-90 font-semibold">Current Balance</h3>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-triplea-green bg-clip-text text-transparent">
                {formatCurrency(account.balance)}
              </div>
              <div className="flex items-center gap-2 text-sm opacity-75">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking Balance...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
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
