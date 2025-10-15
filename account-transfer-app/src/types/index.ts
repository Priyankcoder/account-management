export interface Account {
  account_id: number;
  balance: string;
}

export interface CreateAccountRequest {
  account_id: number;
  initial_balance: string;
}

export interface TransactionRequest {
  source_account_id: number;
  destination_account_id: number;
  amount: string;
}

export interface TransactionResponse {
  source_account_id: number;
  destination_account_id: number;
  amount: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
