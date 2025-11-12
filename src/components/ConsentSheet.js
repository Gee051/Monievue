// src/components/ConsentSheet.jsx
import React from 'react'

const DURATIONS = [
  { key: '6h',  label: '6 hours' },
  { key: '12h', label: '12 hours' },
  { key: '24h', label: '24 hours (recommended)' },
  { key: '1w',  label: '1 week' },
  { key: '1m',  label: '1 month' },
]

export default function ConsentSheet({
  bank,
  consentGiven, setConsentGiven,
  ackChecked, setAckChecked,
  consentWindow, setConsentWindow,
  onCancel, onContinue
}) {
  const canContinue = consentGiven && ackChecked && consentWindow

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          {bank?.logo && <img src={bank.logo} alt="" className="w-8 h-8 object-contain" />}
          <h3 className="text-xl font-semibold text-slate-900">Grant Consent</h3>
        </div>

        <p className="text-slate-600 mb-4">
          Authorize <b>temporary, read-only</b> access to your <b>balances</b> and <b>transactions</b> so we can generate insights.
        </p>

        {/* Step 1: Consent checkbox */}
        <label className="flex items-start gap-2 mb-4">
          <input type="checkbox" className="mt-1" checked={consentGiven} onChange={(e)=>setConsentGiven(e.target.checked)} />
          <span className="text-sm text-slate-700">I consent for the selected period.</span>
        </label>

        {/* Step 2: Duration selector */}
        <div className="mb-4">
          <p className="text-sm font-medium text-slate-700 mb-2">Choose consent duration</p>
          <select
            value={consentWindow}
            onChange={(e) => setConsentWindow(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select duration…</option>
            {DURATIONS.map(d => <option key={d.key} value={d.key}>{d.label}</option>)}
          </select>
        </div>

        {/* Acknowledgement */}
        <label className="flex items-start gap-2 mb-4">
          <input type="checkbox" className="mt-1" checked={ackChecked} onChange={(e)=>setAckChecked(e.target.checked)} />
          <span className="text-sm text-slate-700">I can revoke access anytime from Settings.</span>
        </label>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100">Cancel</button>
          <button
            onClick={onContinue}
            disabled={!canContinue}
            className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            Continue to {bank?.name}
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-3">
          Tip: use the <b>shortest necessary</b> period. Try <b>24 hours</b> first.
        </p>
      </div>
    </div>
  )
}
