import { TrendingUp, TrendingDown, Target, Calendar, BarChart3 } from 'lucide-react';
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
        <div className="bg-gradient-to-br from-danger-50 to-danger-100 dark:from-danger-900/20 dark:to-danger-800/20 p-6 rounded-xl shadow-md border border-danger-200 dark:border-danger-700/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-danger-600 dark:text-danger-400 uppercase tracking-wide">
                Top Spending
              </p>
              <p className="text-2xl font-bold text-danger-900 dark:text-danger-100 mt-2">
                {highestCategory.name}
              </p>
              <p className="text-lg font-bold text-danger-700 dark:text-danger-300 mt-1">
                {formatCurrency(highestCategory.value)}
              </p>
            </div>
            <div className="p-3.5 bg-danger-100 dark:bg-danger-900/40 rounded-xl">
              <Target size={24} className="text-danger-600 dark:text-danger-400" />
            </div>
          </div>
        </div>
      )}

      {/* Monthly Comparison */}
      {monthlyComparison && (
        <div className={`${
          monthlyComparison.percentChange > 0
            ? 'bg-gradient-to-br from-danger-50 to-danger-100 dark:from-danger-900/20 dark:to-danger-800/20 border-danger-200 dark:border-danger-700/50'
            : 'bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-700/50'
        } p-6 rounded-xl shadow-md border`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-semibold uppercase tracking-wide ${
                monthlyComparison.percentChange > 0
                  ? 'text-danger-600 dark:text-danger-400'
                  : 'text-success-600 dark:text-success-400'
              }`}>
                Monthly Change
              </p>
              <p className={`text-2xl font-bold mt-2 ${
                monthlyComparison.percentChange > 0
                  ? 'text-danger-900 dark:text-danger-100'
                  : 'text-success-900 dark:text-success-100'
              }`}>
                {monthlyComparison.percentChange > 0 ? '+' : ''}
                {monthlyComparison.percentChange.toFixed(1)}%
              </p>
              <p className={`text-sm mt-1 ${
                monthlyComparison.percentChange > 0
                  ? 'text-danger-700 dark:text-danger-300'
                  : 'text-success-700 dark:text-success-300'
              }`}>
                vs last month
              </p>
            </div>
            <div className={`p-3.5 rounded-xl ${
              monthlyComparison.percentChange > 0
                ? 'bg-danger-100 dark:bg-danger-900/40'
                : 'bg-success-100 dark:bg-success-900/40'
            }`}>
              {monthlyComparison.percentChange > 0 ? (
                <TrendingUp size={24} className="text-danger-600 dark:text-danger-400" />
              ) : (
                <TrendingDown size={24} className="text-success-600 dark:text-success-400" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Total Transactions */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-xl shadow-md border border-primary-200 dark:border-primary-700/50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
              Transactions
            </p>
            <p className="text-2xl font-bold text-primary-900 dark:text-primary-100 mt-2">
              {transactions.length}
            </p>
            <p className="text-sm text-primary-700 dark:text-primary-300 mt-1">
              {incomeCount} income · {expenseCount} expenses
            </p>
          </div>
          <div className="p-3.5 bg-primary-100 dark:bg-primary-900/40 rounded-xl">
            <Calendar size={24} className="text-primary-600 dark:text-primary-400" />
          </div>
        </div>
      </div>

      {/* Average Transaction */}
      <div className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 p-6 rounded-xl shadow-md border border-warning-200 dark:border-warning-700/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-warning-600 dark:text-warning-400 uppercase tracking-wide">
              Average
            </p>
            <p className="text-2xl font-bold text-warning-900 dark:text-warning-100 mt-2">
              {formatCurrency(avgTransactionAmount)}
            </p>
            <p className="text-sm text-warning-700 dark:text-warning-300 mt-1">
              Per transaction
            </p>
          </div>
          <div className="p-3.5 bg-warning-100 dark:bg-warning-900/40 rounded-xl">
            <BarChart3 size={24} className="text-warning-600 dark:text-warning-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
