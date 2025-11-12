'use client'
export default function TipsList({ tips }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Recommended Actions</h2>
        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
      </div>
      <div className="space-y-4">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-blue-600 text-sm font-bold">{i + 1}</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
