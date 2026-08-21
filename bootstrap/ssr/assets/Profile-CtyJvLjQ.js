import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Link, useForm, router, usePage, Head } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-BSaLUdaW.js";
import { signOutFirebase } from "./firebase-BzEe5oE1.js";
import { PackageCheck, Receipt, MapPin, User, Settings, Bell, Shield, HelpCircle, ArrowLeft, LogOut, Loader2, Camera, Edit3, ChevronRight, Check, ArrowRight, Lock, EyeOff, Eye, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { u as useTranslation } from "./useTranslation-_E1z7JpE.js";
import "axios";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "firebase/app";
import "firebase/auth";
function MobileProfileView({ user, logout }) {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("menu");
  const menuGroups = [
    {
      title: t("nav.account_overview"),
      items: [
        { icon: PackageCheck, label: t("nav.my_orders"), href: "/my-orders", color: "text-blue-500", bg: "bg-blue-500/10" },
        { icon: Receipt, label: t("nav.receipts"), href: "/receipts", color: "text-purple-500", bg: "bg-purple-500/10" },
        { icon: MapPin, label: t("nav.addresses"), onPress: () => setActiveSection("address"), color: "text-green-500", bg: "bg-green-500/10" }
      ]
    },
    {
      title: t("nav.settings_preferences"),
      items: [
        { icon: User, label: t("nav.personal_information"), onPress: () => setActiveSection("personal"), color: "text-brand-primary", bg: "bg-brand-primary/10" },
        { icon: Settings, label: t("nav.app_settings"), href: "/settings", color: "text-gray-700 dark:text-gray-300", bg: "bg-gray-200 dark:bg-gray-800" },
        { icon: Bell, label: t("nav.notifications"), href: "/notifications", color: "text-orange-500", bg: "bg-orange-500/10" },
        { icon: Shield, label: t("nav.security"), onPress: () => setActiveSection("security"), color: "text-teal-500", bg: "bg-teal-500/10" }
      ]
    },
    {
      title: t("nav.support_section"),
      items: [
        { icon: HelpCircle, label: t("nav.contact_support"), href: "/contact", color: "text-rose-500", bg: "bg-rose-500/10" }
      ]
    }
  ];
  const handleDragEnd = (e, { offset, velocity }) => {
    if (offset.x > 100 || velocity.x > 500) {
      setActiveSection("menu");
    }
  };
  const dragProps = {
    drag: "x",
    dragConstraints: { left: 0, right: 0 },
    dragElastic: { left: 0, right: 0.5 },
    onDragEnd: handleDragEnd,
    // The drag direction lock prevents the drag from interfering with vertical scrolling
    dragDirectionLock: true
  };
  return /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
    activeSection === "menu" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.18 }, children: /* @__PURE__ */ jsx(MenuView, { user, logout, menuGroups, onEditProfile: () => setActiveSection("personal") }) }, "menu"),
    activeSection === "personal" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: { duration: 0.18 }, ...dragProps, children: /* @__PURE__ */ jsx(PersonalInfoView, { user, onBack: () => setActiveSection("menu") }) }, "personal"),
    activeSection === "address" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: { duration: 0.18 }, ...dragProps, children: /* @__PURE__ */ jsx(AddressView, { user, onBack: () => setActiveSection("menu") }) }, "address"),
    activeSection === "security" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: { duration: 0.18 }, ...dragProps, children: /* @__PURE__ */ jsx(SecurityView, { user, onBack: () => setActiveSection("menu") }) }, "security")
  ] });
}
function MenuView({ user, logout, menuGroups, onEditProfile }) {
  var _a, _b;
  const { t } = useTranslation();
  const avatarInput = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
      setIsUploading(true);
      const formData = new FormData();
      formData.append("avatar", file);
      router.post("/profile/avatar", formData, {
        preserveScroll: true,
        onFinish: () => setIsUploading(false),
        onSuccess: () => setAvatarPreview(null)
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950 pb-28", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-brand-primary pb-12 rounded-b-[2.5rem] relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" }),
      /* @__PURE__ */ jsxs("div", { className: "px-5 pt-12 flex justify-between items-center relative z-10", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", className: "w-12 h-12 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/20 transition-colors", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx("button", { onClick: logout, className: "w-12 h-12 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-red-500/80 transition-colors", children: /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 ml-0.5" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "px-5 mt-5 relative z-10 flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative mb-3", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => {
            var _a2;
            return (_a2 = avatarInput.current) == null ? void 0 : _a2.click();
          }, className: "relative w-24 h-24 rounded-full border-4 border-white/30 overflow-hidden bg-white/10 flex items-center justify-center text-white font-bold text-3xl shadow-xl group", children: [
            isUploading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 z-10", children: /* @__PURE__ */ jsx(Loader2, { className: "w-7 h-7 animate-spin text-white" }) }),
            avatarPreview ? /* @__PURE__ */ jsx("img", { src: avatarPreview, alt: "Preview", className: "w-full h-full object-cover" }) : (user == null ? void 0 : user.avatar) ? /* @__PURE__ */ jsx("img", { src: user.avatar, alt: "Avatar", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("span", { children: ((_b = (_a = user == null ? void 0 : user.name) == null ? void 0 : _a.charAt(0)) == null ? void 0 : _b.toUpperCase()) || "U" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsx(Camera, { className: "w-6 h-6 text-white" }) })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => {
            var _a2;
            return (_a2 = avatarInput.current) == null ? void 0 : _a2.click();
          }, className: "absolute bottom-0 right-0 w-8 h-8 bg-white text-brand-primary rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform", children: /* @__PURE__ */ jsx(Camera, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("input", { type: "file", ref: avatarInput, className: "hidden", accept: "image/*", onChange: handleAvatarChange })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-white", children: user == null ? void 0 : user.name }),
        /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm font-medium mt-1", children: user == null ? void 0 : user.email }),
        (user == null ? void 0 : user.customer_code) && /* @__PURE__ */ jsxs("div", { className: "mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-black/20 rounded-full border border-white/10", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-green-400 animate-pulse" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-white uppercase tracking-wider", children: user.customer_code })
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: onEditProfile, className: "mt-4 flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-bold border border-white/30 hover:bg-white/30 transition-colors", children: [
          /* @__PURE__ */ jsx(Edit3, { className: "w-3.5 h-3.5" }),
          " ",
          t("profile.personal_details")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-5 mt-6 space-y-5", children: menuGroups.map((group, i) => /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.07 }, children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1", children: group.title }),
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden", children: group.items.map((item, j) => {
        const inner = /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full px-4 py-3.5 pointer-events-none", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`, children: /* @__PURE__ */ jsx(item.icon, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: item.label })
          ] }),
          /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" })
        ] });
        const rowClass = `relative block w-full text-left cursor-pointer touch-manipulation active:bg-gray-50 dark:active:bg-gray-800 transition-colors ${j !== group.items.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`;
        if (item.href) {
          return /* @__PURE__ */ jsx(Link, { href: item.href, className: rowClass, children: inner }, item.label);
        }
        return /* @__PURE__ */ jsx("button", { type: "button", onClick: item.onPress, className: rowClass, children: inner }, item.label);
      }) })
    ] }, group.title)) }),
    /* @__PURE__ */ jsx("div", { className: "px-5 mt-8", children: /* @__PURE__ */ jsxs("button", { onClick: logout, className: "w-full bg-red-50 dark:bg-red-500/10 text-red-500 font-bold py-4 rounded-2xl border border-red-100 dark:border-red-500/20 hover:bg-red-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx(LogOut, { className: "w-5 h-5" }),
      " ",
      t("nav.logout")
    ] }) })
  ] });
}
function PersonalInfoView({ user, onBack }) {
  const { t } = useTranslation();
  const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
    name: user.name || "",
    email: user.email || "",
    contact_email: user.contact_email || "",
    phone_e164: user.phone_e164 || "",
    address_line_1: user.address_line_1 || "",
    address_line_2: user.address_line_2 || "",
    city: user.city || "",
    province: user.province || "",
    postal_code: user.postal_code || "",
    country_code: user.country_code || "KH",
    address_notes: user.address_notes || "",
    preferred_locale: user.preferred_locale || user.preferred_language || "km",
    preferred_currency: user.preferred_currency === "VND" ? "VND" : "USD",
    telegram_username: user.telegram_username || "",
    whatsapp_number: user.whatsapp_number || ""
  });
  const submit = (e) => {
    e.preventDefault();
    put("/profile", { preserveScroll: true });
  };
  const inputClass = "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950 pb-28", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onBack, className: "w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-lg font-black text-gray-900 dark:text-white", children: t("nav.personal_information") })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "px-5 pt-6 space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider", children: t("profile.full_name", "Full Name") }),
        /* @__PURE__ */ jsx("input", { type: "text", value: data.name, onChange: (e) => setData("name", e.target.value), className: inputClass, required: true }),
        errors.name && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider", children: t("profile.login_email", "Login Email") }),
        /* @__PURE__ */ jsx("input", { type: "email", value: data.email, onChange: (e) => setData("email", e.target.value), className: inputClass }),
        errors.email && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider", children: "Contact Email" }),
        /* @__PURE__ */ jsx("input", { type: "email", value: data.contact_email, onChange: (e) => setData("contact_email", e.target.value), className: inputClass, placeholder: "Preferred contact email" }),
        errors.contact_email && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.contact_email })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider", children: "Phone Number" }),
        /* @__PURE__ */ jsx("input", { type: "text", value: data.phone_e164, onChange: (e) => setData("phone_e164", e.target.value), placeholder: "+85512345678", className: inputClass }),
        errors.phone_e164 && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.phone_e164 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider", children: "Telegram" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: data.telegram_username, onChange: (e) => setData("telegram_username", e.target.value), placeholder: "@username", className: inputClass })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider", children: "WhatsApp" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: data.whatsapp_number, onChange: (e) => setData("whatsapp_number", e.target.value), placeholder: "+855...", className: inputClass })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider", children: "Language" }),
          /* @__PURE__ */ jsxs("select", { value: data.preferred_locale, onChange: (e) => setData("preferred_locale", e.target.value), className: inputClass, children: [
            /* @__PURE__ */ jsx("option", { value: "km", children: "ភាសាខ្មែរ" }),
            /* @__PURE__ */ jsx("option", { value: "en", children: "English" }),
            /* @__PURE__ */ jsx("option", { value: "vi", children: "Tiếng Việt" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider", children: "Currency" }),
          /* @__PURE__ */ jsxs("select", { value: data.preferred_currency, onChange: (e) => setData("preferred_currency", e.target.value), className: inputClass, children: [
            /* @__PURE__ */ jsx("option", { value: "USD", children: "USD" }),
            /* @__PURE__ */ jsx("option", { value: "VND", children: "VND" })
          ] })
        ] })
      ] }),
      recentlySuccessful && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-3", children: [
        /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
        " Saved successfully!"
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "w-full py-4 rounded-2xl bg-brand-primary text-white font-black text-sm disabled:opacity-50 hover:bg-brand-secondary active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/25", children: processing ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
        " Saving..."
      ] }) : "Save Changes" })
    ] })
  ] });
}
function AddressView({ user, onBack }) {
  const { t } = useTranslation();
  const { data, setData, put, processing, recentlySuccessful } = useForm({
    name: user.name || "",
    contact_email: user.contact_email || "",
    phone_e164: user.phone_e164 || "",
    address_line_1: user.address_line_1 || "",
    address_line_2: user.address_line_2 || "",
    city: user.city || "",
    province: user.province || "",
    postal_code: user.postal_code || "",
    country_code: user.country_code || "KH",
    address_notes: user.address_notes || "",
    preferred_locale: user.preferred_locale || "km",
    preferred_currency: user.preferred_currency || "USD",
    telegram_username: user.telegram_username || "",
    whatsapp_number: user.whatsapp_number || ""
  });
  const submit = (e) => {
    e.preventDefault();
    put("/profile", { preserveScroll: true });
  };
  const inputClass = "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all";
  const labelClass = "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950 pb-28", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onBack, className: "w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-lg font-black text-gray-900 dark:text-white", children: t("nav.addresses", "Address & Delivery") })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "px-5 pt-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, children: t("profile.address_line_1", "Address Line 1") }),
        /* @__PURE__ */ jsx("input", { value: data.address_line_1, onChange: (e) => setData("address_line_1", e.target.value), placeholder: "e.g. 123 Main Street", className: inputClass })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, children: t("profile.address_line_2", "Address Line 2") }),
        /* @__PURE__ */ jsx("input", { value: data.address_line_2, onChange: (e) => setData("address_line_2", e.target.value), placeholder: "Apt, Suite, Floor (optional)", className: inputClass })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: t("profile.city", "City") }),
          /* @__PURE__ */ jsx("input", { value: data.city, onChange: (e) => setData("city", e.target.value), placeholder: "Phnom Penh", className: inputClass })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: t("nav.province", "Province") }),
          /* @__PURE__ */ jsx("input", { value: data.province, onChange: (e) => setData("province", e.target.value), placeholder: "Phnom Penh", className: inputClass })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: t("profile.postal_code", "Postal Code") }),
          /* @__PURE__ */ jsx("input", { value: data.postal_code, onChange: (e) => setData("postal_code", e.target.value), placeholder: "12000", className: inputClass })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: t("profile.country", "Country Code") }),
          /* @__PURE__ */ jsx("input", { value: data.country_code, onChange: (e) => setData("country_code", e.target.value.toUpperCase()), placeholder: "KH", maxLength: 2, className: inputClass })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: "Telegram" }),
          /* @__PURE__ */ jsx("input", { value: data.telegram_username, onChange: (e) => setData("telegram_username", e.target.value), placeholder: "@username", className: inputClass })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: "WhatsApp" }),
          /* @__PURE__ */ jsx("input", { value: data.whatsapp_number, onChange: (e) => setData("whatsapp_number", e.target.value), placeholder: "+855...", className: inputClass })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, children: t("profile.address_notes", "Address Notes") }),
        /* @__PURE__ */ jsx("textarea", { value: data.address_notes, onChange: (e) => setData("address_notes", e.target.value), placeholder: "Special delivery instructions...", rows: 3, className: `${inputClass} resize-none` })
      ] }),
      recentlySuccessful && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-3", children: [
        /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
        " Saved successfully!"
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "w-full py-4 rounded-2xl bg-brand-primary text-white font-black text-sm disabled:opacity-50 hover:bg-brand-secondary active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/25", children: processing ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
        " ",
        t("profile.saving", "Saving...")
      ] }) : t("profile.save_continue", "Save Address") })
    ] })
  ] });
}
function SecurityView({ user, onBack }) {
  const { t } = useTranslation();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showOldPw, setShowOldPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState("");
  const { data, setData, post, processing, reset } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPwError("");
    if (data.password !== data.password_confirmation) {
      setPwError("New passwords do not match.");
      return;
    }
    if (data.password.length < 8) {
      setPwError("Password must be at least 8 characters.");
      return;
    }
    post("/profile/password", {
      preserveScroll: true,
      onSuccess: () => {
        setPwSuccess(true);
        reset();
        setTimeout(() => {
          setPwSuccess(false);
          setShowPasswordForm(false);
        }, 2e3);
      },
      onError: (errors) => {
        setPwError(errors.current_password || errors.password || "Failed to change password.");
      }
    });
  };
  const inputClass = "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all pr-12";
  const isGoogle = user.authentication_provider === "google";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950 pb-28", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onBack, className: "w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-lg font-black text-gray-900 dark:text-white", children: t("nav.security", "Security") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pt-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold text-blue-900 dark:text-white", children: "Sign-in Provider" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-blue-700 dark:text-blue-200", children: [
          "Your account is secured via ",
          /* @__PURE__ */ jsx("strong", { children: isGoogle ? "Google" : "Email & Password" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "px-5 py-3 border-b border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-wider text-gray-400", children: "Account Details" }) }),
        /* @__PURE__ */ jsxs("dl", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: [
          [
            { label: t("profile.login_email", "Login Email"), value: user.email },
            { label: t("profile.customer_id", "Customer ID"), value: user.customer_code || "Pending", mono: true },
            { label: "Last Login", value: user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : "Not recorded" }
          ].map((row) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-5 py-4", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-bold text-gray-700 dark:text-gray-300", children: row.label }),
            /* @__PURE__ */ jsx("dd", { className: `text-sm text-gray-500 dark:text-gray-400 text-right truncate max-w-[10rem] ${row.mono ? "font-mono text-brand-primary font-black" : ""}`, children: row.value })
          ] }, row.label)),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-5 py-4", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-bold text-gray-700 dark:text-gray-300", children: "Email Status" }),
            /* @__PURE__ */ jsx("dd", { children: user.email_verified_at ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-300 px-2.5 py-1 rounded-full", children: [
              /* @__PURE__ */ jsx(Check, { className: "w-3 h-3" }),
              " Verified"
            ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 px-2.5 py-1 rounded-full", children: "Not verified" }) })
          ] })
        ] })
      ] }),
      isGoogle && /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://myaccount.google.com/security",
          target: "_blank",
          rel: "noreferrer",
          className: "block w-full text-left bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full px-5 py-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-900 dark:text-white", children: "Manage Google Account Security" }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-gray-400" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/contact",
          className: "block w-full text-left bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full px-5 py-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-900 dark:text-white", children: "Request Account Help" }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-gray-400" })
          ] })
        }
      ),
      !isGoogle && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setShowPasswordForm((v) => !v);
              setPwError("");
              setPwSuccess(false);
            },
            className: "flex items-center justify-between w-full px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-teal-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Lock, { className: "w-4 h-4 text-teal-500" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-900 dark:text-white", children: "Change / Reset Password" })
              ] }),
              /* @__PURE__ */ jsx(ChevronRight, { className: `w-4 h-4 text-gray-400 transition-transform ${showPasswordForm ? "rotate-90" : ""}` })
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: showPasswordForm && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.2 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxs("form", { onSubmit: handlePasswordChange, className: "px-5 pb-5 space-y-4 border-t border-gray-100 dark:border-gray-800 pt-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider", children: "Current Password" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: showOldPw ? "text" : "password",
                      value: data.current_password,
                      onChange: (e) => setData("current_password", e.target.value),
                      placeholder: "Enter current password",
                      className: inputClass,
                      required: true,
                      autoComplete: "current-password"
                    }
                  ),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowOldPw((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600", children: showOldPw ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider", children: "New Password" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: showNewPw ? "text" : "password",
                      value: data.password,
                      onChange: (e) => setData("password", e.target.value),
                      placeholder: "At least 8 characters",
                      className: inputClass,
                      required: true,
                      autoComplete: "new-password"
                    }
                  ),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowNewPw((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600", children: showNewPw ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider", children: "Confirm New Password" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: showConfirmPw ? "text" : "password",
                      value: data.password_confirmation,
                      onChange: (e) => setData("password_confirmation", e.target.value),
                      placeholder: "Repeat new password",
                      className: inputClass,
                      required: true,
                      autoComplete: "new-password"
                    }
                  ),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowConfirmPw((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600", children: showConfirmPw ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) })
                ] })
              ] }),
              pwError && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3", children: [
                /* @__PURE__ */ jsx(X, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: pwError })
              ] }),
              pwSuccess && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-3", children: [
                /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
                " Password changed successfully!"
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "w-full py-3.5 rounded-2xl bg-brand-primary text-white font-black text-sm disabled:opacity-50 hover:bg-brand-secondary active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/25",
                  children: processing ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                    /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
                    " Changing..."
                  ] }) : "Change Password"
                }
              ),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-center text-gray-500 dark:text-gray-400 leading-relaxed", children: [
                "Forgot your password? Please",
                " ",
                /* @__PURE__ */ jsx(Link, { href: "/contact", className: "text-brand-primary font-bold underline underline-offset-2", children: "contact our admin" }),
                " ",
                "for assistance."
              ] })
            ] })
          }
        ) })
      ] }),
      isGoogle && /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-center", children: [
        "You sign in via Google. To change your password, manage it from your",
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://myaccount.google.com/security", target: "_blank", rel: "noreferrer", className: "text-brand-primary font-bold underline underline-offset-2", children: "Google Account" }),
        "."
      ] }) })
    ] })
  ] });
}
function Profile() {
  const { t } = useTranslation();
  const { auth, telegram_bot_username } = usePage().props;
  const user = auth.user;
  const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
    contact_email: user.contact_email || "",
    phone_e164: user.phone_e164 || "",
    address_line_1: user.address_line_1 || "",
    address_line_2: user.address_line_2 || "",
    city: user.city || "",
    province: user.province || "",
    postal_code: user.postal_code || "",
    country_code: user.country_code || "KH",
    address_notes: user.address_notes || "",
    preferred_locale: user.preferred_locale || user.preferred_language || "en",
    preferred_currency: user.preferred_currency === "VND" ? "VND" : "USD",
    telegram_username: user.telegram_username || "",
    whatsapp_number: user.whatsapp_number || ""
  });
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [smsCode, setSmsCode] = useState("");
  const submitForm = () => {
    put("/profile", {
      preserveScroll: true,
      onSuccess: () => setShowSmsModal(false)
    });
  };
  const updateProfile = (e) => {
    e.preventDefault();
    const originalPhone = user.phone_e164 || "";
    const newPhone = data.phone_e164 || "";
    if (newPhone !== originalPhone && newPhone.length > 0) {
      setShowSmsModal(true);
    } else {
      submitForm();
    }
  };
  const handleSmsVerify = (e) => {
    e.preventDefault();
    if (smsCode === "123456") {
      submitForm();
    } else {
      alert("Invalid verification code. Please use 123456 for testing.");
    }
  };
  const avatarInput = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarForm = useForm({
    avatar: null
  });
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      avatarForm.setData("avatar", file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  const uploadAvatar = (e) => {
    e.preventDefault();
    avatarForm.post("/profile/avatar", {
      preserveScroll: true,
      onSuccess: () => {
        avatarForm.reset();
        if (avatarInput.current) {
          avatarInput.current.value = "";
        }
      }
    });
  };
  const logout = async () => {
    try {
      await signOutFirebase();
    } finally {
      router.post("/logout");
    }
  };
  return /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("profile.account_settings") }),
    /* @__PURE__ */ jsx("div", { className: "block lg:hidden", children: /* @__PURE__ */ jsx(MobileProfileView, { user, logout }) }),
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:block max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-gray-900 dark:text-white", children: t("profile.account_settings") }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: logout,
            className: "px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-full transition-colors",
            children: t("profile.sign_out")
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-32 h-32 rounded-full border-4 border-gray-100 dark:border-gray-900 overflow-hidden bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-500 font-bold text-4xl", children: avatarPreview ? /* @__PURE__ */ jsx("img", { src: avatarPreview, alt: "Avatar Preview", className: "w-full h-full object-cover" }) : user.avatar ? /* @__PURE__ */ jsx("img", { src: user.avatar, alt: "Avatar", className: "w-full h-full object-cover" }) : user.name.charAt(0).toUpperCase() }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                var _a;
                return (_a = avatarInput.current) == null ? void 0 : _a.click();
              },
              className: "absolute bottom-0 right-0 p-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:scale-105 transition-transform",
              title: "Change Avatar",
              children: /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" }),
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 13a3 3 0 11-6 0 3 3 0 016 0z" })
              ] })
            }
          ),
          /* @__PURE__ */ jsx("input", { type: "file", ref: avatarInput, className: "hidden", accept: "image/*", onChange: handleAvatarChange })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center md:text-left", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: user.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-500 dark:text-gray-400 mt-1", children: [
            t("profile.customer_id"),
            ": ",
            /* @__PURE__ */ jsx("span", { className: "font-mono font-bold text-brand-primary", children: user.customer_code || "Pending" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: [
            t("profile.login_email"),
            ": ",
            user.email
          ] }),
          avatarForm.data.avatar && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: uploadAvatar,
              disabled: avatarForm.processing,
              className: "mt-4 px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50",
              children: avatarForm.processing ? t("profile.uploading") : t("profile.save_picture")
            }
          ),
          avatarForm.errors.avatar && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 mt-2", children: avatarForm.errors.avatar })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white mb-6", children: t("profile.personal_details") }),
          /* @__PURE__ */ jsxs("form", { onSubmit: updateProfile, className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("profile.full_name") }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.name,
                  onChange: (e) => setData("name", e.target.value),
                  className: "w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                }
              ),
              errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 mt-1", children: errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("profile.login_email") }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  value: data.email,
                  onChange: (e) => setData("email", e.target.value),
                  className: "w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                }
              ),
              errors.email && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 mt-1", children: errors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("profile.preferred_contact_email") }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  value: data.contact_email,
                  onChange: (e) => setData("contact_email", e.target.value),
                  className: "w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                }
              ),
              errors.contact_email && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 mt-1", children: errors.contact_email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("profile.phone_number") }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.phone_e164,
                  onChange: (e) => setData("phone_e164", e.target.value),
                  placeholder: "+1234567890",
                  className: "w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                }
              ),
              errors.phone_e164 && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 mt-1", children: errors.phone_e164 })
            ] }),
            /* @__PURE__ */ jsx("hr", { className: "border-gray-200 dark:border-gray-800 my-6" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("profile.language") }),
                /* @__PURE__ */ jsxs("select", { value: data.preferred_locale, onChange: (e) => setData("preferred_locale", e.target.value), className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900", children: [
                  /* @__PURE__ */ jsx("option", { value: "km", children: "ភាសាខ្មែរ" }),
                  /* @__PURE__ */ jsx("option", { value: "en", children: "English" }),
                  /* @__PURE__ */ jsx("option", { value: "vi", children: "Tiếng Việt" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("profile.preferred_currency") }),
                /* @__PURE__ */ jsxs("select", { value: data.preferred_currency, onChange: (e) => setData("preferred_currency", e.target.value), className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900", children: [
                  /* @__PURE__ */ jsx("option", { value: "USD", children: "USD - United States Dollar" }),
                  /* @__PURE__ */ jsx("option", { value: "VND", children: "VND - Vietnamese Dong" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-2 flex items-center justify-between", children: [
              recentlySuccessful && /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-green-600 dark:text-green-400", children: "Saved successfully!" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "ml-auto px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50",
                  children: processing ? "Saving..." : "Save Changes"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white mb-6", children: t("profile.address.title", "Address & Contact Apps") }),
          /* @__PURE__ */ jsxs("form", { onSubmit: updateProfile, className: "space-y-5", children: [
            /* @__PURE__ */ jsx("input", { value: data.address_line_1, onChange: (e) => setData("address_line_1", e.target.value), placeholder: t("profile.address.line1", "Address line 1"), className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" }),
            /* @__PURE__ */ jsx("input", { value: data.address_line_2, onChange: (e) => setData("address_line_2", e.target.value), placeholder: t("profile.address.line2", "Address line 2"), className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3", children: [
              /* @__PURE__ */ jsx("input", { value: data.city, onChange: (e) => setData("city", e.target.value), placeholder: t("profile.address.city", "City"), className: "rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" }),
              /* @__PURE__ */ jsx("input", { value: data.province, onChange: (e) => setData("province", e.target.value), placeholder: t("profile.address.province", "Province"), className: "rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" }),
              /* @__PURE__ */ jsx("input", { value: data.postal_code, onChange: (e) => setData("postal_code", e.target.value), placeholder: t("profile.address.postal_code", "Postal code"), className: "rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3", children: [
              /* @__PURE__ */ jsx("input", { value: data.country_code, onChange: (e) => setData("country_code", e.target.value.toUpperCase()), placeholder: t("profile.address.country_code", "KH"), maxLength: 2, className: "rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" }),
              /* @__PURE__ */ jsx("input", { value: data.telegram_username, onChange: (e) => setData("telegram_username", e.target.value), placeholder: t("profile.address.telegram", "@telegram"), className: "rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" }),
              /* @__PURE__ */ jsx("input", { value: data.whatsapp_number, onChange: (e) => setData("whatsapp_number", e.target.value), placeholder: t("profile.address.whatsapp", "WhatsApp number"), className: "rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" })
            ] }),
            /* @__PURE__ */ jsx("textarea", { value: data.address_notes, onChange: (e) => setData("address_notes", e.target.value), placeholder: t("profile.address.notes", "Address notes"), rows: 3, className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "w-full rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200", children: processing ? t("profile.saving", "Saving...") : t("profile.address.save", "Save Address") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white mb-6", children: "Security" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-white", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Sign-in provider: Google" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2", children: "Your customer login is protected by Google Firebase Authentication. Manage passwords and two-step verification from your Google Account." })
            ] }),
            /* @__PURE__ */ jsxs("dl", { className: "space-y-3 text-sm text-gray-600 dark:text-gray-300", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4", children: [
                /* @__PURE__ */ jsx("dt", { className: "font-bold text-gray-900 dark:text-white", children: "Locked login email" }),
                /* @__PURE__ */ jsx("dd", { className: "text-right", children: user.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4", children: [
                /* @__PURE__ */ jsx("dt", { className: "font-bold text-gray-900 dark:text-white", children: "Customer ID" }),
                /* @__PURE__ */ jsx("dd", { className: "font-mono text-right", children: user.customer_code || "Pending" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4", children: [
                /* @__PURE__ */ jsx("dt", { className: "font-bold text-gray-900 dark:text-white", children: "Last login" }),
                /* @__PURE__ */ jsx("dd", { className: "text-right", children: user.last_login_at ? new Date(user.last_login_at).toLocaleString() : "Not recorded" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("a", { href: "https://myaccount.google.com/security", target: "_blank", rel: "noreferrer", className: "inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-gray-200 px-4 text-sm font-black text-gray-800 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-100 dark:hover:bg-gray-900", children: "Manage Google Account Security" }),
            /* @__PURE__ */ jsx(Link, { href: "/contact", className: "inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gray-950 px-4 text-sm font-black text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200", children: "Request Account Help" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8 mt-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white mb-6", children: "Telegram Integration" }),
          user.telegram_id ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-green-100 bg-green-50/50 p-5 text-sm text-green-900 dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-100", children: [
            /* @__PURE__ */ jsxs("p", { className: "font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-green-500 inline-block animate-pulse" }),
              "Linked with Telegram"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2", children: [
              "Your account is linked to Telegram ID: ",
              /* @__PURE__ */ jsx("strong", { className: "font-mono", children: user.telegram_id }),
              " ",
              user.telegram_username ? `(@${user.telegram_username})` : "",
              ". You can use Telegram Bot OTP verification codes to log in securely."
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-amber-100 bg-amber-50/50 p-5 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-100", children: [
            /* @__PURE__ */ jsxs("p", { className: "font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" }),
              "Telegram Not Linked"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 mb-4", children: "Link your Telegram account to receive 6-digit login verification codes (OTP) directly to your Telegram chat." }),
            telegram_bot_username ? /* @__PURE__ */ jsx(
              "a",
              {
                href: `https://t.me/${telegram_bot_username}?start=link_${user.id}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center justify-center rounded-xl bg-brand-primary px-4 py-2 text-xs font-black text-white shadow-sm hover:bg-brand-secondary transition",
                children: "Link Telegram Account"
              }
            ) : /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold", children: "Telegram configuration missing. Please check .env settings." })
          ] })
        ] })
      ] })
    ] }),
    showSmsModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "Verify Your Phone Number" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 dark:text-gray-400 mb-6", children: [
        "We've sent an SMS with a verification code to ",
        /* @__PURE__ */ jsx("strong", { children: data.phone_e164 }),
        ". (For testing, please enter ",
        /* @__PURE__ */ jsx("strong", { children: "123456" }),
        ")."
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSmsVerify, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "6-Digit Code" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: smsCode,
              onChange: (e) => setSmsCode(e.target.value),
              maxLength: 6,
              className: "w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white text-center tracking-[0.5em] text-lg transition-all",
              placeholder: "••••••",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowSmsModal(false),
              className: "flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "flex-1 px-4 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50",
              children: processing ? "Verifying..." : "Verify & Save"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Profile as default
};
