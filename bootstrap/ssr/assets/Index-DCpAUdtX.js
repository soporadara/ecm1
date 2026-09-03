import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import { useState } from "react";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
function OrdersIndex({ orders, filters }) {
  var _a;
  const [search, setSearch] = useState((filters == null ? void 0 : filters.search) || "");
  const [status, setStatus] = useState((filters == null ? void 0 : filters.status) || "");
  const handleFilter = () => {
    router.get("/admin/orders", { search, status }, { preserveState: true });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Logistics Orders", children: [
    /* @__PURE__ */ jsx(Head, { title: "Orders Management" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-end mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Orders Management" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-1", children: "Manage manual orders, purchases, and deliveries." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 items-center bg-gray-50 dark:bg-gray-800/50", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search by Order Number or Customer Code...",
            className: "px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 w-full md:w-80"
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: status,
            onChange: (e) => setStatus(e.target.value),
            className: "px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "All Statuses" }),
              /* @__PURE__ */ jsx("option", { value: "pending_review", children: "Pending Review" }),
              /* @__PURE__ */ jsx("option", { value: "quote_provided", children: "Quote Provided" }),
              /* @__PURE__ */ jsx("option", { value: "approved", children: "Approved & Paid" }),
              /* @__PURE__ */ jsx("option", { value: "purchased", children: "Purchased" }),
              /* @__PURE__ */ jsx("option", { value: "warehouse_received", children: "Warehouse Received" }),
              /* @__PURE__ */ jsx("option", { value: "shipped", children: "Shipped" }),
              /* @__PURE__ */ jsx("option", { value: "arrived_destination", children: "Arrived at Destination" }),
              /* @__PURE__ */ jsx("option", { value: "delivered", children: "Delivered" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("button", { onClick: handleFilter, className: "bg-brand-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-secondary", children: "Filter" }),
        /* @__PURE__ */ jsxs("a", { href: `/admin/logistics/orders/export?search=${search}&status=${status}`, className: "bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2 ml-auto", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
          "Export Excel"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 dark:bg-gray-800/30 text-gray-500 text-sm", children: [
          /* @__PURE__ */ jsx("th", { className: "p-4 font-medium", children: "Order #" }),
          /* @__PURE__ */ jsx("th", { className: "p-4 font-medium", children: "Customer" }),
          /* @__PURE__ */ jsx("th", { className: "p-4 font-medium", children: "Items/Description" }),
          /* @__PURE__ */ jsx("th", { className: "p-4 font-medium", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "p-4 font-medium text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: ((_a = orders == null ? void 0 : orders.data) == null ? void 0 : _a.length) > 0 ? orders.data.map((order) => {
          var _a2, _b;
          return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-800/50", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4 font-medium", children: order.order_number }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxs(Link, { href: `/admin/customers/${order.user_id}`, className: "text-brand-primary hover:underline", children: [
              (_a2 = order.user) == null ? void 0 : _a2.name,
              " (",
              (_b = order.user) == null ? void 0 : _b.customer_code,
              ")"
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4 text-gray-500 max-w-xs truncate", children: order.title }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx("span", { className: "inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800", children: order.status }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsx(Link, { href: `/admin/orders/${order.id}`, className: "bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium", children: "Manage" }) })
          ] }, order.id);
        }) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "p-8 text-center text-gray-500", children: "No orders found." }) }) })
      ] }) })
    ] })
  ] });
}
export {
  OrdersIndex as default
};
