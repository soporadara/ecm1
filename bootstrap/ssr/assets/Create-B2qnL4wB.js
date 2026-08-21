import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import toast from "react-hot-toast";
import { R as RichTextEditor } from "./RichTextEditor-Cxs3Jkp6.js";
import "react-dom";
import "lucide-react";
import "@tiptap/react";
import "@tiptap/starter-kit";
import "@tiptap/extension-image";
import "@tiptap/extension-link";
import "@tiptap/extension-text-align";
import "@tiptap/extension-underline";
function Create({ categories = [] }) {
  const [isSmartImportOpen, setIsSmartImportOpen] = useState(false);
  const [smartImportText, setSmartImportText] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    slug: "",
    content: "",
    image: "",
    image_urls: "",
    image_files: [],
    seo_title: "",
    seo_description: "",
    tags: "",
    post_category_id: "",
    is_published: true,
    scheduled_at: "",
    order_index: ""
  });
  const [isImporting, setIsImporting] = useState(false);
  const handleSmartImport = async () => {
    var _a, _b;
    if (!smartImportText.trim()) return;
    let textToParse = smartImportText;
    let isDocUrl = false;
    if (smartImportText.trim().match(/^https:\/\/docs\.google\.com\/document\/d\//)) {
      isDocUrl = true;
      setIsImporting(true);
      try {
        const response = await window.axios.post("/admin/posts/import-doc", { url: smartImportText.trim() });
        textToParse = response.data.text;
        if (!textToParse) {
          toast.error("The document is empty.");
          setIsImporting(false);
          return;
        }
      } catch (error) {
        toast.error(((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || "Failed to fetch Google Doc. Make sure it is public.");
        setIsImporting(false);
        return;
      }
      setIsImporting(false);
    }
    const lines = textToParse.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length === 0) return;
    const extractedTitle = lines[0];
    let mainImage = "";
    let parsedContent = "";
    const imageRegex = /(https?:\/\/[^\s]+(?:\.(?:jpg|jpeg|png|webp|gif)|image|img|media|\/img\.miniexcavator\.org\/)[^\s]*)/gi;
    for (let i = 1; i < lines.length; i++) {
      let line = lines[i];
      const imageMatches = line.match(imageRegex);
      if (imageMatches && imageMatches.length > 0) {
        if (!mainImage) {
          mainImage = imageMatches[0];
        }
        let modifiedLine = line;
        imageMatches.forEach((url) => {
          modifiedLine = modifiedLine.replace(url, `<br/><figure><img src="${url}" alt="Image" class="w-full h-auto rounded-lg my-4 shadow-sm" /></figure><br/>`);
        });
        if (line.replace(imageRegex, "").trim() === "") {
          parsedContent += `${modifiedLine}
`;
        } else {
          parsedContent += `<p>${modifiedLine}</p>
`;
        }
      } else {
        parsedContent += `<p>${line}</p>
`;
      }
    }
    setData((prev) => ({
      ...prev,
      title: prev.title || extractedTitle,
      content: parsedContent,
      image: prev.image || mainImage
    }));
    setIsSmartImportOpen(false);
    setSmartImportText("");
    toast.success(isDocUrl ? "Google Doc imported successfully!" : "Content smartly imported!");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/posts", {
      onSuccess: () => toast.success("Post created successfully!")
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Create Blog Post", children: [
    /* @__PURE__ */ jsx(Head, { title: "Create Post - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/posts", className: "text-gray-500 hover:text-brand-primary transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Create Post" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Publish a new article to your blog." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setIsSmartImportOpen(true),
          className: "inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-100 transition-colors border border-blue-200 shadow-sm",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }) }),
            "Smart Import Docs"
          ]
        }
      )
    ] }),
    isSmartImportOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-100 dark:border-gray-700 transform transition-all", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-white rounded-lg", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Smart Import Content" })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setIsSmartImportOpen(false), className: "text-gray-400 hover:text-gray-500 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 mb-6", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-blue-800 dark:text-white mb-1", children: "How it works:" }),
          /* @__PURE__ */ jsxs("ul", { className: "text-sm text-blue-700 dark:text-white space-y-1 list-disc list-inside", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "Paste a public ",
              /* @__PURE__ */ jsx("strong", { children: "Google Docs URL" }),
              " to automatically fetch its text."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Or paste your ",
              /* @__PURE__ */ jsx("strong", { children: "raw text" }),
              " directly below."
            ] }),
            /* @__PURE__ */ jsx("li", { children: "The first line automatically becomes the Post Title." }),
            /* @__PURE__ */ jsx("li", { children: "Any image URLs found inside the text will automatically be converted to beautiful embedded images!" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            className: "w-full h-64 rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-brand-primary focus:border-brand-primary shadow-inner p-4 text-sm leading-relaxed transition-colors",
            placeholder: "https://docs.google.com/document/d/...\n--- OR ---\nMy Great Blog Title\n\nHere is paragraph 1. Look at this cool image: https://img.example.com/image.webp\n\nHere is paragraph 2...",
            value: smartImportText,
            onChange: (e) => setSmartImportText(e.target.value),
            disabled: isImporting
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsSmartImportOpen(false), className: "px-6 py-2.5 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", disabled: isImporting, children: "Cancel" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleSmartImport, className: "flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold bg-brand-primary text-white hover:bg-brand-secondary disabled:opacity-50 transition-colors shadow-md hover:shadow-lg", disabled: isImporting || !smartImportText.trim(), children: isImporting ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("svg", { className: "animate-spin w-5 h-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
              /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
            ] }),
            "Importing..."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" }) }),
            "Process & Import"
          ] }) })
        ] })
      ] })
    ] }) }),
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
          errors.slug && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.slug })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5", children: "Category" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: data.post_category_id,
              onChange: (e) => setData("post_category_id", e.target.value),
              className: "w-full bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-brand-primary focus:border-brand-primary h-11 px-4 dark:text-white",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "No Category" }),
                categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
              ]
            }
          ),
          errors.post_category_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.post_category_id })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Cover Image URL" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "url",
              className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary",
              value: data.image,
              onChange: (e) => setData("image", e.target.value),
              placeholder: "https://example.com/image.jpg"
            }
          ),
          errors.image && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.image }),
          data.image && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-2", children: "Image Preview" }),
            /* @__PURE__ */ jsx("img", { src: data.image, alt: "Preview", className: "h-48 w-full object-cover rounded-lg border border-gray-200 dark:border-gray-700", onError: (e) => e.currentTarget.style.display = "none" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/40 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2", children: "Additional Image URLs" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                className: "w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-brand-primary focus:border-brand-primary",
                rows: 5,
                value: data.image_urls,
                onChange: (e) => setData("image_urls", e.target.value),
                placeholder: "https://example.com/image-1.jpg\nhttps://example.com/image-2.jpg"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2", children: "Upload Images" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                multiple: true,
                accept: "image/*",
                onChange: (e) => setData("image_files", Array.from(e.target.files || [])),
                className: "block w-full rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm font-semibold text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-sm file:font-black file:text-white hover:border-brand-primary dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-semibold text-gray-500", children: "You can select multiple article images." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Content" }),
          /* @__PURE__ */ jsx(
            RichTextEditor,
            {
              value: data.content,
              onChange: (value) => setData("content", value)
            }
          ),
          errors.content && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.content })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-gray-100 dark:border-gray-700", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 dark:text-white mb-4", children: "SEO Optimization" }),
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
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Tags" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary",
                  value: data.tags,
                  onChange: (e) => setData("tags", e.target.value),
                  placeholder: "E.g., Logistics, Freight, Transport (comma separated)"
                }
              ),
              errors.tags && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.tags })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-5 border-t border-gray-100 pt-6 dark:border-gray-700 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm font-bold text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "is_published",
                type: "checkbox",
                className: "mr-3 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-brand-primary focus:ring-brand-primary h-6 w-6",
                checked: data.is_published,
                onChange: (e) => setData("is_published", e.target.checked)
              }
            ),
            "Publish this post"
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2", children: "Schedule publish date" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "datetime-local",
                value: data.scheduled_at,
                onChange: (e) => setData("scheduled_at", e.target.value),
                className: "w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2", children: "Display Order (Optional)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.order_index,
                onChange: (e) => setData("order_index", e.target.value),
                placeholder: "Auto-assigned if left blank",
                className: "w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pb-8", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/posts", className: "px-6 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors", children: "Cancel" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "px-6 py-2.5 rounded-lg font-medium bg-brand-primary text-white hover:bg-brand-secondary transition-colors shadow-sm disabled:opacity-50",
            children: processing ? "Saving..." : "Create Post"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Create as default
};
