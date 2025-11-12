'use client'
export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            type: 'success',
            title: 'Account Connected',
            message: 'Your GTBank account has been successfully connected',
            time: '2 minutes ago',
            read: false
        },
        {
            id: 2,
            type: 'info',
            title: 'Weekly Summary',
            message: 'Your weekly financial summary is ready to view',
            time: '1 hour ago',
            read: true
        },
        {
            id: 3,
            type: 'warning',
            title: 'Unusual Spending',
            message: 'Unusual spending pattern detected in your Food category',
            time: '3 hours ago',
            read: true
        },
        {
            id: 4,
            type: 'success',
            title: 'Security Update',
            message: 'Two-factor authentication has been enabled for your account',
            time: '1 day ago',
            read: true
        }
    ]

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'success': return '✅'
            case 'info': return 'ℹ️'
            case 'warning': return '⚠️'
            case 'error': return '❌'
            default: return '📢'
        }
    }

    const getNotificationColor = (type) => {
        switch (type) {
            case 'success': return 'text-green-600 bg-green-50 border-green-200'
            case 'info': return 'text-blue-600 bg-blue-50 border-blue-200'
            case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
            case 'error': return 'text-red-600 bg-red-50 border-red-200'
            default: return 'text-slate-600 bg-slate-50 border-slate-200'
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">

                    <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        Notifications
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Stay updated with your financial activities and alerts
                    </p>
                </div>

                {/* Notifications Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Header with Actions */}
                    <div className="bg-linear-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">
                                Recent Notifications
                            </h2>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                                    Mark All as Read
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
                                    Settings
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="divide-y divide-slate-100">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-6 transition-colors hover:bg-slate-50 ${!notification.read ? 'bg-blue-50/50' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${getNotificationColor(notification.type)}`}>
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-semibold text-slate-900">
                                                {notification.title}
                                            </h3>
                                            {!notification.read && (
                                                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                            )}
                                        </div>
                                        <p className="text-slate-600 mb-2">
                                            {notification.message}
                                        </p>
                                        <span className="text-sm text-slate-500">
                                            {notification.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State (if no notifications) */}
                    {notifications.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl text-slate-400">🔔</span>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">
                                No notifications yet
                            </h3>
                            <p className="text-slate-500">
                                You're all caught up! New notifications will appear here.
                            </p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                        <div className="flex justify-between items-center text-sm text-slate-600">
                            <div>
                                Showing {notifications.length} notifications
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-white transition-colors">
                                    Previous
                                </button>
                                <button className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-white transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Notification Preferences</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                            <div>
                                <h3 className="font-semibold text-slate-900">Email Notifications</h3>
                                <p className="text-slate-600 text-sm">Receive notifications via email</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                            <div>
                                <h3 className="font-semibold text-slate-900">Push Notifications</h3>
                                <p className="text-slate-600 text-sm">Receive push notifications</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}