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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header onAddTransaction={() => setIsAddModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="animate-fadeIn">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back!</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Here's your dynamic financial overview</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              Balance Trend
            </h2>
            {monthlyBalance.length > 0 ? (
              <BalanceTrendChart data={monthlyBalance} />
            ) : (
              <div className="h-80 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <p className="text-center">No data available</p>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              Spending Breakdown
            </h2>
            {spendingByCategory.length > 0 ? (
              <SpendingBreakdownChart data={spendingByCategory} />
            ) : (
              <div className="h-80 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <p className="text-center">No expense data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Insights Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Insights
          </h2>
          <Insights />
        </section>

        {/* Export & Filters Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FilterBar />
          </div>
          <ExportData />
        </div>

        {/* Transactions Section */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Recent Transactions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <TransactionsList />
        </section>
      </main>

      {/* Add Transaction Modal */}
      <AddTransactionModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
