'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useOpenBanking, __OB_STORAGE__ } from '@/hooks/useOpenBanking'

const BANKS = [
  { id:'wema', name:'Wema Bank',  logo:'/images/wemaa.png' },
  { id:'gtb',  name:'GTBank',     logo:'/images/gtb.png' },
  { id:'opay', name:'OPay',       logo:'/images/opay.png' },
  { id:'ecobank', name:'Ecobank', logo:'/images/eco.png' },
]

const WINDOW_MS = { '6h':216e5,'12h':432e5,'24h':864e5,'1w':6048e5,'1m':30.44*864e5 }
const { CONN_KEY, loadJSON } = __OB_STORAGE__

function fmtRemaining(expiresAt) {
  const left = Math.max(0, expiresAt - Date.now())
  if (left <= 0) return 'expired'
  const mins = Math.round(left/60000)
  if (mins < 60) return `${mins}m left`
  const hrs = Math.round(mins/60)
  if (hrs < 48) return `${hrs}h left`
  const days = Math.round(hrs/24)
  return `${days}d left`
}

export default function BankLinkingSection({
  accounts = [],
  title = 'Secure Account Connection',
  description = 'Link your bank accounts to unlock insights.',
  onConnected,
}) {
  const { exchangePublicToken, revokeConnection, deleteData } = useOpenBanking()

  const [connections, setConnections] = useState({})

  useEffect(() => {
    const stored = loadJSON(CONN_KEY, {})
    setConnections(stored)
  }, [])

  const [, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(()=> setTick(x=>x+1), 30000)
    return ()=> clearInterval(t)
  }, [])

  const availableBanks = useMemo(
    () => BANKS.filter(b => !connections[b.id]),
    [connections]
  )

  const [pendingBank, setPendingBank] = useState(null)
  const [showConsent, setShowConsent] = useState(false)
  const [showWidget, setShowWidget] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)
  const [ackChecked, setAckChecked] = useState(false)
  const [consentWindow, setConsentWindow] = useState('24h')
  const [successMsg, setSuccessMsg] = useState('')

  function handleStartConnect(bank) {
    setPendingBank(bank)
    setConsentGiven(false)
    setAckChecked(false)
    setConsentWindow('24h')
    setShowConsent(true)
  }

  async function handleConsentContinue() {
    if (!consentGiven || !ackChecked || !consentWindow) return
    setShowConsent(false)
    setShowWidget(true)
  }

  async function handleWidgetSuccess(publicToken) {
    setShowWidget(false)
    const res = await exchangePublicToken({
      publicToken,
      bankId: pendingBank.id,
      consentWindow,
      scopes: ['accounts.read','transactions.read']
    })
    const expiresAt = Date.now() + (WINDOW_MS[consentWindow] ?? WINDOW_MS['24h'])
    const next = {
      ...connections,
      [pendingBank.id]: { connectionId: res.connectionId, bankId: pendingBank.id, status:'active', expiresAt }
    }
    setConnections(next)
    localStorage.setItem(CONN_KEY, JSON.stringify(next))

    setSuccessMsg(`${pendingBank.name} connected`)
    if (typeof onConnected === 'function') await onConnected(pendingBank.id)
    setPendingBank(null)
    setTimeout(()=> setSuccessMsg(''), 2200)
  }

  async function handleDisconnect(bankId) {
    const rec = connections[bankId]
    if (!rec) return
    await revokeConnection({ connectionId: rec.connectionId })
    const next = { ...connections }; delete next[bankId]
    setConnections(next)
    localStorage.setItem(CONN_KEY, JSON.stringify(next))
    if (typeof onConnected === 'function') await onConnected()
  }

  async function handleDelete(bankId) {
    const rec = connections[bankId]
    if (!rec) return
    await deleteData({ connectionId: rec.connectionId })
    const next = { ...connections }; delete next[bankId]
    setConnections(next)
    localStorage.setItem(CONN_KEY, JSON.stringify(next))
    if (typeof onConnected === 'function') await onConnected()
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>

      {successMsg && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-800 px-4 py-2 text-sm">
          ✅ {successMsg}
        </div>
      )}

      {/* Connectable banks */}
      <ul className="space-y-3">
        {availableBanks.map(bank => (
          <li
            key={bank.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <Image
                src={bank.logo}
                alt=""
                width={80}
                height={80}
                className="rounded-md bg-white object-contain"
              />
              <span className="font-medium text-slate-800 text-sm sm:text-base">
                {bank.name}
              </span>
            </div>
            <div className="flex justify-start sm:justify-end">
              <button
                onClick={() => handleStartConnect(bank)}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-[#1e1e2f] transition text-sm w-full sm:w-auto"
              >
                Connect
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Connected */}
      {Object.keys(connections).length > 0 && (
        <>
          <h3 className="mt-6 mb-2 text-sm font-semibold text-slate-700">
            Connected
          </h3>
          <div className="space-y-3">
            {Object.entries(connections).map(([bankId, meta]) => {
              const bank = BANKS.find(b => b.id === bankId)
              const remaining = fmtRemaining(meta.expiresAt)
              const expired = remaining === 'expired'

              return (
                <div
                  key={bankId}
                  className="rounded-lg border border-slate-200 p-3 space-y-3"
                >
                  {/* Top: logo + name + status */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={bank?.logo || '/banks/default.png'}
                      alt=""
                      width={60}
                      height={60}
                      className="rounded bg-white object-contain"
                    />
                    <div>
                      <p className="font-medium text-slate-800 text-sm sm:text-base">
                        {bank?.name || bankId}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        <span
                          className={
                            expired
                              ? 'text-red-600 font-medium'
                              : 'text-green-700 font-medium'
                          }
                        >
                          {expired ? 'Expired' : 'Active'}
                        </span>
                        <span className="mx-1">•</span>
                        <span>{remaining}</span>
                      </p>
                    </div>
                  </div>

                  {/* Bottom: buttons (stack on mobile, row on bigger screens) */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <button
                      onClick={() => {
                        setPendingBank(bank)
                        setConsentWindow('24h')
                        setConsentGiven(false)
                        setAckChecked(false)
                        setShowConsent(true)
                      }}
                      className="w-full sm:w-auto px-3 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm"
                    >
                      {expired ? 'Re-consent' : 'Change Access'}
                    </button>
                    <button
                      onClick={() => handleDisconnect(bankId)}
                      className="w-full sm:w-auto px-3 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm"
                    >
                      Disconnect
                    </button>
                    <button
                      onClick={() => handleDelete(bankId)}
                      className="w-full sm:w-auto px-3 py-2 rounded-md border border-red-300 text-red-700 hover:bg-red-50 text-xs sm:text-sm"
                    >
                      Delete data
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Consent modal */}
      {showConsent && pendingBank && (
        <ConsentModal
          bank={pendingBank}
          consentGiven={consentGiven} setConsentGiven={setConsentGiven}
          ackChecked={ackChecked} setAckChecked={setAckChecked}
          consentWindow={consentWindow} setConsentWindow={setConsentWindow}
          onCancel={() => { setShowConsent(false); setPendingBank(null) }}
          onContinue={handleConsentContinue}
        />
      )}

      {/* Mono widget mock */}
      {showWidget && pendingBank && (
        <MonoWidgetMock
          bank={pendingBank}
          onClose={() => { setShowWidget(false); setPendingBank(null) }}
          onSuccess={(publicToken)=> handleWidgetSuccess(publicToken)}
        />
      )}
    </div>
  )
}

/* ---- Consent Modal ---- */
function ConsentModal({
  bank,
  consentGiven, setConsentGiven,
  ackChecked, setAckChecked,
  consentWindow, setConsentWindow,
  onCancel, onContinue
}) {
  const DURATIONS = [
    { key:'6h', label:'6 hours' },
    { key:'12h', label:'12 hours' },
    { key:'24h', label:'24 hours (recommended)' },
    { key:'1w', label:'1 week' },
    { key:'1m', label:'1 month' },
  ]
  const canContinue = consentGiven && ackChecked && consentWindow

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Image src={bank.logo} alt="" width={32} height={32} className="object-contain" />
          <h3 className="text-xl font-semibold text-slate-900">Grant Consent</h3>
        </div>

        <p className="text-slate-600 mb-4">
          Authorize <b>temporary, read-only</b> access to your <b>balances</b> and <b>transactions</b>.
        </p>

        <label className="flex items-start gap-2 mb-4">
          <input
            type="checkbox"
            className="mt-1"
            checked={consentGiven}
            onChange={(e)=>setConsentGiven(e.target.checked)}
          />
          <span className="text-sm text-slate-700">I consent for the selected period.</span>
        </label>

        <div className="mb-4">
          <p className="text-sm font-medium text-slate-700 mb-2">Choose consent duration</p>
          <select
            value={consentWindow}
            onChange={(e)=>setConsentWindow(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select duration…</option>
            {DURATIONS.map(d => <option key={d.key} value={d.key}>{d.label}</option>)}
          </select>
        </div>

        <label className="flex items-start gap-2 mb-4">
          <input
            type="checkbox"
            className="mt-1"
            checked={ackChecked}
            onChange={(e)=>setAckChecked(e.target.checked)}
          />
          <span className="text-sm text-slate-700">
            I can revoke access anytime from Settings.
          </span>
        </label>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            disabled={!canContinue}
            className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1e1e2f]"
          >
            Continue to {bank.name}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---- Mono Widget Mock ---- */
function MonoWidgetMock({ bank, onClose, onSuccess }) {
  function simulate() {
    const fakePublicToken = `mono_public_${bank.id}_${Date.now()}`
    onSuccess(fakePublicToken)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Connect to {bank.name}
        </h3>
        <p className="text-slate-600 mb-2">
          In production, this step opens Mono, a secure open-banking widget so you can link your bank
          without sharing credentials with us.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={simulate}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-[#1e1e2f]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
