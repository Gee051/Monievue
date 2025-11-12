'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import RecentTransactions from '@/components/RecentTransactions'
import BankLinkingSection from '@/components/BankLinkingSection'
import { fetchAccounts, fetchTransactions } from '@/lib/api'

export default function Dashboard() {
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingTx, setLoadingTx] = useState(false)

  // Reusable loader for accounts + transactions
  const loadData = useCallback(async () => {
    try {
      const [accountsData, transactionsData] = await Promise.all([
        fetchAccounts(),
        fetchTransactions()
      ])
      setAccounts(accountsData)
      setTransactions(transactionsData)
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }, [])

  // Initial load
  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await loadData()
      setLoading(false)
    }
    init()
  }, [loadData])

  // Called after a bank connects (so UI updates without full reload)
  const refreshData = async () => {
    try {
      setLoadingTx(true)
      await loadData()
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingTx(false)
    }
  }

  const unconnectedAccounts = accounts.filter(acc => !acc.connected)

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your financial insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              Monivue
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Transform your financial data into actionable insights with secure Open Banking.
          </p>
        </div>

        {/* Row 1: Big Image + Financial Command Center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-5">
          {/* Left: Big, centered image */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative w-[58%] h-[400px]">
              <Image
                src="/images/dashboard.png"
                alt="Monivue unified dashboard with phone and bank logos"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Right: Financial Command Center */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl p-8 shadow-sm border border-slate-200 w-[80%]">
              <div className="text-center">
                <div className="w-24 h-24 bg-linear-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-white">💎</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Your Financial Command Center
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Monitor spending patterns, track balances across banks, and surface insights
                  that help you plan smarter. Connect more accounts to unlock deeper analytics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Full-width Recent Transactions (top 5 + link) */}
        <RecentTransactions
          transactions={transactions}
          href="/transactions"
          loading={loadingTx}
        />

        {/* Row 3: Secure Account Connection + Why Professionals Choose Monivue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Secure Account Connection */}
          <div className="lg:col-span-1">
            <BankLinkingSection
              accounts={unconnectedAccounts}
              title="Secure Account Connection"
              description="Begin your financial journey by securely linking your bank accounts through our enterprise-grade Open Banking platform"
              onConnected={refreshData} // 🔁 refresh accounts + transactions after connect
              showSecurity={true}       // set to true if you want consent UI visible
            />
          </div>

          {/* Right: Why Professionals Choose Monivue */}
          <div className="lg:col-span-1">
            <div className="bg-linear-to-br from-slate-900 to-blue-900 rounded-2xl p-8 text-white h-full">
              <h2 className="text-2xl font-bold mb-2">
                Why Financial Professionals Choose Monivue
              </h2>
              <p className="text-blue-200 mb-8">
                Enterprise-grade financial intelligence platform
              </p>

              <div className="space-y-6">
                <Feature
                  icon="🔐"
                  title="Bank-Level Security"
                  desc="256-bit encryption, SOC 2 compliant, and Open Banking certified"
                  color="bg-blue-500"
                />
                <Feature
                  icon="📈"
                  title="AI-Powered Analytics"
                  desc="Machine learning algorithms provide personalized financial insights"
                  color="bg-purple-500"
                />
                <Feature
                  icon="🌐"
                  title="Multi-Bank Aggregation"
                  desc="Connect all your financial institutions for a unified view"
                  color="bg-green-500"
                />
                <Feature
                  icon="⚡"
                  title="Real-Time Monitoring"
                  desc="Instant updates and alerts for your financial activities"
                  color="bg-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({ icon, title, desc, color }) {
  return (
    <div className="flex items-start space-x-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0 mt-1`}>
        <span className="text-lg">{icon}</span>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-blue-200 text-sm">{desc}</p>
      </div>
    </div>
  )
}
