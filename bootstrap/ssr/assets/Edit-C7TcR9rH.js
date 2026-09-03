import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import toast from "react-hot-toast";
import { I as ImageUploader, R as RichTextEditor } from "./ImageUploader-D0LqOHrm.js";
import "react-dom";
import "lucide-react";
import "@tiptap/react";
import "@tiptap/starter-kit";
import "@tiptap/extension-image";
import "@tiptap/extension-link";
import "@tiptap/extension-text-align";
import "@tiptap/extension-underline";
function Edit({ post, categories = [] }) {
  const [isSmartImportOpen, setIsSmartImportOpen] = useState(false);
  const [smartImportText, setSmartImportText] = useState("");
  const { data, setData, post: submitPost, processing, errors } = useForm({
    _method: "PUT",
    title: post.title || "",
    slug: post.slug || "",
    content: post.content || "",
    image: post.image || "",
    image_urls: (post.images || []).join("\n"),
    image_files: [],
    seo_title: post.seo_title || "",
    seo_description: post.seo_description || "",
    tags: post.tags || "",
    post_category_id: post.post_category_id || "",
    is_published: post.is_published,
    scheduled_at: post.scheduled_at ? String(post.scheduled_at).slice(0, 16) : "",
    order_index: post.order_index ?? ""
  });
  const [isImporting, setIsImporting] = useState(false);
  const handleSmartImport = async () => {
    var _a, _b;
    if (!smartImportText.trim()) return;
    let textToParse = smartImportText;
    if (smartImportText.trim().match(/^https:\/\/docs\.google\.com\/document\/d\//)) {
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
    for (let i = 1; i < lines.length; i++) {
      let line = lines[i];
      const isImageUrl = line.match(/^https?:\/\/[^\s]+(\.(jpg|jpeg|png|webp|gif)|image|img|media)/i) || line.match(/^https?:\/\/img\.miniexcavator\.org\/.+/i) || line.match(/^https?:\/\/.*\.webp$/i) || line.match(/^https?:\/\/.*\.jpg$/i);
      if (isImageUrl) {
        if (!mainImage) {
          mainImage = line;
        } else {
          parsedContent += `<figure><img src="${line}" alt="Image" class="w-full h-auto rounded-lg my-4" /></figure>
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
    toast.success("Content smartly imported!");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitPost(`/admin/posts/${post.id}`, {
      onSuccess: () => toast.success("Post updated successfully!")
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Edit Blog Post", children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit ${post.title} - Admin` }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/posts", className: "text-gray-500 hover:text-brand-primary transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Edit Post" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: post.title })
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
    isSmartImportOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 dark:text-white mb-2", children: "Smart Import from Docs" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-4", children: [
        "Paste your raw blog text here, OR paste a public Google Docs URL (starting with ",
        /* @__PURE__ */ jsx("code", { children: "https://docs.google.com/document/d/" }),
        "). The first line will become the Title. Any direct image URLs pasted on their own line will automatically be converted to embedded images!"
      ] }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          className: "w-full h-64 rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-brand-primary focus:border-brand-primary",
          placeholder: "https://docs.google.com/document/d/...\nOR\nMy Great Blog Title\n\nHere is paragraph 1...\n\nhttps://img.example.com/image.webp\n\nHere is paragraph 2...",
          value: smartImportText,
          onChange: (e) => setSmartImportText(e.target.value),
          disabled: isImporting
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsSmartImportOpen(false), className: "px-5 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700", disabled: isImporting, children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: handleSmartImport, className: "px-5 py-2 rounded-lg font-medium bg-brand-primary text-white hover:bg-brand-secondary disabled:opacity-50", disabled: isImporting, children: isImporting ? "Fetching..." : "Import Content" })
      ] })
    ] }) }) }),
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
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Slug" }),
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
              onChange: (e) => setData("image", e.target.value)
            }
          ),
          errors.image && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.image }),
          data.image && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-2", children: "Image Preview" }),
            /* @__PURE__ */ jsx("img", { src: data.image, alt: "Preview", className: "w-full h-auto max-h-[500px] object-contain rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800", onError: (e) => e.currentTarget.style.display = "none" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/40 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2", children: "Article Image URLs" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                className: "w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-brand-primary focus:border-brand-primary shadow-inner",
                rows: 8,
                value: data.image_urls,
                onChange: (e) => setData("image_urls", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-gray-500", children: "Any URL listed here will be saved as an image for this article." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2", children: "Upload New Images" }),
            /* @__PURE__ */ jsx(ImageUploader, { onUploadSuccess: (url) => {
              setData((prev) => ({
                ...prev,
                image_urls: prev.image_urls ? `${prev.image_urls}
${url}` : url
              }));
            } })
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
            "Publish Post"
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
            children: processing ? "Saving..." : "Update Post"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Edit as default
};
