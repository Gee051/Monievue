// src/lib/api.js
import { __OB_STORAGE__ } from '@/hooks/useOpenBanking'
const { CONN_KEY, TX_KEY, loadJSON } = __OB_STORAGE__

// Banks (note Ecobank added)
export const BANKS = [
  { id:'wema',      name:'Wema Bank' },
  { id:'gtb',       name:'GTBank' },
  { id:'opay',      name:'OPay' },
  { id:'ecobank',   name:'Ecobank' },
]

// Accounts from storage
export async function fetchAccounts() {
  await new Promise(r=>setTimeout(r,120))
  const connections = loadJSON(CONN_KEY, {})
  return BANKS.map(b => ({
    id: b.id,
    name: b.name,
    connected: Boolean(connections[b.id]),
  }))
}

// Transactions across all connected banks, each with a bank name
export async function fetchTransactions() {
  await new Promise(r=>setTimeout(r,120))
  const connections = loadJSON(CONN_KEY, {})
  const txStore = loadJSON(TX_KEY, {})

  const all = Object.keys(connections).flatMap(bankId => {
    const bankName = BANKS.find(b => b.id === bankId)?.name || bankId
    return (txStore[bankId] || []).map(tx => ({ ...tx, bank: bankName }))
  })

  return all.sort((a,b)=> new Date(b.date) - new Date(a.date))
}
