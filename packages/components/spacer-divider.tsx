import React from "react";

export interface SpacerDividerProps {
  heightPx?: number;
  showLine?: boolean;
  lineColor?: string;
}

export const SpacerDivider: React.FC<SpacerDividerProps> = ({
  heightPx = 40,
  showLine = true,
  lineColor = "#e2e8f0",
}) => {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: `${heightPx}px` }}
    >
      {showLine && (
        <div className="w-full container mx-auto px-4">
          <hr className="border-t" style={{ borderColor: lineColor }} />
        </div>
      )}
    </div>
  );
};
