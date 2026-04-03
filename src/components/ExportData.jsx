import { Download, FileJson, FileText } from 'lucide-react';
import { useFinanceStore } from '../store/financeStore';
import { exportToCSV, exportToJSON } from '../utils/export';

export default function ExportData() {
  const transactions = useFinanceStore(state => state.transactions);

  const handleExportCSV = () => {
    exportToCSV(transactions);
  };

  const handleExportJSON = () => {
    exportToJSON(transactions);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Download size={20} className="text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Export Data</h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Export your transactions for backup or analysis
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FileText size={18} />
          Export as CSV
        </button>
        <button
          onClick={handleExportJSON}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <FileJson size={18} />
          Export as JSON
        </button>
      </div>
    </div>
  );
}
