"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/dashboard");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: 0.15,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
  };

  return (
    <motion.main
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="w-full max-w-md rounded-2xl bg-slate-900/90 backdrop-blur-sm border border-slate-700/70 shadow-2xl px-6 py-7 sm:px-8 sm:py-9"
        variants={cardVariants}
      >
        {/* Logo Section */}
        <motion.div
          className="flex justify-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 120 }}
        >
          <Image
            src="/images/Logo2.png"
            alt="Monievue"
            width={152}
            height={46}
            priority
            className="h-8 w-auto"
          />
        </motion.div>

        {/* Heading */}
        <motion.div
          className="text-center mb-6 sm:mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50 mb-2">
            Welcome back
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Sign in to your account to continue.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-5"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Email
            </label>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2.5 text-sm sm:text-base text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neon focus:border-neon transition"
              placeholder="Enter your email"
              type="email"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Password
            </label>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2.5 text-sm sm:text-base text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neon focus:border-neon transition"
              placeholder="Enter your password"
              type="password"
              required
            />
          </motion.div>

          <motion.div
            className="flex items-center justify-between text-xs sm:text-sm"
            variants={itemVariants}
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-neon focus:ring-neon focus:ring-offset-0"
              />
              <span className="ml-2 text-slate-300">Remember me</span>
            </label>
            <a
              href="/forgot-password"
              className="text-white hover:underline font-medium transition-colors"
            >
              Forgot password?
            </a>
          </motion.div>

          <motion.button
            className={`mt-2 w-full rounded-xl bg-neon text-slate-50 text-sm sm:text-base font-semibold py-2.5 sm:py-3 flex items-center justify-center shadow-lg shadow-neon/30 transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-neon/90"
            }`}
            type="submit"
            disabled={isLoading}
            variants={itemVariants}
            whileHover={{ scale: isLoading ? 1 : 1.01 }}
            whileTap={{ scale: isLoading ? 1 : 0.99 }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-50"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Log in"
            )}
          </motion.button>
        </motion.form>

        <motion.div
          className="mt-6 pt-5 border-t border-slate-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          <p className="text-sm text-slate-300 text-center">
            New here?{" "}
            <a
              href="/signup"
              className="text-neon font-medium hover:text-neon/80 transition-colors"
            >
              Create an account
            </a>
          </p>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
