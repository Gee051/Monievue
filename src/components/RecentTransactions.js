'use client'
import React from 'react'
import Link from 'next/link'

function normalizeDate(d) {
  return d ? new Date(d) : new Date(0)
}

export default function RecentTransactions({ transactions = [], href = '/transactions', loading = false }) {
  const top5 = [...(transactions || [])]
    .sort((a, b) => normalizeDate(b.date) - normalizeDate(a.date))
    .slice(0, 5)

  return (
    <div className="mb-10">
      <Link
        href={href}
        className="block transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg"
      >
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Recent Transactions</h2>
            <div className="w-3 h-3 bg-slate-400 rounded-full" />
          </div>

          {loading ? (
            <div className="py-10 text-center text-slate-500">Loading…</div>
          ) : top5.length ? (
            <ul className="divide-y divide-slate-200">
              {top5.map((tx) => (
                <li key={tx.id || `${tx.date}-${tx.description}-${tx.amount}`} className="py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {tx.description || 'Transaction'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {tx.date ? new Date(tx.date).toLocaleDateString() : '—'}
                      {tx.mcc ? ` • MCC ${tx.mcc}` : ''}
                    </p>
                  </div>
                  <div className={`text-sm font-semibold ${Number(tx.amount) < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {(tx.currency || '₦')}{Math.abs(Number(tx.amount)).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-slate-400">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">No transactions yet</h3>
              <p className="text-slate-500 text-sm">Connect your financial accounts to view transaction history.</p>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}
