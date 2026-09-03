import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import "react";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
function Themes({ active_theme }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Themes", children: [
    /* @__PURE__ */ jsx(Head, { title: "Themes - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Themes" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Manage your storefront appearance." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border-2 border-brand-primary", children: [
        /* @__PURE__ */ jsxs("div", { className: "h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center relative overflow-hidden group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-white text-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black uppercase tracking-widest", children: active_theme.name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm opacity-80 mt-1", children: "The Default Headless Theme" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold text-gray-900 dark:text-white", children: [
                active_theme.name,
                " ",
                /* @__PURE__ */ jsxs("span", { className: "text-xs font-normal text-gray-500 ml-2", children: [
                  "v",
                  active_theme.version
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                "By ",
                active_theme.author
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "px-2.5 py-1 text-xs font-bold bg-brand-primary text-white rounded-full", children: "Active" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-4 h-12", children: active_theme.description }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 flex items-center gap-3", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/customize",
              className: "flex-1 text-center bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-secondary transition-colors",
              children: "Customize"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center h-full min-h-[350px] p-6 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-not-allowed group", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-gray-400 dark:text-gray-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-700 dark:text-gray-300", children: "Add New Theme" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-2", children: "Third-party theme support is disabled in this headless configuration." })
      ] })
    ] })
  ] });
}
export {
  Themes as default
};
