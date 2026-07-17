import type { Order } from "./api/orders"

export function generateInvoiceHtml(order: Order): string {
  const lineTotal = (item: { unit_price: number; quantity: number }) =>
    ((item.unit_price * item.quantity) / 100).toFixed(2)

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;font-size:13px">${item.sku}</td>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:center;font-size:13px">${item.quantity}</td>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:right;font-size:13px">${order.currency} ${(item.unit_price / 100).toFixed(2)}</td>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:right;font-size:13px">${order.currency} ${lineTotal(item)}</td>
      </tr>`
    )
    .join("")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Invoice ${order.id.slice(0, 8)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 40px; color: #1a1a2e; }
    .header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #1a1a2e; }
    .invoice-title { font-size: 28px; font-weight: 700; margin: 0; }
    .invoice-meta { text-align: right; font-size: 13px; color: #64748b; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
    .info-section h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 0 0 8px; }
    .info-section p { margin: 2px 0; font-size: 14px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th { background: #f8fafc; padding: 10px 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; text-align: left; }
    th:not(:first-child) { text-align: right; }
    .totals { margin-left: auto; width: 280px; }
    .totals-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 14px; }
    .totals-row.total { border-top: 2px solid #1a1a2e; margin-top: 4px; padding-top: 8px; font-weight: 700; font-size: 16px; }
    .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="invoice-title">Invoice</h1>
      <div style="font-size:13px;color:#64748b;margin-top:4px">#${order.id.slice(0, 8)}</div>
    </div>
    <div class="invoice-meta">
      <div>Date: ${new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
      <div style="margin-top:4px">Status: ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
    </div>
  </div>

  <div class="info-grid">
    <div class="info-section">
      <h3>Bill To</h3>
      <p>${order.customer_id ?? "Guest"}</p>
    </div>
    <div class="info-section">
      <h3>Order Details</h3>
      <p>Channel: ${order.channel.charAt(0).toUpperCase() + order.channel.slice(1)}</p>
      <p>Currency: ${order.currency}</p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width:45%">Item</th>
        <th style="width:15%;text-align:center">Qty</th>
        <th style="width:20%;text-align:right">Unit Price</th>
        <th style="width:20%;text-align:right">Total</th>
      </tr>
    </thead>
    <tbody>
      ${itemsHtml}
    </tbody>
  </table>

  <div class="totals">
    <div class="totals-row">
      <span>Subtotal</span>
      <span>${order.currency} ${(order.subtotal / 100).toFixed(2)}</span>
    </div>
    <div class="totals-row">
      <span>Shipping</span>
      <span>${order.currency} ${(order.shipping / 100).toFixed(2)}</span>
    </div>
    <div class="totals-row">
      <span>Tax</span>
      <span>${order.currency} ${(order.tax / 100).toFixed(2)}</span>
    </div>
    <div class="totals-row total">
      <span>Total</span>
      <span>${order.currency} ${(order.total / 100).toFixed(2)}</span>
    </div>
  </div>

  <div class="footer">
    Thank you for your business
  </div>
</body>
</html>`
}

export function downloadInvoice(order: Order): void {
  const html = generateInvoiceHtml(order)
  const blob = new Blob([html], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `invoice-${order.id.slice(0, 8)}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
