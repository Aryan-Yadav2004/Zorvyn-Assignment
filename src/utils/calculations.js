export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const calculateTotalBalance = (transactions) => {
  return transactions.reduce((total, t) => {
    return t.type === 'income' ? total + t.amount : total - t.amount;
  }, 0);
};

export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);
};

export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);
};

export const calculateSpendingByCategory = (transactions) => {
  const spending = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      spending[t.category] = (spending[t.category] || 0) + t.amount;
    });
  return Object.entries(spending).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));
};

export const getMonthlyBalance = (transactions) => {
  const monthlyData = {};

  transactions.forEach(t => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { month: monthKey, income: 0, expense: 0 };
    }

    if (t.type === 'income') {
      monthlyData[monthKey].income += t.amount;
    } else {
      monthlyData[monthKey].expense += t.amount;
    }
  });

  return Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(item => ({
      ...item,
      balance: item.income - item.expense,
      month: new Date(`${item.month}-01`).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
    }));
};

export const getHighestSpendingCategory = (transactions) => {
  const spending = calculateSpendingByCategory(transactions);
  return spending.length > 0
    ? spending.reduce((max, curr) => (curr.value > max.value ? curr : max))
    : null;
};

export const getMonthlyComparison = (transactions) => {
  const monthlyData = getMonthlyBalance(transactions);
  if (monthlyData.length < 2) return null;
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  return {
    currentExpense: currentMonth.expense,
    previousExpense: previousMonth.expense,
    difference: currentMonth.expense - previousMonth.expense,
    percentChange:
      previousMonth.expense > 0
        ? ((currentMonth.expense - previousMonth.expense) / previousMonth.expense) * 100
        : 0,
  };
};
