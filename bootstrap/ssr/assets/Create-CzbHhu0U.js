import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import toast from "react-hot-toast";
import { R as RichTextEditor } from "./RichTextEditor-DOSQAgn3.js";
import { useState } from "react";
import "react-dom";
import "lucide-react";
import "@tiptap/react";
import "@tiptap/starter-kit";
import "@tiptap/extension-underline";
import "@tiptap/extension-text-align";
import "@tiptap/extension-link";
import "@tiptap/extension-image";
import "@tiptap/core";
import "@tiptap/extension-text-style";
function Create() {
  const [editorMode, setEditorMode] = useState("visual");
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    slug: "",
    content: "",
    seo_title: "",
    seo_description: "",
    banner_image: null,
    is_published: true,
    is_private: false
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/pages", {
      onSuccess: () => toast.success("Page created successfully!")
    });
  };
  const handleFileUpload = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      var _a2;
      const content = (_a2 = event.target) == null ? void 0 : _a2.result;
      setData("content", content);
      setEditorMode("code");
      toast.success("File loaded into code editor");
    };
    reader.readAsText(file);
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Create Page", children: [
    /* @__PURE__ */ jsx(Head, { title: "Create Page - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Link, { href: "/admin/pages", className: "text-gray-500 hover:text-brand-primary transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Create Page" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Add a new static page to your storefront." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden p-6 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary",
              value: data.title,
              onChange: (e) => setData("title", e.target.value),
              required: true
            }
          ),
          errors.title && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Slug (optional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary",
              value: data.slug,
              onChange: (e) => setData("slug", e.target.value)
            }
          ),
          errors.slug && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.slug })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Content" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" }) }),
                "Upload HTML File",
                /* @__PURE__ */ jsx("input", { type: "file", accept: ".html,.txt", className: "hidden", onChange: handleFileUpload })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 dark:bg-gray-700 p-1 rounded-lg inline-flex", children: [
                /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setEditorMode("visual"), className: `px-3 py-1 text-xs font-medium rounded ${editorMode === "visual" ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`, children: "Visual Editor" }),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setEditorMode("code"), className: `px-3 py-1 text-xs font-medium rounded ${editorMode === "code" ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`, children: "Raw Code" })
              ] })
            ] })
          ] }),
          editorMode === "visual" ? /* @__PURE__ */ jsx(
            RichTextEditor,
            {
              value: data.content,
              onChange: (content) => setData("content", content)
            }
          ) : /* @__PURE__ */ jsx(
            "textarea",
            {
              value: data.content,
              onChange: (e) => setData("content", e.target.value),
              className: "w-full h-[500px] font-mono text-sm p-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-green-400 focus:ring-brand-primary focus:border-brand-primary",
              placeholder: "<html>...</html> or <style>...</style> <div>...</div>"
            }
          ),
          errors.content && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.content })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-gray-100 dark:border-gray-700", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 dark:text-white mb-4", children: "Page Banner & SEO Optimization" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Banner Image URL or Upload" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "https://...",
                  className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary",
                  value: typeof data.banner_image === "string" ? data.banner_image : "",
                  onChange: (e) => setData("banner_image", e.target.value)
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 font-bold", children: "OR" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    className: "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 transition-all cursor-pointer",
                    onChange: (e) => {
                      if (e.target.files && e.target.files[0]) {
                        setData("banner_image", e.target.files[0]);
                      }
                    }
                  }
                )
              ] })
            ] }),
            errors.banner_image && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.banner_image }),
            data.banner_image && /* @__PURE__ */ jsx("div", { className: "mt-3 h-32 rounded-lg overflow-hidden border border-gray-200", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: typeof data.banner_image === "string" ? data.banner_image : URL.createObjectURL(data.banner_image),
                className: "w-full h-full object-cover",
                alt: "Banner Preview"
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "SEO Title" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary",
                  value: data.seo_title,
                  onChange: (e) => setData("seo_title", e.target.value)
                }
              ),
              errors.seo_title && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.seo_title })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "SEO Description" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary",
                  rows: 3,
                  value: data.seo_description,
                  onChange: (e) => setData("seo_description", e.target.value)
                }
              ),
              errors.seo_description && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.seo_description })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-admin-border/50 bg-admin-bg p-4 rounded-xl", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide", children: "Page Status" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              className: "w-full sm:w-1/2 rounded-xl border-admin-border bg-admin-surface text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all duration-200",
              value: data.is_private ? "private" : data.is_published ? "published" : "draft",
              onChange: (e) => {
                const val = e.target.value;
                if (val === "published") {
                  setData({ ...data, is_published: true, is_private: false });
                } else if (val === "private") {
                  setData({ ...data, is_published: true, is_private: true });
                } else {
                  setData({ ...data, is_published: false, is_private: false });
                }
              },
              children: [
                /* @__PURE__ */ jsx("option", { value: "published", children: "Public (Visible to everyone)" }),
                /* @__PURE__ */ jsx("option", { value: "private", children: "Private (Hidden from public)" }),
                /* @__PURE__ */ jsx("option", { value: "draft", children: "Draft (Not published)" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pb-8", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/pages", className: "px-6 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors", children: "Cancel" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "px-6 py-2.5 rounded-lg font-medium bg-brand-primary text-white hover:bg-brand-secondary transition-colors shadow-sm disabled:opacity-50",
            children: processing ? "Saving..." : "Create Page"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Create as default
};
