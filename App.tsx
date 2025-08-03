
import React, { useState, useCallback, useMemo } from 'react';
import { Transaction } from './types';
import Header from './components/Header';
import AccountSummary from './components/AccountSummary';
import ActionPanel from './components/ActionPanel';
import TransactionHistory from './components/TransactionHistory';

// Re-introduce initial hardcoded data for a standalone frontend experience
const initialTransactions: Transaction[] = [
  {
    id: 'tx_3',
    date: '2024-07-21',
    description: 'Salary Deposit',
    amount: 50000.00,
    type: 'deposit',
  },
  {
    id: 'tx_2',
    date: '2024-07-22',
    description: 'Rent Payment',
    amount: 15000.00,
    type: 'withdrawal',
  },
  {
    id: 'tx_1',
    date: '2024-07-24',
    description: 'Grocery Shopping',
    amount: 3550.75,
    type: 'withdrawal',
  },
];

const accountInfo = {
  accountHolder: 'Jane Doe',
  accountNumber: '**** **** **** 1234',
};

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  // The balance is now calculated based on the list of transactions
  const currentBalance = useMemo(() => {
    return transactions.reduce((balance, transaction) => {
      if (transaction.type === 'deposit') {
        return balance + transaction.amount;
      }
      return balance - transaction.amount;
    }, 0);
  }, [transactions]);

  const handleTransaction = useCallback((amount: number, type: 'deposit' | 'withdrawal', description: string) => {
    const newTransaction: Transaction = {
      id: `tx_${new Date().getTime()}`, // Create a simple unique ID
      date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
      description,
      amount,
      type,
    };

    // Add the new transaction to the start of the list to update the UI
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
  }, []);

  return (
    <div className="min-h-screen bg-background-dark text-text-main font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            <AccountSummary 
              accountHolder={accountInfo.accountHolder} 
              accountNumber={accountInfo.accountNumber}
              balance={currentBalance} 
            />
            <ActionPanel 
              onTransaction={handleTransaction} 
              currentBalance={currentBalance} 
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <TransactionHistory transactions={transactions} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
