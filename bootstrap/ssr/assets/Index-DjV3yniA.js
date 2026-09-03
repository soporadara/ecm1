import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-ByoJzJm8.js";
import { Plus, Megaphone, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { g as getPopupCreativeSize } from "./popupCreativeSizes-rWMv4qZD.js";
import "react-dom";
import "react-hot-toast";
function PopupThumbnail({ popup }) {
  const [failed, setFailed] = useState(false);
  const creativeSize = getPopupCreativeSize(popup.creative_size);
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-44 bg-admin-surface-muted", children: [
    popup.image_url && !failed ? /* @__PURE__ */ jsx("img", { src: popup.image_url, alt: popup.title, className: "h-full w-full object-contain p-2", onError: () => setFailed(true) }) : /* @__PURE__ */ jsx("div", { className: "flex h-full min-h-44 items-center justify-center text-admin-text-muted", children: /* @__PURE__ */ jsx(Megaphone, { className: "h-8 w-8", "aria-hidden": "true" }) }),
    /* @__PURE__ */ jsx("span", { className: "absolute bottom-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-black text-white backdrop-blur", children: creativeSize.dimensions })
  ] });
}
function Index({ popups }) {
  const deletePopup = async (popup) => {
    if (!await confirmAction(`Delete popup ad "${popup.title}"?`)) return;
    router.delete(`/admin/popups/${popup.id}`, { preserveScroll: true });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Pop-up Ads", children: [
    /* @__PURE__ */ jsx(Head, { title: "Pop-up Ads - CMS" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-admin-text", children: "Pop-up Ads" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-admin-text-muted", children: "Create homepage popups with discount text, image, button, and schedule." })
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: "/admin/popups/create", className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-admin-primary px-5 text-sm font-black text-white shadow-lg shadow-admin-primary/20", children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4", "aria-hidden": "true" }),
          "New Pop-up Ad"
        ] })
      ] }),
      popups.data.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-admin-border bg-admin-surface p-12 text-center shadow-sm", children: [
        /* @__PURE__ */ jsx(Megaphone, { className: "mx-auto h-10 w-10 text-admin-text-muted", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-4 text-lg font-black text-admin-text", children: "No pop-up ads yet" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm font-semibold text-admin-text-muted", children: "Add a promotion like a discount offer, service announcement, or seasonal campaign." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid gap-5 lg:grid-cols-2", children: popups.data.map((popup) => /* @__PURE__ */ jsx("article", { className: "overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-[11rem_1fr]", children: [
        /* @__PURE__ */ jsx(PopupThumbnail, { popup }),
        /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-3 flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: `rounded-full px-2.5 py-1 text-xs font-black ${popup.is_active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`, children: popup.is_active ? "Active" : "Inactive" }),
            popup.badge_text && /* @__PURE__ */ jsx("span", { className: "rounded-full px-2.5 py-1 text-xs font-black text-white", style: { backgroundColor: popup.accent_color || "#ff4c3b" }, children: popup.badge_text })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-black text-admin-text", children: popup.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-bold text-admin-text", children: popup.heading || "No public heading" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm text-admin-text-muted", children: popup.description || "No description set." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap justify-end gap-3", children: [
            /* @__PURE__ */ jsxs(Link, { href: `/admin/popups/${popup.id}/edit`, className: "inline-flex min-h-10 items-center gap-2 rounded-xl border border-admin-border px-4 text-sm font-black text-admin-text", children: [
              /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4", "aria-hidden": "true" }),
              "Edit"
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => deletePopup(popup), className: "inline-flex min-h-10 items-center gap-2 rounded-xl bg-red-50 px-4 text-sm font-black text-red-700", children: [
              /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4", "aria-hidden": "true" }),
              "Delete"
            ] })
          ] })
        ] })
      ] }) }, popup.id)) })
    ] })
  ] });
}
export {
  Index as default
};
