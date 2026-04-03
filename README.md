# Finance Dashboard UI

A clean, interactive, and responsive finance dashboard built with React, Vite, and Tailwind CSS. This project demonstrates modern frontend development practices with comprehensive state management, data visualization, and role-based access control.

##  Features

### Core Features
- **Dashboard Overview**: Summary cards displaying total balance, income, and expenses
-  **Time-Based Visualization**: Line chart showing income vs. expense trends over months
- **Categorical Visualization**: Pie chart breaking down spending by category
- **Transactions Section**: 
  - Detailed transaction list with date, amount, category, and type
  - Real-time filtering by search term, transaction type, and category
  - Multiple sorting options (date, amount in ascending/descending order)
- **Role-Based UI**:
  - **Viewer**: Read-only access to all data
  - **Admin**: Can add and delete transactions
  - Easy role switching via dropdown in header
- **Insights Section**:
  - Highest spending category
  - Monthly spending comparison (percentage change)
  - Total transaction count and breakdown
  - Average transaction amount

### Enhancements
-  **Dark Mode**: Toggle between light and dark themes with smooth transitions
-  **Data Persistence**: LocalStorage integration to save all data and preferences
-  **Data Export**: Export transactions as CSV or JSON for external analysis
-  **Animations**: Smooth fade-in effects and hover transitions
-  **Responsive Design**: Works seamlessly on mobile, tablet, and desktop screens
-  **Empty State Handling**: Graceful handling when no data is available

##  Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charting**: Recharts
- **Icons**: Lucide React
- **Package Manager**: npm

##  Project Structure

```
finance-dashboard/
├── src/
│   ├── components/
│   │   ├── AddTransactionModal.jsx      # Modal for adding new transactions (Admin feature)
│   │   ├── Charts.jsx                   # Recharts components (Balance trend, Spending breakdown)
│   │   ├── ExportData.jsx               # CSV/JSON export functionality
│   │   ├── FilterBar.jsx                # Search and filter controls
│   │   ├── Header.jsx                   # Navigation header with role switching
│   │   ├── Insights.jsx                 # Financial insights display
│   │   ├── SummaryCard.jsx              # Summary cards for balance/income/expenses
│   │   └── TransactionsList.jsx         # Transactions table with admin actions
│   ├── store/
│   │   └── financeStore.js              # Zustand store with mock data and state logic
│   ├── utils/
│   │   ├── calculations.js              # Financial calculation utilities
│   │   └── export.js                    # Export functionality
│   ├── App.jsx                          # Main application component
│   ├── main.jsx                         # React entry point
│   └── index.css                        # Global styles and Tailwind imports
├── index.html                           # HTML template
├── vite.config.js                       # Vite configuration
├── tailwind.config.js                   # Tailwind CSS configuration
├── postcss.config.js                    # PostCSS configuration
├── package.json                         # Project dependencies
├── .gitignore                           # Git ignore rules
└── README.md                            # This file
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
```bash
cd c:\Users\Hp\OneDrive\Desktop\Zorvyn
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will automatically open at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production (output in `dist/` folder)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (if configured)

##  Features in Detail

### Dashboard Overview
The main dashboard displays three key summary cards:
- **Total Balance**: Net amount calculated from all transactions
- **Total Income**: Sum of all income transactions
- **Total Expenses**: Sum of all expense transactions

### Data Visualization

#### Balance Trend Chart
- Line chart showing income and expenses over time
- Hover over data points to see exact values
- Helps identify spending patterns and seasonal trends

#### Spending Breakdown
- Pie chart displaying percentage distribution of expenses by category
- Color-coded for easy identification
- Shows both category name and percentage

### Transactions Management

#### Search and Filter
- **Search**: Find transactions by category name or amount
- **Type Filter**: View income, expenses, or all transactions
- **Category Filter**: Filter by specific spending category
- **Sort Options**: 
  - Date (newest first, oldest first)
  - Amount (low to high, high to low)

#### Admin Actions
When logged in as Admin:
- **Add Transaction**: Click "Add Transaction" button to open modal
- **Delete Transaction**: Click trash icon to remove transactions
- Changes persist thanks to localStorage

