// src/components/SmartActions.jsx
import { useState, useEffect, useMemo } from "react";
import { FiTrendingUp, FiShield, FiTarget, FiInfo, FiBriefcase } from "react-icons/fi";

const TIP_CONFIG = {
  hot: {
    title: "Spending is heating up 🔥",
    message:
      "Your recent spending looks higher than usual. Try setting a simple monthly budget for 1–2 categories that take most of your money.",
  },
  dormant: {
    title: "Idle money detected 😴",
    message:
      "You have cash that has not moved in a while. Moving a small part into savings or an investment can help your money work for you.",
  },
  balanced: {
    title: "Nice flow 👌",
    message:
      "Your money in and out looks fairly balanced. This is a good time to set a clear savings goal and automate small contributions.",
  },
  wemaSara: {
    title: "Sara loans awareness 💜",
    message:
      "Because you use Wema, Monivue can remind you that products like Sara loans exist for women. We don’t apply on your behalf, we only highlight options so you can decide what works for you and speak directly with your bank.",
  },
  gtcoReady: {
    title: "Understanding your GTCO usage 💼",
    message:
      "With GTCO/GTBank linked, Monivue helps you see how you use GTCO compared to other banks. This view can guide your decisions, but all product choices and applications remain between you and your bank.",
  },
};

