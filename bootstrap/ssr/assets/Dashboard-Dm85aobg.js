import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link, router } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-C3efSGPT.js";
import { u as useTranslation } from "./useTranslation-CqoVm-kK.js";
import { ClipboardList, PackageCheck, ReceiptText, HelpCircle } from "lucide-react";
import "react";
import "framer-motion";
import "axios";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function Dashboard({ auth, stats, recentOrders }) {
  const { t } = useTranslation();
  const shortcuts = [
    {
      title: t("dashboard.shortcuts.manual_order", "Create Manual Order"),
      description: t("dashboard.shortcuts.manual_desc", "Submit products you would like our team to purchase."),
      href: "/manual-order",
      icon: ClipboardList
    },
    {
      title: t("dashboard.shortcuts.my_orders", "My Orders"),
      description: t("dashboard.shortcuts.orders_desc", "View active, completed, delayed, and cancelled orders."),
      href: "/my-orders",
      icon: PackageCheck
    },
    {
      title: t("dashboard.shortcuts.receipts", "Receipts"),
      description: t("dashboard.shortcuts.receipts_desc", "View and download your completed order receipts."),
      href: "/receipts",
      icon: ReceiptText
    },
    {
      title: t("dashboard.shortcuts.support", "Contact Support"),
      description: t("dashboard.shortcuts.support_desc", "Ask our logistics team for help."),
      href: "/contact",
      icon: HelpCircle
    }
  ];
  const handleLogout = () => {
    router.post("/logout");
  };
  return /* @__PURE__ */ jsxs(MainLayout, { title: t("dashboard.title", "Dashboard"), children: [
    /* @__PURE__ */ jsx(Head, { title: t("dashboard.head", "My Dashboard") }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white font-serif", children: t("dashboard.heading", "Customer Dashboard") }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-500 mt-2", children: [
            t("dashboard.customer_id", "Customer ID"),
            ": ",
            /* @__PURE__ */ jsx("span", { className: "font-mono font-bold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded", children: auth.user.customer_code })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxs(Link, { href: "/manual-order", className: "bg-brand-primary text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wide text-sm hover:bg-brand-secondary transition-colors", children: [
            "+ ",
            t("dashboard.create_manual_order", "Create Manual Order")
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: handleLogout, className: "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg font-bold uppercase tracking-wide text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors", children: t("dashboard.logout", "Logout") })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-12", children: [
        { label: t("dashboard.stats.total", "Total Orders"), value: (stats == null ? void 0 : stats.total) || 0, icon: "📦", color: "bg-blue-50 text-blue-600" },
        { label: t("dashboard.stats.pending", "Pending Review"), value: (stats == null ? void 0 : stats.pending) || 0, icon: "⏳", color: "bg-orange-50 text-orange-600" },
        { label: t("dashboard.stats.delivering", "Out for Delivery"), value: (stats == null ? void 0 : stats.delivering) || 0, icon: "🚚", color: "bg-indigo-50 text-indigo-600" },
        { label: t("dashboard.stats.completed", "Completed"), value: (stats == null ? void 0 : stats.completed) || 0, icon: "✅", color: "bg-green-50 text-green-600" }
      ].map((stat, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: `w-14 h-14 rounded-full flex items-center justify-center text-2xl ${stat.color}`, children: stat.icon }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 font-medium", children: stat.label }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: stat.value })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsx("section", { className: "mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", "aria-label": "Customer shortcuts", children: shortcuts.map((shortcut) => /* @__PURE__ */ jsxs(
        Link,
        {
          href: shortcut.href,
          className: "group flex min-h-48 cursor-pointer flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-px hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 active:translate-y-0 dark:border-gray-800 dark:bg-gray-900",
          children: [
            /* @__PURE__ */ jsx("span", { className: "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition group-hover:scale-105", children: /* @__PURE__ */ jsx(shortcut.icon, { className: "h-6 w-6", "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-black text-gray-950 dark:text-white", children: shortcut.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400", children: shortcut.description })
          ]
        },
        shortcut.href
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white", children: t("dashboard.recent_orders", "Recent Orders") }),
          /* @__PURE__ */ jsx(Link, { href: "/my-orders", className: "text-brand-primary text-sm font-bold hover:underline", children: t("dashboard.view_all", "View All &gt;") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm", children: [
            /* @__PURE__ */ jsx("th", { className: "p-4 font-medium", children: t("dashboard.order_number", "Order Number") }),
            /* @__PURE__ */ jsx("th", { className: "p-4 font-medium", children: t("dashboard.date", "Date") }),
            /* @__PURE__ */ jsx("th", { className: "p-4 font-medium", children: t("dashboard.items", "Items") }),
            /* @__PURE__ */ jsx("th", { className: "p-4 font-medium", children: t("dashboard.status", "Status") }),
            /* @__PURE__ */ jsx("th", { className: "p-4 font-medium text-right", children: t("dashboard.action", "Action") })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: recentOrders && recentOrders.length > 0 ? recentOrders.map((order) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4 font-medium text-gray-900 dark:text-white", children: order.order_number }),
            /* @__PURE__ */ jsx("td", { className: "p-4 text-gray-500", children: new Date(order.created_at).toLocaleDateString() }),
            /* @__PURE__ */ jsx("td", { className: "p-4 text-gray-500", children: order.title || `${order.items_count} ${t("dashboard.items_count", "items")}` }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize", children: t(`status.${order.status}`, order.status.replace("_", " ")) }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsx(Link, { href: `/my-orders/${order.id}`, className: "text-brand-primary font-medium hover:underline text-sm", children: t("dashboard.view_details", "View Details") }) })
          ] }, order.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 5, className: "p-8 text-center text-gray-500", children: [
            t("dashboard.no_orders", "No orders found."),
            " ",
            /* @__PURE__ */ jsx(Link, { href: "/manual-order", className: "text-brand-primary hover:underline", children: t("dashboard.create_first", "Create your first order") }),
            "."
          ] }) }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Dashboard as default
};
