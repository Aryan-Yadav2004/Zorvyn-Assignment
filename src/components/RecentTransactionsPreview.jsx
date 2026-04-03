import { ArrowRight } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/calculations';
import { useFinanceStore } from '../store/financeStore';
import { categoryEmojis } from '../store/financeStore';

export default function RecentTransactionsPreview({ onViewAll }) {
  const transactions = useFinanceStore(state => state.transactions);
  const setActiveSection = useFinanceStore(state => state.setActiveSection);

  const recentTransactions = transactions.slice(0, 5);

  const handleViewAll = () => {
    setActiveSection('transactions');
    onViewAll?.();
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
        <button
          onClick={handleViewAll}
          className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition"
        >
          View all
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-3">
        {recentTransactions.map((transaction) => {
          const emoji = categoryEmojis[transaction.category] || '💳';
          const date = new Date(transaction.date);
          const today = new Date();
          const isToday = date.toDateString() === today.toDateString();
          
          const formatTransactionDate = () => {
            const daysAgo = Math.floor((today - date) / (1000 * 60 * 60 * 24));
            if (isToday) return 'Today';
            if (daysAgo === 1) return 'Yesterday';
            if (daysAgo < 7) return `${daysAgo} days ago`;
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          };

          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="text-2xl">{emoji}</div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">
                    {transaction.category}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatTransactionDate()} · {transaction.category}
                  </p>
                </div>
              </div>
              <div className={`font-bold text-sm ${
                transaction.type === 'income'
                  ? 'text-success-600 dark:text-success-400'
                  : 'text-danger-600 dark:text-danger-400'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
