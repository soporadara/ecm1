import { jsxs, jsx } from "react/jsx-runtime";
import React from "react";
import { router, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
function CustomerOrders({ customer, orders, filters, statuses, paymentStatuses }) {
  const [search, setSearch] = React.useState(filters.search || "");
  const [status, setStatus] = React.useState(filters.status || "");
  const [paymentStatus, setPaymentStatus] = React.useState(filters.payment_status || "");
  const [sort, setSort] = React.useState(filters.sort || "newest");
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.get(`/admin/logistics/customers/${customer.id}/orders`, {
        search,
        status,
        payment_status: paymentStatus,
        sort
      }, { preserveState: true });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search, status, paymentStatus, sort, customer.id]);
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
  return /* @__PURE__ */ jsxs(AdminLayout, { title: `Orders - ${customer.name}`, children: [
    /* @__PURE__ */ jsx(Head, { title: `${customer.name} Orders — Logistics CRM` }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Link, { href: "/admin/logistics/customers", className: "p-2 bg-admin-surface rounded-lg border border-admin-border/50 text-admin-text-muted hover:text-admin-text transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: customer.name }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-1 text-sm text-admin-text-muted", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-admin-primary", children: customer.customer_code }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx("span", { children: customer.phone }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx("span", { children: customer.email })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-admin-surface rounded-2xl border border-admin-border/50 p-4 mb-6 shadow-sm shadow-admin-border/20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 items-end", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-2", children: "Search Order Number" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "e.g. ORD-KH-0010",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full px-4 py-2 border border-admin-border rounded-lg bg-admin-surface text-admin-text text-sm focus:ring-2 focus:ring-admin-primary"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-48", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-2", children: "Status" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: status,
            onChange: (e) => setStatus(e.target.value),
            className: "w-full px-4 py-2 border border-admin-border rounded-lg bg-admin-surface text-admin-text text-sm focus:ring-2 focus:ring-admin-primary",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "All Statuses" }),
              statuses.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s.charAt(0).toUpperCase() + s.slice(1) }, s))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-48", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-2", children: "Payment" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: paymentStatus,
            onChange: (e) => setPaymentStatus(e.target.value),
            className: "w-full px-4 py-2 border border-admin-border rounded-lg bg-admin-surface text-admin-text text-sm focus:ring-2 focus:ring-admin-primary",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "All Payments" }),
              paymentStatuses.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s.charAt(0).toUpperCase() + s.slice(1) }, s))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-40", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-2", children: "Sort By" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: sort,
            onChange: (e) => setSort(e.target.value),
            className: "w-full px-4 py-2 border border-admin-border rounded-lg bg-admin-surface text-admin-text text-sm focus:ring-2 focus:ring-admin-primary",
            children: [
              /* @__PURE__ */ jsx("option", { value: "newest", children: "Newest First" }),
              /* @__PURE__ */ jsx("option", { value: "oldest", children: "Oldest First" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center mt-4 sm:mt-0", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `/admin/logistics/customers/${customer.id}/orders/export?search=${search}&status=${status}&payment_status=${paymentStatus}&sort=${sort}&format=csv`,
            className: "px-4 py-2 bg-admin-surface-muted text-admin-text text-sm font-semibold rounded-lg border border-admin-border hover:bg-admin-border/50 transition-colors inline-flex items-center justify-center",
            children: "Export CSV"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `/admin/logistics/customers/${customer.id}/orders/export?search=${search}&status=${status}&payment_status=${paymentStatus}&sort=${sort}&format=pdf`,
            className: "px-4 py-2 bg-admin-surface-muted text-admin-text text-sm font-semibold rounded-lg border border-admin-border hover:bg-admin-border/50 transition-colors inline-flex items-center justify-center",
            children: "Export PDF"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `/admin/logistics/customers/${customer.id}/orders/export?search=${search}&status=${status}&payment_status=${paymentStatus}&sort=${sort}&format=pdf&preview=1`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "px-4 py-2 bg-admin-surface-muted text-admin-text text-sm font-semibold rounded-lg border border-admin-border hover:bg-admin-border/50 transition-colors inline-flex items-center justify-center",
            children: "Preview"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface rounded-2xl border border-admin-border/50 shadow-sm shadow-admin-border/20 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-admin-surface-muted/50 border-b border-admin-border", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Order Details" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Products" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Budget / Total" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Statuses" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Dates" }),
          /* @__PURE__ */ jsx("th", { className: "text-right px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-admin-border/50", children: [
          orders.data.map((order, index) => {
            var _a, _b;
            return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "font-bold text-admin-primary text-base", children: order.order_number }) }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "font-semibold text-admin-text", children: [
                  ((_a = order.items) == null ? void 0 : _a.length) || 0,
                  " Products"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-admin-text-muted mt-1 line-clamp-2", children: ((_b = order.items) == null ? void 0 : _b.map((i) => i.product_name).join(", ")) || "No items" })
              ] }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "font-bold text-admin-text", children: [
                  "$",
                  Number(order.total_amount).toFixed(2)
                ] }),
                order.estimated_total && /* @__PURE__ */ jsxs("div", { className: "text-xs text-admin-text-muted mt-1", children: [
                  "Estimated: $",
                  Number(order.estimated_total).toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-start", children: [
                /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${statusColors[order.status] || "bg-admin-surface-muted text-admin-text-muted"}`, children: order.status }),
                /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${paymentColors[order.payment_status] || "bg-admin-surface-muted text-admin-text-muted"}`, children: order.payment_status })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "text-xs flex flex-col gap-1 text-admin-text-muted", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Ordered:" }),
                  " ",
                  new Date(order.created_at).toLocaleDateString()
                ] }),
                order.paid_at && /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Paid:" }),
                  " ",
                  new Date(order.paid_at).toLocaleDateString()
                ] }),
                order.delivered_at && /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Delivered:" }),
                  " ",
                  new Date(order.delivered_at).toLocaleDateString()
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-end", children: [
                /* @__PURE__ */ jsx(Link, { href: `/admin/logistics/orders/${order.id}`, className: "px-3 py-1.5 bg-admin-primary/10 text-admin-primary hover:bg-admin-primary hover:text-white rounded text-xs font-semibold transition-colors", children: "View Order" }),
                /* @__PURE__ */ jsx(Link, { href: `/admin/receipts/generate/${order.id}`, className: "px-3 py-1.5 bg-admin-secondary/10 text-admin-secondary hover:bg-admin-secondary hover:text-white rounded text-xs font-semibold transition-colors", children: "Generate Receipt" })
              ] }) })
            ] }, order.id);
          }),
          orders.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "px-6 py-12 text-center text-admin-text-muted", children: "No manual orders found for this customer." }) })
        ] })
      ] }) }),
      orders.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-t border-admin-border flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-admin-text-muted", children: [
          "Showing page ",
          orders.current_page,
          " of ",
          orders.last_page
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: orders.links.map((link, idx) => /* @__PURE__ */ jsx(
          Link,
          {
            href: link.url || "#",
            className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${link.active ? "bg-admin-primary text-white" : "bg-admin-surface-muted text-admin-text-muted hover:text-admin-text"} ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`,
            dangerouslySetInnerHTML: { __html: link.label }
          },
          idx
        )) })
      ] })
    ] })
  ] });
}
export {
  CustomerOrders as default
};
