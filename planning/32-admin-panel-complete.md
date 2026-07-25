# Phase 5 — Admin Panel Complete

## 5.1 Lazy Routes

Code-split each admin section using `React.lazy` + `Suspense`. Route-level chunking by domain.

### Admin Route Table

| Path                  | Component         | Chunk Name        | Auth     | Lazy?         |
| --------------------- | ----------------- | ----------------- | -------- | ------------- |
| `/admin`              | `AdminLayout`     | `admin-layout`    | JWT+role | No (critical) |
| `/admin/dashboard`    | `DashboardPage`   | `admin-dashboard` | admin    | Yes           |
| `/admin/products`     | `ProductListPage` | `admin-products`  | admin    | Yes           |
| `/admin/products/new` | `ProductFormPage` | `admin-products`  | admin    | Yes           |
| `/admin/products/:id` | `ProductFormPage` | `admin-products`  | admin    | Yes           |
| `/admin/orders`       | `OrderListPage`   | `admin-orders`    | admin    | Yes           |
| `/admin/orders/:id`   | `OrderDetailPage` | `admin-orders`    | admin    | Yes           |
| `/admin/users`        | `UserListPage`    | `admin-users`     | admin    | Yes           |
| `/admin/users/:id`    | `UserDetailPage`  | `admin-users`     | admin    | Yes           |
| `/admin/audit-log`    | `AuditLogPage`    | `admin-audit`     | admin    | Yes           |

### Implementation

```tsx
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));

<Suspense fallback={<AdminSkeleton />}>
  <Routes>
    <Route path="dashboard" element={<DashboardPage />} />
  </Routes>
</Suspense>;
```

### Acceptance

- Each section loads as a separate JS chunk (verify in devtools Network tab)
- Suspense fallback renders immediately on navigation
- No FOUC or layout shift during chunk load

---

## 5.2 Advanced Tables

**Dependency: `@tanstack/react-table` v8** — headless, type-safe, tree-shakeable. Justified over AG Grid (lighter, no licence cost) and MUI X (vendor lock-in).

### Column Features

| Feature     | Implementation                                                                    |
| ----------- | --------------------------------------------------------------------------------- |
| Sorting     | `getSortedRowModel()` — single/multi-column, remote sort                          |
| Filtering   | Column filters via `getFilteredRowModel()`, global search input                   |
| Visibility  | `ColumnVisibilityTable` — toggle columns via dropdown menu                        |
| Selection   | `getRowSelectionCanSelect()` — checkbox column, select-all header                 |
| Export      | `useCsvExport()` hook — maps columns → CSV/blob; Excel via `xlsx`                 |
| Page size   | Configurable `[10, 20, 50, 100]` persisted to `localStorage`                      |
| Saved views | Serialize column order, visibility, sort, filters → `localStorage` keyed by table |

### Export Implementation

```tsx
function useCsvExport<T>(data: T[], columns: ColumnDef<T>[]) {
  return useCallback(() => {
    const rows = data.map((row) =>
      columns.map((col) => String(col.accessorFn?.(row) ?? "")),
    );
    const csv = [columns.map((c) => c.header), ...rows]
      .map((r) => r.join(","))
      .join("\n");
    downloadBlob(new Blob([csv], { type: "text/csv" }), "export.csv");
  }, [data, columns]);
}
```

### Acceptance

- Columns sortable — click toggles asc/desc/none
- Text filter input filters rows in real-time (<150ms per keystroke)
- Column dropdown shows/hides columns; selection persists on reload
- Row checkbox + select-all work; selection count shown
- CSV export downloads valid `.csv` with headers
- Page size selector changes page size; persisted across sessions

---

## 5.3 Bulk Operations

### Component: `BulkActionBar`

Renders below the table header when rows are selected. Sticky positioned.

### Actions

| Action          | Confirmation            | Implementation                                        |
| --------------- | ----------------------- | ----------------------------------------------------- |
| Status change   | Confirm dialog          | `PATCH /api/v1/admin/bulk/status` — `{ ids, status }` |
| Delete          | Confirm dialog + reason | `DELETE /api/v1/admin/bulk` — `{ ids, reason }`       |
| Export          | None (non-destructive)  | Exports selected rows as CSV                          |
| Clear selection | None                    | Deselects all                                         |

### Progress & Undo

```tsx
const BulkActionBar: React.FC<Props> = ({ selectedIds, onAction }) => {
  const [progress, setProgress] = useState<BulkProgress | null>(null);

  const handleBulkDelete = async () => {
    const confirmed = await confirmDialog.show({ ... });
    if (!confirmed) return;

    setProgress({ total: selectedIds.length, completed: 0 });
    for (const batch of chunk(selectedIds, 50)) {   // process in batches of 50
      await api.bulkDelete(batch);
      setProgress(prev => ({ ...prev!, completed: prev!.completed + batch.length }));
    }
    toast.success('Deleted', { action: { label: 'Undo', onClick: () => onAction('undo') } });
  };
};
```

### Acceptance

- Bulk bar appears only when >= 1 row selected; shows count
- Status change fires one request per batch + optimistic UI update
- Bulk delete shows confirm dialog with optional reason field
- Progress bar updates per batch; user sees X of Y completed
- Undo button appears in toast (10s window) — sends restore call
- Keyboard: `Ctrl+A` selects all visible rows

