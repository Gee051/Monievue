
"use client";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub, FaLock, FaEye } from "react-icons/fa";
import { IoShield } from "react-icons/io5";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">M</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Monivue</h3>
                                <p className="text-blue-200 text-sm">See your money's personality</p>
                            </div>
                        </div>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Transform your financial data into actionable insights with AI-powered analysis.
                            Secure, transparent, and built for your financial wellness.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <FaLinkedin size={20} />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <FaGithub size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Product</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/transactions" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    Transactions
                                </Link>
                            </li>
                            <li>
                                <Link href="/insights" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    Financial Insights
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Security & Trust Column */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Security & Trust</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2 text-slate-300 text-sm">
                                <FaLock className="text-green-400 shrink-0" size={14} />
                                <span>Bank-Level Encryption</span>
                            </li>
                            <li className="flex items-center space-x-2 text-slate-300 text-sm">
                                <IoShield className="text-blue-400 shrink-0" size={14} />
                                <span>Open Banking Certified</span>
                            </li>
                            <li className="flex items-center space-x-2 text-slate-300 text-sm">
                                <FaEye className="text-purple-400 shrink-0" size={14} />
                                <span>Read-Only Access</span>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    Contact Support
                                </a>
                            </li>
                            <li>
                                <Link href="/settings" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    Account Settings
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 pt-8 border-t border-slate-700">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-6">
                            <div className="text-center">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <FaLock className="text-white" size={16} />
                                </div>
                                <p className="text-xs text-slate-300">256-bit SSL</p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <IoShield className="text-white" size={16} />
                                </div>
                                <p className="text-xs text-slate-300">SOC 2 Compliant</p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <FaEye className="text-white" size={16} />
                                </div>
                                <p className="text-xs text-slate-300">Read-Only</p>
                            </div>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-slate-300 text-sm">
                                Trusted by financial professionals worldwide
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-slate-800 border-t border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-slate-400 text-sm">
                            © 2025 Monivue. All rights reserved. Built for financial empowerment.
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/cookies" className="text-slate-400 hover:text-white transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}