export default function SmartActions({ className = "", connectedBanks = [] }) {
  const [activeTipKey, setActiveTipKey] = useState(null);

  // Normalize bank names once
  const bankFlags = useMemo(() => {
    const lower = connectedBanks.map((b) => String(b).toLowerCase());
    return {
      hasWema: lower.some((b) => b.includes("wema")),
      hasGtco: lower.some(
        (b) =>
          b.includes("gtbank") ||
          b.includes("gtco") ||
          b.includes("guaranty trust")
      ),
    };
  }, [connectedBanks]);

  // Auto-hide popup after a few seconds
  useEffect(() => {
    if (!activeTipKey) return;
    const timeout = setTimeout(() => setActiveTipKey(null), 4500);
    return () => clearTimeout(timeout);
  }, [activeTipKey]);

  const activeTip = activeTipKey ? TIP_CONFIG[activeTipKey] : null;

  const handleShowTip = (key) => {
    setActiveTipKey(key);
  };

  return (
    <>
      {/* Main Smart Actions Card */}
      <section
        className={`rounded-2xl border border-slate-200 bg-linear-to-br from-white via-slate-50 to-blue-50/60 backdrop-blur p-4 sm:p-6 shadow-sm ${className}`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Smart actions for your money
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Quick moves that can help you spend wisely, save better and make
              each bank connection work for you.
            </p>
          </div>
        </div>

        {/* Core actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Action 1: Budget */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white/80 p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                <FiTrendingUp className="text-blue-600 text-lg" />
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-semibold text-slate-900">
                  Create a simple budget
                </p>
                <p className="mt-1 text-[0.72rem] sm:text-xs text-slate-500 leading-snug">
                  Pick 1–2 categories that often “chop” your money and give
                  them a soft monthly limit.
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-2/3 rounded-full bg-blue-500/80" />
              </div>
              <button
                type="button"
                onClick={() => handleShowTip("hot")}
                className="text-[0.7rem] sm:text-xs font-medium px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                View tip
              </button>
            </div>
          </div>

          {/* Action 2: Savings on idle money */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white/80 p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
                <FiShield className="text-emerald-600 text-lg" />
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-semibold text-slate-900">
                  Move idle cash to savings
                </p>
                <p className="mt-1 text-[0.72rem] sm:text-xs text-slate-500 leading-snug">
                  If one account is just sitting quiet, move a small amount
                  into savings so your money is not sleeping.
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-1/2 rounded-full bg-emerald-500/80" />
              </div>
              <button
                type="button"
                onClick={() => handleShowTip("dormant")}
                className="text-[0.7rem] sm:text-xs font-medium px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                View tip
              </button>
            </div>
          </div>

          {/* Action 3: Simple goal */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white/80 p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50">
                <FiTarget className="text-indigo-600 text-lg" />
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-semibold text-slate-900">
                  Set a simple savings goal
                </p>
                <p className="mt-1 text-[0.72rem] sm:text-xs text-slate-500 leading-snug">
                  Choose one goal (rent, emergency fund, trip, gadget) and
                  start with a small weekly amount you can keep.
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-indigo-500/80" />
              </div>
              <button
                type="button"
                onClick={() => handleShowTip("balanced")}
                className="text-[0.7rem] sm:text-xs font-medium px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                View tip
              </button>
            </div>
          </div>
        </div>

        {/* Bank-specific suggestions */}
        {(bankFlags.hasWema || bankFlags.hasGtco) && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[0.68rem] uppercase tracking-wide text-black font-semibold">
                Tailored to your linked banks
              </span>
            
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bankFlags.hasWema && (
                <div className="relative overflow-hidden rounded-2xl border border-violet-100 bg-linear-to-br from-violet-50/80 via-white to-violet-50/40 p-4 flex flex-col justify-between shadow-[0_10px_30px_rgba(88,28,135,0.08)]">
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-violet-200/40 pointer-events-none" />
                  <div className="relative flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600/90">
                        <FiInfo className="text-white text-sm" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs sm:text-sm font-semibold text-violet-950">
                          Wema user? Know about Sara (women only)
                        </p>
                        <span className="inline-flex mt-1 max-w-max rounded-full bg-white/70 px-2 py-0.5 text-[0.65rem] text-violet-900/80 border border-violet-100">
                          Awareness, not endorsement
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-[0.72rem] sm:text-xs text-violet-900/80 leading-snug">
                      If you&apos;re a woman banking with Wema, there are
                      products like Sara loans designed for women. Monivue
                      simply helps you stay aware of options that may support
                      your business or goals, any application still happens
                      directly with Wema.
                    </p>
                  </div>
                  <div className="relative mt-3 flex items-center justify-between gap-2">
                    <span className="text-[0.68rem] sm:text-[0.7rem] text-violet-900/70">
                      Use this insight to ask better questions at your branch.
                    </span>
                    <button
                      type="button"
                      onClick={() => handleShowTip("wemaSara")}
                      className="text-[0.7rem] sm:text-xs font-medium px-3 py-1.5 rounded-full bg-violet-700 text-white hover:bg-violet-800 transition"
                    >
                      View insight
                    </button>
                  </div>
                </div>
              )}

              {bankFlags.hasGtco && (
                <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-linear-to-br from-amber-50/80 via-white to-amber-50/40 p-4 flex flex-col justify-between shadow-[0_10px_30px_rgba(180,83,9,0.08)]">
                  <div className="absolute -left-8 -bottom-10 h-24 w-24 rounded-full bg-amber-200/40 pointer-events-none" />
                  <div className="relative flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
                        <FiBriefcase className="text-white text-sm" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs sm:text-sm font-semibold text-amber-950">
                          Make the most of your GTCO activity
                        </p>
                        <span className="inline-flex mt-1 max-w-max rounded-full bg-white/70 px-2 py-0.5 text-[0.65rem] text-amber-900/80 border border-amber-100">
                          Clarity, not recommendation
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-[0.72rem] sm:text-xs text-amber-900/80 leading-snug">
                      With GTCO/GTBank linked, Monivue lets you see how much
                      you rely on GTCO compared to your other banks. This view
                      can guide where you keep funds for bills, savings or
                      everyday spending,final choices always remain with you
                      and your bank.
                    </p>
                  </div>
                  <div className="relative mt-3 flex items-center justify-between gap-2">
                    <span className="text-[0.68rem] sm:text-[0.7rem] text-amber-900/70">
                      Use the pattern to plan, not as financial advice.
                    </span>
                    <button
                      type="button"
                      onClick={() => handleShowTip("gtcoReady")}
                      className="text-[0.7rem] sm:text-xs font-medium px-3 py-1.5 rounded-full bg-amber-700 text-white hover:bg-amber-800 transition"
                    >
                      View insight
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <p className="mt-4 text-[0.68rem] sm:text-[0.7rem] text-slate-400">
          Note: Monivue does not issue or arrange financial products. These
          actions and insights are for awareness and planning only. All
          decisions and applications stay between you and your bank or provider.
        </p>
      </section>

      {/* Tiny popup hint */}
      {activeTip && (
        <div className="fixed bottom-4 right-4 z-50 max-w-xs rounded-xl bg-slate-900 text-white shadow-lg p-3 sm:p-4 text-sm">
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-[0.6rem] uppercase tracking-wide text-slate-400 mb-1">
                Smart hint
              </p>
              <p className="text-xs sm:text-sm font-semibold">
                {activeTip.title}
              </p>
              <p className="mt-1 text-[0.7rem] sm:text-xs text-slate-200 leading-snug">
                {activeTip.message}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTipKey(null)}
              className="text-slate-400 hover:text-slate-200 text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
