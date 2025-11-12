// src/components/ProviderWidgetMono.jsx
import React from 'react'

export default function ProviderWidgetMono({ bank, onClose, onSuccess }) {
  function simulate() {
    // Simulate Mono widget returning a public token (short-lived)
    const fakePublicToken = `mono_public_${bank.id}_${Date.now()}`
    onSuccess(fakePublicToken)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Connect to {bank.name}</h3>
        <p className="text-slate-600 mb-4">
          This opens Mono’s secure widget. We never see your credentials.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100">Cancel</button>
          <button onClick={simulate} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
