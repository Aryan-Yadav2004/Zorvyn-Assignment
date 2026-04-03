import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Category emoji mapping
export const categoryEmojis = {
  'Salary': '💰',
  'Freelance Work': '💼',
  'Groceries': '🛒',
  'Transportation': '🚗',
  'Rent': '🏠',
  'Entertainment': '🎬',
  'Utilities': '💡',
  'Dining': '🍽️',
  'Shopping': '🛍️',
  'Education': '📚',
  'Healthcare': '🏥',
  'Food & Dining': '🍽️',
};

// Mock data with emoji support
const mockTransactions = [
  { id: 1, date: '2024-03-20', amount: 2500, category: 'Salary', type: 'income' },
  { id: 2, date: '2024-03-18', amount: 150, category: 'Groceries', type: 'expense' },
  { id: 3, date: '2024-03-17', amount: 80, category: 'Transportation', type: 'expense' },
  { id: 4, date: '2024-03-15', amount: 1200, category: 'Rent', type: 'expense' },
  { id: 5, date: '2024-03-14', amount: 50, category: 'Entertainment', type: 'expense' },
  { id: 6, date: '2024-03-12', amount: 200, category: 'Utilities', type: 'expense' },
  { id: 7, date: '2024-03-10', amount: 1500, category: 'Freelance Work', type: 'income' },
  { id: 8, date: '2024-03-08', amount: 100, category: 'Dining', type: 'expense' },
  { id: 9, date: '2024-03-05', amount: 300, category: 'Shopping', type: 'expense' },
  { id: 10, date: '2024-03-01', amount: 50, category: 'Education', type: 'expense' },
  { id: 11, date: '2024-02-28', amount: 2500, category: 'Salary', type: 'income' },
  { id: 12, date: '2024-02-25', amount: 120, category: 'Groceries', type: 'expense' },
  { id: 13, date: '2024-02-22', amount: 80, category: 'Transportation', type: 'expense' },
  { id: 14, date: '2024-02-20', amount: 1200, category: 'Rent', type: 'expense' },
  { id: 15, date: '2024-02-18', amount: 75, category: 'Entertainment', type: 'expense' },
];

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      filters: {
        searchTerm: '',
        type: 'all',
        category: 'all',
        sortBy: 'date-desc',
      },
      currentRole: 'viewer',
      darkMode: false,
      chartPeriod: '6M',
      activeSection: 'overview',

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            { ...transaction, id: Math.max(...state.transactions.map(t => t.id), 0) + 1 },
            ...state.transactions,
          ],
        })),

      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map(t =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter(t => t.id !== id),
        })),

      setFilter: (filterType, value) =>
        set((state) => ({
          filters: { ...state.filters, [filterType]: value },
        })),

      setRole: (role) => set({ currentRole: role }),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      getFilteredTransactions: () => {
        const state = get();
        let filtered = [...state.transactions];

        // Search filter
        if (state.filters.searchTerm) {
          const term = state.filters.searchTerm.toLowerCase();
          filtered = filtered.filter(
            t =>
              t.category.toLowerCase().includes(term) ||
              t.amount.toString().includes(term)
          );
        }

        // Type filter
        if (state.filters.type !== 'all') {
          filtered = filtered.filter(t => t.type === state.filters.type);
        }

        // Category filter
        if (state.filters.category !== 'all') {
          filtered = filtered.filter(t => t.category === state.filters.category);
        }

        // Sorting
        switch (state.filters.sortBy) {
          case 'date-asc':
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
          case 'date-desc':
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
          case 'amount-asc':
            filtered.sort((a, b) => a.amount - b.amount);
            break;
          case 'amount-desc':
            filtered.sort((a, b) => b.amount - a.amount);
            break;
          default:
            break;
        }

        return filtered;
      },

      getCategories: () => {
        const state = get();
        return [...new Set(state.transactions.map(t => t.category))];
      },

      setChartPeriod: (period) => set({ chartPeriod: period }),

      setActiveSection: (section) => set({ activeSection: section }),
    }),
    {
      name: 'finance-dashboard-store',
    }
  )
);
