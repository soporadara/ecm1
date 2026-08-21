import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { u as useTranslation } from "./useTranslation-_E1z7JpE.js";
import { M as MainLayout } from "./MainLayout-BSaLUdaW.js";
import { ArrowLeft, Moon, Globe, Check, Info, ChevronRight } from "lucide-react";
import { usePage, Link } from "@inertiajs/react";
import "axios";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function Settings() {
  const { i18n } = useTranslation();
  const { general_settings } = usePage().props;
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "km", name: "Khmer", nativeName: "ភាសាខ្មែរ" },
    { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" }
  ];
  return /* @__PURE__ */ jsx(MainLayout, { title: "Settings", description: "App Settings and Preferences", children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950 pb-24", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 px-5 pt-8 pb-4 shadow-sm sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(Link, { href: "/profile", className: "lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-brand-primary transition-colors", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-gray-950 dark:text-white", children: "Settings" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 mt-6 space-y-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xs font-black uppercase tracking-wider text-gray-400 mb-3 ml-2", children: "Appearance" }),
        /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300", children: /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-950 dark:text-white", children: "Dark Mode" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: toggleDark,
              className: `w-12 h-7 rounded-full relative transition-colors duration-200 focus:outline-none ${isDark ? "bg-brand-primary" : "bg-gray-200 dark:bg-gray-700"}`,
              children: /* @__PURE__ */ jsx("div", { className: `absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 transform ${isDark ? "translate-x-5" : "translate-x-0"}` })
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xs font-black uppercase tracking-wider text-gray-400 mb-3 ml-2", children: "Language" }),
        /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden", children: languages.map((lang, index) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => i18n.changeLanguage(lang.code),
            className: `w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${index !== languages.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-500/10 text-blue-500", children: /* @__PURE__ */ jsx(Globe, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsx("span", { className: "block font-bold text-gray-950 dark:text-white", children: lang.name }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-gray-500", children: lang.nativeName })
                ] })
              ] }),
              i18n.language === lang.code && /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-brand-primary" })
            ]
          },
          lang.code
        )) })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xs font-black uppercase tracking-wider text-gray-400 mb-3 ml-2", children: "About App" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300", children: /* @__PURE__ */ jsx(Info, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-950 dark:text-white", children: "Version" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-500", children: "v2.0.0" })
          ] }),
          /* @__PURE__ */ jsxs(Link, { href: "/terms-of-service", className: "flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-950 dark:text-white ml-[56px]", children: "Terms of Service" }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 text-gray-300 dark:text-gray-600" })
          ] }),
          /* @__PURE__ */ jsxs(Link, { href: "/privacy-policy", className: "flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-950 dark:text-white ml-[56px]", children: "Privacy Policy" }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 text-gray-300 dark:text-gray-600" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  Settings as default
};
