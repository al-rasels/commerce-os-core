import React from "react";

export interface ContainerGridProps {
  columnsDesktop?: "1" | "2" | "3" | "4";
  gap?: "16" | "24" | "32";
  children?: React.ReactNode;
}

export const ContainerGrid: React.FC<ContainerGridProps> = ({
  columnsDesktop = "2",
  gap = "24",
  children,
}) => {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-4">
        <div
          className="grid grid-cols-1"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columnsDesktop}, minmax(0, 1fr))`,
            gap: `${gap}px`,
          }}
        >
          {children || <div className="p-8 border border-dashed rounded-xl text-center text-xs text-muted-foreground">Grid Container (Add nested sections)</div>}
        </div>
      </div>
    </section>
  );
};
