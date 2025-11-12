'use client'
import { useState } from 'react'

export default function ConnectButton({ bank, onConnect, connected, disabled }) {
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        if (connected || disabled) return

        setLoading(true)
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        onConnect(bank.id)
        setLoading(false)
    }

    return (
        <button
            onClick={handleClick}
            disabled={connected || disabled}
            className={`w-full p-4 border rounded-lg text-left transition-all ${connected
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : disabled
                        ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50'
                }`}
        >
            <div className="flex justify-between items-center">
                <span className="font-medium">{bank.name}</span>
                <div>
                    {connected ? (
                        <span className="text-green-600 font-semibold">✓ Connected</span>
                    ) : loading ? (
                        <span className="text-blue-600">Connecting...</span>
                    ) : (
                        <span className="text-blue-600 font-semibold">Connect</span>
                    )}
                </div>
            </div>
        </button>
    )
}