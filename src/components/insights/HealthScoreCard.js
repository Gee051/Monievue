'use client'
export default function HealthScoreCard({ score, label, bullets }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Financial Health Analysis</h2>
        <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">{score}</span>
        </div>
      </div>
      <p className="text-slate-700 leading-relaxed mb-4">
        Your financial health score is <span className="font-bold text-slate-900">{score}</span> —
        rated as <span className="font-bold text-green-600">{label}</span>.
      </p>
      <ul className="text-slate-600 space-y-2">
        {bullets.map((b,i)=>(
          <li key={i} className="flex items-start space-x-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
