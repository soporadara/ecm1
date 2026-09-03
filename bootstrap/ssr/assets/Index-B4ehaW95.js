import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import toast from "react-hot-toast";
import "react-dom";
import "lucide-react";
const label = (value) => {
  if (value === "in_progress") return "Progress";
  return String(value || "").replace(/_/g, " ");
};
const money = (value, currency = "USD") => {
  if (value === null || value === void 0 || value === "") return "Pending";
  if (currency === "VND") return `₫${Math.round(Number(value || 0)).toLocaleString("en-US")}`;
  return `$${Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
function Index({ orders, filters = {}, statuses = [], paymentStatuses = [] }) {
  const [search, setSearch] = useState(filters.search || "");
  const [status, setStatus] = useState(filters.status || "");
  const [paymentStatus, setPaymentStatus] = useState(filters.payment_status || "");
  const updateStatus = (orderId, nextStatus, nextPaymentStatus) => {
    router.put(`/admin/orders/${orderId}`, { status: nextStatus, payment_status: nextPaymentStatus }, {
      preserveScroll: true,
      onSuccess: () => toast.success("Order updated.")
    });
  };
  const applyFilters = (event) => {
    event.preventDefault();
    router.get("/admin/orders", { search, status, payment_status: paymentStatus }, { preserveState: true, replace: true });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Logistics Orders", children: [
    /* @__PURE__ */ jsx(Head, { title: "Logistics Orders - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:block", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Logistics Orders" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Manage Manual Orders, pricing, customer IDs, and fulfillment status." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: applyFilters, className: "flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: search,
            onChange: (event) => setSearch(event.target.value),
            placeholder: "Order, customer ID, name, phone, product",
            className: "min-w-[280px] rounded-xl border border-admin-border bg-admin-surface px-4 py-2.5 text-sm font-medium"
          }
        ),
        /* @__PURE__ */ jsxs("select", { value: status, onChange: (event) => setStatus(event.target.value), className: "rounded-xl border border-admin-border bg-admin-surface px-4 py-2.5 text-sm font-medium capitalize", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "All order statuses" }),
          statuses.map((item) => /* @__PURE__ */ jsx("option", { value: item, children: label(item) }, item))
        ] }),
        /* @__PURE__ */ jsxs("select", { value: paymentStatus, onChange: (event) => setPaymentStatus(event.target.value), className: "rounded-xl border border-admin-border bg-admin-surface px-4 py-2.5 text-sm font-medium capitalize", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "All budget statuses" }),
          paymentStatuses.map((item) => /* @__PURE__ */ jsx("option", { value: item, children: label(item) }, item))
        ] }),
        /* @__PURE__ */ jsx("button", { className: "rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white", children: "Filter" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left whitespace-nowrap", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Order" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Customer" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Items" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Budget" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Order Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs text-right", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-admin-border/50", children: orders.data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "px-6 py-12 text-center text-admin-text-muted font-medium", children: "No orders found." }) }) : orders.data.map((order) => {
        var _a, _b;
        return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors align-top", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsx(Link, { href: `/admin/orders/${order.id}`, className: "font-semibold text-admin-primary hover:underline", children: order.order_number || `#${String(order.id).padStart(5, "0")}` }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-admin-text-muted mt-1", children: new Date(order.created_at).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-admin-text", children: order.customer_name_snapshot || ((_a = order.user) == null ? void 0 : _a.name) || "Customer" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-admin-text-muted mt-0.5", children: order.customer_code_snapshot || ((_b = order.user) == null ? void 0 : _b.customer_code) }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-admin-text-muted", children: order.customer_phone_snapshot || order.shipping_phone })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-admin-text-muted font-medium", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              order.items_count || 0,
              " products"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
              order.items_sum_quantity || 0,
              " quantity"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
              order.attachments_count || 0,
              " PDFs, ",
              order.images_count || 0,
              " images"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-admin-text", children: money(order.final_total_amount || order.estimated_total_amount || order.subtotal_amount, order.currency_code || "USD") }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: order.payment_status || "unpaid",
                onChange: (event) => updateStatus(order.id, order.status, event.target.value),
                className: "mt-2 rounded-full border border-admin-border bg-admin-surface px-3 py-1 text-xs font-bold uppercase tracking-wide",
                children: paymentStatuses.map((item) => /* @__PURE__ */ jsx("option", { value: item, children: label(item) }, item))
              }
            )
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx(
            "select",
            {
              value: order.status,
              onChange: (event) => updateStatus(order.id, event.target.value, order.payment_status || "unpaid"),
              className: "rounded-full border border-admin-border bg-admin-surface px-3 py-1 text-xs font-bold uppercase tracking-wide",
              children: statuses.map((item) => /* @__PURE__ */ jsx("option", { value: item, children: label(item) }, item))
            }
          ) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsx(Link, { href: `/admin/orders/${order.id}`, className: "font-bold text-admin-primary hover:underline", children: "View" }) })
        ] }, order.id);
      }) })
    ] }) }) }),
    orders.total > orders.per_page && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col sm:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium text-admin-text-muted", children: [
        "Showing ",
        orders.from,
        " to ",
        orders.to,
        " of ",
        orders.total,
        " results"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: orders.links.map((link, idx) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `px-4 py-2 border rounded-xl text-sm font-semibold transition-all duration-200 ${link.active ? "bg-admin-primary text-white border-admin-primary shadow-sm shadow-admin-primary/20" : "bg-admin-surface text-admin-text-muted border-admin-border hover:bg-admin-surface-muted hover:text-admin-text"}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        idx
      )) })
    ] })
  ] });
}
export {
  Index as default
};
