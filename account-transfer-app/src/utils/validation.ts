export const validateAccountId = (value: string): string | null => {
  if (!value.trim()) {
    return 'Account ID is required';
  }
  
  const numValue = Number(value);
  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    return 'Account ID must be a valid integer';
  }
  
  if (numValue <= 0) {
    return 'Account ID must be a positive number';
  }
  
  return null;
};

export const validateAmount = (value: string): string | null => {
  if (!value.trim()) {
    return 'Amount is required';
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return 'Amount must be a valid number';
  }
  
  if (numValue <= 0) {
    return 'Amount must be greater than zero';
  }
  
  // Check for reasonable decimal places (up to 5 based on API examples)
  const decimalParts = value.split('.');
  if (decimalParts.length === 2 && decimalParts[1].length > 5) {
    return 'Amount can have at most 5 decimal places';
  }
  
  return null;
};

export const formatCurrency = (amount: string): string => {
  const numValue = parseFloat(amount);
  if (isNaN(numValue)) return amount;
  
  return numValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  });
};
