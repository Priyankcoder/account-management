
import { useState } from 'react';
import { apiService } from '../services/api';
import { validateAccountId, validateAmount, handleNumericInput } from '../utils/validation';
import { INPUT_ERROR_CLASSES, INPUT_SUCCESS_CLASSES } from '../utils/styles';
import type { ApiError } from '../types';
import {
  PlusIcon,
  HashIcon,
  DollarIcon,
  CheckIcon,
  AlertIcon,
  CheckCircleIcon,
  SpinnerIcon
} from './icons';

interface CreateAccountProps {
  onAccountCreated: () => void;
}

export const CreateAccount = ({ onAccountCreated }: CreateAccountProps) => {
  const [accountId, setAccountId] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    accountId?: string;
    initialBalance?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { accountId?: string; initialBalance?: string } = {};
    
    const accountIdError = validateAccountId(accountId);
    if (accountIdError) errors.accountId = accountIdError;
    
    const balanceError = validateAmount(initialBalance);
    if (balanceError) errors.initialBalance = balanceError;
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await apiService.createAccount({
        account_id: Number(accountId),
        initial_balance: initialBalance,
      });

      setSuccess(`Account ${accountId} created successfully with balance ${initialBalance}`);
      setAccountId('');
      setInitialBalance('');
      setValidationErrors({});
      onAccountCreated();
    } catch (err) {
      setError((err as ApiError).message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-100 card-hover animate-scale-in">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-triplea-navy to-triplea-navy/80 rounded-lg">
          <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6 text-triplea-green" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-triplea-navy">Create New Account</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="group">
          <label htmlFor="accountId" className="block mb-2 text-sm sm:text-base text-triplea-navy font-semibold flex items-center gap-2">
            <HashIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-triplea-green" />
            Account ID
          </label>
          <div className="relative">
            <input
              id="accountId"
              type="text"
              inputMode="numeric"
              value={accountId}
              onChange={(e) => {
                const numericValue = handleNumericInput(e.target.value, false);
                setAccountId(numericValue);
                if (validationErrors.accountId) {
                  setValidationErrors({ ...validationErrors, accountId: undefined });
                }
              }}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 focus-glow ${
                validationErrors.accountId
                  ? INPUT_ERROR_CLASSES
                  : INPUT_SUCCESS_CLASSES
              } focus:outline-none placeholder:text-gray-400`}
              disabled={loading}
              placeholder="Enter numeric account ID (e.g., 123)"
            />
            {accountId && !validationErrors.accountId && (
              <CheckIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-triplea-green animate-scale-in" />
            )}
          </div>
          {validationErrors.accountId && (
            <div className="flex items-center gap-1 text-red-600 text-sm mt-2 animate-slide-in">
              <AlertIcon className="w-4 h-4" />
              {validationErrors.accountId}
            </div>
          )}
        </div>

        <div className="group">
          <label htmlFor="initialBalance" className="block mb-2 text-sm sm:text-base text-triplea-navy font-semibold flex items-center gap-2">
            <DollarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-triplea-green" />
            Initial Balance
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
            <input
              id="initialBalance"
              type="text"
              inputMode="decimal"
              value={initialBalance}
              onChange={(e) => {
                const numericValue = handleNumericInput(e.target.value, true);
                setInitialBalance(numericValue);
                if (validationErrors.initialBalance) {
                  setValidationErrors({ ...validationErrors, initialBalance: undefined });
                }
              }}
              className={`w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2.5 sm:py-3.5 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 focus-glow ${
                validationErrors.initialBalance
                  ? INPUT_ERROR_CLASSES
                  : INPUT_SUCCESS_CLASSES
              } focus:outline-none placeholder:text-gray-400`}
              disabled={loading}
              placeholder="Enter amount (e.g., 100.50)"
            />
            {initialBalance && !validationErrors.initialBalance && (
              <CheckIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-triplea-green animate-scale-in" />
            )}
          </div>
          {validationErrors.initialBalance && (
            <div className="flex items-center gap-1 text-red-600 text-sm mt-2 animate-slide-in">
              <AlertIcon className="w-4 h-4" />
              {validationErrors.initialBalance}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100/50 border-l-4 border-red-500 text-red-800 px-5 py-4 rounded-lg shadow-sm animate-slide-in flex items-start gap-3">
            <AlertIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-100/50 border-l-4 border-triplea-green text-green-800 px-5 py-4 rounded-lg shadow-sm animate-scale-in flex items-start gap-3">
            <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{success}</span>
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
                Creating Account...
              </>
            ) : (
              <>
                <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Create Account
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-triplea-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>
    </div>
  );
};
