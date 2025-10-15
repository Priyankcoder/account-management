# Account Management System

A modern web application for managing financial accounts and executing internal fund transfers. Built with React, TypeScript, and Vite.

## Features

- **Account Creation**: Create new accounts with initial balances
- **Balance Inquiry**: Check current account balances in real-time
- **Fund Transfers**: Execute secure transfers between accounts
- **Input Validation**: Comprehensive client-side validation for all operations
- **Error Handling**: Clear error messages and user guidance
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Prerequisites

Before running this application, ensure you have:

- Node.js (v14 or higher)
- npm or yarn package manager
- Docker (for running the backend server)

## Backend Setup

The application requires a backend API server. Start the backend using Docker:

```bash
docker run -p 8860:8860 tripleaio/transfer-api-server
```

Keep this terminal open while using the application.

## Installation

1. Navigate to the project directory:

```bash
cd account-transfer-app
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

   A `.env` file has been created for you. To change the backend API URL, edit:

   ```bash
   VITE_API_BASE_URL=http://localhost:8860
   ```

   For production deployment, update this to your production API URL:

   ```bash
   VITE_API_BASE_URL=https://your-api-domain.com
   ```

   **Note**: The `.env` file is git-ignored for security. Use `.env.example` as a reference.

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Technology Stack

- **React 18**: Chosen for its robust ecosystem and component-based architecture
- **TypeScript**: Provides type safety and improved developer experience
- **Vite**: Fast build tool with excellent DX and hot module replacement

### Architecture Patterns

- **Component Composition**: Each feature is isolated in its own component
- **Service Layer**: API calls are abstracted into a dedicated service
- **Type Safety**: Strong typing throughout the application
- **Validation Layer**: Reusable validation utilities for consistent error handling

### State Management

- Local component state using React hooks
- Prop-based communication between parent and child components
- No external state management library needed due to simple state requirements

### Styling Approach

- Tailwind CSS for utility-first styling properties for theming
- Mobile-first responsive design
- Consistent design system with defined color palette

## API Integration

The application integrates with three backend endpoints:

- `POST /accounts` - Create a new account
- `GET /accounts/{account_id}` - Retrieve account balance
- `POST /transactions` - Execute fund transfer

All API calls include:

- Proper error handling with user-friendly messages
- Network error detection
- Loading states for better UX

## Input Validation

The application validates:

- Account IDs must be positive integers
- Amounts must be positive numbers with max 5 decimal places
- Source and destination accounts must be different
- All required fields must be filled

## Building for Production

Create a production build:

```bash
npm run build
```
