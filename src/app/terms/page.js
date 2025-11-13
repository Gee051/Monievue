"use client";

import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen px-4 py-10 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <div className="max-w-3xl mx-auto bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-10 shadow-2xl">
        
        <h1 className="text-3xl font-bold text-neon mb-6">Terms & Conditions</h1>

        <p className="text-sm mb-6 text-slate-300">
          Last Updated: February 2025
        </p>

        <section className="space-y-4 text-slate-200">
          <p>
            Welcome to <strong>Monievue</strong>. By accessing or using our
            platform, you agree to these Terms & Conditions (“Terms”). Please
            read them carefully. If you do not agree, you should immediately
            stop using the platform.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">
            1. Acceptance of Terms
          </h2>
          <p>
            By creating an account or continuing to use Monievue, you confirm
            that you have read, understood, and agreed to be bound by these
            Terms and our Privacy Policy.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">2. Eligibility</h2>
          <p>
            You must be at least 18 years old and legally capable of entering
            into binding agreements to use this service.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">
            3. Purpose of the Platform
          </h2>
          <p>
            Monievue provides financial insights, analytics, and a unified view
            of your spending patterns. We do <strong>not</strong> provide
            banking services, financial advice, investment assistance, or money
            transfers. All insights are informational only.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">
            4. User Responsibilities
          </h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>Provide accurate information.</li>
            <li>Keep your login details private.</li>
            <li>Use the platform only for lawful purposes.</li>
            <li>Do not attempt to hack, exploit, or misuse the system.</li>
            <li>You are responsible for all activities on your account.</li>
          </ul>

          <h2 className="text-xl font-semibold text-neon mt-6">
            5. Data Access & Permissions
          </h2>
          <p>
            When you connect your financial accounts or mock data sources, you
            authorize Monievue to access your transaction data and generate
            insights. We <strong>never</strong> store your banking credentials.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">
            6. Security Disclaimer
          </h2>
          <p>
            While we take industry-standard steps to protect your data,
            <strong> no digital platform is 100% secure.</strong>
          </p>

          <p className="font-semibold text-red-400">
            Monievue is not responsible or liable for:
          </p>

          <ul className="list-disc ml-5 space-y-2">
            <li>Unauthorized access to your device or accounts.</li>
            <li>Security breaches from banks, APIs, or external platforms.</li>
            <li>Data interception due to network vulnerabilities.</li>
            <li>Loss of data caused by third-party providers.</li>
            <li>Any hacking, malware, or cyber-attacks.</li>
          </ul>

          <p className="mt-3 text-slate-300">
            By using Monievue, you agree that we cannot be held accountable,
            liable, or responsible for any security breach or unauthorized
            access beyond our direct control.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">
            7. Accuracy of Information
          </h2>
          <p>
            Monievue relies on third-party APIs, bank data, and mock data. We do
            not guarantee that all financial information displayed is accurate,
            complete, or up to date.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">
            8. No Financial Liability
          </h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>We are not responsible for any financial decisions you make.</li>
            <li>We are not liable for lost funds or incorrect insights.</li>
            <li>We do not cover transaction errors from banks or APIs.</li>
            <li>Use of Monievue is strictly at your own risk.</li>
          </ul>

          <h2 className="text-xl font-semibold text-neon mt-6">
            9. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, Monievue and its team shall
            not be liable for any indirect, incidental, or consequential
            damages, including loss of money, data, or opportunities.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">
            10. Service Availability
          </h2>
          <p>
            We may modify, suspend, or discontinue the service at any time.
            Updates to these Terms may occur periodically.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">
            11. Termination
          </h2>
          <p>
            Your access may be restricted or terminated if you violate these
            Terms or engage in harmful behavior. You may delete your account at
            any time.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">
            12. Intellectual Property
          </h2>
          <p>
            All logos, text, graphics, UI, and code belong to Monievue. You may
            not copy or reproduce any part of the platform without permission.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">
            13. Third-Party Services
          </h2>
          <p>
            Monievue relies on external APIs and integrations. We are not
            responsible for outages, inaccuracies, or security issues caused by
            third-party services.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">
            14. Governing Law
          </h2>
          <p>
            These Terms are governed by applicable local laws in your
            jurisdiction.
          </p>

          <h2 className="text-xl font-semibold text-neon mt-6">
            15. Contact
          </h2>
          <p>
            For questions or concerns, please contact us at:{" "}
            <span className="text-neon">support@monievue.app</span>
          </p>
        </section>
      </div>
    </div>
  );
}
