import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-C3efSGPT.js";
import { u as useTranslation } from "./useTranslation-CqoVm-kK.js";
import "react";
import "framer-motion";
import "axios";
import "lucide-react";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function Index({ posts }) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("our_blogs_title") }),
    /* @__PURE__ */ jsx("div", { className: "bg-[#f9fafb] dark:bg-gray-950 min-h-screen py-16 transition-colors duration-300", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-[0.28em] text-[#1c55c0] dark:text-white mb-3", children: "Latest Updates" }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-black text-[#1e293b] dark:text-white font-serif", children: t("our_blogs_title") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.data.map((post) => /* @__PURE__ */ jsxs("article", { className: "ui-card group bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col", children: [
        /* @__PURE__ */ jsxs(Link, { href: `/blog/${post.slug}`, className: "block relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800", children: [
          post.image ? /* @__PURE__ */ jsx("img", { src: post.image, alt: post.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-gray-300 dark:text-gray-700", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
          post.category && /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] font-bold text-[#1c55c0] dark:text-black tracking-wide uppercase shadow-sm", children: post.category.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8 flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider", children: /* @__PURE__ */ jsx("time", { children: new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white leading-tight mb-4 group-hover:text-[#ef5a3d] transition-colors line-clamp-2", children: /* @__PURE__ */ jsx(Link, { href: `/blog/${post.slug}`, children: post.title }) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 font-light line-clamp-2 text-sm mt-auto", children: post.seo_description || "Read more about this topic in our latest article." })
        ] })
      ] }, post.id)) }),
      posts.last_page > 1 && /* @__PURE__ */ jsx("div", { className: "mt-16 flex justify-center gap-2", children: posts.links.map((link, idx) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `px-4 py-2 border rounded-xl transition-colors font-semibold ${link.active ? "bg-[#ef5a3d] text-white border-[#ef5a3d]" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        idx
      )) })
    ] }) })
  ] });
}
export {
  Index as default
};
