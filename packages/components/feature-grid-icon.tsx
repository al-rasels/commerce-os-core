import React from "react";

export interface FeatureGridIconProps {
  heading?: string;
  columns?: "3" | "4";
}

const features = [
  { id: "1", title: "Free Worldwide Shipping", desc: "On all orders over $50 with real-time tracking.", icon: "🚚" },
  { id: "2", title: "30-Day Money Back", desc: "No questions asked hassle-free returns.", icon: "🔄" },
  { id: "3", title: "2-Year Warranty", desc: "Full coverage against manufacturing defects.", icon: "🛡️" },
  { id: "4", title: "24/7 VIP Customer Support", desc: "Dedicated support team ready to assist you anytime.", icon: "💬" },
];

export const FeatureGridIcon: React.FC<FeatureGridIconProps> = ({
  heading = "Why Shop With Us",
  columns = "4",
}) => {
  return (
    <section className="w-full py-12 bg-muted/40 border-b">
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">{heading}</h2>
        )}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-6`}>
          {features.map((f) => (
            <div key={f.id} className="bg-card border p-6 rounded-2xl flex flex-col items-center text-center shadow-xs">
              <span className="text-4xl mb-3">{f.icon}</span>
              <h3 className="font-bold text-base text-foreground mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
