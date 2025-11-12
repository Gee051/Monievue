'use client'
import { useEffect, useMemo, useState } from 'react'
import { fetchTransactions, fetchAccounts, BANKS } from '@/lib/api'

import {
  filterByBanks, buildMonthlySeries, buildCategoryBreakdown,
  computeKPIs, makeTips
} from '@/utils/insights'
import StatCard from '@/components/insights/StatCard'
import DonutChart from '@/components/insights/DonutChart'
import TrendChart from '@/components/insights/TrendChart'
import HealthScoreCard from '@/components/insights/HealthScoreCard'
import TipsList from '@/components/insights/TipsList'

export default function InsightsPage() {
  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBanks, setSelectedBanks] = useState(['all']) // ['all'] | ['Wema Bank'] | ['Wema Bank','OPay']

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [acc, tx] = await Promise.all([fetchAccounts(), fetchTransactions()])
        setAccounts(acc)
        setTransactions(tx)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Build bank pill list from catalog; always include All
  const bankPills = useMemo(() => ['all', ...BANKS.map(b => b.name)], [])

  // Filter tx by selected banks
  const scopedTx = useMemo(
    () => filterByBanks(transactions, selectedBanks),
    [transactions, selectedBanks]
  )

  // Derive charts and KPIs from scoped transactions
  const monthly = useMemo(() => buildMonthlySeries(scopedTx), [scopedTx])
  const catData = useMemo(() => buildCategoryBreakdown(scopedTx), [scopedTx])
  const kpi = useMemo(() => computeKPIs(monthly), [monthly])
  const topCatName = catData[0]?.name
  const tips = useMemo(() => makeTips({ thisIncome: kpi.thisIncome, thisExpense: kpi.thisExpense }, topCatName), [kpi, topCatName])

  const totals = useMemo(() => {
    let income = 0, expense = 0
    for (const tx of scopedTx) {
      if (Number(tx.amount) >= 0) income += Number(tx.amount)
      else expense += Math.abs(Number(tx.amount))
    }
    return { income, expense }
  }, [scopedTx])

  const onSelect = (name) => {
    if (name === 'all') { setSelectedBanks(['all']); return }
    // toggle multi-select; if 'all' was active, replace it
    setSelectedBanks(prev => {
      if (prev.includes('all')) return [name]
      return prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
    })
  }

  const activeLabel = selectedBanks.includes('all') ? 'All Banks' : selectedBanks.join(' + ')

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading insights…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-3 tracking-tight">Financial Insights</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            AI-powered analysis based on <span className="font-semibold">{activeLabel}</span>
          </p>
        </div>

        {/* Bank Pills (multi-select; All = latest selection reset) */}
                {/* Summary Cards (from scoped transactions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Income"  value={`₦${totals.income.toLocaleString()}`} change={kpi.momIncome} positive={kpi.momIncome >= 0} />
          <StatCard label="Total Expense" value={`₦${totals.expense.toLocaleString()}`} change={kpi.momExpense} positive={kpi.momExpense <= 0} />
          <StatCard label="Savings Ratio" value={`${Math.max(0, kpi.savingsRatio)}%`} />
          <StatCard label="Health Score"   value={kpi.score} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

          
          <div className="flex flex-wrap gap-2">
            {bankPills.map(name => {
              const active = selectedBanks.includes('all') ? name === 'all' : selectedBanks.includes(name)
              return (
                <button
                  key={name}
                  onClick={() => onSelect(name)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    active ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {name === 'all' ? 'All Banks' : name}
                </button>
              )
            })}
          </div>
          {!scopedTx.length && (
            <p className="mt-3 text-sm text-slate-500">
              No transactions for the selected bank(s). Connect a bank or change your selection.
            </p>
          )}
        </div>



        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DonutChart data={catData} />
          <TrendChart data={monthly} />
        </div>

        {/* Health & Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HealthScoreCard
            score={kpi.score}
            label={kpi.label}
            bullets={[
              'Spend discipline, income stability & savings habits affect your score.',
              'Maintain positive cashflow 3+ months to boost credit access.',
              'Trim your top spend category to lift your score next month.'
            ]}
          />
          <TipsList tips={tips} />
        </div>
      </main>
    </div>
  )
}
