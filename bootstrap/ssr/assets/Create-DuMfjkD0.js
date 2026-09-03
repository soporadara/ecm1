import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import toast from "react-hot-toast";
import "react-dom";
import "lucide-react";
function Create({ mediaLibrary }) {
  const { data, setData, post, processing, errors } = useForm({
    internal_name: "",
    title_en: "",
    title_km: "",
    eyebrow_en: "",
    eyebrow_km: "",
    description_en: "",
    description_km: "",
    primary_button_label: "",
    primary_button_url: "",
    secondary_button_label: "",
    secondary_button_url: "",
    desktop_image: null,
    mobile_image: null,
    video_url: "",
    video_file: null,
    fallback_color: "#000000",
    text_position: "center",
    content_alignment: "center",
    theme_variant: "light",
    open_in_new_tab: false,
    is_active: true,
    sort_order: 0,
    start_date: "",
    end_date: ""
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/banners", {
      onSuccess: () => toast.success("Banner created successfully.")
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Create Banner", children: [
    /* @__PURE__ */ jsx(Head, { title: "Create Banner - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Link, { href: "/admin/banners", className: "text-admin-text-muted hover:text-admin-primary bg-admin-surface-muted p-2 rounded-xl transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Create Hero Banner" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Design a new storefront banner." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 p-6 space-y-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-admin-text border-b border-admin-border/50 pb-3", children: "Banner Details" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide", children: "Banner Name" }),
            /* @__PURE__ */ jsx("input", { type: "text", className: "w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary", value: data.internal_name, onChange: (e) => setData("internal_name", e.target.value), required: true }),
            errors.internal_name && /* @__PURE__ */ jsx("p", { className: "text-admin-danger text-xs mt-1", children: errors.internal_name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide", children: "URL Link" }),
            /* @__PURE__ */ jsx("input", { type: "text", className: "w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary", value: data.primary_button_url, onChange: (e) => setData("primary_button_url", e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-admin-border/50", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide", children: "Desktop Image (Upload File)" }),
            /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", className: "w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors", onChange: (e) => {
              var _a;
              const file = ((_a = e.target.files) == null ? void 0 : _a[0]) || null;
              setData("desktop_image", file);
              if (file) {
                setPreviewUrl(URL.createObjectURL(file));
              } else {
                setPreviewUrl(null);
              }
            } }),
            errors.desktop_image && /* @__PURE__ */ jsx("p", { className: "text-admin-danger text-xs mt-1", children: errors.desktop_image })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide", children: "Mobile Image (Optional)" }),
            /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", className: "w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors", onChange: (e) => {
              var _a;
              return setData("mobile_image", ((_a = e.target.files) == null ? void 0 : _a[0]) || null);
            } }),
            errors.mobile_image && /* @__PURE__ */ jsx("p", { className: "text-admin-danger text-xs mt-1", children: errors.mobile_image })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-admin-border/50", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide", children: "Video File (Optional, replaces image)" }),
            /* @__PURE__ */ jsx("input", { type: "file", accept: "video/mp4,video/webm", className: "w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors", onChange: (e) => {
              var _a;
              return setData("video_file", ((_a = e.target.files) == null ? void 0 : _a[0]) || null);
            } }),
            errors.video_file && /* @__PURE__ */ jsx("p", { className: "text-admin-danger text-xs mt-1", children: errors.video_file })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide", children: "Or Video URL (Youtube/Vimeo ID or URL)" }),
            /* @__PURE__ */ jsx("input", { type: "text", className: "w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary", value: data.video_url, onChange: (e) => setData("video_url", e.target.value), placeholder: "https://..." }),
            errors.video_url && /* @__PURE__ */ jsx("p", { className: "text-admin-danger text-xs mt-1", children: errors.video_url })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-admin-border/50", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", id: "is_active", className: "rounded border-admin-border text-admin-primary", checked: data.is_active, onChange: (e) => setData("is_active", e.target.checked) }),
            /* @__PURE__ */ jsx("label", { htmlFor: "is_active", className: "ml-2 font-bold text-admin-text", children: "Active (Visible)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide", children: "Order" }),
            /* @__PURE__ */ jsx("input", { type: "number", className: "w-24 rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20", value: data.sort_order, onChange: (e) => setData("sort_order", parseInt(e.target.value) || 0) })
          ] })
        ] })
      ] }),
      previewUrl && /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 p-6 space-y-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-admin-text border-b border-admin-border/50 pb-3", children: "Banner Preview" }),
        /* @__PURE__ */ jsx("div", { className: "w-full rounded-xl overflow-hidden border border-admin-border/30 bg-gray-100 flex items-center justify-center min-h-[100px]", children: /* @__PURE__ */ jsx("img", { src: previewUrl, alt: "Preview", className: "w-full h-auto max-h-[400px] object-contain" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pb-8", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/banners", className: "px-6 py-2.5 rounded-xl font-bold text-admin-text-muted hover:text-admin-text bg-admin-surface hover:bg-admin-surface-muted transition-colors border border-admin-border/50", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "px-6 py-2.5 rounded-xl font-bold bg-admin-primary text-white hover:bg-admin-primary-hover shadow-sm transition-colors disabled:opacity-50", children: processing ? "Creating..." : "Create Banner" })
      ] })
    ] })
  ] });
}
export {
  Create as default
};