#### Viewer Mode
- Read-only access to all data
- Can filter and search but cannot modify
- Perfect for auditing or analysis

### Insights
Real-time insights include:
- **Top Spending Category**: Which category has the highest spending
- **Monthly Comparison**: Spending trend vs. previous month with percentage change
- **Transaction Stats**: Total count broken down by type
- **Average Transaction**: Mean transaction amount

### Export Functionality
Export data in two formats:
- **CSV**: Compatible with Excel, Google Sheets, and other spreadsheet applications
- **JSON**: For programmatic use and data backup

### Dark Mode
- Toggle dark mode from the sun/moon icon in header
- Preference is saved to localStorage
- Smooth color transitions between themes
- All components fully styled for both modes

##  Data Persistence

The application uses localStorage to persist:
- All transactions
- Filter settings
- Selected role
- Dark mode preference

Data is automatically saved on every change and restored on app restart.

##  UI/UX Design

### Design Principles
- **Clean Layout**: Organized sections with clear hierarchy
- **Responsive Grid**: Adapts to all screen sizes (mobile-first approach)
- **Color Coding**: 
  - Blue for balance and primary actions
  - Green for income
  - Red for expenses
  - Purple for secondary features
- **Accessibility**: 
  - High contrast ratios
  - Clear labels and descriptions
  - Keyboard navigable

### Responsive Breakpoints
- **Mobile**: Single column layout
- **Tablet**: 2-column layout
- **Desktop**: Full 3+ column layout

##  Mock Data

The application includes pre-populated mock data covering:
- Various transaction categories (Salary, Groceries, Rent, Entertainment, etc.)
- Mixed income and expense transactions
- Transactions spanning February-March
- Realistic amounts and dates

You can modify mock data in `src/store/financeStore.js`

##  State Management with Zustand

The store manages:
- **Transactions**: Full list of all transactions
- **Filters**: Search term, type, category, and sort order
- **UI State**: Current role, dark mode preference
- **Actions**:
  - `addTransaction()`: Add new transaction
  - `updateTransaction()`: Modify existing transaction
  - `deleteTransaction()`: Remove transaction
  - `setFilter()`: Update filter values
  - `setRole()`: Switch between viewer/admin
  - `setDarkMode()`: Toggle dark mode
  - `getFilteredTransactions()`: Get filtered and sorted transactions

##  Approach & Design Decisions

### State Management
Chose **Zustand** over Context API or Redux because:
- Minimal boilerplate
- Excellent performance for this use case
- Built-in middleware for persistence
- Small bundle size impact

### Component Structure
- **Smart-Dumb Pattern**: Components handle their own concerns
- **Reusable Cards**: SummaryCard component used for different data types
- **Chart Abstraction**: Charts.jsx exports ready-to-use chart components
- **Separation of Concerns**: Utilities, store, and components are separate

### Styling Approach
- **Tailwind CSS**: Utility-first approach for rapid development
- **Dark Mode**: Built into Tailwind with `dark:` prefix
- **Custom Colors**: Extended colors in tailwind.config.js
- **Responsive Grid**: Used Tailwind's grid system for layouts

### Data Flow
```
Store (Zustand)
    ↓
Components consume state
    ↓
User interactions update store
    ↓
Components re-render with new data
    ↓
localStorage persists data
```

##  Future Enhancements

Potential improvements for production:
- Backend integration for real data
- User authentication
- Budget goals and alerts
- Recurring transactions
- Multi-currency support
- Advanced analytics
- Custom date ranges
- Transaction tags/notes
- Receipt uploads
- Multi-account support

##  Performance Optimizations

Current optimizations:
- Lazy filtering to avoid unnecessary recalculations
- Memoized computed values in store
- Efficient chart rendering with Recharts
- CSS classes for animations instead of JS
- Minimal re-renders with React hooks

##  Known Limitations

- Mock data is static (reset on page refresh even with localStorage)
- No backend integration
- No authentication system
- Charts are basic (no custom date ranges)
- No export to PDF (only CSV/JSON)
- No transaction categories customization



**Last Updated**: April 2026
**Version**: 1.0.0
