import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import "react";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
function CustomerShow({ customer, orders, auditLogs }) {
  var _a;
  return /* @__PURE__ */ jsxs(AdminLayout, { title: `Customer ${customer.name}`, children: [
    /* @__PURE__ */ jsx(Head, { title: `Customer - ${customer.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/customers", className: "text-gray-500 hover:text-gray-800 text-sm font-medium mb-2 inline-block", children: "← Back to Customers" }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: customer.name })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-lg font-bold font-mono", children: customer.customer_code })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg", children: customer.avatar ? /* @__PURE__ */ jsx("img", { src: customer.avatar, alt: "Avatar", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-gray-500 flex items-center justify-center h-full", children: (_a = customer.name) == null ? void 0 : _a.charAt(0) }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white", children: customer.name }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4", children: customer.email }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-center mb-6", children: [
            /* @__PURE__ */ jsxs("span", { className: "bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold capitalize", children: [
              customer.firebase_provider || "Email",
              " User"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold", children: "Active" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-left space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Phone:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: customer.phone_e164 || "Not set" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Telegram:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-blue-600", children: customer.telegram_username || "Not set" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Joined:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: new Date(customer.created_at).toLocaleDateString() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-3", children: "Delivery Address" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded", children: customer.address_line_1 ? /* @__PURE__ */ jsxs(Fragment, { children: [
            customer.address_line_1,
            /* @__PURE__ */ jsx("br", {}),
            customer.city
          ] }) : "No address provided yet." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Order History" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxs("a", { href: `/admin/logistics/customers/${customer.id}/images/export`, className: "text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded font-medium shadow-sm transition-colors flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                "All Images (ZIP)"
              ] }),
              /* @__PURE__ */ jsxs("a", { href: `/admin/logistics/customers/${customer.id}/orders/export`, className: "text-xs bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary px-3 py-1.5 rounded font-medium shadow-sm transition-colors flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
                "Export Excel"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 dark:border-gray-800 text-sm text-gray-500", children: [
              /* @__PURE__ */ jsx("th", { className: "pb-3 font-medium", children: "Order #" }),
              /* @__PURE__ */ jsx("th", { className: "pb-3 font-medium", children: "Date" }),
              /* @__PURE__ */ jsx("th", { className: "pb-3 font-medium", children: "Status" }),
              /* @__PURE__ */ jsx("th", { className: "pb-3 font-medium", children: "Total" }),
              /* @__PURE__ */ jsx("th", { className: "pb-3 font-medium" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: (orders == null ? void 0 : orders.length) > 0 ? orders.map((order) => {
              var _a2, _b;
              return /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "py-3 text-sm font-medium", children: order.order_number }),
                /* @__PURE__ */ jsx("td", { className: "py-3 text-sm text-gray-500", children: new Date(order.created_at).toLocaleDateString() }),
                /* @__PURE__ */ jsx("td", { className: "py-3 text-sm", children: /* @__PURE__ */ jsx("span", { className: "bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs capitalize", children: order.status }) }),
                /* @__PURE__ */ jsxs("td", { className: "py-3 text-sm font-medium", children: [
                  "¥ ",
                  ((_b = (_a2 = order.receipts) == null ? void 0 : _a2[0]) == null ? void 0 : _b.total) || 0
                ] }),
                /* @__PURE__ */ jsx("td", { className: "py-3 text-sm text-right", children: /* @__PURE__ */ jsx(Link, { href: `/admin/orders/${order.id}`, className: "text-brand-primary hover:underline", children: "View" }) })
              ] }, order.id);
            }) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "py-4 text-center text-gray-500 text-sm", children: "No orders yet." }) }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: "Customer Activity Logs" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-60 overflow-y-auto pr-2", children: (auditLogs == null ? void 0 : auditLogs.length) > 0 ? auditLogs.map((log) => /* @__PURE__ */ jsxs("div", { className: "text-sm border-l-2 border-brand-primary pl-3", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 dark:text-white", children: log.action }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: new Date(log.created_at).toLocaleString() })
          ] }, log.id)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "No activity recorded." }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  CustomerShow as default
};
