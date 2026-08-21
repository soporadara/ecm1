import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-BSaLUdaW.js";
import { HeartCrack, ShieldAlert, Flame, AlertOctagon, Award } from "lucide-react";
import { motion } from "framer-motion";
import { u as useTranslation } from "./useTranslation-_E1z7JpE.js";
import "react";
import "axios";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function ProhibitedItems() {
  const { t } = useTranslation();
  const categories = [
    {
      title: t("prohibited_items.narcotics.title"),
      subtitle: t("prohibited_items.narcotics.subtitle"),
      icon: HeartCrack,
      color: "from-rose-500 to-red-600",
      lightBg: "bg-rose-50/50 dark:bg-rose-950/10",
      textColor: "text-rose-600 dark:text-rose-400",
      items: [
        t("prohibited_items.narcotics.item1"),
        t("prohibited_items.narcotics.item2"),
        t("prohibited_items.narcotics.item3"),
        t("prohibited_items.narcotics.item4")
      ]
    },
    {
      title: t("prohibited_items.wildlife.title"),
      subtitle: t("prohibited_items.wildlife.subtitle"),
      icon: ShieldAlert,
      color: "from-amber-500 to-orange-600",
      lightBg: "bg-amber-50/50 dark:bg-amber-950/10",
      textColor: "text-amber-600 dark:text-amber-400",
      items: [
        t("prohibited_items.wildlife.item1"),
        t("prohibited_items.wildlife.item2"),
        t("prohibited_items.wildlife.item3"),
        t("prohibited_items.wildlife.item4")
      ]
    },
    {
      title: t("prohibited_items.weapons.title"),
      subtitle: t("prohibited_items.weapons.subtitle"),
      icon: Flame,
      color: "from-orange-500 to-red-600",
      lightBg: "bg-orange-50/50 dark:bg-orange-950/10",
      textColor: "text-orange-600 dark:text-orange-400",
      items: [
        t("prohibited_items.weapons.item1"),
        t("prohibited_items.weapons.item2"),
        t("prohibited_items.weapons.item3"),
        t("prohibited_items.weapons.item4")
      ]
    },
    {
      title: t("prohibited_items.adult.title"),
      subtitle: t("prohibited_items.adult.subtitle"),
      icon: AlertOctagon,
      color: "from-pink-500 to-rose-600",
      lightBg: "bg-pink-50/50 dark:bg-pink-950/10",
      textColor: "text-pink-600 dark:text-pink-400",
      items: [
        t("prohibited_items.adult.item1"),
        t("prohibited_items.adult.item2"),
        t("prohibited_items.adult.item3"),
        t("prohibited_items.adult.item4")
      ]
    }
  ];
  return /* @__PURE__ */ jsxs(MainLayout, { title: t("prohibited_items.page_title"), description: t("prohibited_items.page_desc"), children: [
    /* @__PURE__ */ jsx(Head, { title: `${t("prohibited_items.page_title")} - MVM Logistics` }),
    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden bg-white dark:bg-gray-950 py-20 sm:py-28", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10 opacity-30 dark:opacity-20 blur-3xl", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-10 w-96 h-96 rounded-full bg-red-200 dark:bg-red-900/30" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/3 left-10 w-80 h-80 rounded-full bg-brand-primary/10" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 sm:mb-24", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 0.5 },
              className: "mx-auto w-20 h-20 bg-rose-50 dark:bg-rose-500/10 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-rose-100 dark:border-rose-500/10",
              children: /* @__PURE__ */ jsx(AlertOctagon, { className: "w-10 h-10 text-rose-500 animate-pulse" })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.h1,
            {
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { delay: 0.1, duration: 0.5 },
              className: "text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl font-serif",
              children: t("prohibited_items.heading")
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { delay: 0.2, duration: 0.5 },
              className: "mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto",
              children: t("prohibited_items.subheading")
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-8 sm:grid-cols-2 mb-16", children: categories.map((cat, idx) => {
          const Icon = cat.icon;
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { y: 30, opacity: 0 },
              whileInView: { y: 0, opacity: 1 },
              viewport: { once: true },
              transition: { delay: idx * 0.1, duration: 0.5 },
              whileHover: { y: -6, transition: { duration: 0.2 } },
              className: "relative flex flex-col p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition-all overflow-hidden",
              children: [
                /* @__PURE__ */ jsx("div", { className: `absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cat.color}` }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
                  /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-2xl ${cat.lightBg} flex items-center justify-center shrink-0`, children: /* @__PURE__ */ jsx(Icon, { className: `w-6 h-6 ${cat.textColor}` }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500", children: cat.subtitle }),
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-gray-900 dark:text-white mt-0.5", children: cat.title })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-3.5 flex-1", children: cat.items.map((item, itemIdx) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium", children: [
                  /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-gradient-to-r ${cat.color}` }),
                  /* @__PURE__ */ jsx("span", { children: item })
                ] }, itemIdx)) })
              ]
            },
            cat.title
          );
        }) }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            className: "bg-slate-50 dark:bg-gray-900 rounded-3xl p-8 border border-slate-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 items-start",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Award, { className: "w-6 h-6 text-brand-primary" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-gray-900 dark:text-white mb-2", children: t("prohibited_items.legal.title") }),
                /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-600 dark:text-gray-400", children: t("prohibited_items.legal.p1") }),
                /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-600 dark:text-gray-400 mt-4", children: t("prohibited_items.legal.p2") })
              ] })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  ProhibitedItems as default
};
