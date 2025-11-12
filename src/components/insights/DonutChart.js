'use client'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#8A2BE2', '#1e1e2f', '#9F7AEA', '#6B21A8', '#7C3AED', '#4C1D95', '#3B0764']

export default function DonutChart({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Spending Breakdown</h2>
        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={70} outerRadius={100} paddingAngle={3}
               label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v) => [`₦${Number(v).toLocaleString()}`, 'Amount']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
