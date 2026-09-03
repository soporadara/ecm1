import { jsxs, jsx } from "react/jsx-runtime";
import { Head, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import { useState } from "react";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
const GROUP_LABELS = {
  storefront: {
    label: "Storefront",
    icon: "🏪",
    desc: "Controls visibility of the normal product shop on the public website."
  },
  logistics: {
    label: "Logistics Platform",
    icon: "🚚",
    desc: "Controls purchasing, shipping, parcel and warehouse features."
  },
  payments: {
    label: "Payments",
    icon: "💰",
    desc: "Controls wallet and payment functionality."
  },
  general: {
    label: "General",
    icon: "⚙️",
    desc: "General platform settings."
  }
};
function FeatureFlagsIndex({ groupedFlags }) {
  const [pending, setPending] = useState({});
  const toggle = (flag) => {
    if (!flag.is_admin_editable) return;
    const newValue = !flag.value;
    setPending((prev) => ({ ...prev, [flag.id]: true }));
    router.patch(
      `/admin/feature-flags/${flag.id}`,
      { value: newValue },
      {
        preserveScroll: true,
        onFinish: () => setPending((prev) => {
          const next = { ...prev };
          delete next[flag.id];
          return next;
        })
      }
    );
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Feature Flags — Admin" }),
    /* @__PURE__ */ jsxs("div", { style: { maxWidth: 900, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { marginBottom: "2rem" }, children: [
        /* @__PURE__ */ jsx("h1", { style: { fontSize: "1.6rem", fontWeight: 800, color: "#111827", marginBottom: "0.375rem" }, children: "⚙️ Feature Flags" }),
        /* @__PURE__ */ jsx("p", { style: { color: "#6B7280", fontSize: "0.925rem" }, children: "Toggle platform features on or off without deploying code changes. Changes take effect within 60 seconds due to caching." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ff-warning", children: [
        "⚠️ ",
        /* @__PURE__ */ jsx("strong", { children: "Storefront flags" }),
        " are currently ",
        /* @__PURE__ */ jsx("strong", { children: "disabled" }),
        " — the public website operates in logistics platform mode. Enable them here to restore the normal product store."
      ] }),
      Object.entries(groupedFlags).map(([group, flags]) => {
        const meta = GROUP_LABELS[group] || { label: group, icon: "⚙️", desc: "" };
        return /* @__PURE__ */ jsxs("div", { className: "ff-group", children: [
          /* @__PURE__ */ jsx("div", { className: "ff-group-header", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "ff-group-title", children: [
              meta.icon,
              " ",
              meta.label
            ] }),
            meta.desc && /* @__PURE__ */ jsx("p", { className: "ff-group-desc", children: meta.desc })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "ff-flag-list", children: flags.map((flag) => /* @__PURE__ */ jsxs("div", { className: `ff-flag-row ${!flag.is_admin_editable ? "ff-flag-row--readonly" : ""}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "ff-flag-info", children: [
              /* @__PURE__ */ jsxs("div", { className: "ff-flag-label", children: [
                flag.label,
                !flag.is_admin_editable && /* @__PURE__ */ jsx("span", { className: "ff-locked", children: "🔒 Read-only" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "ff-flag-name", children: flag.name }),
              flag.description && /* @__PURE__ */ jsx("div", { className: "ff-flag-desc", children: flag.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "ff-flag-control", children: [
              /* @__PURE__ */ jsx("span", { className: `ff-status ${flag.value ? "ff-status--on" : "ff-status--off"}`, children: flag.value ? "Enabled" : "Disabled" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => toggle(flag),
                  disabled: !flag.is_admin_editable || pending[flag.id],
                  className: `ff-toggle ${flag.value ? "ff-toggle--on" : "ff-toggle--off"}`,
                  "aria-label": `${flag.value ? "Disable" : "Enable"} ${flag.label}`,
                  "aria-checked": flag.value,
                  role: "switch",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: `ff-toggle-knob ${flag.value ? "ff-toggle-knob--on" : ""}` }),
                    pending[flag.id] && /* @__PURE__ */ jsx("span", { className: "ff-toggle-spinner" })
                  ]
                }
              )
            ] })
          ] }, flag.id)) })
        ] }, group);
      })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
                .ff-warning {
                    background: #FFFBEB;
                    border: 1px solid #FDE68A;
                    color: #92400E;
                    padding: 0.875rem 1.25rem;
                    border-radius: 10px;
                    font-size: 0.875rem;
                    margin-bottom: 1.75rem;
                    line-height: 1.5;
                }
                .dark .ff-warning {
                    background: rgba(245,158,11,0.1);
                    border-color: rgba(245,158,11,0.3);
                    color: #FCD34D;
                }
                .ff-group {
                    background: white;
                    border: 1px solid #E5E7EB;
                    border-radius: 14px;
                    overflow: hidden;
                    margin-bottom: 1.25rem;
                }
                .dark .ff-group {
                    background: #1E1E30;
                    border-color: #2D2D4A;
                }
                .ff-group-header {
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid #F3F4F6;
                    background: #F9FAFB;
                }
                .dark .ff-group-header {
                    background: #16162A;
                    border-color: #2D2D4A;
                }
                .ff-group-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #111827;
                    margin: 0 0 0.2rem;
                }
                .dark .ff-group-title { color: #F9FAFB; }
                .ff-group-desc {
                    font-size: 0.82rem;
                    color: #6B7280;
                    margin: 0;
                }
                .ff-flag-list { padding: 0.5rem 0; }
                .ff-flag-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #F9FAFB;
                    transition: background 0.12s;
                }
                .ff-flag-row:last-child { border-bottom: none; }
                .ff-flag-row:hover { background: #FAFAFA; }
                .dark .ff-flag-row { border-color: rgba(255,255,255,0.03); }
                .dark .ff-flag-row:hover { background: rgba(255,255,255,0.02); }
                .ff-flag-row--readonly { opacity: 0.6; }

                .ff-flag-info { flex: 1; min-width: 0; }
                .ff-flag-label {
                    font-size: 0.925rem;
                    font-weight: 600;
                    color: #1F2937;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.15rem;
                }
                .dark .ff-flag-label { color: #E5E7EB; }
                .ff-flag-name {
                    font-size: 0.75rem;
                    color: #9CA3AF;
                    font-family: monospace;
                    margin-bottom: 0.2rem;
                }
                .ff-flag-desc { font-size: 0.82rem; color: #6B7280; }
                .dark .ff-flag-desc { color: #6B7280; }
                .ff-locked {
                    font-size: 0.68rem;
                    color: #9CA3AF;
                    background: #F3F4F6;
                    padding: 0.1rem 0.4rem;
                    border-radius: 4px;
                    font-weight: 500;
                }

                .ff-flag-control {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex-shrink: 0;
                }

                .ff-status {
                    font-size: 0.75rem;
                    font-weight: 600;
                    padding: 0.2rem 0.55rem;
                    border-radius: 999px;
                }
                .ff-status--on { background: #ECFDF5; color: #065F46; }
                .ff-status--off { background: #F3F4F6; color: #6B7280; }
                .dark .ff-status--off { background: #1F1F35; color: #6B7280; }

                .ff-toggle {
                    position: relative;
                    width: 48px;
                    height: 26px;
                    border-radius: 999px;
                    border: none;
                    cursor: pointer;
                    transition: background 0.2s;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    padding: 0 3px;
                }
                .ff-toggle--on { background: #4F46E5; }
                .ff-toggle--off { background: #D1D5DB; }
                .ff-toggle:disabled { cursor: not-allowed; opacity: 0.6; }

                .ff-toggle-knob {
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    transition: transform 0.2s;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                }
                .ff-toggle-knob--on { transform: translateX(22px); }

                .ff-toggle-spinner {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            ` })
  ] });
}
export {
  FeatureFlagsIndex as default
};
