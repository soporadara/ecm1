import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import "react";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
const statusColors = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-white",
  shipped: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-white",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
};
function CustomerShow({ customer, orders }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { title: customer.name, children: [
    /* @__PURE__ */ jsx(Head, { title: `${customer.name} — Rafel CMS` }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400", children: [
      /* @__PURE__ */ jsx(Link, { href: "/admin/customers", className: "hover:text-indigo-600 dark:hover:text-white", children: "Customers" }),
      /* @__PURE__ */ jsx("span", { children: "/" }),
      /* @__PURE__ */ jsx("span", { className: "text-gray-900 dark:text-gray-200 font-medium", children: customer.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-white flex items-center justify-center font-bold text-2xl mb-4", children: customer.name.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 dark:text-white", children: customer.name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: customer.email }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 dark:text-gray-500 mt-3", children: [
          "Joined ",
          customer.created_at
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "px-5 py-4 border-b border-gray-100 dark:border-gray-700", children: /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-700 dark:text-gray-300", children: "Order History" }) }),
        orders.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-10 text-gray-400 dark:text-gray-500 text-sm", children: "No orders from this customer yet." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left text-gray-500 dark:text-gray-400", children: [
          /* @__PURE__ */ jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-semibold", children: "Order" }),
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-semibold", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-semibold text-right", children: "Total" }),
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-semibold hidden sm:table-cell", children: "Date" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-700", children: orders.map((o) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "px-5 py-3 font-medium text-indigo-600 dark:text-white", children: o.number }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[o.status] || "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"}`, children: o.status }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-5 py-3 text-right font-semibold text-gray-900 dark:text-white", children: [
              "$",
              Number(o.total).toFixed(2)
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-3 text-gray-400 dark:text-gray-500 text-xs hidden sm:table-cell", children: o.created_at })
          ] }, o.id)) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  CustomerShow as default
};
