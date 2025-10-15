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

class ApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;

      try {
        // First, get the response text
        const responseText = await response.text();

        // Try to parse as JSON
        try {
          const errorData = JSON.parse(responseText);

          // Extract error message from various possible formats
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage =
              typeof errorData.error === "string"
                ? errorData.error
                : errorData.error.message || JSON.stringify(errorData.error);
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          }
        } catch {
          // If JSON parsing fails, use the plain text response
          if (responseText && responseText.trim()) {
            errorMessage = responseText.trim();
          }
        }
      } catch {
        // If reading response fails, provide user-friendly messages based on status
        if (response.status === 404) {
          errorMessage = "Account not found. Please check the account ID.";
        } else if (response.status === 400) {
          errorMessage = "Invalid request. Please check your input.";
        } else if (response.status === 409) {
          errorMessage = "Account already exists with this ID.";
        } else if (response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      }

      throw {
        message: errorMessage,
        status: response.status,
      } as ApiError;
    }

    return response.json();
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
        message:
          "Network error: Unable to connect to the server. Please ensure the backend is running.",
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
        message:
          "Network error: Unable to connect to the server. Please ensure the backend is running.",
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
        message:
          "Network error: Unable to connect to the server. Please ensure the backend is running.",
      } as ApiError;
    }
  }
}

export const apiService = new ApiService();
