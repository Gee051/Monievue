'use client'
export default function StatCard({ label, value, change, positive }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <p className="text-sm text-slate-600 font-medium">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {typeof change === 'number' && (
          <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {positive ? '▲' : '▼'} {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  )
}
