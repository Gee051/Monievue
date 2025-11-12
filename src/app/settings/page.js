'use client'
export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">

                    <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        Settings
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Manage your account preferences and security settings
                    </p>
                </div>

                {/* Settings Content */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Account Settings */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h2>
                            <div className="space-y-4">
                                <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                                    <h3 className="font-semibold text-slate-900 mb-2">Profile Information</h3>
                                    <p className="text-slate-600 text-sm">Update your personal details and preferences</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                                    <h3 className="font-semibold text-slate-900 mb-2">Security</h3>
                                    <p className="text-slate-600 text-sm">Manage password and two-factor authentication</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                                    <h3 className="font-semibold text-slate-900 mb-2">Connected Accounts</h3>
                                    <p className="text-slate-600 text-sm">View and manage your linked bank accounts</p>
                                </div>
                            </div>
                        </div>

                        {/* App Preferences */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Preferences</h2>
                            <div className="space-y-4">
                                <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                                    <h3 className="font-semibold text-slate-900 mb-2">Notifications</h3>
                                    <p className="text-slate-600 text-sm">Customize your alert preferences</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                                    <h3 className="font-semibold text-slate-900 mb-2">Privacy</h3>
                                    <p className="text-slate-600 text-sm">Control your data sharing preferences</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                                    <h3 className="font-semibold text-slate-900 mb-2">Appearance</h3>
                                    <p className="text-slate-600 text-sm">Customize theme and display settings</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="mt-8 pt-8 border-t border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Support</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-slate-50 rounded-xl">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <span className="text-blue-600">📞</span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">Help Center</h3>
                                <p className="text-slate-600 text-sm">Get answers to common questions</p>
                            </div>
                            <div className="text-center p-4 bg-slate-50 rounded-xl">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <span className="text-green-600">💬</span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">Contact Support</h3>
                                <p className="text-slate-600 text-sm">Reach out to our support team</p>
                            </div>
                            <div className="text-center p-4 bg-slate-50 rounded-xl">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <span className="text-purple-600">📚</span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">Documentation</h3>
                                <p className="text-slate-600 text-sm">Browse our comprehensive guides</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}