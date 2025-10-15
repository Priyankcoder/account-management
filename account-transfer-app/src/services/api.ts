import type {
  Account,
  CreateAccountRequest,
  TransactionRequest,
  TransactionResponse,
  ApiError,
} from "../types";

// Use environment variable for API base URL, fallback to '/api' for dev proxy
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}`
  : "/api";

const NETWORK_ERROR_MESSAGE =
  "Network error: Unable to connect to the server. Please try again later.";

class ApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorMessage = await response.text();
      throw {
        message: errorMessage || `HTTP error! status: ${response.status}`,
        status: response.status,
      } as ApiError;
    }

    const text = await response.text();
    return text ? JSON.parse(text) : ({} as T);
  }

  async createAccount(data: CreateAccountRequest): Promise<Account> {
    try {
      const response = await fetch(`${API_BASE_URL}/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return this.handleResponse<Account>(response);
    } catch (error) {
      if ((error as ApiError).status) {
        throw error;
      }
      throw {
        message: NETWORK_ERROR_MESSAGE,
      } as ApiError;
    }
  }

  async getAccountBalance(accountId: number): Promise<Account> {
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return this.handleResponse<Account>(response);
    } catch (error) {
      if ((error as ApiError).status) {
        throw error;
      }
      throw {
        message: NETWORK_ERROR_MESSAGE,
      } as ApiError;
    }
  }

  async executeTransaction(
    data: TransactionRequest
  ): Promise<TransactionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return this.handleResponse<TransactionResponse>(response);
    } catch (error) {
      if ((error as ApiError).status) {
        throw error;
      }
      throw {
        message: NETWORK_ERROR_MESSAGE,
      } as ApiError;
    }
  }
}

export const apiService = new ApiService();
