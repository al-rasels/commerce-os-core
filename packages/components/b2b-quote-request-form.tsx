"use client";

import React, { useState } from "react";

export interface B2bQuoteRequestFormProps {
  title?: string;
  subheading?: string;
}

export const B2bQuoteRequestForm: React.FC<B2bQuoteRequestFormProps> = ({
  title = "Request a Custom B2B Quote",
  subheading = "Submit your volume requirements and custom specifications for a dedicated quote within 4 business hours.",
}) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="w-full py-12 bg-background border-b">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-foreground">{title}</h2>
            {subheading && <p className="text-xs text-muted-foreground mt-1">{subheading}</p>}
          </div>

          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Company Name</label>
                  <input required type="text" placeholder="Acme Logistics Inc." className="w-full border bg-background p-2.5 rounded-lg text-xs" />
                </div>
                <div>
                  <label className="font-semibold text-foreground block mb-1">Tax ID / VAT</label>
                  <input type="text" placeholder="US-987654321" className="w-full border bg-background p-2.5 rounded-lg text-xs font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Contact Email</label>
                  <input required type="email" placeholder="purchasing@acme.com" className="w-full border bg-background p-2.5 rounded-lg text-xs" />
                </div>
                <div>
                  <label className="font-semibold text-foreground block mb-1">Phone Number</label>
                  <input required type="tel" placeholder="+1 (555) 000-1234" className="w-full border bg-background p-2.5 rounded-lg text-xs" />
                </div>
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1">Estimated Units & Specifications</label>
                <textarea rows={4} placeholder="Specify SKUs, estimated quantity, required delivery date, and custom branding requirements..." className="w-full border bg-background p-2.5 rounded-lg text-xs" />
              </div>

              <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold text-xs rounded-lg hover:bg-primary/90 transition-colors shadow-md">
                Submit RFQ Tender Request &rarr;
              </button>
            </form>
          ) : (
            <div className="text-center py-8 flex flex-col gap-3">
              <span className="text-4xl">📋</span>
              <h3 className="text-xl font-bold text-foreground">RFQ Submitted Successfully!</h3>
              <p className="text-xs text-muted-foreground">Your quote reference is <span className="font-mono font-bold text-foreground">#RFQ-2026-8891</span>. An enterprise account manager will respond shortly.</p>
              <button onClick={() => setSubmitted(false)} className="mt-4 text-xs text-primary font-semibold hover:underline">
                Submit Another Request
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
