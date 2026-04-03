import { TrendingUp, TrendingDown, Target, Calendar } from 'lucide-react';
import {
  getHighestSpendingCategory,
  getMonthlyComparison,
  formatCurrency,
} from '../utils/calculations';
import { useFinanceStore } from '../store/financeStore';

export default function Insights() {
  const transactions = useFinanceStore(state => state.transactions);
  const highestCategory = getHighestSpendingCategory(transactions);
  const monthlyComparison = getMonthlyComparison(transactions);

  const avgTransactionAmount =
    transactions.length > 0
      ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length
      : 0;

  const expenseCount = transactions.filter(t => t.type === 'expense').length;
  const incomeCount = transactions.filter(t => t.type === 'income').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Highest Spending Category */}
      {highestCategory && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Top Spending Category
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {highestCategory.name}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
                {formatCurrency(highestCategory.value)}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
              <Target size={24} className="text-red-600 dark:text-red-300" />
            </div>
          </div>
        </div>
      )}

      {/* Monthly Comparison */}
      {monthlyComparison && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Monthly Comparison
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {monthlyComparison.percentChange > 0 ? '+' : ''}
                {monthlyComparison.percentChange.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {monthlyComparison.percentChange > 0
                  ? 'Spending increased'
                  : 'Spending decreased'}{' '}
                from last month
              </p>
            </div>
            <div
              className={`p-3 rounded-full ${
                monthlyComparison.percentChange > 0
                  ? 'bg-red-100 dark:bg-red-900'
                  : 'bg-green-100 dark:bg-green-900'
              }`}
            >
              {monthlyComparison.percentChange > 0 ? (
                <TrendingUp
                  size={24}
                  className="text-red-600 dark:text-red-300"
                />
              ) : (
                <TrendingDown
                  size={24}
                  className="text-green-600 dark:text-green-300"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Transactions
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {transactions.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {incomeCount} income, {expenseCount} expenses
            </p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Calendar size={24} className="text-blue-600 dark:text-blue-300" />
          </div>
        </div>
      </div>

      {/* Average Transaction */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Average Transaction
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {formatCurrency(avgTransactionAmount)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Across all transactions
            </p>
          </div>
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
            <TrendingUp size={24} className="text-purple-600 dark:text-purple-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