---

## 5.4 Confirm Dialogs

### Component: `ConfirmDialog`

```tsx
interface ConfirmDialogProps {
  title: string;
  message: string | ReactNode;
  confirmLabel?: string; // default "Delete"
  confirmVariant?: "danger" | "warning";
  cancelLabel?: string; // default "Cancel"
  requireReason?: boolean;
  reasonPlaceholder?: string;
  onConfirm: (reason?: string) => void;
  onCancel: () => void;
}
```

### Keyboard Shortcuts

| Key    | Action                                      |
| ------ | ------------------------------------------- |
| Enter  | Confirm (triggered on confirm button focus) |
| Escape | Cancel / close                              |
| Tab    | Cycle between Confirm, Cancel, Reason field |

### Usage Pattern

```tsx
const confirm = await ConfirmDialog.show({
  title: "Delete 3 products?",
  message: "This action cannot be undone.",
  requireReason: true,
});
if (!confirm) return;
await api.bulkDelete({ ids, reason: confirm.reason });
```

### Acceptance

- Dialog traps focus (modal pattern)
- Escape closes without action
- Enter confirms only when confirm button is focused (prevents accidental submit in textarea)
- Reason field required when `requireReason` is true; confirm button disabled until filled
- Backdrop click does NOT dismiss (prevents accidental close on destructive actions)
- Dialog renders at a fixed z-index above all other UI

---

## 5.5 Audit Log Viewer

### Endpoint

| Method | Path                      | Auth  | Description                     |
| ------ | ------------------------- | ----- | ------------------------------- |
| `GET`  | `/api/v1/admin/audit-log` | Admin | Paginated, filterable audit log |

**Query params**: `page`, `limit`, `entityType`, `action`, `userId`, `dateFrom`, `dateTo`, `search`

### Filters

| Filter      | Type           | Behaviour                                                           |
| ----------- | -------------- | ------------------------------------------------------------------- |
| Entity type | `select`       | `product`, `order`, `user`, `role`, `category`                      |
| Action type | `select`       | `created`, `updated`, `deleted`, `status_change`, `login`, `export` |
| Date range  | `datepicker`   | Pre-sets: Today, 7d, 30d, Custom                                    |
| User        | `autocomplete` | Search by name/email; select from results                           |
| Free text   | `input`        | Searches entity ID, description, IP address                         |

### Event Detail Expansion

```tsx
interface AuditEvent {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  userId: string;
  userName: string;
  description: string;
  changes?: Record<string, { old: unknown; new: unknown }>;
  ip: string;
  userAgent: string;
  createdAt: string;
}
```

Expandable row shows: before/after diff as a side-by-side table, IP, user agent, timestamp.

### Acceptance

- Table loads last 50 events by default (server-side pagination)
- Each filter fires a new query — debounced 300ms on text inputs
- Expanding a row shows diff table with added/removed/changed highlights
- Empty state shown when no events match filters
- Date range defaults to last 30 days
- Events exportable as CSV

---

## 5.6 Dashboard Charts

**Dependency: `recharts`** — composable, SVG-based, React-native, lighter than visx. Justified over Chart.js (no React primitives) and visx (steeper learning curve, larger bundle).

### Chart Components

| Component       | Type       | Data Source                            | Period         |
| --------------- | ---------- | -------------------------------------- | -------------- |
| `RevenueChart`  | Line chart | `GET /api/v1/admin/stats/revenue`      | 30d daily      |
| `OrdersChart`   | Bar chart  | `GET /api/v1/admin/stats/orders`       | 7d daily       |
| `TopProducts`   | Table      | `GET /api/v1/admin/stats/top-products` | 30d            |
| `CustomerChart` | Area chart | `GET /api/v1/admin/stats/customers`    | 30d cumulative |
| `StatusCards`   | Stat cards | `GET /api/v1/admin/stats/summary`      | Current        |

### Status Summary Cards

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Revenue  │  │  Orders  │  │  AOV     │  │ Customers│  │  Pending │   │
│  │ $12,450  │  │   156    │  │  $79.81  │  │   43     │  │   12     │   │
│  │ ▲ +12%   │  │ ▼ -3%   │  │ ▲ +5%   │  │ ▲ +18%  │  │  orders  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

### PDF Export

```tsx
const handlePdfExport = async () => {
  const element = document.getElementById("dashboard-content");
  const canvas = await html2canvas(element); // dependency: html2canvas
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("landscape", "mm", "a4"); // dependency: jspdf
  pdf.addImage(imgData, "PNG", 10, 10, 277, 150);
  pdf.save(`dashboard-${formatDate(new Date())}.pdf`);
};
```

### Acceptance

- Revenue chart shows 30 data points with tooltips on hover
- Orders chart shows 7 bars with daily totals
- Top products table sorted by revenue descending; max 10 rows
- Customer chart shows cumulative line with 30d trend
- Status cards show live counts with trend arrows (+/- vs previous period)
- PDF export downloads complete dashboard as A4 landscape PDF
- All charts responsive — reflow on window resize
- Loading skeleton replaces each chart during data fetch
- Skeleton replaces every chart individually on refresh
