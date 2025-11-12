'use client'
import { useState, useEffect } from 'react'
import { fetchPersonality } from '../lib/api'

export default function InsightsCard({ transactions }) {
    const [personality, setPersonality] = useState('Balancer ⚖️')
    const [healthScore, setHealthScore] = useState(0)

    useEffect(() => {
        const calculateInsights = async () => {
            if (transactions.length > 0) {
                const personalityData = await fetchPersonality(transactions)
                setPersonality(personalityData)

                // Calculate simple health score
                const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
                const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)
                const savingsRate = income > 0 ? (income - expenses) / income : 0
                setHealthScore(Math.min(Math.floor(savingsRate * 100), 100))
            }
        }

        calculateInsights()
    }, [transactions])

    const insights = {
        'Planner 🎯': "You're building a secure future with consistent savings habits.",
        'Spender 💫': "Your spontaneous side brings joy - let's find the perfect balance.",
        'Minimalist 🌱': "Your focused spending shows amazing financial intentionality.",
        'Balancer ⚖️': "Great balance between enjoying life and planning ahead."
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Financial Insights</h2>

            {/* Personality */}
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Your Money Personality</h3>
                <div className="text-xl font-bold text-purple-600">{personality}</div>
                <p className="text-sm text-purple-700 mt-2">
                    {insights[personality]}
                </p>
            </div>

            {/* Health Score */}
            <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Financial Health Score</h3>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-green-600">{healthScore}/100</span>
                    <span className="text-sm font-semibold text-green-600">
                        {healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Good' : 'Needs Work'}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${healthScore}%` }}
                    ></div>
                </div>
                <p className="text-xs text-green-700 mt-2">
                    {healthScore >= 80
                        ? 'Ready for instant micro-loan'
                        : 'Building strong financial habits'
                    }
                </p>
            </div>
        </div>
    )
} 1