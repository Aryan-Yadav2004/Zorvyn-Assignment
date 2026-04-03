import { useFinanceStore } from '../store/financeStore';

export default function ChartPeriodSelector() {
  const chartPeriod = useFinanceStore(state => state.chartPeriod);
  const setChartPeriod = useFinanceStore(state => state.setChartPeriod);

  const periods = ['1M', '3M', '6M'];

  return (
    <div className="flex gap-2">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => setChartPeriod(period)}
          className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
            chartPeriod === period
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
}
