import { BarChart3, TrendingUp, Zap } from 'lucide-react';
import { useFinanceStore } from '../store/financeStore';

export default function Sidebar() {
  const activeSection = useFinanceStore(state => state.activeSection);
  const setActiveSection = useFinanceStore(state => state.setActiveSection);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3, symbol: '◈' },
    { id: 'transactions', label: 'Transactions', icon: TrendingUp, symbol: '⇄' },
    { id: 'insights', label: 'Insights', icon: Zap, symbol: '◎' },
  ];

  return (
    <aside className="hidden lg:fixed lg:left-0 lg:top-16 lg:w-64 lg:h-[calc(100vh-64px)] lg:bg-white dark:lg:bg-slate-800 lg:border-r lg:border-slate-200 dark:lg:border-slate-700 lg:flex lg:flex-col lg:justify-start lg:pt-8">
      <nav className="space-y-1 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                isActive
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
              }`}
            >
              <span className="text-lg">{item.symbol}</span>
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
