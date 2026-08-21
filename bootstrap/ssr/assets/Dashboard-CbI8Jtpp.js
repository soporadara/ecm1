import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import "react";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
const statusColors = {
  pending: "bg-admin-warning/10 text-admin-warning",
  processing: "bg-admin-primary/10 text-admin-primary",
  packed: "bg-indigo-500/10 text-indigo-500",
  shipping: "bg-admin-secondary/10 text-admin-secondary",
  delivered: "bg-admin-success/10 text-admin-success",
  cancelled: "bg-admin-danger/10 text-admin-danger"
};
const paymentColors = {
  unpaid: "bg-admin-danger/10 text-admin-danger",
  partial: "bg-admin-warning/10 text-admin-warning",
  paid: "bg-admin-success/10 text-admin-success",
  refunded: "bg-admin-surface-muted text-admin-text-muted"
};
function StatCard({
  label,
  value,
  sub,
  icon,
  color = "indigo"
}) {
  const colorMap = {
    indigo: "bg-admin-primary/10 text-admin-primary",
    green: "bg-admin-success/10 text-admin-success",
    amber: "bg-admin-warning/10 text-admin-warning",
    red: "bg-admin-danger/10 text-admin-danger",
    blue: "bg-admin-secondary/10 text-admin-secondary",
    purple: "bg-purple-500/10 text-purple-500"
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface rounded-2xl border border-admin-border/50 p-4 sm:p-6 flex items-start gap-4 hover:-translate-y-0.5 hover:shadow-md hover:shadow-admin-border/50 shadow-sm shadow-admin-border/20 transition-all duration-200", children: [
    /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[color] || colorMap.indigo}`, children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.8, d: icon }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mb-1", children: label }),
      /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-admin-text tracking-tight leading-none", children: value }),
      sub && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mt-2", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-admin-text-muted", children: sub }) })
    ] })
  ] });
}
function Dashboard({ stats, revenue_chart, recent_orders, date }) {
  var _a, _b;
  const formatCurrency = (v) => "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const changeDate = (d) => {
    router.get("/admin", { date: d }, { preserveState: true });
  };
  const chartWidth = 600;
  const chartHeight = 80;
  const maxRevenue = Math.max(...revenue_chart.map((d) => d.revenue), 1);
  const points = revenue_chart.map((d, i) => {
    const x = i / Math.max(revenue_chart.length - 1, 1) * chartWidth;
    const y = chartHeight - d.revenue / maxRevenue * chartHeight;
    return `${x},${y}`;
  }).join(" ");
  const areaPoints = revenue_chart.length > 0 ? `0,${chartHeight} ${points} ${chartWidth},${chartHeight}` : "";
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Logistics CRM Overview", children: [
    /* @__PURE__ */ jsx(Head, { title: "Logistics Overview — Rafel CMS" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Logistics CRM Overview" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-admin-text-muted mt-1", children: "Key metrics for manual orders and customers." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between sm:justify-start bg-admin-surface border border-admin-border/60 rounded-xl px-4 py-2 gap-4 shadow-sm shadow-admin-border/20 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-admin-text-muted uppercase tracking-wider", children: "Date" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "date",
            value: date,
            onChange: (e) => changeDate(e.target.value),
            className: "bg-admin-surface-muted/30 border-none rounded-lg text-admin-text font-bold text-sm focus:ring-0 cursor-pointer px-3 py-1.5"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6", children: [
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: "Total Revenue",
          value: formatCurrency(stats.total_revenue),
          icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          color: "indigo"
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: "Customers",
          value: stats.total_customers.toString(),
          icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
          color: "green"
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: "Manual Orders",
          value: stats.total_manual_orders.toString(),
          sub: `${stats.pending_orders} pending`,
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
          color: "blue"
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: "Products Sold",
          value: stats.total_products_sold.toString(),
          icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
          color: "purple"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6", children: [
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: "Pending Orders",
          value: stats.pending_orders.toString(),
          icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
          color: "amber"
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: "In Progress",
          value: stats.in_progress_orders.toString(),
          icon: "M13 10V3L4 14h7v7l9-11h-7z",
          color: "indigo"
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: "Delivered",
          value: stats.delivered_orders.toString(),
          icon: "M5 13l4 4L19 7",
          color: "green"
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: "Unpaid Orders",
          value: stats.unpaid_orders.toString(),
          sub: `${stats.paid_orders} paid`,
          icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
          color: "red"
        }
      )
    ] }),
    revenue_chart.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface rounded-2xl border border-admin-border/50 p-6 mb-8 shadow-sm shadow-admin-border/20", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-admin-text tracking-tight mb-6", children: "Paid Revenue Over Time" }),
      /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden", children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            viewBox: `0 0 ${chartWidth} ${chartHeight + 10}`,
            className: "w-full drop-shadow-sm",
            preserveAspectRatio: "none",
            style: { height: 100 },
            children: [
              /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "chartGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "var(--admin-primary, #0F9F84)", stopOpacity: "0.2" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "var(--admin-primary, #0F9F84)", stopOpacity: "0" })
              ] }) }),
              areaPoints && /* @__PURE__ */ jsx("polygon", { points: areaPoints, fill: "url(#chartGrad)" }),
              points && /* @__PURE__ */ jsx(
                "polyline",
                {
                  points,
                  fill: "none",
                  stroke: "var(--admin-primary, #0F9F84)",
                  strokeWidth: "3",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-3 text-sm font-medium text-admin-text-muted", children: [
          revenue_chart.length > 0 && /* @__PURE__ */ jsx("span", { children: (_a = revenue_chart[0]) == null ? void 0 : _a.date }),
          revenue_chart.length > 1 && /* @__PURE__ */ jsx("span", { children: (_b = revenue_chart[revenue_chart.length - 1]) == null ? void 0 : _b.date })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface rounded-2xl border border-admin-border/50 shadow-sm shadow-admin-border/20 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-5 border-b border-admin-border", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-admin-text tracking-tight", children: "Recent Manual Orders" }),
        /* @__PURE__ */ jsx(Link, { href: "/admin/logistics/orders", className: "text-sm text-admin-primary hover:text-admin-primary-hover font-semibold transition-colors", children: "View all →" })
      ] }),
      recent_orders.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 text-admin-text-muted", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 mx-auto mb-3 text-admin-border", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "No orders yet" })
      ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-admin-border bg-admin-surface-muted/50", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Order" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Customer" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Payment" }),
          /* @__PURE__ */ jsx("th", { className: "text-right px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Total" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-admin-border/50", children: recent_orders.map((order) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-semibold text-admin-primary", children: order.number }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 font-medium text-admin-text", children: [
            order.customer,
            /* @__PURE__ */ jsx("span", { className: "block text-xs text-admin-text-muted font-normal", children: order.customer_code })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${statusColors[order.status] || "bg-admin-surface-muted text-admin-text-muted"}`, children: order.status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${paymentColors[order.payment_status] || "bg-admin-surface-muted text-admin-text-muted"}`, children: order.payment_status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right font-bold text-admin-text tracking-tight", children: formatCurrency(order.total) })
        ] }, order.id)) })
      ] }) })
    ] })
  ] });
}
export {
  Dashboard as default
};
