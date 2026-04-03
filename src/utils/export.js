export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Amount', 'Category', 'Type'];
  const csvContent = [
    headers.join(','),
    ...transactions.map(t =>
      [t.date, t.amount, t.category, t.type].join(',')
    ),
  ].join('\n');

  downloadFile(csvContent, 'transactions.csv', 'text/csv');
};

export const exportToJSON = (transactions) => {
  const jsonContent = JSON.stringify(transactions, null, 2);
  downloadFile(jsonContent, 'transactions.json', 'application/json');
};

const downloadFile = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
