import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { ImagePlus, Megaphone } from "lucide-react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import { D as DEFAULT_POPUP_CREATIVE_SIZE, g as getPopupCreativeSize, P as POPUP_CREATIVE_SIZES } from "./popupCreativeSizes-rWMv4qZD.js";
import "react";
import "react-dom";
import "react-hot-toast";
const inputClass = "h-11 w-full rounded-xl border border-admin-border bg-admin-surface px-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20";
const textareaClass = "min-h-28 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20";
function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    badge_text: "DISCOUNT",
    heading: "Save 20% on your next order",
    description: "Create a manual order today and get support from request to delivery.",
    creative_size: DEFAULT_POPUP_CREATIVE_SIZE,
    link_url: "/manual-order",
    button_label: "Order Now",
    accent_color: "#ff4c3b",
    starts_at: "",
    ends_at: "",
    is_active: true,
    image: null
  });
  const previewUrl = data.image ? URL.createObjectURL(data.image) : null;
  const creativeSize = getPopupCreativeSize(data.creative_size);
  const creativeStyle = { aspectRatio: `${creativeSize.width} / ${creativeSize.height}` };
  const submit = (event) => {
    event.preventDefault();
    post("/admin/popups", {
      forceFormData: true
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Create Pop-up Ad", children: [
    /* @__PURE__ */ jsx(Head, { title: "Create Pop-up Ad - CMS" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/popups", className: "text-admin-text-muted hover:text-admin-primary bg-admin-surface-muted p-2 rounded-xl transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-admin-text", children: "Create Pop-up Ad" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-admin-text-muted", children: "Add discount text, a public heading, an image, and a button for the homepage popup." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.05fr_0.95fr]", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "rounded-2xl border border-admin-border bg-admin-surface p-5 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted sm:col-span-2", children: [
              "Internal Title",
              /* @__PURE__ */ jsx("input", { className: `${inputClass} mt-1.5`, value: data.title, onChange: (event) => setData("title", event.target.value), placeholder: "July discount popup", required: true }),
              errors.title && /* @__PURE__ */ jsx("span", { className: "mt-1 block text-xs text-red-600", children: errors.title })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted", children: [
              "Discount Badge Text",
              /* @__PURE__ */ jsx("input", { className: `${inputClass} mt-1.5`, value: data.badge_text, onChange: (event) => setData("badge_text", event.target.value), placeholder: "20% OFF" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted", children: [
              "Accent Color",
              /* @__PURE__ */ jsx("input", { className: `${inputClass} mt-1.5 p-1`, type: "color", value: data.accent_color, onChange: (event) => setData("accent_color", event.target.value) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm font-bold text-admin-text-muted", children: "Popup Image Size" }),
              /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-3", children: POPUP_CREATIVE_SIZES.map((size) => /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setData("creative_size", size.value),
                  className: `rounded-2xl border p-4 text-left transition ${data.creative_size === size.value ? "border-admin-primary bg-admin-primary/10 text-admin-primary shadow-sm" : "border-admin-border bg-admin-surface-muted text-admin-text hover:border-admin-primary/50"}`,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "block text-sm font-black", children: size.label }),
                    /* @__PURE__ */ jsx("span", { className: "mt-1 block text-xs font-black", children: size.dimensions }),
                    /* @__PURE__ */ jsx("span", { className: "mt-2 block text-xs font-semibold text-admin-text-muted", children: size.hint })
                  ]
                },
                size.value
              )) }),
              errors.creative_size && /* @__PURE__ */ jsx("span", { className: "mt-1 block text-xs text-red-600", children: errors.creative_size })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted sm:col-span-2", children: [
              "Public Heading",
              /* @__PURE__ */ jsx("input", { className: `${inputClass} mt-1.5`, value: data.heading, onChange: (event) => setData("heading", event.target.value), placeholder: "Save 20% on your next order" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted sm:col-span-2", children: [
              "Description",
              /* @__PURE__ */ jsx("textarea", { className: `${textareaClass} mt-1.5`, value: data.description, onChange: (event) => setData("description", event.target.value) })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted", children: [
              "Button Text",
              /* @__PURE__ */ jsx("input", { className: `${inputClass} mt-1.5`, value: data.button_label, onChange: (event) => setData("button_label", event.target.value), placeholder: "Shop Now" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted", children: [
              "Button Link",
              /* @__PURE__ */ jsx("input", { className: `${inputClass} mt-1.5`, value: data.link_url, onChange: (event) => setData("link_url", event.target.value), placeholder: "/manual-order" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted", children: [
              "Starts At",
              /* @__PURE__ */ jsx("input", { className: `${inputClass} mt-1.5`, type: "datetime-local", value: data.starts_at, onChange: (event) => setData("starts_at", event.target.value) })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted", children: [
              "Ends At",
              /* @__PURE__ */ jsx("input", { className: `${inputClass} mt-1.5`, type: "datetime-local", value: data.ends_at, onChange: (event) => setData("ends_at", event.target.value) })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted sm:col-span-2", children: [
              "Popup Image",
              /* @__PURE__ */ jsxs("span", { className: "mt-1.5 flex min-h-28 cursor-pointer items-center justify-center rounded-xl border border-dashed border-admin-border bg-admin-surface-muted text-sm font-bold text-admin-text-muted", children: [
                /* @__PURE__ */ jsx(ImagePlus, { className: "mr-2 h-5 w-5", "aria-hidden": "true" }),
                "Upload image for ",
                creativeSize.dimensions,
                /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", className: "sr-only", onChange: (event) => {
                  var _a;
                  return setData("image", ((_a = event.target.files) == null ? void 0 : _a[0]) || null);
                } })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "mt-1 block text-xs font-semibold text-admin-text-muted", children: [
                "Recommended: ",
                creativeSize.dimensions,
                ". JPG, PNG, or WebP up to 12MB."
              ] }),
              errors.image && /* @__PURE__ */ jsx("span", { className: "mt-1 block text-xs text-red-600", children: errors.image })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center gap-4 border-t border-admin-border pt-5", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("input", { type: "checkbox", className: "sr-only", checked: data.is_active, onChange: (event) => setData("is_active", event.target.checked) }),
                /* @__PURE__ */ jsx("div", { className: `block w-14 h-8 rounded-full transition-colors ${data.is_active ? "bg-[#10B981]" : "bg-gray-300 dark:bg-gray-600"}` }),
                /* @__PURE__ */ jsx("div", { className: `absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform flex items-center justify-center shadow-sm ${data.is_active ? "translate-x-6" : "translate-x-0"}`, children: data.is_active ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-[#10B981]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M6 18L18 6M6 6l12 12" }) }) })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-admin-text", children: data.is_active ? "Active" : "Unactive" })
            ] }),
            /* @__PURE__ */ jsx("button", { disabled: processing, className: "ml-auto min-h-11 rounded-xl bg-admin-primary px-5 text-sm font-black text-white shadow-lg shadow-admin-primary/20 disabled:opacity-60", children: processing ? "Saving..." : "Create Pop-up Ad" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "rounded-2xl border border-admin-border bg-admin-surface p-5 shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-lg font-black text-admin-text", children: "Preview" }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-admin-border bg-admin-surface-muted p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between gap-3 text-xs font-black text-admin-text-muted", children: [
              /* @__PURE__ */ jsx("span", { children: creativeSize.label }),
              /* @__PURE__ */ jsx("span", { children: creativeSize.dimensions })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mx-auto max-h-[32rem] overflow-hidden rounded-2xl bg-white shadow-xl", style: creativeStyle, children: /* @__PURE__ */ jsxs("div", { className: "relative h-full w-full overflow-hidden", children: [
              previewUrl ? /* @__PURE__ */ jsx("img", { src: previewUrl, alt: "", className: "absolute inset-0 h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-admin-surface-muted text-admin-text-muted", children: /* @__PURE__ */ jsx(Megaphone, { className: "h-10 w-10", "aria-hidden": "true" }) }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" }),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 p-6 text-center text-white sm:p-8", children: [
                data.badge_text && /* @__PURE__ */ jsx("span", { className: "mx-auto mb-4 inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest text-white", style: { backgroundColor: data.accent_color }, children: data.badge_text }),
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black leading-tight text-white font-serif sm:text-3xl", children: data.heading || "Promotion heading" }),
                /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-md text-sm font-semibold leading-6 text-white/85", children: data.description || "Promotion description will appear here." }),
                /* @__PURE__ */ jsx("span", { className: "mx-auto mt-5 inline-flex min-h-11 items-center rounded-xl px-6 text-sm font-black uppercase tracking-wider text-white", style: { backgroundColor: data.accent_color }, children: data.button_label || "Shop Now" })
              ] })
            ] }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Create as default
};
