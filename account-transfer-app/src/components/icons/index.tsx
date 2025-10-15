import React from "react";
import { Icon, type IconProps } from "./Icon";

// Re-export IconProps for external use
export type { IconProps };

// Account & Finance Icons
export const PlusIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 4v16m8-8H4" />
  </Icon>
);

export const EyeIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </Icon>
);

export const TransferIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </Icon>
);

export const HashIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
  </Icon>
);

export const DollarIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Icon>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M5 13l4 4L19 7" />
  </Icon>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Icon>
);

export const AlertIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Icon>
);

export const LightningIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
  </Icon>
);

export const WalletIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  </Icon>
);

export const CreditCardIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </Icon>
);

export const BankIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </Icon>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </Icon>
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </Icon>
);

export const ArrowForwardIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </Icon>
);

export const SpinnerIcon: React.FC<IconProps> = (props) => (
  <svg
    className={`animate-spin ${props.className || ""}`}
    width={props.size || 24}
    height={props.size || 24}
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Export all icons
export const Icons = {
  Plus: PlusIcon,
  Eye: EyeIcon,
  Transfer: TransferIcon,
  Hash: HashIcon,
  Dollar: DollarIcon,
  Check: CheckIcon,
  CheckCircle: CheckCircleIcon,
  Alert: AlertIcon,
  Lightning: LightningIcon,
  Wallet: WalletIcon,
  CreditCard: CreditCardIcon,
  Bank: BankIcon,
  Search: SearchIcon,
  ArrowRight: ArrowRightIcon,
  ArrowForward: ArrowForwardIcon,
  Spinner: SpinnerIcon,
};
