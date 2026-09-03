import { jsxs, jsx } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
import { u as useTranslation } from "./useTranslation-CqoVm-kK.js";
import { u as useCurrency } from "../ssr.js";
import { ArrowLeft, Search, Filter, PackageCheck, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import "@inertiajs/react/server";
import "react-dom/server";
function MobileOrdersView({ orders, statusToneClass }) {
  const { t } = useTranslation();
  const { formatAmount } = useCurrency();
  const [activeTab, setActiveTab] = useState("All");
  const tabs = [
    { key: "All", label: t("orders.tabs.all", "All") },
    { key: "Progress", label: t("orders.tabs.progress", "Progress") },
    { key: "Purchased", label: t("orders.tabs.purchased", "Purchased") },
    { key: "Warehouse", label: t("orders.tabs.warehouse", "Warehouse") },
    { key: "Shipped", label: t("orders.tabs.shipped", "Shipped") },
    { key: "Delivered", label: t("orders.tabs.delivered", "Delivered") }
  ];
  const filteredOrders = activeTab === "All" ? orders.data : orders.data.filter((order) => {
    if (activeTab === "Progress") return ["pending_review", "quote_provided", "approved"].includes(order.status);
    if (activeTab === "Purchased") return order.status === "purchased";
    if (activeTab === "Warehouse") return order.status === "warehouse_received";
    if (activeTab === "Shipped") return ["shipped", "arrived_destination"].includes(order.status);
    if (activeTab === "Delivered") return order.status === "delivered";
    return true;
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950 pb-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 px-5 pt-8 pb-4 shadow-sm sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", prefetch: ["hover"], className: "w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-brand-primary transition-colors", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-gray-950 dark:text-white", children: t("orders.title", "My Orders") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(Search, { className: "h-5 w-5 text-gray-400" }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: t("orders.search", "Search orders..."),
              className: "w-full pl-11 pr-4 py-3.5 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl text-[15px] text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { className: "w-14 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-700 dark:text-gray-300", children: /* @__PURE__ */ jsx(Filter, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex overflow-x-auto gap-2 mt-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: tabs.map((tab) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab(tab.key),
          className: `relative px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab.key ? "text-white bg-gray-900 dark:bg-white dark:text-gray-900 shadow-md" : "text-gray-500 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200"}`,
          children: tab.label
        },
        tab.key
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-5 mt-6", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filteredOrders.length === 0 ? /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "text-center py-20",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(PackageCheck, { className: "w-10 h-10 text-gray-400" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-950 dark:text-white mb-2", children: t("orders.no_orders", "No Orders Found") }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400", children: t("orders.no_orders_msg", "You don't have any orders matching this status.") })
        ]
      }
    ) : filteredOrders.map((order) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        layout: true,
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        className: "relative mb-4 bg-white dark:bg-gray-900 rounded-[24px] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-green-500 flex items-center pl-6 text-white font-bold", children: [
              /* @__PURE__ */ jsx(PackageCheck, { className: "w-6 h-6 mr-2" }),
              " ",
              t("orders.track", "Track")
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-brand-primary flex items-center justify-end pr-6 text-white font-bold", children: [
              t("orders.contact", "Contact"),
              " ",
              /* @__PURE__ */ jsx(ArrowLeft, { className: "w-6 h-6 ml-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              drag: "x",
              dragConstraints: { left: 0, right: 0 },
              dragElastic: 0.2,
              className: "relative bg-white dark:bg-gray-900 p-5 rounded-[24px] z-10",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: `inline-flex rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider mb-2 ${statusToneClass[order.customer_status_tone] || statusToneClass.blue}`, children: t(`status.${order.customer_status_label}`, order.customer_status_label || "In Progress") }),
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-gray-950 dark:text-white leading-none", children: order.order_number || `#${String(order.id).padStart(5, "0")}` })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-gray-950 dark:text-white", children: formatAmount(order.final_total_amount || order.estimated_total_amount || order.subtotal_amount, order.currency_code || "USD") }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1", children: t(`status.${order.payment_status_label}`, order.payment_status_label || "Unpaid") })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm font-semibold text-gray-600 dark:text-gray-400 py-4 border-y border-gray-50 dark:border-gray-800", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(PackageCheck, { className: "w-4 h-4 text-gray-400" }),
                    order.items_count || 0,
                    " ",
                    t("orders.items", "Items")
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-gray-400" }),
                    new Date(order.created_at).toLocaleDateString()
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-4 flex gap-3", children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: `/my-orders/${order.id}`,
                    className: "flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-950 dark:text-white font-bold py-3.5 rounded-[16px] text-center transition-colors",
                    children: t("orders.view_details", "View Details")
                  }
                ) })
              ]
            }
          )
        ]
      },
      order.id
    )) }) })
  ] });
}
export {
  MobileOrdersView as default
};
