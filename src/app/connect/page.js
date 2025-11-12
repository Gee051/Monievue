'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ConnectButton from '../../components/ConnectButton'

export default function ConnectPage() {
    const router = useRouter()
    const [connectedBanks, setConnectedBanks] = useState([])
    const [consentGiven, setConsentGiven] = useState(false)

    const banks = [
        { id: 'wema', name: 'Wema Bank' },
        { id: 'gtb', name: 'GTBank' },
        { id: 'opay', name: 'OPay' },
        { id: 'kuda', name: 'Kuda' }
    ]

    const handleConnect = (bankId) => {
        setConnectedBanks(prev => [...prev, bankId])
    }

    const handleFinish = () => {
        if (connectedBanks.length > 0 && consentGiven) {
            router.push('/')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Connect Your Accounts</h1>
                <p className="text-gray-600 mb-6">Link your banks to see your complete financial picture</p>

                {/* Consent Section */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start mb-4">
                        <input
                            type="checkbox"
                            id="consent"
                            checked={consentGiven}
                            onChange={(e) => setConsentGiven(e.target.checked)}
                            className="mt-1 mr-3"
                        />
                        <label htmlFor="consent" className="text-sm text-gray-700">
                            I consent to Monivue accessing my financial data in read-only mode for providing insights.
                            I understand that my credentials are not stored and I can revoke access at any time.
                        </label>
                    </div>
                </div>

                {/* Bank Connections */}
                <div className="space-y-3">
                    {banks.map(bank => (
                        <ConnectButton
                            key={bank.id}
                            bank={bank}
                            onConnect={handleConnect}
                            connected={connectedBanks.includes(bank.id)}
                            disabled={!consentGiven}
                        />
                    ))}
                </div>

                {/* Finish Button */}
                <button
                    onClick={handleFinish}
                    disabled={connectedBanks.length === 0 || !consentGiven}
                    className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                >
                    Finish Setup
                </button>
            </div>
        </div>
    )
}