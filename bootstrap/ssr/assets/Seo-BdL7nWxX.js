import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import toast from "react-hot-toast";
import "react";
import "react-dom";
import "lucide-react";
function SeoSettings({ seoSettings }) {
  const { data, setData, post, processing, errors } = useForm({
    meta_title: seoSettings.meta_title || "",
    meta_description: seoSettings.meta_description || "",
    meta_keywords: seoSettings.meta_keywords || "",
    og_image: seoSettings.og_image || "",
    twitter_handle: seoSettings.twitter_handle || ""
  });
  const submit = (e) => {
    e.preventDefault();
    post("/admin/seo", {
      preserveScroll: true,
      onSuccess: () => toast.success("SEO settings updated successfully!"),
      onError: () => toast.error("Failed to update SEO settings.")
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "SEO Settings", children: [
    /* @__PURE__ */ jsx(Head, { title: "SEO Settings — Rafel CMS" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "SEO & Meta Data" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Configure global search engine optimization settings for the storefront." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "p-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Global Meta Title" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.meta_title,
                onChange: (e) => setData("meta_title", e.target.value),
                className: "w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                placeholder: "e.g., Pengu Store - Premium Products",
                required: true
              }
            ),
            errors.meta_title && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 dark:text-red-400", children: errors.meta_title }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-2", children: "Appears in search engine results and browser tabs." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Global Meta Description" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.meta_description,
                onChange: (e) => setData("meta_description", e.target.value),
                rows: 4,
                className: "w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                placeholder: "Discover the best premium products...",
                required: true
              }
            ),
            errors.meta_description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 dark:text-red-400", children: errors.meta_description })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Meta Keywords" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.meta_keywords,
                onChange: (e) => setData("meta_keywords", e.target.value),
                className: "w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                placeholder: "ecommerce, premium, fashion"
              }
            ),
            errors.meta_keywords && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 dark:text-red-400", children: errors.meta_keywords }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-2", children: "Separate keywords with commas." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "OpenGraph Image URL (Social Sharing)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.og_image,
                onChange: (e) => setData("og_image", e.target.value),
                className: "w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                placeholder: "https://example.com/social-share.jpg"
              }
            ),
            errors.og_image && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 dark:text-red-400", children: errors.og_image }),
            data.og_image && /* @__PURE__ */ jsx("div", { className: "mt-3 relative w-full h-40 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsx("img", { src: data.og_image, alt: "OG Preview", className: "w-full h-full object-cover", onError: (e) => {
              e.target.src = "https://placehold.co/600x315?text=Invalid+Image+URL";
            } }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Twitter Handle" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.twitter_handle,
                onChange: (e) => setData("twitter_handle", e.target.value),
                className: "w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                placeholder: "@pengustore"
              }
            ),
            errors.twitter_handle && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 dark:text-red-400", children: errors.twitter_handle })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50",
          children: processing ? "Saving..." : "Save SEO Settings"
        }
      ) })
    ] }) })
  ] });
}
export {
  SeoSettings as default
};
