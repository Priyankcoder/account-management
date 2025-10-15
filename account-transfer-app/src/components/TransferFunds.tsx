import { useState } from "react";
import { apiService } from "../services/api";
import {
  validateAccountId,
  validateAmount,
  validateAccountsAreDifferent,
  handleNumericInput,
  formatCurrency,
} from "../utils/validation";
import type { ApiError, TransactionResponse } from "../types";
import {
  TransferIcon,
  CreditCardIcon,
  BankIcon,
  DollarIcon,
  CheckIcon,
  AlertIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowForwardIcon,
  SpinnerIcon
} from "./icons";

interface TransferFundsProps {
  onTransferComplete: () => void;
}

export const TransferFunds = ({ onTransferComplete }: TransferFundsProps) => {
  const [sourceAccountId, setSourceAccountId] = useState("");
  const [destinationAccountId, setDestinationAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<TransactionResponse | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    sourceAccountId?: string;
    destinationAccountId?: string;
    amount?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: {
      sourceAccountId?: string;
      destinationAccountId?: string;
      amount?: string;
    } = {};

    const sourceError = validateAccountId(sourceAccountId);
    if (sourceError) errors.sourceAccountId = sourceError;

    const destError = validateAccountId(destinationAccountId);
    if (destError) errors.destinationAccountId = destError;

    const amountError = validateAmount(amount);
    if (amountError) errors.amount = amountError;

    const accountsDifferentError = validateAccountsAreDifferent(sourceAccountId, destinationAccountId);
    if (accountsDifferentError) errors.destinationAccountId = accountsDifferentError;

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
      const result = await apiService.executeTransaction({
        source_account_id: Number(sourceAccountId),
        destination_account_id: Number(destinationAccountId),
        amount: amount,
      });

      setSuccess(result);
      setSourceAccountId("");
      setDestinationAccountId("");
      setAmount("");
      setValidationErrors({});
      onTransferComplete();
    } catch (err) {
      setError((err as ApiError).message || "Failed to execute transfer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-100 card-hover animate-scale-in">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-triplea-navy to-triplea-navy/80 rounded-lg">
          <TransferIcon className="w-5 h-5 sm:w-6 sm:h-6 text-triplea-green" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-triplea-navy">
          Transfer Funds
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Transfer Direction Indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 py-3 sm:py-4 bg-gradient-to-r from-blue-50/50 to-green-50/50 rounded-lg sm:rounded-xl border border-gray-100">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              Source
            </span>
          </div>
          <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-triplea-green animate-pulse" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              Destination
            </span>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>

        <div className="group">
          <label
            htmlFor="sourceAccountId"
            className="block mb-2 text-sm sm:text-base text-triplea-navy font-semibold flex items-center gap-2"
          >
            <CreditCardIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
            From Account ID
          </label>
          <div className="relative">
            <input
              id="sourceAccountId"
              type="text"
              inputMode="numeric"
              value={sourceAccountId}
              onChange={(e) => {
                const numericValue = handleNumericInput(e.target.value, false);
                setSourceAccountId(numericValue);
                if (validationErrors.sourceAccountId) {
                  setValidationErrors({
                    ...validationErrors,
                    sourceAccountId: undefined,
                  });
                }
              }}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 focus-glow ${
                validationErrors.sourceAccountId
                  ? "border-red-400 focus:border-red-500 bg-red-50/50"
                  : "border-gray-200 focus:border-triplea-green-muted hover:border-gray-300 bg-white"
              } focus:outline-none placeholder:text-gray-400`}
              disabled={loading}
              placeholder="Enter source account ID"
            />
            {sourceAccountId && !validationErrors.sourceAccountId && (
              <CheckIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-triplea-green animate-scale-in" />
            )}
          </div>
          {validationErrors.sourceAccountId && (
            <div className="flex items-center gap-1 text-red-600 text-sm mt-2 animate-slide-in">
              <AlertIcon className="w-4 h-4" />
              {validationErrors.sourceAccountId}
            </div>
          )}
        </div>

        <div className="group">
          <label
            htmlFor="destinationAccountId"
            className="block mb-2 text-sm sm:text-base text-triplea-navy font-semibold flex items-center gap-2"
          >
            <BankIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
            To Account ID
          </label>
          <div className="relative">
            <input
              id="destinationAccountId"
              type="text"
              inputMode="numeric"
              value={destinationAccountId}
              onChange={(e) => {
                const numericValue = handleNumericInput(e.target.value, false);
                setDestinationAccountId(numericValue);
                if (validationErrors.destinationAccountId) {
                  setValidationErrors({
                    ...validationErrors,
                    destinationAccountId: undefined,
                  });
                }
              }}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 focus-glow ${
                validationErrors.destinationAccountId
                  ? "border-red-400 focus:border-red-500 bg-red-50/50"
                  : "border-gray-200 focus:border-triplea-green-muted hover:border-gray-300 bg-white"
              } focus:outline-none placeholder:text-gray-400`}
              disabled={loading}
              placeholder="Enter destination account ID"
            />
            {destinationAccountId && !validationErrors.destinationAccountId && (
              <CheckIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-triplea-green animate-scale-in" />
            )}
          </div>
          {validationErrors.destinationAccountId && (
            <div className="flex items-center gap-1 text-red-600 text-sm mt-2 animate-slide-in">
              <AlertIcon className="w-4 h-4" />
              {validationErrors.destinationAccountId}
            </div>
          )}
        </div>

        <div className="group">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm sm:text-base text-triplea-navy font-semibold flex items-center gap-2"
          >
            <DollarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-triplea-green" />
            Transfer Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-lg">
              $
            </span>
            <input
              id="amount"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => {
                const numericValue = handleNumericInput(e.target.value, true);
                setAmount(numericValue);
                if (validationErrors.amount) {
                  setValidationErrors({
                    ...validationErrors,
                    amount: undefined,
                  });
                }
              }}
              className={`w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2.5 sm:py-3.5 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 focus-glow ${
                validationErrors.amount
                  ? "border-red-400 focus:border-red-500 bg-red-50/50"
                  : "border-gray-200 focus:border-triplea-green-muted hover:border-gray-300 bg-white"
              } focus:outline-none placeholder:text-gray-400`}
              disabled={loading}
              placeholder="Enter transfer amount"
            />
            {amount && !validationErrors.amount && (
              <CheckIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-triplea-green animate-scale-in" />
            )}
          </div>
          {validationErrors.amount && (
            <div className="flex items-center gap-1 text-red-600 text-sm mt-2 animate-slide-in">
              <AlertIcon className="w-4 h-4" />
              {validationErrors.amount}
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
          <div className="bg-gradient-to-r from-green-50 to-emerald-100/50 border-l-4 border-triplea-green text-green-800 px-5 py-4 rounded-lg shadow-sm animate-scale-in">
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Transfer Successful!</p>
                <p className="text-sm">
                  Successfully transferred{" "}
                  <span className="font-bold">
                    {formatCurrency(success.amount)}
                  </span>{" "}
                  from account{" "}
                  <span className="font-bold">
                    #{success.source_account_id}
                  </span>{" "}
                  to account{" "}
                  <span className="font-bold">
                    #{success.destination_account_id}
                  </span>
                </p>
              </div>
            </div>
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
                <SpinnerIcon className="animate-spin w-5 h-5" />
                Processing Transfer...
              </>
            ) : (
              <>
                <ArrowForwardIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                Execute Transfer
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-triplea-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>
    </div>
  );
};
