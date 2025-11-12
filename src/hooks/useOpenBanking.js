// src/hooks/useOpenBanking.js
const CONN_KEY = 'OB_CONNECTIONS'        // { [bankId]: { connectionId, bankId, expiresAt, status } }
const TX_KEY   = 'OB_TRANSACTIONS'       // { [bankId]: Transaction[] }

function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)) }

function sampleTransactions(bankId) {
  // generate 6 demo txns, newest first
  const today = new Date()
  const pad = (n)=> String(n).padStart(2,'0')
  const d = (offset)=> {
    const t = new Date(today)
    t.setDate(today.getDate() - offset)
    return `${t.getFullYear()}-${pad(t.getMonth()+1)}-${pad(t.getDate())}`
  }
  const tag = bankId.toUpperCase()
  return [
    { id:`${bankId}-t6`, date:d(0), amount:-2450, description:`${tag} Data bundle`, currency:'₦', mcc:'4816' },
    { id:`${bankId}-t5`, date:d(0), amount:-1500, description:`${tag} POS purchase`, currency:'₦', mcc:'5411' },
    { id:`${bankId}-t4`, date:d(1), amount:150000, description:`${tag} Salary`, currency:'₦' },
    { id:`${bankId}-t3`, date:d(1), amount:-3200, description:`${tag} Transfer fee`, currency:'₦' },
    { id:`${bankId}-t2`, date:d(2), amount:-5000, description:`${tag} Fuel`, currency:'₦', mcc:'5541' },
    { id:`${bankId}-t1`, date:d(3), amount:-1200, description:`${tag} Airtime`, currency:'₦', mcc:'4814' },
  ]
}

export function useOpenBanking() {
  async function exchangePublicToken({ publicToken, bankId, consentWindow }) {
    console.log('Mock exchange success:', { publicToken, bankId, consentWindow })
    await new Promise(r => setTimeout(r, 400))

    const connections = loadJSON(CONN_KEY, {})
    const expiresAt = Date.now() + ( // 24h default if none supplied
      { '6h':216e5,'12h':432e5,'24h':864e5,'1w':6048e5,'1m':30.44*864e5 }[consentWindow] ?? 864e5
    )
    connections[bankId] = { connectionId: bankId, bankId, expiresAt, status:'active' }
    saveJSON(CONN_KEY, connections)

    // Seed some transactions for this bank if not present
    const txStore = loadJSON(TX_KEY, {})
    if (!txStore[bankId] || !txStore[bankId].length) {
      txStore[bankId] = sampleTransactions(bankId)
      saveJSON(TX_KEY, txStore)
    }

    return { connectionId: bankId, status: 'active' }
  }

  async function revokeConnection({ connectionId }) {
    console.log('Mock revoke:', connectionId)
    await new Promise(r => setTimeout(r, 200))
    const connections = loadJSON(CONN_KEY, {})
    delete connections[connectionId]
    saveJSON(CONN_KEY, connections)
    return { ok: true }
  }

  async function deleteData({ connectionId }) {
    console.log('Mock delete:', connectionId)
    await new Promise(r => setTimeout(r, 200))
    const connections = loadJSON(CONN_KEY, {})
    const txStore = loadJSON(TX_KEY, {})
    delete connections[connectionId]
    delete txStore[connectionId]
    saveJSON(CONN_KEY, connections)
    saveJSON(TX_KEY, txStore)
    return { ok: true }
  }

  return { exchangePublicToken, revokeConnection, deleteData }
}

// also export helpers for API mocks
export const __OB_STORAGE__ = { CONN_KEY, TX_KEY, loadJSON, saveJSON }
