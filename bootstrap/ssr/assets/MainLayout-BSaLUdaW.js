import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePage, Link, Head, router } from "@inertiajs/react";
import axios from "axios";
import { Home, PackageCheck, Bell, User, Plus, X, Phone, MapPin, Package, DollarSign, ListOrdered, FileText, Loader2, CheckCircle2, Mail, MessageCircle, ChevronDown, Check, ClipboardList, PhoneCall, Sun, Moon, UserRound, ReceiptText, Shield, LogOut, LogIn, LockKeyhole, Eye, BookOpen, HelpCircle, Zap, ShieldCheck, Truck } from "lucide-react";
import { u as useTranslation } from "./useTranslation-_E1z7JpE.js";
import { u as useCurrency } from "../ssr.js";
import { getGoogleRedirectResult, firebaseIsConfigured, signOutFirebase, signInWithGooglePopupOrRedirect } from "./firebase-BzEe5oE1.js";
function BottomNavigation({ onOpenManualOrder, onOpenAuthModal, unreadNotificationsCount = 0 }) {
  const { url, props } = usePage();
  const { auth } = props;
  const user = auth == null ? void 0 : auth.user;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/my-orders", icon: PackageCheck, label: "Orders" },
    { type: "center-button" },
    { href: "/notifications", icon: Bell, label: "Notifications", count: unreadNotificationsCount },
    { href: "/profile", icon: User, label: "Profile" }
  ];
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 100, opacity: 0 },
      transition: { type: "spring", stiffness: 260, damping: 20 },
      className: "fixed bottom-0 left-0 right-0 z-[100] px-0 flex justify-center pointer-events-none lg:hidden",
      children: /* @__PURE__ */ jsx("div", { className: "relative pointer-events-auto flex items-center justify-between w-full h-[calc(4.75rem+env(safe-area-inset-bottom))] rounded-t-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.2)] px-2 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]", children: navItems.map((item, index) => {
        if (item.type === "center-button") {
          return /* @__PURE__ */ jsxs("div", { className: "relative flex-1 flex justify-center -mt-10", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-full scale-[1.3] -z-10 shadow-sm" }),
            /* @__PURE__ */ jsx(
              motion.button,
              {
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.9 },
                onClick: onOpenManualOrder,
                className: "relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white shadow-lg shadow-brand-primary/30 z-10",
                children: /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6 stroke-[2.5]" })
              }
            )
          ] }, "center");
        }
        const isActive = url === item.href || url.startsWith(`${item.href}/`);
        const Icon = item.icon;
        const requiresAuth = item.href !== "/";
        const inner = /* @__PURE__ */ jsx(
          motion.div,
          {
            whileTap: { scale: 0.85 },
            className: `w-full h-full flex flex-col items-center justify-center transition-colors ${isActive ? "text-brand-primary" : "text-gray-400 dark:text-gray-500"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "relative p-2 rounded-2xl", children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 stroke-[1.5]" }),
              item.count ? /* @__PURE__ */ jsx("span", { className: "absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white dark:border-gray-900" }) : null
            ] })
          }
        );
        if (requiresAuth && !user) {
          return /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onOpenAuthModal,
              className: "flex-1 h-full relative flex items-center justify-center focus:outline-none",
              children: inner
            },
            item.href
          );
        }
        return /* @__PURE__ */ jsx(
          Link,
          {
            href: item.href,
            prefetch: ["mount", "hover"],
            className: "flex-1 h-full relative flex items-center justify-center",
            children: inner
          },
          item.href
        );
      }) })
    }
  ) });
}
function ManualOrderSheet({ isOpen, onClose }) {
  useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    phone_number: "",
    address: "",
    service: "",
    price: "",
    quantity: "1",
    discount: "0",
    notes: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2e3);
    }, 1500);
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose,
        className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden"
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: { type: "spring", damping: 25, stiffness: 200 },
        className: "fixed inset-x-0 bottom-0 z-[151] lg:hidden bg-white dark:bg-gray-950 rounded-t-3xl overflow-hidden max-h-[90vh] flex flex-col shadow-2xl",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-center pt-3 pb-1 shrink-0 bg-white dark:bg-gray-950", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full" }) }),
          /* @__PURE__ */ jsxs("div", { className: "px-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0 bg-white dark:bg-gray-950", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-950 dark:text-white", children: "Create Order" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500", children: "Quick manual entry" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: "w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto px-5 py-6", children: [
            /* @__PURE__ */ jsxs("form", { id: "manual-order-form", onSubmit: handleSubmit, className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xs font-black uppercase tracking-wider text-gray-400", children: "Customer Info" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }) }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      required: true,
                      type: "text",
                      placeholder: "Customer Name",
                      className: "w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400", children: /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }) }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      required: true,
                      type: "tel",
                      placeholder: "Phone Number",
                      className: "w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400", children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5" }) }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      required: true,
                      type: "text",
                      placeholder: "Address / Location",
                      className: "w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-4 border-t border-gray-100 dark:border-gray-900", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xs font-black uppercase tracking-wider text-gray-400", children: "Order Details" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400", children: /* @__PURE__ */ jsx(Package, { className: "w-5 h-5" }) }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      required: true,
                      type: "text",
                      placeholder: "Service / Product Name",
                      className: "w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5" }) }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        required: true,
                        type: "number",
                        placeholder: "Price",
                        className: "w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400", children: /* @__PURE__ */ jsx(ListOrdered, { className: "w-5 h-5" }) }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        required: true,
                        type: "number",
                        min: "1",
                        placeholder: "Qty",
                        className: "w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4 pt-4 border-t border-gray-100 dark:border-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 pt-3.5 pointer-events-none text-gray-400", children: /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    placeholder: "Notes (Optional)",
                    rows: 3,
                    className: "w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow resize-none"
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-6" }),
            " "
          ] }),
          /* @__PURE__ */ jsx("div", { className: "px-5 py-4 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 shrink-0", children: /* @__PURE__ */ jsx(
            motion.button,
            {
              form: "manual-order-form",
              type: "submit",
              disabled: loading || success,
              whileTap: { scale: 0.98 },
              className: `w-full relative flex items-center justify-center h-14 rounded-2xl text-white font-black text-lg transition-colors overflow-hidden ${success ? "bg-green-500" : "bg-brand-primary shadow-lg shadow-brand-primary/20"}`,
              children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: loading ? /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: /* @__PURE__ */ jsx(Loader2, { className: "w-6 h-6 animate-spin" }) }, "loading") : success ? /* @__PURE__ */ jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, exit: { scale: 0 }, children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6" }) }, "success") : /* @__PURE__ */ jsx(motion.span, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: "Submit Order" }, "text") })
            }
          ) })
        ]
      }
    )
  ] }) });
}
function SupportFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const { general_settings } = usePage().props;
  const { t } = useTranslation();
  let links = [];
  if (general_settings == null ? void 0 : general_settings.fab_links) {
    try {
      links = JSON.parse(general_settings.fab_links);
    } catch (e) {
      links = [];
    }
  }
  if (links.length === 0 && general_settings) {
    if (general_settings.fab_email) links.push({ id: "email", name: "Email", url: `mailto:${general_settings.fab_email}`, icon_url: null });
    if (general_settings.fab_phone) links.push({ id: "phone", name: "Phone", url: `tel:${general_settings.fab_phone}`, icon_url: null });
    if (general_settings.fab_messenger) links.push({ id: "messenger", name: "Messenger", url: general_settings.fab_messenger, icon_url: null });
    if (general_settings.fab_telegram) links.push({ id: "telegram", name: "Telegram", url: general_settings.fab_telegram, icon_url: null });
  }
  if (!links || links.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-[80]",
        onClick: () => setIsOpen(false)
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "fixed bottom-32 right-4 lg:bottom-6 lg:right-6 z-[110] flex flex-col items-end gap-3", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex flex-col gap-3 transition-all duration-300 transform origin-bottom ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-75 opacity-0 translate-y-4 pointer-events-none"}`,
          children: links.map((link) => {
            let linkUrl = link.url || "";
            if (!linkUrl.startsWith("http") && !linkUrl.startsWith("mailto:") && !linkUrl.startsWith("tel:")) {
              const nameLower = (link.name || "").toLowerCase();
              const type = link.type || "";
              const cleanPhone = linkUrl.replace(/[\s\+]/g, "");
              if (type === "zalo" || nameLower.includes("zalo")) {
                let zaloPhone = cleanPhone;
                if (zaloPhone.startsWith("84")) zaloPhone = "0" + zaloPhone.substring(2);
                linkUrl = `https://zalo.me/${zaloPhone}`;
              } else if (type === "telegram" || nameLower.includes("telegram") || nameLower.includes("tg")) {
                linkUrl = `https://t.me/+${cleanPhone}`;
              } else if (type === "messenger" || nameLower.includes("messenger") || nameLower.includes("fb") || nameLower.includes("facebook")) {
                linkUrl = `https://m.me/${linkUrl.replace(/\s+/g, "")}`;
              } else if (type === "whatsapp" || nameLower.includes("whatsapp") || nameLower.includes("wa")) {
                linkUrl = `https://wa.me/${cleanPhone}`;
              } else if (type === "email" || nameLower.includes("email")) {
                linkUrl = `mailto:${linkUrl}`;
              } else if (type === "phone" || /^\+?[0-9\s]+$/.test(linkUrl)) {
                linkUrl = `tel:${linkUrl.replace(/\s+/g, "")}`;
              } else {
                linkUrl = `https://${linkUrl}`;
              }
            }
            let fallbackBg = "bg-gray-600";
            if (link.type === "phone" || link.name.toLowerCase().includes("whatsapp") || link.name.toLowerCase().includes("phone")) fallbackBg = "bg-green-500";
            else if (link.type === "messenger" || link.name.toLowerCase().includes("messenger")) fallbackBg = "bg-[#00B2FF]";
            else if (link.type === "telegram" || link.name.toLowerCase().includes("telegram")) fallbackBg = "bg-[#0088cc]";
            else if (link.type === "zalo" || link.name.toLowerCase().includes("zalo")) fallbackBg = "bg-blue-600";
            else if (link.type === "email" || link.name.toLowerCase().includes("email")) fallbackBg = "bg-red-500";
            else if (link.name.toLowerCase().includes("tiktok")) fallbackBg = "bg-black";
            return /* @__PURE__ */ jsxs(
              "a",
              {
                href: linkUrl,
                onClick: (e) => {
                  var _a;
                  if (typeof window !== "undefined" && ((_a = window.Telegram) == null ? void 0 : _a.WebApp) && window.Telegram.WebApp.initData && linkUrl.startsWith("http")) {
                    e.preventDefault();
                    window.Telegram.WebApp.openLink(linkUrl);
                  }
                },
                target: linkUrl.startsWith("http") ? "_blank" : "_self",
                rel: "noopener noreferrer",
                className: "flex items-center gap-2 group",
                title: link.name,
                children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap", children: link.name }),
                  /* @__PURE__ */ jsx("div", { className: `w-12 h-12 ${link.icon_url ? "bg-white" : fallbackBg} text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 overflow-hidden group-hover:brightness-110`, children: link.icon_url ? /* @__PURE__ */ jsx("img", { src: link.icon_url, alt: link.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-6 h-6 flex items-center justify-center group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300", children: link.type === "phone" || link.name.toLowerCase().includes("phone") ? /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6 group-hover:animate-pulse" }) : link.type === "email" || link.name.toLowerCase().includes("email") ? /* @__PURE__ */ jsx(Mail, { className: "w-6 h-6 group-hover:animate-pulse" }) : link.type === "messenger" || link.name.toLowerCase().includes("messenger") ? /* @__PURE__ */ jsx("div", { className: "w-6 h-6 group-hover:animate-bounce", children: /* @__PURE__ */ jsx(MessengerIcon, {}) }) : link.type === "telegram" || link.name.toLowerCase().includes("telegram") ? /* @__PURE__ */ jsx("div", { className: "w-6 h-6 group-hover:animate-bounce", children: /* @__PURE__ */ jsx(TelegramIcon$1, {}) }) : link.type === "zalo" || link.name.toLowerCase().includes("zalo") ? /* @__PURE__ */ jsx("div", { className: "w-6 h-6 group-hover:animate-pulse", children: /* @__PURE__ */ jsx(ZaloIcon, {}) }) : /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" }) }) })
                ]
              },
              link.id
            );
          })
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative flex items-center justify-center bg-orange-500 text-white p-4 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-2xl hover:bg-orange-600 hover:shadow-orange-600/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 cursor-pointer group",
          onClick: () => setIsOpen(!isOpen),
          "aria-label": "Support contacts",
          children: [
            !isOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-full mr-4 bg-gray-900 dark:bg-gray-800 text-white text-sm font-bold py-2 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none", children: [
              t("nav.contact_us", { defaultValue: "Contact Us" }),
              /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 -mt-1 -right-1 border-t-4 border-t-transparent border-l-4 border-l-gray-900 dark:border-l-gray-800 border-b-4 border-b-transparent" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20" }),
            /* @__PURE__ */ jsx("div", { className: `transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`, children: isOpen ? /* @__PURE__ */ jsx("svg", { className: "w-7 h-7", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-7 h-7", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }) })
          ]
        }
      )
    ] })
  ] });
}
function MessengerIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.36 2 2 6.13 2 11.7c0 3.22 1.45 6.06 3.73 7.89V22l2.31-1.28c1.2.33 2.5.51 3.96.51 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm1.18 12.35l-2.07-2.22-4.05 2.22 4.45-4.73 2.1 2.22 4.02-2.22-4.45 4.73z" }) });
}
function TelegramIcon$1() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: /* @__PURE__ */ jsx("path", { d: "M9.78 18.65c-.27 0-.23-.1-.36-.47l-1.42-4.7 10.9-6.47c.5-.3.1-.14-.23.1L5.86 13.1l-.01.01-3.66-1.15c-.8-.25-.8-.8.16-1.18L21.2 3.1c.9-.33 1.7.22 1.4 1.58l-3.23 15.2c-.24 1.15-.92 1.43-1.88.9l-4.9-3.6-2.37 2.28c-.26.26-.48.48-.98.48z" }) });
}
function ZaloIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 5.82 2 10.5c0 2.65 1.43 5.01 3.67 6.54L4.5 21l4.83-2.12c.84.22 1.73.34 2.67.34 5.52 0 10-3.82 10-8.5S17.52 2 12 2zm-1.8 11.8H7.3v-1.2l2.3-3.2H7.5V8.2h4v1.2l-2.3 3.2h2.4v1.2z" }) });
}
const languages = [
  { code: "km", flag: "🇰🇭", label: "ភាសាខ្មែរ" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "vi", flag: "🇻🇳", label: "Tiếng Việt" }
];
const currencies = [
  { code: "USD", symbol: "$", label: "United States Dollar" },
  { code: "VND", symbol: "₫", label: "Vietnamese Dong" }
];
function RegionSettings({ language, changeLanguage, variant = "header", tone = "dark" }) {
  const { currentCurrency, setCurrentCurrency } = useCurrency();
  const [openMenu, setOpenMenu] = useState(null);
  const wrapperRef = useRef(null);
  const languageButtonRef = useRef(null);
  const currencyButtonRef = useRef(null);
  const languageMenuId = useId();
  const currencyMenuId = useId();
  const selectedLanguage = languages.find((item) => item.code === language) || languages[0];
  const selectedCurrency = currencies.find((item) => item.code === currentCurrency) || currencies[0];
  const isDrawer = variant === "drawer";
  const transparentLightText = tone === "light" && !isDrawer;
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    const handleKeyDown = (event) => {
      var _a, _b;
      if (event.key === "Escape") {
        const lastOpen = openMenu;
        setOpenMenu(null);
        if (lastOpen === "language") (_a = languageButtonRef.current) == null ? void 0 : _a.focus();
        if (lastOpen === "currency") (_b = currencyButtonRef.current) == null ? void 0 : _b.focus();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);
  const triggerClass = [
    "inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 active:scale-[0.98] motion-reduce:active:scale-100",
    isDrawer ? "bg-gray-50 text-gray-900 hover:bg-white dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800" : transparentLightText ? "text-gray-950 lg:text-white hover:bg-black/5 lg:hover:bg-white/12 dark:text-white dark:hover:bg-white/10" : "text-gray-950 hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
  ].join(" ");
  const menuClass = [
    "z-[120] min-w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1 shadow-2xl outline-none transition dark:border-gray-700 dark:bg-gray-900",
    isDrawer ? "relative mt-2 w-full" : "absolute right-0 top-full mt-3"
  ].join(" ");
  return /* @__PURE__ */ jsxs("div", { ref: wrapperRef, className: isDrawer ? "space-y-4" : "relative flex items-center gap-2", children: [
    /* @__PURE__ */ jsxs("div", { className: isDrawer ? "relative" : "relative", children: [
      isDrawer && /* @__PURE__ */ jsx("p", { className: "mb-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400", children: "Language" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          ref: languageButtonRef,
          type: "button",
          "aria-haspopup": "listbox",
          "aria-expanded": openMenu === "language",
          "aria-controls": languageMenuId,
          className: triggerClass,
          onClick: () => setOpenMenu(openMenu === "language" ? null : "language"),
          children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: selectedLanguage.flag }),
            /* @__PURE__ */ jsx("span", { children: selectedLanguage.label }),
            /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 transition ${openMenu === "language" ? "rotate-180" : ""}`, "aria-hidden": "true" })
          ]
        }
      ),
      openMenu === "language" && /* @__PURE__ */ jsx("div", { id: languageMenuId, role: "listbox", "aria-label": "Select language", className: menuClass, children: languages.map((item) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": language === item.code,
          "aria-current": language === item.code ? "true" : void 0,
          onClick: () => {
            var _a;
            changeLanguage(item.code);
            setOpenMenu(null);
            (_a = languageButtonRef.current) == null ? void 0 : _a.focus();
          },
          className: `flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 ${language === item.code ? "bg-brand-primary/10 text-brand-primary" : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"}`,
          children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: item.flag }),
              item.label
            ] }),
            language === item.code && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4", "aria-hidden": "true" })
          ]
        },
        item.code
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: isDrawer ? "relative" : "relative hidden lg:block", children: [
      isDrawer && /* @__PURE__ */ jsx("p", { className: "mb-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400", children: "Currency" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          ref: currencyButtonRef,
          type: "button",
          "aria-haspopup": "listbox",
          "aria-expanded": openMenu === "currency",
          "aria-controls": currencyMenuId,
          className: triggerClass,
          onClick: () => setOpenMenu(openMenu === "currency" ? null : "currency"),
          children: [
            /* @__PURE__ */ jsx("span", { children: selectedCurrency.symbol }),
            /* @__PURE__ */ jsx("span", { children: selectedCurrency.code }),
            /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 transition ${openMenu === "currency" ? "rotate-180" : ""}`, "aria-hidden": "true" })
          ]
        }
      ),
      openMenu === "currency" && /* @__PURE__ */ jsx("div", { id: currencyMenuId, role: "listbox", "aria-label": "Select currency", className: menuClass, children: currencies.map((item) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": currentCurrency === item.code,
          onClick: () => {
            var _a;
            setCurrentCurrency(item.code);
            setOpenMenu(null);
            (_a = currencyButtonRef.current) == null ? void 0 : _a.focus();
          },
          className: `flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 ${currentCurrency === item.code ? "bg-brand-primary/10 text-brand-primary" : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"}`,
          children: [
            /* @__PURE__ */ jsxs("span", { children: [
              item.symbol,
              " ",
              item.label,
              " — ",
              item.code
            ] }),
            currentCurrency === item.code && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4", "aria-hidden": "true" })
          ]
        },
        item.code
      )) })
    ] })
  ] });
}
function SeoHead({ title, description, image, keywords }) {
  const { seo_settings } = usePage().props;
  const baseTitle = (seo_settings == null ? void 0 : seo_settings.meta_title) || "Pengu Store";
  const finalTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  const finalDescription = description || (seo_settings == null ? void 0 : seo_settings.meta_description) || "Welcome to our premium e-commerce store.";
  const finalKeywords = keywords || (seo_settings == null ? void 0 : seo_settings.meta_keywords) || "";
  const finalImage = image || (seo_settings == null ? void 0 : seo_settings.og_image) || "";
  const twitterHandle = (seo_settings == null ? void 0 : seo_settings.twitter_handle) || "";
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": baseTitle,
    "image": finalImage || "https://mvmlogistics.asia/logo.png",
    "url": "https://mvmlogistics.asia",
    "email": "info@mvmlogistics.asia",
    "telephone": ["+855317669555", "+84813308055"],
    "areaServed": ["Cambodia", "Vietnam"]
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Cross-Border Logistics",
    "provider": {
      "@type": "LocalBusiness",
      "name": baseTitle
    },
    "description": "Proxy purchasing, customs clearance, and package tracking from China/Vietnam to Cambodia."
  };
  return /* @__PURE__ */ jsxs(Head, { children: [
    /* @__PURE__ */ jsx("title", { children: finalTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: finalDescription }),
    finalKeywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: finalKeywords }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: finalTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: finalDescription }),
    finalImage && /* @__PURE__ */ jsx("meta", { property: "og:image", content: finalImage }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: finalTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: finalDescription }),
    finalImage && /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: finalImage }),
    twitterHandle && /* @__PURE__ */ jsx("meta", { name: "twitter:site", content: twitterHandle }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify(organizationSchema) } }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify(serviceSchema) } })
  ] });
}
const languageStorageToCode = {
  km: "km",
  en: "en",
  vi: "vi",
  "ភាសាខ្មែរ": "km",
  English: "en",
  Khmer: "km",
  "Tiếng Việt": "vi",
  Vietnamese: "vi"
};
const customerNav = [
  { label: "Home", labelKey: "nav.home", href: "/", icon: Home },
  { label: "Manual Order", labelKey: "nav.manual_order", href: "/manual-order", icon: ClipboardList },
  { label: "Contact", labelKey: "nav.contact", href: "/contact", icon: PhoneCall }
];
const customerLinks = [
  { label: "Account Overview", labelKey: "nav.account_overview", href: "/account", icon: User },
  { label: "Personal Information", labelKey: "nav.personal_information", href: "/profile", icon: UserRound },
  { label: "Create Manual Order", labelKey: "nav.create_manual_order", href: "/manual-order", icon: ClipboardList },
  { label: "My Orders", labelKey: "nav.my_orders", href: "/my-orders", icon: PackageCheck },
  { label: "Receipts", labelKey: "nav.receipts", href: "/receipts", icon: ReceiptText },
  { label: "Security", labelKey: "nav.security", href: "/security", icon: Shield },
  { label: "Contact Support", labelKey: "nav.contact_support", href: "/contact", icon: PhoneCall }
];
function GoogleIcon() {
  return /* @__PURE__ */ jsxs("svg", { className: "h-5 w-5 shrink-0", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
    /* @__PURE__ */ jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
    /* @__PURE__ */ jsx("path", { fill: "#FBBC05", d: "M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" }),
    /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z" })
  ] });
}
function TelegramIcon() {
  return /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 shrink-0 fill-current", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.02-.27 0-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.33 3.68-1.5 4.44-1.76 4.94-1.77.11 0 .36.03.52.16.14.11.18.27.19.38 0 .08.01.21 0 .32z" }) });
}
function MainLayout({ children, title, description }) {
  var _a, _b, _c;
  const { auth, general_settings, flash, global_nav, telegram_bot_username, telegram_bot_id } = usePage().props;
  const { url, component } = usePage();
  const isHome = component === "Home";
  const { t, i18n } = useTranslation();
  const [isManualOrderOpen, setIsManualOrderOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isAuthChoiceOpen, setIsAuthChoiceOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [authLoading, setAuthLoading] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [firebaseIsConfiguredState, setFirebaseIsConfiguredState] = useState(false);
  const [isMiniApp, setIsMiniApp] = useState(false);
  const [showModalSigninPassword, setShowModalSigninPassword] = useState(false);
  const [showModalSignupPassword, setShowModalSignupPassword] = useState(false);
  const [showModalConfirmPassword, setShowModalConfirmPassword] = useState(false);
  const [signinForm, setSigninForm] = useState({ email: "", password: "", remember: true });
  const [signupMethod, setSignupMethod] = useState("email");
  const [countryCode, setCountryCode] = useState("+855");
  const [customCountryCode, setCustomCountryCode] = useState("+");
  const [signupForm, setSignupForm] = useState({ name: "", email: "", phone: "", password: "", passwordConfirmation: "", acceptTerms: false });
  const accountRef = useRef(null);
  const accountButtonRef = useRef(null);
  const authCloseButtonRef = useRef(null);
  useEffect(() => {
    if (telegram_bot_id && !document.getElementById("telegram-widget-script")) {
      const script = document.createElement("script");
      script.id = "telegram-widget-script";
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [telegram_bot_id]);
  const handleTelegramWidgetAuth = async (user) => {
    var _a2, _b2;
    setAuthLoading("telegram-widget");
    setAuthError(null);
    try {
      const response = await axios.post("/api/auth/telegram-widget", user);
      if (response.data.success) {
        setIsAuthChoiceOpen(false);
        window.location.assign("/");
      }
    } catch (err) {
      setAuthError(((_b2 = (_a2 = err.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.error) || "Telegram authentication failed.");
    } finally {
      setAuthLoading(null);
    }
  };
  const translatedLabel = (key, fallback) => {
    const translated = t(key);
    return translated === key ? fallback : translated;
  };
  const getPageTitle = (slug, defaultLabel, labelKey) => {
    var _a2;
    const p = (_a2 = global_nav == null ? void 0 : global_nav.pages) == null ? void 0 : _a2.find((p2) => p2.slug === slug);
    const fallback = translatedLabel(labelKey, defaultLabel);
    if (p) {
      const key = `title_${language}`;
      if (p[key]) return p[key];
      if (p.is_system) return fallback;
      return p.title || fallback;
    }
    return fallback;
  };
  const dynamicCustomerNav = customerNav.map((nav) => {
    if (nav.href === "/") {
      return { ...nav, dynamicLabel: getPageTitle("home", nav.label, nav.labelKey) };
    }
    if (nav.href === "/contact") {
      return { ...nav, dynamicLabel: getPageTitle("contact-us", nav.label, nav.labelKey) };
    }
    return { ...nav, dynamicLabel: translatedLabel(nav.labelKey, nav.label) };
  });
  const isCmsUser = Boolean((_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.is_admin) || ["admin", "super_admin", "logistics", "content", "support"].includes((_b = auth == null ? void 0 : auth.user) == null ? void 0 : _b.role);
  const customerUser = (auth == null ? void 0 : auth.user) && !isCmsUser ? auth.user : null;
  Boolean(customerUser && customerUser.profile_is_complete === false);
  const isTransparent = isHome && !isScrolled && !isMobile;
  const headerTheme = isTransparent ? "light" : "dark";
  const isActiveNavItem = (href) => {
    if (href === "/") return url === "/";
    if (href === "/manual-order") return url === "/manual-order" || url.startsWith("/manual-order/");
    return url === href || url.startsWith(`${href}/`);
  };
  useEffect(() => {
    var _a2;
    const savedTheme = localStorage.getItem("theme");
    const nextIsDark = savedTheme === "dark";
    setIsDarkMode(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    const savedLanguage = localStorage.getItem("language");
    const preferredLanguage = languageStorageToCode[savedLanguage || ""] || languageStorageToCode[(_a2 = auth == null ? void 0 : auth.user) == null ? void 0 : _a2.preferred_locale] || "en";
    setLanguage(preferredLanguage);
    if (i18n.language !== preferredLanguage) i18n.changeLanguage(preferredLanguage);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkMobile, { passive: true });
    handleScroll();
    checkMobile();
    const handleOpenLoginModal = () => {
      openAuthModal("signin");
    };
    window.addEventListener("open-login-modal", handleOpenLoginModal);
    if (flash == null ? void 0 : flash.open_login_modal) {
      openAuthModal(flash.open_login_modal);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("open-login-modal", handleOpenLoginModal);
    };
  }, [flash == null ? void 0 : flash.open_login_modal]);
  useEffect(() => {
    var _a2;
    const tg = (_a2 = window.Telegram) == null ? void 0 : _a2.WebApp;
    if (tg && tg.initData && (!customerUser || !customerUser.telegram_id)) {
      setIsMiniApp(true);
      tg.ready();
      tg.expand();
      setAuthLoading("telegram-miniapp");
      axios.post("/api/auth/telegram-miniapp", { initData: tg.initData }).then((res) => {
        if (res.data.success) {
          router.reload({ only: ["auth"] });
        }
      }).catch((err) => {
        var _a3, _b2;
        console.error("Mini App Auth Error:", err);
        setAuthError(((_b2 = (_a3 = err.response) == null ? void 0 : _a3.data) == null ? void 0 : _b2.error) || "Mini App authentication failed");
      }).finally(() => {
        setAuthLoading(null);
      });
    }
  }, [customerUser]);
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      var _a2;
      if (event.key === "Escape") {
        setIsAccountMenuOpen(false);
        setIsAuthChoiceOpen(false);
        (_a2 = accountButtonRef.current) == null ? void 0 : _a2.focus();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = isManualOrderOpen || isAuthChoiceOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isManualOrderOpen, isAuthChoiceOpen]);
  useEffect(() => {
    var _a2;
    if (!isAuthChoiceOpen) return;
    const previouslyFocused = document.activeElement;
    (_a2 = authCloseButtonRef.current) == null ? void 0 : _a2.focus();
    return () => previouslyFocused == null ? void 0 : previouslyFocused.focus();
  }, [isAuthChoiceOpen]);
  const completeBackendLogin = async (idToken, intent, name) => {
    await axios.post("/auth/firebase/session", {
      id_token: idToken,
      intent,
      name,
      locale: i18n.language
    }, {
      headers: {
        "X-App-Locale": i18n.language
      }
    });
    window.location.assign("/");
  };
  useEffect(() => {
    let active = true;
    getGoogleRedirectResult().then(async (result) => {
      if (!active || !(result == null ? void 0 : result.user)) return;
      setAuthLoading("google-signin");
      await completeBackendLogin(await result.user.getIdToken(), "signin");
    }).catch((authError2) => {
      if (!active) return;
      setAuthError(errorMessage(authError2 == null ? void 0 : authError2.code));
      setIsAuthChoiceOpen(true);
    }).finally(() => active && setAuthLoading(null));
    return () => {
      active = false;
    };
  }, []);
  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    localStorage.setItem("language", nextLanguage);
    i18n.changeLanguage(nextLanguage);
  };
  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  const logoutCustomer = async () => {
    try {
      await signOutFirebase();
    } finally {
      router.post("/logout");
    }
  };
  const errorMessage = (code) => {
    switch (code) {
      case "auth/popup-closed-by-user":
      case "auth/cancelled-popup-request":
        return t("login.error_cancelled");
      case "auth/popup-blocked":
        return t("login.error_popup_blocked");
      case "auth/unauthorized-domain":
        return t("login.error_unauthorized_domain");
      case "auth/network-request-failed":
        return t("login.error_network");
      case "auth/email-already-in-use":
        return t("login.error_email_exists");
      case "auth/invalid-email":
        return t("login.error_invalid_email");
      case "auth/invalid-login-credentials":
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return t("login.error_invalid_credentials");
      case "auth/weak-password":
        return t("login.error_weak_password");
      case "auth/not-configured":
        return t("login.error_not_configured");
      default:
        return t("login.error_backend");
    }
  };
  const openAuthModal = (mode = "signin") => {
    setAuthMode(mode);
    setAuthError(null);
    setIsAuthChoiceOpen(true);
  };
  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    setAuthError(null);
  };
  const handleGoogleAuth = async (intent) => {
    var _a2, _b2, _c2, _d, _e, _f;
    setAuthLoading(intent === "signin" ? "google-signin" : "google-signup");
    setAuthError(null);
    try {
      const result = await signInWithGooglePopupOrRedirect();
      if (!(result == null ? void 0 : result.user)) return;
      await completeBackendLogin(await result.user.getIdToken(), intent);
    } catch (authError2) {
      setAuthError(((_b2 = (_a2 = authError2 == null ? void 0 : authError2.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || ((_f = (_e = (_d = (_c2 = authError2 == null ? void 0 : authError2.response) == null ? void 0 : _c2.data) == null ? void 0 : _d.errors) == null ? void 0 : _e.id_token) == null ? void 0 : _f[0]) || errorMessage(authError2 == null ? void 0 : authError2.code));
      setAuthLoading(null);
    }
  };
  const submitModalSignIn = (event) => {
    event.preventDefault();
    setAuthLoading("email-signin");
    setAuthError(null);
    router.post("/login", {
      email: signinForm.email,
      password: signinForm.password,
      remember: signinForm.remember
    }, {
      preserveScroll: true,
      onError: (errors) => {
        setAuthError(errors.email || errors.password || t("login.error_invalid_credentials"));
        setAuthLoading(null);
      },
      onSuccess: () => {
        setIsAuthChoiceOpen(false);
        setAuthLoading(null);
      },
      onFinish: () => {
      }
    });
  };
  const submitModalSignUp = (event) => {
    event.preventDefault();
    setAuthError(null);
    if (signupForm.password !== signupForm.passwordConfirmation) {
      setAuthError(t("login.error_password_mismatch"));
      return;
    }
    if (!signupForm.acceptTerms) {
      setAuthError(t("login.error_terms_required"));
      return;
    }
    setAuthLoading("email-signup");
    router.post("/register", {
      name: signupForm.name,
      email: signupMethod === "email" ? signupForm.email : "",
      phone: signupMethod === "phone" ? countryCode === "other" ? `${customCountryCode} ${signupForm.phone}` : `${countryCode} ${signupForm.phone}` : "",
      password: signupForm.password,
      password_confirmation: signupForm.passwordConfirmation
    }, {
      preserveScroll: true,
      onError: (errors) => {
        setAuthError(errors.email || errors.phone || errors.password || errors.name || t("login.error_backend"));
        setAuthLoading(null);
      },
      onSuccess: () => {
        setIsAuthChoiceOpen(false);
        setAuthLoading(null);
      }
    });
  };
  const navToneClass = isTransparent ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]" : "text-gray-950 dark:text-white";
  const navLinkClass = (href) => {
    const isActive = isActiveNavItem(href);
    const base = "inline-flex min-h-11 items-center gap-2 rounded-2xl px-4 py-2 text-sm font-black uppercase tracking-wider transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 active:scale-95 overflow-hidden relative border border-transparent";
    const glassEffect = "bg-white/20 dark:bg-white/10 backdrop-blur-md border-white/30 dark:border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]";
    let stateClass = "";
    if (isActive) {
      stateClass = isTransparent ? `text-white ${glassEffect} scale-105` : `text-[#1c55c0] dark:text-[#3b82f6] bg-[#1c55c0]/15 dark:bg-[#3b82f6]/20 !border-[#1c55c0]/30 dark:!border-[#3b82f6]/30 shadow-sm`;
    } else {
      stateClass = isTransparent ? `hover:text-white hover:${glassEffect} hover:scale-105` : `hover:text-[#1c55c0] dark:hover:text-[#3b82f6] bg-gradient-to-r from-[#1c55c0]/15 to-[#1c55c0]/15 dark:from-[#3b82f6]/15 dark:to-[#3b82f6]/15 bg-[length:0%_100%] bg-no-repeat bg-center transition-[background-size,border-color,color] duration-300 ease-out hover:bg-[length:100%_100%] hover:!border-[#1c55c0]/30 dark:hover:!border-[#3b82f6]/30`;
    }
    return [base, navToneClass, stateClass].join(" ");
  };
  const iconButtonClass = [
    "inline-flex h-11 w-11 items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 active:scale-[0.98] motion-reduce:active:scale-100",
    isTransparent ? "text-white hover:bg-white/12" : "text-gray-950 hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
  ].join(" ");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[100dvh] overflow-x-hidden bg-white font-sans antialiased text-brand-gray transition-colors duration-300 [--public-header-height:5rem] [--public-header-offset:5rem] dark:bg-gray-950 dark:text-gray-300 lg:[--public-header-height:6rem] lg:[--public-header-offset:6rem]", children: [
    /* @__PURE__ */ jsx(SeoHead, { title, description }),
    /* @__PURE__ */ jsx("a", { href: "#main-content", className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-gray-950 focus:shadow-lg", children: "Skip to content" }),
    /* @__PURE__ */ jsx(
      BottomNavigation,
      {
        onOpenManualOrder: () => {
          if (!customerUser) {
            openAuthModal("signin");
          } else {
            router.visit("/manual-order");
          }
        },
        onOpenAuthModal: () => openAuthModal("signin"),
        unreadNotificationsCount: ((_c = auth == null ? void 0 : auth.user) == null ? void 0 : _c.unread_notifications) || 0
      }
    ),
    /* @__PURE__ */ jsx(
      ManualOrderSheet,
      {
        isOpen: isManualOrderOpen,
        onClose: () => setIsManualOrderOpen(false)
      }
    ),
    /* @__PURE__ */ jsxs(
      "header",
      {
        "data-header-state": isScrolled ? "solid" : "transparent",
        "data-header-theme": headerTheme,
        className: [
          !isHome ? "hidden lg:block" : "",
          "relative lg:fixed w-full inset-x-0 top-0 z-[60] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200 ease-out motion-reduce:transition-none",
          isTransparent ? "border-b border-transparent bg-transparent" : "border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/95"
        ].join(" "),
        children: [
          isTransparent && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-28 hidden lg:block bg-gradient-to-b from-black/45 via-black/20 to-transparent" }),
          /* @__PURE__ */ jsxs("div", { className: "relative mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:h-24 lg:px-8", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center lg:hidden", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: toggleDarkMode, className: iconButtonClass, "aria-label": isDarkMode ? "Switch to light mode" : "Switch to dark mode", children: isDarkMode ? /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(Moon, { className: "h-5 w-5", "aria-hidden": "true" }) }) }),
            /* @__PURE__ */ jsx("nav", { "aria-label": "Primary navigation", className: "hidden items-center gap-1 lg:flex", children: dynamicCustomerNav.map((item) => {
              if (item.href === "/manual-order" && !customerUser) {
                return /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => openAuthModal("signin"),
                    className: navLinkClass(item.href),
                    children: [
                      /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4", "aria-hidden": "true" }),
                      item.dynamicLabel
                    ]
                  },
                  item.href
                );
              }
              return /* @__PURE__ */ jsxs(Link, { href: item.href, prefetch: ["mount", "hover"], className: navLinkClass(item.href), "aria-current": isActiveNavItem(item.href) ? "page" : void 0, children: [
                /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4", "aria-hidden": "true" }),
                item.dynamicLabel
              ] }, item.href);
            }) }),
            /* @__PURE__ */ jsx(Link, { href: "/", prefetch: ["mount", "hover"], className: `inline-flex justify-self-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 ${!isTransparent ? "dark:bg-white dark:p-1.5 dark:shadow-[0_0_0_2px_rgba(255,255,255,0.1)]" : ""}`, children: (general_settings == null ? void 0 : general_settings.store_logo) ? /* @__PURE__ */ jsx(
              "img",
              {
                src: general_settings.store_logo,
                alt: (general_settings == null ? void 0 : general_settings.store_name) || "Store Logo",
                className: "h-14 w-auto object-contain transition-[height] duration-200 lg:h-20"
              }
            ) : /* @__PURE__ */ jsx("span", { className: `text-xl font-black tracking-tight lg:text-2xl ${navToneClass}`, children: (general_settings == null ? void 0 : general_settings.store_name) || "RafelEiffel" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1 lg:gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "block", children: /* @__PURE__ */ jsx(RegionSettings, { language, changeLanguage, tone: isTransparent ? "light" : "dark" }) }),
              /* @__PURE__ */ jsx(Link, { href: "/my-orders", prefetch: ["mount", "hover"], className: `!hidden lg:!inline-flex ${iconButtonClass}`, "aria-label": translatedLabel("nav.my_orders", "My Orders"), children: /* @__PURE__ */ jsx(PackageCheck, { className: "h-5 w-5", "aria-hidden": "true" }) }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: toggleDarkMode, className: `!hidden lg:!inline-flex ${iconButtonClass}`, "aria-label": isDarkMode ? "Switch to light mode" : "Switch to dark mode", children: isDarkMode ? /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(Moon, { className: "h-5 w-5", "aria-hidden": "true" }) }),
              customerUser ? /* @__PURE__ */ jsxs("div", { ref: accountRef, className: "relative hidden lg:block", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    ref: accountButtonRef,
                    type: "button",
                    "aria-haspopup": "menu",
                    "aria-expanded": isAccountMenuOpen,
                    "aria-controls": "customer-account-menu",
                    className: [
                      "inline-flex min-h-11 items-center gap-2 rounded-full px-2.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 active:scale-[0.98] motion-reduce:active:scale-100",
                      isTransparent ? "text-white hover:bg-white/12" : "text-gray-950 hover:bg-black/5 dark:text-white dark:hover:bg-white/10",
                      isAccountMenuOpen ? isTransparent ? "bg-white/14" : "bg-black/5 dark:bg-white/10" : ""
                    ].join(" "),
                    onClick: () => setIsAccountMenuOpen(!isAccountMenuOpen),
                    children: [
                      customerUser.avatar || customerUser.avatar_path ? /* @__PURE__ */ jsx("img", { src: customerUser.avatar || customerUser.avatar_path, alt: "", className: "h-8 w-8 rounded-full object-cover ring-1 ring-white/50" }) : /* @__PURE__ */ jsx("span", { className: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/16 ring-1 ring-current/15", children: /* @__PURE__ */ jsx(UserRound, { className: "h-5 w-5", "aria-hidden": "true" }) }),
                      /* @__PURE__ */ jsx("span", { className: "hidden max-w-[8rem] truncate text-sm font-bold lg:inline xl:max-w-[12rem] 2xl:hidden", children: customerUser.name.split(" ")[0] || customerUser.name }),
                      /* @__PURE__ */ jsx("span", { className: "hidden max-w-[16rem] truncate text-sm font-bold 2xl:inline", children: customerUser.name }),
                      /* @__PURE__ */ jsx(ChevronDown, { className: `hidden h-4 w-4 transition sm:block ${isAccountMenuOpen ? "rotate-180" : ""}`, "aria-hidden": "true" })
                    ]
                  }
                ),
                isAccountMenuOpen && /* @__PURE__ */ jsxs(
                  "div",
                  {
                    id: "customer-account-menu",
                    role: "menu",
                    className: "absolute right-0 top-full z-[130] mt-3 w-[min(22rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 border-b border-gray-100 p-4 dark:border-gray-800", children: [
                        /* @__PURE__ */ jsx("span", { className: "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100", children: customerUser.avatar || customerUser.avatar_path ? /* @__PURE__ */ jsx("img", { src: customerUser.avatar || customerUser.avatar_path, alt: "", className: "h-12 w-12 rounded-full object-cover" }) : /* @__PURE__ */ jsx(UserRound, { className: "h-6 w-6", "aria-hidden": "true" }) }),
                        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-black text-gray-950 dark:text-white", children: customerUser.name }),
                          /* @__PURE__ */ jsx("p", { className: "truncate text-xs font-semibold text-gray-500 dark:text-gray-400", children: customerUser.email }),
                          /* @__PURE__ */ jsx("p", { className: "mt-1 truncate font-mono text-xs font-black text-brand-primary", children: customerUser.customer_code || translatedLabel("nav.customer_id_pending", "Customer ID pending") })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "p-1", children: customerLinks.map((item) => /* @__PURE__ */ jsxs(
                        Link,
                        {
                          href: item.href,
                          role: "menuitem",
                          className: `flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 ${isActiveNavItem(item.href) ? "bg-brand-primary/10 text-brand-primary" : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"}`,
                          onClick: () => setIsAccountMenuOpen(false),
                          children: [
                            /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4", "aria-hidden": "true" }),
                            translatedLabel(item.labelKey, item.label)
                          ]
                        },
                        item.href
                      )) }),
                      /* @__PURE__ */ jsx("div", { className: "border-t border-gray-100 p-1 dark:border-gray-800", children: /* @__PURE__ */ jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: logoutCustomer,
                          role: "menuitem",
                          className: "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-black text-gray-800 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 dark:text-gray-100 dark:hover:bg-gray-800",
                          children: [
                            /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4", "aria-hidden": "true" }),
                            translatedLabel("nav.logout", "Logout")
                          ]
                        }
                      ) })
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => openAuthModal("signin"),
                  className: `${iconButtonClass} hidden lg:inline-flex lg:w-auto lg:px-3`,
                  "aria-label": "Customer login",
                  "aria-haspopup": "dialog",
                  children: [
                    /* @__PURE__ */ jsx(LogIn, { className: "h-5 w-5", "aria-hidden": "true" }),
                    /* @__PURE__ */ jsx("span", { className: "hidden text-sm font-black lg:inline", children: translatedLabel("nav.login", "Login") })
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    ),
    isAuthChoiceOpen && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 z-[180] flex items-end sm:items-center justify-center p-0 sm:p-4 sm:p-6",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "customer-auth-choice-title",
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "absolute inset-0 bg-slate-950/60 backdrop-blur-md",
              onClick: () => setIsAuthChoiceOpen(false),
              "aria-label": "Close login options"
            }
          ),
          /* @__PURE__ */ jsxs("section", { className: "relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-y-auto overflow-x-hidden bg-white shadow-[0_-4px_60px_rgba(15,23,42,0.24)] ring-1 ring-white/40 dark:bg-[#0f172a] dark:ring-white/10 sm:max-w-6xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                ref: authCloseButtonRef,
                type: "button",
                onClick: () => setIsAuthChoiceOpen(false),
                className: "absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm ring-1 ring-slate-200/70 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 dark:bg-slate-800 dark:ring-white/10 dark:text-slate-300 dark:hover:bg-slate-700",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "customer-auth-modal relative grid lg:grid-cols-[1.1fr_1fr]", children: [
              /* @__PURE__ */ jsxs("aside", { className: "relative hidden min-h-[36rem] flex-col justify-center bg-[#f8fafc] p-10 dark:bg-[#1e293b] lg:flex lg:p-14", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-12 flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-white", children: /* @__PURE__ */ jsx("img", { src: (general_settings == null ? void 0 : general_settings.store_logo) || "/logo.png", alt: (general_settings == null ? void 0 : general_settings.store_name) || "MVM Logistics", className: "h-8 w-8 object-contain" }) }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-[0.3em] text-slate-400", children: (general_settings == null ? void 0 : general_settings.store_name) || "MVM Logistics" })
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "max-w-[20rem] text-4xl font-black leading-[1.15] tracking-tight text-slate-900 dark:text-white xl:text-5xl", children: translatedLabel("login.visual_headline", "Manual orders, tracking, and receipts in one place.") }),
                /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-[22rem] text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400", children: translatedLabel("login.visual_desc", "Create requests faster and follow your shipment from review to delivery.") }),
                /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-wrap gap-2", children: ["login.badge_fast", "login.badge_secure", "login.badge_track"].map((key, i) => {
                  const icons = [/* @__PURE__ */ jsx(Zap, { className: "h-4 w-4 text-brand-primary" }, 0), /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-brand-primary" }, 1), /* @__PURE__ */ jsx(Truck, { className: "h-4 w-4 text-brand-primary" }, 2)];
                  return /* @__PURE__ */ jsxs("span", { className: "inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300", children: [
                    icons[i],
                    " ",
                    translatedLabel(key, ["Fast", "Secure", "Track"][i])
                  ] }, i);
                }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col overflow-y-auto p-6 sm:p-10 max-h-[80dvh] sm:max-h-none", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-3 pr-10 lg:hidden", children: [
                  /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow ring-1 ring-slate-200 dark:bg-white", children: /* @__PURE__ */ jsx("img", { src: (general_settings == null ? void 0 : general_settings.store_logo) || "/logo.png", alt: (general_settings == null ? void 0 : general_settings.store_name) || "MVM Logistics", className: "h-7 w-7 object-contain" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[0.6rem] font-black uppercase tracking-[0.3em] text-brand-primary", children: (general_settings == null ? void 0 : general_settings.store_name) || "MVM Logistics" }),
                    /* @__PURE__ */ jsx("h2", { id: "customer-auth-choice-title", className: "truncate text-xl font-black tracking-tight text-slate-950 dark:text-white sm:text-2xl", children: authMode === "signin" ? translatedLabel("nav.customer_login", "Customer Login") : translatedLabel("login.signup_heading", "Create Account") })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mb-1 text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400", children: authMode === "signin" ? translatedLabel("login.signin_description", "Sign in to create Manual Orders and track your deliveries.") : translatedLabel("login.signup_description", "Create an account to submit Manual Orders and follow your order status.") }),
                /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-white/8", role: "tablist", "aria-label": "Authentication mode", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      role: "tab",
                      "aria-selected": authMode === "signin",
                      onClick: () => switchAuthMode("signin"),
                      className: `min-h-[44px] rounded-lg text-sm font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 ${authMode === "signin" ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25" : "text-slate-500 hover:bg-white/70 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"}`,
                      children: translatedLabel("login.signin_tab", "Sign In")
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      role: "tab",
                      "aria-selected": authMode === "signup",
                      onClick: () => switchAuthMode("signup"),
                      className: `min-h-[44px] rounded-lg text-sm font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 ${authMode === "signup" ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"}`,
                      children: translatedLabel("login.signup_tab", "Sign Up")
                    }
                  )
                ] }),
                authError && /* @__PURE__ */ jsx("div", { role: "alert", "aria-live": "assertive", className: "mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 dark:border-red-400/30 dark:bg-red-500/12 dark:text-red-100", children: authError }),
                authMode === "signin" ? /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3", children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleGoogleAuth("signin"),
                      disabled: authLoading !== null || !firebaseIsConfigured,
                      className: "inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950",
                      children: [
                        authLoading === "google-signin" ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsx(GoogleIcon, {}),
                        authLoading === "google-signin" ? t("login.loading") : t("login.continue_google")
                      ]
                    }
                  ),
                  telegram_bot_id && !isMiniApp && /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        var _a2, _b2;
                        if ((_b2 = (_a2 = window.Telegram) == null ? void 0 : _a2.Login) == null ? void 0 : _b2.auth) {
                          setAuthLoading("telegram-widget");
                          window.Telegram.Login.auth(
                            { bot_id: telegram_bot_id, request_access: "write" },
                            (user) => {
                              if (user) {
                                handleTelegramWidgetAuth(user);
                              } else {
                                setAuthLoading(null);
                              }
                            }
                          );
                        } else {
                          setAuthError("Telegram login is not available yet. Please wait a moment.");
                        }
                      },
                      disabled: authLoading !== null,
                      className: "inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950",
                      children: [
                        authLoading === "telegram-widget" ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsx(TelegramIcon, {}),
                        authLoading === "telegram-widget" ? t("login.loading") : t("login.continue_telegram", { defaultValue: "Continue with Telegram" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500", children: [
                    /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-slate-200 dark:bg-white/10" }),
                    t("login.or_continue_email"),
                    /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-slate-200 dark:bg-white/10" })
                  ] }),
                  /* @__PURE__ */ jsxs("form", { onSubmit: submitModalSignIn, className: "space-y-3", children: [
                    /* @__PURE__ */ jsxs("label", { className: "block", children: [
                      /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: t("login.email_or_phone", { defaultValue: "Email address or phone number" }) }),
                      /* @__PURE__ */ jsxs("span", { className: "relative block", children: [
                        /* @__PURE__ */ jsx(Mail, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            value: signinForm.email,
                            onChange: (event) => setSigninForm({ ...signinForm, email: event.target.value }),
                            className: "auth-input-left-icon h-[52px] w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                            placeholder: t("login.email_or_phone", { defaultValue: "Email address or phone number" }),
                            autoComplete: "username",
                            required: true
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("label", { className: "block", children: [
                      /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: t("login.password") }),
                      /* @__PURE__ */ jsxs("span", { className: "relative block", children: [
                        /* @__PURE__ */ jsx(LockKeyhole, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: showModalSigninPassword ? "text" : "password",
                            value: signinForm.password,
                            onChange: (event) => setSigninForm({ ...signinForm, password: event.target.value }),
                            className: "auth-input-left-icon auth-input-has-action h-[52px] w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                            placeholder: t("login.password"),
                            autoComplete: "current-password",
                            required: true
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setShowModalSigninPassword(!showModalSigninPassword),
                            className: "absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 dark:hover:bg-white/10",
                            "aria-label": showModalSigninPassword ? "Hide password" : "Show password",
                            children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 text-xs", children: [
                      /* @__PURE__ */ jsxs("label", { className: "inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 font-bold text-slate-500 dark:text-slate-300", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: signinForm.remember,
                            onChange: (event) => setSigninForm({ ...signinForm, remember: event.target.checked }),
                            className: "rounded border-slate-300 bg-white"
                          }
                        ),
                        t("login.remember_me")
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => window.location.assign("/forgot-password"),
                          className: "font-black text-brand-primary hover:text-brand-secondary hover:underline",
                          children: t("login.forgot_password")
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "submit",
                        disabled: authLoading !== null,
                        className: "inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-brand-primary px-5 text-sm font-black text-white shadow-lg shadow-brand-primary/25 transition hover:-translate-y-0.5 hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 disabled:cursor-not-allowed disabled:opacity-60",
                        children: [
                          authLoading === "email-signin" ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsx(LogIn, { className: "h-5 w-5" }),
                          authLoading === "email-signin" ? t("login.loading") : t("login.signin_button")
                        ]
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: submitModalSignUp, className: "mt-4 space-y-3", children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleGoogleAuth("signup"),
                      disabled: authLoading !== null || !firebaseIsConfigured,
                      className: "inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950",
                      children: [
                        authLoading === "google-signup" ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsx(GoogleIcon, {}),
                        authLoading === "google-signup" ? t("login.loading") : t("login.signup_google")
                      ]
                    }
                  ),
                  telegram_bot_id && !isMiniApp && /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        var _a2, _b2;
                        if ((_b2 = (_a2 = window.Telegram) == null ? void 0 : _a2.Login) == null ? void 0 : _b2.auth) {
                          setAuthLoading("telegram-widget");
                          window.Telegram.Login.auth(
                            { bot_id: telegram_bot_id, request_access: "write" },
                            (user) => {
                              if (user) {
                                handleTelegramWidgetAuth(user);
                              } else {
                                setAuthLoading(null);
                              }
                            }
                          );
                        } else {
                          setAuthError("Telegram login is not available yet. Please wait a moment.");
                        }
                      },
                      disabled: authLoading !== null,
                      className: "inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950",
                      children: [
                        authLoading === "telegram-widget" ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsx(TelegramIcon, {}),
                        authLoading === "telegram-widget" ? t("login.loading") : t("login.signup_telegram", { defaultValue: "Sign up with Telegram" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500", children: [
                    /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-slate-200 dark:bg-white/10" }),
                    t("login.or_signup_email"),
                    /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-slate-200 dark:bg-white/10" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex rounded-lg bg-slate-100 p-1 dark:bg-white/5 mb-2 mt-4", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSignupMethod("email"),
                        className: `flex-1 rounded-md py-1.5 text-xs font-bold transition-colors ${signupMethod === "email" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`,
                        children: t("login.signup_email", { defaultValue: "Sign up with Email" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSignupMethod("phone"),
                        className: `flex-1 rounded-md py-1.5 text-xs font-bold transition-colors ${signupMethod === "phone" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`,
                        children: t("login.signup_phone", { defaultValue: "Sign up with Phone" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                    /* @__PURE__ */ jsxs("label", { className: "block sm:col-span-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: t("login.full_name") }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: signupForm.name,
                          onChange: (event) => setSignupForm({ ...signupForm, name: event.target.value }),
                          className: "h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                          placeholder: t("login.full_name_placeholder"),
                          autoComplete: "name",
                          required: true
                        }
                      )
                    ] }),
                    signupMethod === "email" ? /* @__PURE__ */ jsxs("label", { className: "block sm:col-span-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: t("login.email") }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "email",
                          value: signupForm.email,
                          onChange: (event) => setSignupForm({ ...signupForm, email: event.target.value }),
                          className: "h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                          placeholder: t("login.email"),
                          autoComplete: "email",
                          required: true
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxs("label", { className: "block sm:col-span-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: "Phone Number" }),
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                        countryCode === "other" ? /* @__PURE__ */ jsxs("div", { className: "relative h-[52px] w-[120px] shrink-0", children: [
                          /* @__PURE__ */ jsx(
                            "input",
                            {
                              type: "text",
                              value: customCountryCode,
                              onChange: (e) => setCustomCountryCode(e.target.value),
                              className: "h-full w-full rounded-xl border border-slate-200 bg-white pl-3 pr-8 text-sm font-bold text-slate-950 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                              placeholder: "+Code",
                              required: true
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setCountryCode("+855"),
                              className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200",
                              children: /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                                /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                                /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                              ] })
                            }
                          )
                        ] }) : /* @__PURE__ */ jsxs(
                          "select",
                          {
                            value: countryCode,
                            onChange: (e) => setCountryCode(e.target.value),
                            className: "h-[52px] w-[120px] shrink-0 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-950 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                            children: [
                              /* @__PURE__ */ jsx("option", { value: "+855", children: "🇰🇭 +855" }),
                              /* @__PURE__ */ jsx("option", { value: "+84", children: "🇻🇳 +84" }),
                              /* @__PURE__ */ jsx("option", { value: "+856", children: "🇱🇦 +856" }),
                              /* @__PURE__ */ jsx("option", { value: "+62", children: "🇮🇩 +62" }),
                              /* @__PURE__ */ jsx("option", { value: "other", children: "Other" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "tel",
                            value: signupForm.phone,
                            onChange: (event) => setSignupForm({ ...signupForm, phone: event.target.value }),
                            className: "h-[52px] flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                            placeholder: "e.g. 12 345 678",
                            autoComplete: "tel",
                            required: true
                          }
                        )
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                    /* @__PURE__ */ jsxs("label", { className: "block", children: [
                      /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: t("login.password") }),
                      /* @__PURE__ */ jsxs("span", { className: "relative block", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: showModalSignupPassword ? "text" : "password",
                            value: signupForm.password,
                            onChange: (event) => setSignupForm({ ...signupForm, password: event.target.value }),
                            className: "auth-input-has-action h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                            placeholder: t("login.password"),
                            autoComplete: "new-password",
                            minLength: 8,
                            required: true
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setShowModalSignupPassword(!showModalSignupPassword),
                            className: "absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 dark:hover:bg-white/10",
                            "aria-label": showModalSignupPassword ? "Hide password" : "Show password",
                            children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("label", { className: "block", children: [
                      /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: t("login.confirm_password") }),
                      /* @__PURE__ */ jsxs("span", { className: "relative block", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: showModalConfirmPassword ? "text" : "password",
                            value: signupForm.passwordConfirmation,
                            onChange: (event) => setSignupForm({ ...signupForm, passwordConfirmation: event.target.value }),
                            className: "auth-input-has-action h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                            placeholder: t("login.confirm_password"),
                            autoComplete: "new-password",
                            minLength: 8,
                            required: true
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setShowModalConfirmPassword(!showModalConfirmPassword),
                            className: "absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 dark:hover:bg-white/10",
                            "aria-label": showModalConfirmPassword ? "Hide password" : "Show password",
                            children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
                          }
                        )
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("label", { className: "flex min-h-[44px] cursor-pointer items-start gap-2.5 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-300", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: signupForm.acceptTerms,
                        onChange: (event) => setSignupForm({ ...signupForm, acceptTerms: event.target.checked }),
                        className: "mt-0.5 rounded border-slate-300 bg-white"
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { children: [
                      t("login.terms_prefix"),
                      " ",
                      /* @__PURE__ */ jsx(Link, { href: "/terms-of-service", className: "font-black text-brand-primary hover:underline", children: t("login.terms") }),
                      " ",
                      t("login.and"),
                      " ",
                      /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", className: "font-black text-brand-primary hover:underline", children: t("login.privacy") }),
                      "."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "submit",
                      disabled: authLoading !== null,
                      className: "inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-brand-primary px-5 text-sm font-black text-white shadow-lg shadow-brand-primary/25 transition hover:-translate-y-0.5 hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 disabled:cursor-not-allowed disabled:opacity-60",
                      children: [
                        authLoading === "email-signup" ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsx(Check, { className: "h-5 w-5" }),
                        authLoading === "email-signup" ? t("login.loading") : t("login.create_account")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs("p", { className: "text-center text-xs font-semibold text-slate-500 dark:text-slate-300", children: [
                    t("login.have_account"),
                    " ",
                    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => switchAuthMode("signin"), className: "font-black text-brand-primary hover:text-brand-secondary hover:underline", children: t("login.signin_tab") })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: "/contact",
                    onClick: () => setIsAuthChoiceOpen(false),
                    className: "mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl text-xs font-black text-slate-400 transition hover:bg-slate-50 hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/20 dark:text-slate-500 dark:hover:bg-white/8 dark:hover:text-slate-300",
                    children: translatedLabel("login.contact_support", "Contact Support")
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("main", { id: "main-content", className: `flex min-h-[100dvh] flex-1 flex-col ${isHome ? "" : "lg:pt-[var(--public-header-offset)]"}`, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: "easeOut" },
        className: "flex flex-col flex-1",
        children
      }
    ) }),
    /* @__PURE__ */ jsxs("footer", { className: "relative z-10 border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-950", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-10 md:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Link, { href: "/", className: "inline-flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 dark:bg-white dark:p-1.5 dark:shadow-[0_0_0_2px_rgba(255,255,255,0.1)]", children: (general_settings == null ? void 0 : general_settings.store_logo) ? /* @__PURE__ */ jsx("img", { src: general_settings.store_logo, alt: (general_settings == null ? void 0 : general_settings.store_name) || "Store Logo", className: "h-16 w-auto object-contain" }) : /* @__PURE__ */ jsx("span", { className: "text-2xl font-black text-brand-secondary dark:text-white", children: (general_settings == null ? void 0 : general_settings.store_name) || "RafelEiffel" }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm leading-7 text-gray-600 dark:text-gray-400", children: translatedLabel("footer.logistics_desc", `${(general_settings == null ? void 0 : general_settings.store_name) || "RafelEiffel"} helps customers create manual orders, coordinate product sourcing, and track logistics orders from submission to delivery.`) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-black uppercase tracking-wider text-gray-950 dark:text-white", children: translatedLabel("footer.navigation", "Navigation") }),
          /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3 text-sm font-bold text-gray-600 dark:text-gray-400", children: dynamicCustomerNav.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: item.href, prefetch: ["mount", "hover"], className: "inline-flex min-h-8 items-center gap-2 rounded-lg transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50", children: [
            /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4", "aria-hidden": "true" }),
            item.dynamicLabel
          ] }) }, item.href)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-black uppercase tracking-wider text-gray-950 dark:text-white", children: translatedLabel("footer.customer_service", "Customer Service") }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-5 space-y-3 text-sm font-bold text-gray-600 dark:text-gray-400", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: "/my-orders", prefetch: ["mount", "hover"], className: "inline-flex min-h-8 items-center gap-2 rounded-lg transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50", children: [
              /* @__PURE__ */ jsx(PackageCheck, { className: "h-4 w-4" }),
              translatedLabel("nav.my_orders", "My Orders")
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: "/receipts", prefetch: ["mount", "hover"], className: "inline-flex min-h-8 items-center gap-2 rounded-lg transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50", children: [
              /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
              translatedLabel("nav.receipts", "Receipts")
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: "/blog", prefetch: ["mount", "hover"], className: "inline-flex min-h-8 items-center gap-2 rounded-lg transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50", children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4" }),
              translatedLabel("nav.blog", "Blog")
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: "/contact", prefetch: ["mount", "hover"], className: "inline-flex min-h-8 items-center gap-2 rounded-lg transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50", children: [
              /* @__PURE__ */ jsx(PhoneCall, { className: "h-4 w-4" }),
              translatedLabel("nav.contact_support", "Contact Support")
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: "/#faq", className: "inline-flex min-h-8 items-center gap-2 rounded-lg transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50", children: [
              /* @__PURE__ */ jsx(HelpCircle, { className: "h-4 w-4" }),
              translatedLabel("faq.title", "FAQ")
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-black uppercase tracking-wider text-gray-950 dark:text-white", children: translatedLabel("footer.offline_payment", "Offline Manual Order Payment") }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm leading-7 text-gray-600 dark:text-gray-400", children: translatedLabel("footer.offline_payment_desc", "Our team confirms product pricing, logistics fees, payment instructions, and receipts directly on each order.") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full mt-4 text-[#1c55c0] dark:text-gray-900 leading-none", children: [
        /* @__PURE__ */ jsxs("svg", { className: "block w-full h-[60px] md:h-[120px] dark:opacity-0", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1440 320", preserveAspectRatio: "none", children: [
          /* @__PURE__ */ jsx("path", { fill: "currentColor", fillOpacity: "0.3", d: "M0,160L48,170.7C96,181,192,203,288,181.3C384,160,480,96,576,90.7C672,85,768,139,864,170.7C960,203,1056,213,1152,192C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }),
          /* @__PURE__ */ jsx("path", { fill: "currentColor", fillOpacity: "0.6", d: "M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,213.3C672,213,768,171,864,154.7C960,139,1056,149,1152,160C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }),
          /* @__PURE__ */ jsx("path", { fill: "currentColor", fillOpacity: "1", d: "M0,96L48,122.7C96,149,192,203,288,197.3C384,192,480,128,576,106.7C672,85,768,107,864,144C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-[#1c55c0] dark:bg-gray-900 pb-[calc(7.5rem+env(safe-area-inset-bottom))] lg:pb-8 pt-4 text-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm gap-6 md:gap-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4 font-medium opacity-90 order-2 md:order-1 items-center md:w-1/3 justify-center md:justify-start", children: [
            /* @__PURE__ */ jsx("a", { href: "https://www.facebook.com/MVMLogistics", target: "_blank", rel: "noreferrer", className: "hover:opacity-75 transition-opacity", title: "Facebook", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" }) }) }),
            /* @__PURE__ */ jsx("a", { href: "https://m.me/MVMLogistics", target: "_blank", rel: "noreferrer", className: "hover:opacity-75 transition-opacity", title: "Messenger", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.477 2 2 6.145 2 11.26c0 2.923 1.5 5.518 3.82 7.185V22l3.493-1.921c.85.234 1.748.36 2.687.36 5.523 0 10-4.145 10-9.26C22 6.145 17.523 2 12 2zm1.066 12.63l-2.73-2.905-5.32 2.905 5.862-6.223 2.805 2.906 5.244-2.906-5.861 6.223z" }) }) }),
            /* @__PURE__ */ jsx("a", { href: "https://zalo.me/0317669555", target: "_blank", rel: "noreferrer", className: "hover:opacity-75 transition-opacity", title: "Zalo", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M21.84 10.99c0-5.1-4.78-9.22-10.66-9.22S.52 5.89.52 10.99c0 3.73 2.54 7.02 6.27 8.35v3.4c0 .32.33.54.62.39l4.13-2.06c.32.04.64.07.97.07 5.88 0 10.66-4.12 10.66-9.22z" }) }) }),
            /* @__PURE__ */ jsx("a", { href: "https://t.me/+855317669555", target: "_blank", rel: "noreferrer", className: "hover:opacity-75 transition-opacity", title: "Telegram", children: /* @__PURE__ */ jsx(TelegramIcon, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsx("a", { href: "tel:0317669555", className: "hover:opacity-75 transition-opacity", title: "Phone", children: /* @__PURE__ */ jsx(PhoneCall, { className: "w-5 h-5" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "opacity-90 order-1 md:order-2 text-center flex-1 font-semibold tracking-wide", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " MVM Logistics. All Rights Reserved."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4 font-medium opacity-90 order-3 md:w-1/3 justify-center md:justify-end", children: [
            /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", className: "hover:text-white/70 transition", children: "Privacy Policy" }),
            /* @__PURE__ */ jsx(Link, { href: "/terms-of-service", className: "hover:text-white/70 transition", children: "Terms of Service" }),
            /* @__PURE__ */ jsx(Link, { href: "/prohibited-items", className: "hover:text-white/70 transition", children: "Prohibited Items" })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(SupportFAB, {})
  ] });
}
export {
  MainLayout as M,
  SupportFAB as S
};
