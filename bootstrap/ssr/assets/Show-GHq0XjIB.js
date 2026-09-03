import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-C3efSGPT.js";
import { u as useCurrency } from "../ssr.js";
import "react";
import "framer-motion";
import "axios";
import "lucide-react";
import "./useTranslation-CqoVm-kK.js";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
import "@inertiajs/react/server";
import "react-dom/server";
const label = (value) => String(value || "not set").replace(/_/g, " ");
const statusToneClass = {
  green: "bg-green-50 text-green-700",
  red: "bg-red-50 text-red-700",
  amber: "bg-amber-50 text-amber-700",
  gray: "bg-gray-100 text-gray-700",
  blue: "bg-blue-50 text-blue-700"
};
function CustomerOrderShow({ order }) {
  const { formatAmount } = useCurrency();
  const items = order.items || [];
  const histories = order.status_histories || [];
  return /* @__PURE__ */ jsxs(MainLayout, { title: order.order_number || "Order", children: [
    /* @__PURE__ */ jsx(Head, { title: order.order_number || "Order" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Link, { href: "/my-orders", className: "text-sm font-bold text-brand-primary hover:underline", children: "Back to orders" }),
          /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-bold text-gray-900 dark:text-white font-serif", children: order.order_number }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400", children: order.title })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `inline-flex w-fit rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider ${statusToneClass[order.customer_status_tone] || statusToneClass.blue}`, children: order.customer_status_label || "In Progress" })
      ] }),
      order.customer_visible_note && /* @__PURE__ */ jsx("div", { className: "mb-6 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5 text-sm font-medium text-gray-700 dark:text-gray-200", children: order.customer_visible_note }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "Requested Products" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-5", children: items.map((item, index) => {
              var _a, _b, _c;
              return /* @__PURE__ */ jsxs("article", { className: "rounded-xl border border-gray-100 p-4 dark:border-gray-800", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-xs font-black uppercase tracking-wider text-gray-400", children: [
                      "Product ",
                      index + 1
                    ] }),
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 dark:text-white", children: item.product_name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                      "Qty ",
                      item.quantity
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white", children: formatAmount(item.line_total || Number(item.price || 0) * Number(item.quantity || 0), order.currency_code || "USD") })
                ] }),
                (item.type || item.color || item.size) && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-gray-600 dark:text-gray-300", children: [item.type, item.color, item.size].filter(Boolean).join(" / ") }),
                item.description && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-gray-600 dark:text-gray-300", children: item.description }),
                item.customer_notes && /* @__PURE__ */ jsx("p", { className: "mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300", children: item.customer_notes }),
                ((_a = item.urls) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-2", children: item.urls.map((url) => /* @__PURE__ */ jsx("a", { href: url.url, target: "_blank", rel: "noreferrer", className: "block truncate text-sm font-semibold text-brand-primary hover:underline", children: url.domain || url.url }, url.id)) }),
                ((_b = item.images) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4", children: item.images.map((image) => /* @__PURE__ */ jsx("a", { href: image.url, target: "_blank", rel: "noreferrer", className: "aspect-square overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsx("img", { src: image.thumbnail_url || image.url, alt: image.original_filename || "Reference", className: "h-full w-full object-cover" }) }, image.id)) }),
                ((_c = item.attachments) == null ? void 0 : _c.length) > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: item.attachments.map((file) => /* @__PURE__ */ jsx("a", { href: file.download_url, className: "rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:text-brand-primary dark:border-gray-700 dark:text-gray-200", children: file.original_filename }, file.id)) })
              ] }, item.id);
            }) })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "Status Timeline" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: histories.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "No timeline updates yet." }) : histories.map((history) => /* @__PURE__ */ jsxs("div", { className: "border-l-2 border-brand-primary pl-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold capitalize text-gray-900 dark:text-white", children: history.customer_status_label || label(history.to_status) }),
              history.public_message && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: history.public_message }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: new Date(history.created_at).toLocaleString() })
            ] }, history.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "Pricing" }),
            /* @__PURE__ */ jsxs("dl", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("dt", { children: "Currency" }),
                /* @__PURE__ */ jsx("dd", { className: "font-bold", children: order.currency_code || "USD" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("dt", { children: "Subtotal" }),
                /* @__PURE__ */ jsx("dd", { className: "font-bold", children: formatAmount(order.subtotal_amount, order.currency_code || "USD") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("dt", { children: "Logistics fee" }),
                /* @__PURE__ */ jsx("dd", { className: "font-bold", children: formatAmount(order.logistics_fee_amount, order.currency_code || "USD") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("dt", { children: "Service fee" }),
                /* @__PURE__ */ jsx("dd", { className: "font-bold", children: formatAmount(order.service_fee_amount, order.currency_code || "USD") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("dt", { children: "Delivery fee" }),
                /* @__PURE__ */ jsx("dd", { className: "font-bold", children: formatAmount(order.delivery_fee_amount, order.currency_code || "USD") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("dt", { children: "Discount" }),
                /* @__PURE__ */ jsx("dd", { className: "font-bold", children: formatAmount(order.discount_amount, order.currency_code || "USD") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 pt-3 flex justify-between text-base dark:border-gray-800", children: [
                /* @__PURE__ */ jsx("dt", { className: "font-bold", children: "Total" }),
                /* @__PURE__ */ jsx("dd", { className: "font-black", children: formatAmount(order.final_total_amount || order.estimated_total_amount, order.currency_code || "USD") })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-xs font-bold uppercase tracking-wider text-gray-500", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "Pricing: ",
                label(order.pricing_status)
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Payment: ",
                order.payment_status_label || "Unpaid"
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Purchase: ",
                order.purchase_readiness_label || "Not Ready"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "Delivery Snapshot" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm text-gray-600 dark:text-gray-300", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: "Name:" }),
                " ",
                order.customer_name_snapshot
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: "Email:" }),
                " ",
                order.customer_email_snapshot
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: "Phone:" }),
                " ",
                order.customer_phone_snapshot
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "whitespace-pre-line", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: "Address:" }),
                " ",
                order.delivery_address_snapshot || order.shipping_address
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "Support" }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
              /* @__PURE__ */ jsx(Link, { href: "/manual-order", className: "rounded-xl bg-brand-primary px-4 py-3 text-center text-sm font-black uppercase tracking-wider text-white hover:bg-brand-secondary", children: "Create Another Manual Order" }),
              /* @__PURE__ */ jsx(Link, { href: "/contact", className: "rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-bold hover:text-brand-primary dark:border-gray-700", children: "Contact Us" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  CustomerOrderShow as default
};
