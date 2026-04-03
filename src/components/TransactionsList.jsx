import { Trash2, Edit } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency, formatDate } from '../utils/calculations';
import { useFinanceStore } from '../store/financeStore';

export default function TransactionsList() {
  const transactions = useFinanceStore(state =>
    state.getFilteredTransactions()
  );
  const currentRole = useFinanceStore(state => state.currentRole);
  const deleteTransaction = useFinanceStore(state => state.deleteTransaction);
  const [editingId, setEditingId] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
              Date
            </th>
            <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
              Category
            </th>
            <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
              Type
            </th>
            <th className="text-right p-4 font-semibold text-gray-700 dark:text-gray-300">
              Amount
            </th>
            {currentRole === 'admin' && (
              <th className="text-center p-4 font-semibold text-gray-700 dark:text-gray-300">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr
              key={transaction.id}
              className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="p-4">{formatDate(transaction.date)}</td>
              <td className="p-4">{transaction.category}</td>
              <td className="p-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    transaction.type === 'income'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                  }`}
                >
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </span>
              </td>
              <td className={`p-4 text-right font-semibold ${
                transaction.type === 'income'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </td>
              {currentRole === 'admin' && (
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
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
