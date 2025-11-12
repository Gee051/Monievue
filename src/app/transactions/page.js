'use client'
import { useState, useEffect, useMemo } from 'react'
import { fetchTransactions, fetchAccounts, BANKS } from '@/lib/api'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeBank, setActiveBank] = useState('all') // 'all' or bank name (e.g., 'Wema Bank')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [acc, tx] = await Promise.all([fetchAccounts(), fetchTransactions()])
        setAccounts(acc)
        setTransactions(tx)
      } catch (e) {
        console.error('Error loading transactions:', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Build pill list from catalog (so filters exist even when a bank has 0 txns)
  const bankPills = useMemo(
    () => ['all', ...BANKS.map(b => b.name)],
    []
  )

  // Search helper
  const matchesSearch = (tx) => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return true
    return (
      (tx.description || '').toLowerCase().includes(q) ||
      (tx.bank || '').toLowerCase().includes(q)
    )
  }

  // Filter logic:
  // - When 'all' → take latest 5 across all banks (after search)
  // - When specific bank → show all txns for that bank (after search)
  const filtered = useMemo(() => {
    const base = transactions.filter(matchesSearch)

    if (activeBank === 'all') {
      return [...base]
        .sort((a,b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
    }

    return base.filter(tx => (tx.bank || '').toLowerCase() === activeBank.toLowerCase())
  }, [transactions, searchTerm, activeBank])

  // Totals (based on the list currently shown)
  const totalIncome = filtered.filter(t => t.amount > 0).reduce((s,t)=> s + t.amount, 0)
  const totalExpenses = filtered.filter(t => t.amount < 0).reduce((s,t)=> s + Math.abs(t.amount), 0)

  // Loading state
  if (loading) {
    return (
      <Shell>
        <Spinner title="Loading transactions..." />
      </Shell>
    )
  }

  // Helper to know if selected bank is connected
  const isSelectedBankConnected = (name) => {
    if (name === 'all') return true
    const bank = BANKS.find(b => b.name.toLowerCase() === name.toLowerCase())
    if (!bank) return false
    return !!accounts.find(a => a.id === bank.id && a.connected)
  }

  return (
    <Shell>
      {/* Header */}
      <Header
        title="Transaction History"
        subtitle="Comprehensive view of your transactions across connected accounts"
      />

      {/* Stats (for current view) */}
      <Stats totalCount={filtered.length} income={totalIncome} expenses={totalExpenses} />

      {/* Filters + Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Bank pills */}
          <div className="flex flex-wrap gap-2">
            {bankPills.map(name => (
              <button
                key={name}
                onClick={() => setActiveBank(name)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeBank === name
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {name === 'all' ? 'All (Recent 5)' : name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative lg:w-64">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-xl text-sm bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <div className="absolute left-3 top-2.5">
              <span className="text-slate-400">🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <TableHeader />

        <div className="divide-y divide-slate-100">
          {filtered.length > 0 ? (
            filtered.map(tx => (
              <Row key={tx.id} tx={tx} />
            ))
          ) : (
            <EmptyState
              showConnectHint={
                activeBank !== 'all' &&
                !isSelectedBankConnected(activeBank)
              }
              bankName={activeBank}
              onClear={() => { setSearchTerm(''); setActiveBank('all'); }}
            />
          )}
        </div>

        {filtered.length > 0 && (
          <TableFooter showing={filtered.length} total={activeBank === 'all' ? transactions.length : filtered.length} />
        )}
      </div>
    </Shell>
  )
}

/* ===== UI bits (small components) ===== */

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}

function Spinner({ title }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-600 font-medium">{title}</p>
    </div>
  )
}

function Header({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
    </div>
  )
}

function Stats({ totalCount, income, expenses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard label="Transactions Shown" value={totalCount} icon="📊" color="blue" />
      <StatCard label="Income (current view)" value={`₦${income.toLocaleString()}`} icon="↑" color="green" />
      <StatCard label="Expenses (current view)" value={`₦${expenses.toLocaleString()}`} icon="↓" color="red" />
    </div>
  )
}

function StatCard({ label, value, icon, color }) {
  const bg = color === 'blue' ? 'bg-blue-100 text-blue-600'
            : color === 'green' ? 'bg-green-100 text-green-600'
            : 'bg-red-100 text-red-600'
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
          <span className="text-lg">{icon}</span>
        </div>
      </div>
    </div>
  )
}

function TableHeader() {
  return (
    <div className="bg-linear-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200">
      <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-slate-700">
        <div className="col-span-5">Transaction</div>
        <div className="col-span-3">Bank</div>
        <div className="col-span-2 text-center">Date</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>
    </div>
  )
}

function Row({ tx }) {
  const isIncome = Number(tx.amount) > 0
  return (
    <div className="px-6 py-4 hover:bg-slate-50 transition-colors">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-5 flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <span className="font-semibold">{isIncome ? '↑' : '↓'}</span>
          </div>
          <div>
            <div className="font-medium text-slate-900">{tx.description || 'Transaction'}</div>
            <div className="text-sm text-slate-500 mt-1">{isIncome ? 'Income' : 'Expense'}</div>
          </div>
        </div>
        <div className="col-span-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {tx.bank || '—'}
          </span>
        </div>
        <div className="col-span-2 text-center text-sm text-slate-600">
          {tx.date ? new Date(tx.date).toLocaleDateString() : '—'}
        </div>
        <div className="col-span-2 text-right">
          <div className={`text-lg font-semibold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
            {(isIncome ? '+' : '')}₦{Math.abs(Number(tx.amount)).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ showConnectHint, bankName, onClear }) {
  const title = bankName === 'all' ? 'No transactions yet' : `No transactions for ${bankName}`
  const subtitle = showConnectHint
    ? 'Connect this bank from your dashboard to start seeing transactions.'
    : 'Try adjusting your search terms or filters to see more results.'
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl text-slate-400">💳</span>
      </div>
      <h3 className="text-xl font-semibold text-slate-700 mb-2">{title}</h3>
      <p className="text-slate-500 mb-6 max-w-md mx-auto">{subtitle}</p>
      <button
        onClick={onClear}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  )
}

function TableFooter({ showing, total }) {
  return (
    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
      <div className="flex justify-between items-center text-sm text-slate-600">
        <div>Showing {showing} of {total} {total === 1 ? 'transaction' : 'transactions'}</div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-white transition-colors">Previous</button>
          <button className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-white transition-colors">Next</button>
        </div>
      </div>
    </div>
  )
}
