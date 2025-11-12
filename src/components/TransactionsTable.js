import { formatDate, formatCurrency } from '../lib/format'

export default function TransactionsTable({ transactions }) {
    const hasTransactions = transactions && transactions.length > 0

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                <span className="text-sm text-gray-500">
                    {hasTransactions ? `${transactions.length} transactions` : 'No transactions'}
                </span>
            </div>

            {hasTransactions ? (
                <div className="space-y-4">
                    {transactions.map(transaction => (
                        <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                                    }`}>
                                    <span className={`text-sm font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {transaction.amount > 0 ? '↑' : '↓'}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{transaction.description}</div>
                                    <div className="text-sm text-gray-500 flex items-center space-x-2">
                                        <span>{formatDate(transaction.date)}</span>
                                        <span>•</span>
                                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{transaction.bank}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`text-right ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                <div className="font-semibold">
                                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {transaction.amount > 0 ? 'Income' : 'Expense'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4 opacity-50">💳</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions yet</h3>
                    <p className="text-gray-600 mb-6">Connect your bank accounts to see your financial activity</p>
                </div>
            )}

            {hasTransactions && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm py-2">
                        View All Transactions →
                    </button>
                </div>
            )}
        </div>
    )
}