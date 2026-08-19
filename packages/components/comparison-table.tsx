import React from "react";

export interface ComparisonTableProps {
  heading?: string;
  subheading?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  heading = "Compare Features",
  subheading = "See how our product stacks up against standard market alternatives.",
}) => {
  return (
    <section className="w-full py-12 bg-background border-b">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{heading}</h2>
          {subheading && <p className="text-xs md:text-sm text-muted-foreground mt-1">{subheading}</p>}
        </div>

        <div className="overflow-x-auto border rounded-2xl shadow-sm bg-card">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 font-bold text-foreground">Feature</th>
                <th className="p-4 font-bold text-primary bg-primary/10">CommerceOS (Us)</th>
                <th className="p-4 font-bold text-muted-foreground">Standard Competitor</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-4 font-medium text-foreground">Multi-Tenant Architecture</td>
                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold bg-primary/5">✓ Included Native</td>
                <td className="p-4 text-rose-500">✗ Additional Fee</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-foreground">B2B Wholesale Portal</td>
                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold bg-primary/5">✓ Included Native</td>
                <td className="p-4 text-rose-500">✗ Third-Party App</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-foreground">Page Builder Drag & Drop</td>
                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold bg-primary/5">✓ Full Control (60+ Sections)</td>
                <td className="p-4 text-amber-500">~ Basic Layout Only</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-foreground">Theme Override Merge</td>
                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold bg-primary/5">✓ Deepmerge Engine</td>
                <td className="p-4 text-rose-500">✗ Fragile Code Edits</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
