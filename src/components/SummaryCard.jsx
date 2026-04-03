import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export default function SummaryCard({ label, amount, type, icon: Icon }) {
  let bgGradient, iconBg, borderColor, labelColor;

  if (type === 'balance') {
    bgGradient = 'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700';
    iconBg = 'bg-white/20 text-primary-100';
    borderColor = 'border-primary-400/20';
    labelColor = 'text-primary-100';
  } else if (type === 'income') {
    bgGradient = 'bg-gradient-to-br from-success-500 via-success-600 to-success-700';
    iconBg = 'bg-white/20 text-success-100';
    borderColor = 'border-success-400/20';
    labelColor = 'text-success-100';
  } else if (type === 'expense') {
    bgGradient = 'bg-gradient-to-br from-danger-500 via-danger-600 to-danger-700';
    iconBg = 'bg-white/20 text-danger-100';
    borderColor = 'border-danger-400/20';
    labelColor = 'text-danger-100';
  }

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-premium p-6 border ${borderColor} transition-transform hover:scale-105 duration-300 ${bgGradient}`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${labelColor} opacity-90 tracking-wide`}>
            {label}
          </p>
          <p className="text-white text-4xl font-bold mt-3 tracking-tight">
            {formatCurrency(amount)}
          </p>
          <p className={`text-xs ${labelColor} mt-2 opacity-75`}>
            {type === 'balance' ? 'Net balance' : type === 'income' ? 'Last 30 days' : 'This month'}
          </p>
        </div>
        <div className={`p-3.5 rounded-xl ${iconBg} backdrop-blur-sm`}>
          {Icon && <Icon size={28} strokeWidth={1.5} />}
        </div>
      </div>
    </div>
  );
}
