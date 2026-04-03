import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const chartColors = {
  income: '#22c55e',
  expense: '#ef4444',
  primary1: '#0ea5e9',
  primary2: '#0284c7',
  accent1: '#f59e0b',
  accent2: '#8b5cf6',
  accent3: '#ec4899',
  accent4: '#14b8a6',
  accent5: '#64748b',
};

export function BalanceTrendChart({ data }) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.income} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={chartColors.income} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.expense} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={chartColors.expense} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: 'rgba(71, 85, 105, 0.7)' }}
            angle={-45}
            textAnchor="end"
            height={80}
            stroke="rgba(0,0,0,0.05)"
          />
          <YAxis tick={{ fontSize: 12, fill: 'rgba(71, 85, 105, 0.7)' }} stroke="rgba(0,0,0,0.05)" />
          <Tooltip
            formatter={(value) => `$${value.toFixed(0)}`}
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(226, 232, 240, 0.1)',
              borderRadius: '8px',
              color: '#f1f5f9'
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="income"
            stroke={chartColors.income}
            strokeWidth={2.5}
            dot={{ fill: chartColors.income, r: 5 }}
            activeDot={{ r: 7 }}
            fillOpacity={1}
            fill="url(#incomeGradient)"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke={chartColors.expense}
            strokeWidth={2.5}
            dot={{ fill: chartColors.expense, r: 5 }}
            activeDot={{ r: 7 }}
            fillOpacity={1}
            fill="url(#expenseGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpendingBreakdownChart({ data }) {
  const COLORS = [
    chartColors.primary1,
    chartColors.expense,
    chartColors.income,
    chartColors.accent1,
    chartColors.accent2,
    chartColors.accent3,
    chartColors.accent4,
    chartColors.accent5,
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BalanceComparison({ data }) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'rgba(71, 85, 105, 0.7)' }} stroke="rgba(0,0,0,0.05)" />
          <YAxis tick={{ fontSize: 12, fill: 'rgba(71, 85, 105, 0.7)' }} stroke="rgba(0,0,0,0.05)" />
          <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="income" fill={chartColors.income} radius={[8, 8, 0, 0]} />
          <Bar dataKey="expense" fill={chartColors.expense} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
