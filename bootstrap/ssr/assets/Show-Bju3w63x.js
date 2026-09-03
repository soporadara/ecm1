import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-C3efSGPT.js";
import "react";
import "framer-motion";
import "axios";
import "lucide-react";
import "./useTranslation-CqoVm-kK.js";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function Show({ page }) {
  return /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: page.seo_title || page.title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: page.seo_description || "" })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `py-16 md:py-24 text-center relative ${page.banner_image ? "bg-black text-white" : "bg-gray-100 text-gray-900"}`,
        style: page.banner_image ? { backgroundImage: `url(${page.banner_image})`, backgroundSize: "cover", backgroundPosition: "center" } : {},
        children: [
          page.banner_image && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50" }),
          /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsx("h1", { className: `text-4xl md:text-5xl font-bold ${page.banner_image ? "text-white" : "text-gray-900"}`, children: page.title }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: page.content ? /* @__PURE__ */ jsx(
      "div",
      {
        className: "prose prose-lg prose-brand max-w-none text-gray-800",
        dangerouslySetInnerHTML: { __html: page.content }
      }
    ) : /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center py-20", children: "This page is currently empty." }) })
  ] });
}
export {
  Show as default
};
