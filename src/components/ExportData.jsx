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
    <div className="bg-gradient-to-r from-slate-50 to-primary-50 dark:from-slate-900/50 dark:to-primary-900/20 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
          <Download size={20} className="text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Export Data</h3>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Download your transactions for backup or external analysis
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all"
        >
          <FileText size={18} />
          Export CSV
        </button>
        <button
          onClick={handleExportJSON}
          className="flex items-center gap-2 px-4 py-2.5 bg-warning-600 hover:bg-warning-700 text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all"
        >
          <FileJson size={18} />
          Export JSON
        </button>
      </div>
    </div>
  );
}
