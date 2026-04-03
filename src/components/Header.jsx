import { Moon, Sun, Plus, Calendar } from 'lucide-react';
import { useFinanceStore } from '../store/financeStore';

export default function Header({ onAddTransaction }) {
  const currentRole = useFinanceStore(state => state.currentRole);
  const setRole = useFinanceStore(state => state.setRole);
  const darkMode = useFinanceStore(state => state.darkMode);
  const toggleDarkMode = useFinanceStore(state => state.toggleDarkMode);

  const handleToggleDarkMode = () => {
    toggleDarkMode();
    const newDarkMode = !darkMode;
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const today = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Branding */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">💰</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Zorvyn
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Finance</p>
            </div>
          </div>

          {/* Center - Date and Current Role */}
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <Calendar size={16} className="text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{today}</span>
            </div>
            <div className="hidden md:block">
              <p className="text-xs text-slate-500 dark:text-slate-400">Role:</p>
              <p className="text-sm font-bold text-primary-600 dark:text-primary-400 capitalize">{currentRole}</p>
            </div>
          </div>

          {/* Right - Controls */}
          <div className="flex items-center gap-3">
            {/* Role Selector */}
            <div className="hidden sm:flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setRole('viewer')}
                className={`px-3 py-1.5 rounded-md font-medium text-sm transition-all ${
                  currentRole === 'viewer'
                    ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Viewer
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-3 py-1.5 rounded-md font-medium text-sm transition-all ${
                  currentRole === 'admin'
                    ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Add Transaction Button (Admin Only) */}
            {currentRole === 'admin' && (
              <button
                onClick={onAddTransaction}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all"
              >
                <Plus size={18} />
                Add
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={handleToggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
