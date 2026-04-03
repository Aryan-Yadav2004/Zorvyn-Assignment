import { Moon, Sun, Plus } from 'lucide-react';
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

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">💰</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Finance Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Role Selector */}
            <div className="flex gap-2">
              <button
                onClick={() => setRole('viewer')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentRole === 'viewer'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Viewer
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentRole === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Add Transaction Button (Admin Only) */}
            {currentRole === 'admin' && (
              <button
                onClick={onAddTransaction}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Plus size={20} />
                Add Transaction
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={handleToggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
