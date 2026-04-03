import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export default function SummaryCard({ label, amount, type, icon: Icon }) {
  const baseClasses =
    'p-6 rounded-lg shadow-md transition-transform hover:scale-105 duration-200';
  const darkMode = document.documentElement.classList.contains('dark');

  let bgClass, textClass, iconClass;

  if (type === 'balance') {
    bgClass = darkMode
      ? 'bg-gradient-to-br from-blue-600 to-blue-800'
      : 'bg-gradient-to-br from-blue-500 to-blue-600';
    textClass = 'text-white';
    iconClass = 'text-blue-100';
  } else if (type === 'income') {
    bgClass = darkMode
      ? 'bg-gradient-to-br from-green-600 to-green-800'
      : 'bg-gradient-to-br from-green-500 to-green-600';
    textClass = 'text-white';
    iconClass = 'text-green-100';
  } else if (type === 'expense') {
    bgClass = darkMode
      ? 'bg-gradient-to-br from-red-600 to-red-800'
      : 'bg-gradient-to-br from-red-500 to-red-600';
    textClass = 'text-white';
    iconClass = 'text-red-100';
  }

  return (
    <div className={`${baseClasses} ${bgClass} ${textClass}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="text-3xl font-bold mt-2">{formatCurrency(amount)}</p>
        </div>
        <div className={`p-3 rounded-full ${iconClass} bg-white/20`}>
          {Icon && <Icon size={24} />}
        </div>
      </div>
    </div>
  );
}
