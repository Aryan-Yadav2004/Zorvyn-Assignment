import { useState, useEffect } from 'react';
import { useFinanceStore } from './store/financeStore';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import { BalanceTrendChart, SpendingBreakdownChart } from './components/Charts';
import FilterBar from './components/FilterBar';
import TransactionsList from './components/TransactionsList';
import AddTransactionModal from './components/AddTransactionModal';
import Insights from './components/Insights';
import ExportData from './components/ExportData';
import {
  calculateTotalBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateSpendingByCategory,
  getMonthlyBalance,
} from './utils/calculations';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export default function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const transactions = useFinanceStore(state => state.transactions);
  const darkMode = useFinanceStore(state => state.darkMode);

  useEffect(() => {
    // Apply dark mode on mount
    const state = useFinanceStore.getState();
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Subscribe to dark mode changes
    const unsubscribe = useFinanceStore.subscribe(
      (state) => state.darkMode,
      (darkMode) => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    );

    return unsubscribe;
  }, []);

  const totalBalance = calculateTotalBalance(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const spendingByCategory = calculateSpendingByCategory(transactions);
  const monthlyBalance = getMonthlyBalance(transactions);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header onAddTransaction={() => setIsAddModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fadeIn">
          <SummaryCard
            label="Total Balance"
            amount={totalBalance}
            type="balance"
            icon={Wallet}
          />
          <SummaryCard
            label="Total Income"
            amount={totalIncome}
            type="income"
            icon={TrendingUp}
          />
          <SummaryCard
            label="Total Expenses"
            amount={totalExpenses}
            type="expense"
            icon={TrendingDown}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Balance Trend
            </h2>
            {monthlyBalance.length > 0 ? (
              <BalanceTrendChart data={monthlyBalance} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No data available</p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Spending Breakdown
            </h2>
            {spendingByCategory.length > 0 ? (
              <SpendingBreakdownChart data={spendingByCategory} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No expense data available</p>
            )}
          </div>
        </div>

        {/* Insights Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Insights
          </h2>
          <Insights />
        </section>

        {/* Export Section */}
        <section className="mb-8">
          <ExportData />
        </section>

        {/* Filters */}
        <section className="mb-8">
          <FilterBar />
        </section>

        {/* Transactions Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Transactions
          </h2>
          <TransactionsList />
        </section>
      </main>

      {/* Add Transaction Modal */}
      <AddTransactionModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
