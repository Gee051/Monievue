'use client'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function TrendChart({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Income vs Expense Trend</h2>
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v)=>`₦${(v/1000).toFixed(0)}k`} />
          <Tooltip formatter={(v)=>[`₦${Number(v).toLocaleString()}`, '']} labelFormatter={(l)=>`Month: ${l}`} />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#8A2BE2" strokeWidth={3}
                dot={{ fill:'#8A2BE2', strokeWidth:2, r:4 }} activeDot={{ r:6, fill:'#8A2BE2' }} />
          <Line type="monotone" dataKey="expense" stroke="#1e1e2f" strokeWidth={3}
                dot={{ fill:'#1e1e2f', strokeWidth:2, r:4 }} activeDot={{ r:6, fill:'#1e1e2f' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
