import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { u as useTranslation } from "./useTranslation-CqoVm-kK.js";
import { M as MainLayout } from "./MainLayout-C3efSGPT.js";
import { ArrowLeft, Bell, AlertCircle, User, CreditCard, Package } from "lucide-react";
import { usePage, Link } from "@inertiajs/react";
import "axios";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function Notifications() {
  useTranslation();
  const { auth } = usePage().props;
  const user = auth == null ? void 0 : auth.user;
  const [notifications, setNotifications] = useState(() => {
    if (!user) return [];
    return [];
  });
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  const clearAll = () => {
    setNotifications([]);
  };
  const toggleRead = (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: !n.read } : n));
  };
  const getIcon = (type) => {
    switch (type) {
      case "order":
        return /* @__PURE__ */ jsx(Package, { className: "w-5 h-5 text-blue-500" });
      case "payment":
        return /* @__PURE__ */ jsx(CreditCard, { className: "w-5 h-5 text-green-500" });
      case "account":
        return /* @__PURE__ */ jsx(User, { className: "w-5 h-5 text-brand-primary" });
      default:
        return /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-orange-500" });
    }
  };
  const getIconBg = (type) => {
    switch (type) {
      case "order":
        return "bg-blue-500/10";
      case "payment":
        return "bg-green-500/10";
      case "account":
        return "bg-brand-primary/10";
      default:
        return "bg-orange-500/10";
    }
  };
  return /* @__PURE__ */ jsx(MainLayout, { title: "Notifications", description: "View all system and order updates", children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950 pb-24", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 px-5 pt-8 pb-4 shadow-sm sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Link, { href: "/profile", className: "lg:hidden w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-brand-primary transition-colors", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-black text-gray-950 dark:text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Bell, { className: "w-6 h-6 text-brand-primary" }),
          "Notifications"
        ] })
      ] }),
      notifications.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: markAllAsRead,
            className: "p-2 text-xs font-bold text-brand-primary hover:bg-brand-primary/10 rounded-xl transition",
            children: "Mark all read"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: clearAll,
            className: "p-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition",
            children: "Clear all"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "px-5 mt-6", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: notifications.length === 0 ? /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "flex flex-col items-center justify-center py-20 text-center",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-400 mb-4", children: /* @__PURE__ */ jsx(Bell, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-gray-900 dark:text-white", children: "All caught up!" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1 max-w-[200px]", children: "You have no new notifications at the moment." })
        ]
      }
    ) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: notifications.map((notification, index) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { delay: index * 0.05 },
        onClick: () => toggleRead(notification.id),
        className: `p-4 rounded-3xl border border-gray-100 dark:border-gray-800 cursor-pointer transition-all shadow-sm flex items-start gap-4 ${notification.read ? "bg-white/60 dark:bg-gray-900/60 opacity-70" : "bg-white dark:bg-gray-900 border-l-4 border-l-brand-primary"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${getIconBg(notification.type)}`, children: getIcon(notification.type) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start gap-2", children: [
              /* @__PURE__ */ jsx("h3", { className: `text-sm font-black text-gray-950 dark:text-white truncate ${!notification.read ? "font-black" : "font-bold"}`, children: notification.title }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-400 whitespace-nowrap shrink-0 mt-0.5", children: notification.time })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1 leading-relaxed break-words", children: notification.description })
          ] })
        ]
      },
      notification.id
    )) }) }) })
  ] }) });
}
export {
  Notifications as default
};
