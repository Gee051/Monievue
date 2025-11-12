export default function TrustPanel({ trustLevel }) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-800">Trust & Security</h3>
                    <p className="text-sm text-gray-600">Your data protection level</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{trustLevel}%</div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${trustLevel}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}