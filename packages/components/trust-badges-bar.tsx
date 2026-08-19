import React from "react";

export interface TrustBadgesBarProps {
  showSsl?: boolean;
  showMoneyBack?: boolean;
  showFreeReturns?: boolean;
  showFastShipping?: boolean;
}

export const TrustBadgesBar: React.FC<TrustBadgesBarProps> = ({
  showSsl = true,
  showMoneyBack = true,
  showFreeReturns = true,
  showFastShipping = true,
}) => {
  return (
    <div className="w-full py-6 bg-slate-900 text-slate-200 border-t border-slate-800">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold">
        {showSsl && (
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 text-base">🔒</span>
            <span>256-Bit SSL Bank-Grade Encryption</span>
          </div>
        )}
        {showMoneyBack && (
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-base">⭐</span>
            <span>30-Day Money Back Guarantee</span>
          </div>
        )}
        {showFreeReturns && (
          <div className="flex items-center gap-2">
            <span className="text-blue-400 text-base">📦</span>
            <span>Free Express Returns & Exchanges</span>
          </div>
        )}
        {showFastShipping && (
          <div className="flex items-center gap-2">
            <span className="text-purple-400 text-base">⚡</span>
            <span>Same-Day Dispatch & Delivery</span>
          </div>
        )}
      </div>
    </div>
  );
};
