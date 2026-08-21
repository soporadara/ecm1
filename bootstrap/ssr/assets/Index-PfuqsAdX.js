import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-BSaLUdaW.js";
import { u as useCurrency } from "../ssr.js";
import MobileOrdersView from "./MobileOrdersView-DPEs2slp.js";
import "react";
import "framer-motion";
import "axios";
import "lucide-react";
import "./useTranslation-_E1z7JpE.js";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
import "@inertiajs/react/server";
import "react-dom/server";
const statusToneClass = {
  green: "bg-green-50 text-green-700",
  red: "bg-red-50 text-red-700",
  amber: "bg-amber-50 text-amber-700",
  gray: "bg-gray-100 text-gray-700",
  blue: "bg-blue-50 text-blue-700"
};
function CustomerOrdersIndex({ orders }) {
  const { formatAmount } = useCurrency();
  return /* @__PURE__ */ jsxs(MainLayout, { title: "My Orders", children: [
    /* @__PURE__ */ jsx(Head, { title: "My Orders" }),
    /* @__PURE__ */ jsx("div", { className: "block lg:hidden", children: /* @__PURE__ */ jsx(MobileOrdersView, { orders, statusToneClass }) }),
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:block max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Link, { href: "/dashboard", className: "text-sm font-bold text-brand-primary hover:underline", children: "Back to dashboard" }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white font-serif mt-2", children: "My Orders" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 mt-1", children: "Track Manual Orders, logistics progress, receipts, and uploaded files." })
        ] }),
        /* @__PURE__ */ jsx(Link, { href: "/manual-order", className: "inline-flex justify-center rounded-xl bg-brand-primary px-5 py-3 text-sm font-black uppercase tracking-wider text-white hover:bg-brand-secondary", children: "Create Manual Order" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500 dark:bg-gray-800", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "p-4", children: "Order" }),
          /* @__PURE__ */ jsx("th", { className: "p-4", children: "Items" }),
          /* @__PURE__ */ jsx("th", { className: "p-4", children: "Pricing" }),
          /* @__PURE__ */ jsx("th", { className: "p-4", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "p-4 text-right", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: orders.data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "p-10 text-center text-gray-500", children: "No Manual Orders yet. Create your first Manual Order and it will appear here." }) }) : orders.data.map((order) => /* @__PURE__ */ jsxs("tr", { className: "align-top", children: [
          /* @__PURE__ */ jsxs("td", { className: "p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white", children: order.order_number || `#${String(order.id).padStart(5, "0")}` }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: new Date(order.created_at).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "p-4 text-gray-600 dark:text-gray-300", children: [
            /* @__PURE__ */ jsxs("p", { className: "font-semibold", children: [
              order.items_count || 0,
              " product request(s)"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
              order.items_sum_quantity || 0,
              " total quantity"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white", children: formatAmount(order.final_total_amount || order.estimated_total_amount || order.subtotal_amount, order.currency_code || "USD") }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase text-gray-500", children: order.payment_status_label || "Unpaid" })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx("span", { className: `inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${statusToneClass[order.customer_status_tone] || statusToneClass.blue}`, children: order.customer_status_label || "In Progress" }) }),
          /* @__PURE__ */ jsx("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsx(Link, { href: `/my-orders/${order.id}`, className: "font-bold text-brand-primary hover:underline", children: "View" }) })
        ] }, order.id)) })
      ] }) }) })
    ] })
  ] });
}
export {
  CustomerOrdersIndex as default
};
