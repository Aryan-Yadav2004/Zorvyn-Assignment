import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency, formatDate } from '../utils/calculations';
import { useFinanceStore } from '../store/financeStore';

export default function TransactionsList() {
  const transactions = useFinanceStore(state =>
    state.getFilteredTransactions()
  );
  const currentRole = useFinanceStore(state => state.currentRole);
  const deleteTransaction = useFinanceStore(state => state.deleteTransaction);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
          <span className="text-2xl">📭</span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium">No transactions found</p>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <th className="text-left px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-sm">
              Date
            </th>
            <th className="text-left px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-sm">
              Category
            </th>
            <th className="text-left px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-sm">
              Type
            </th>
            <th className="text-right px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-sm">
              Amount
            </th>
            {currentRole === 'admin' && (
              <th className="text-center px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-sm">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-medium">
                {formatDate(transaction.date)}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                {transaction.category}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                    transaction.type === 'income'
                      ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400'
                      : 'bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400'
                  }`}
                >
                  {transaction.type === 'income' ? '↓ Income' : '↑ Expense'}
                </span>
              </td>
              <td className={`px-6 py-4 text-right text-sm font-bold ${
                transaction.type === 'income'
                  ? 'text-success-600 dark:text-success-400'
                  : 'text-danger-600 dark:text-danger-400'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </td>
              {currentRole === 'admin' && (
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="inline-flex items-center justify-center p-2 text-danger-600 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-900/20 rounded-lg transition-colors"
                    title="Delete transaction"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
