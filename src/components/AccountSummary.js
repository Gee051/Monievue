export default function AccountsSummary({ accounts }) {
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)
    const connectedCount = accounts.filter(acc => acc.connected).length

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Accounts Summary</h2>

            {/* Total Balance */}
            <div className="text-center mb-6 p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600">Total Balance</div>
                <div className="text-2xl font-bold text-green-600">₦{totalBalance.toLocaleString()}</div>
            </div>

            {/* Connected Accounts */}
            <div className="space-y-3">
                {accounts.map(account => (
                    <div key={account.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-3 ${account.connected ? 'bg-green-500' : 'bg-gray-300'
                                }`}></div>
                            <span>{account.name}</span>
                        </div>
                        <div className="text-right">
                            <div className="font-semibold">₦{account.balance.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">{account.connected ? 'Connected' : 'Not connected'}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Connection Status */}
            <div className="mt-4 text-center text-sm text-gray-500">
                {connectedCount} of {accounts.length} accounts connected
            </div>
        </div>
    )
}