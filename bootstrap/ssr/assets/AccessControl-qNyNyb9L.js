import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-ByoJzJm8.js";
import "react";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
function AccessControl({ blocks = [], attempts = [], settings }) {
  const { data: settingsData, setData: setSettingsData, post: postSettings, processing: settingsProcessing } = useForm({
    cms_max_failed_attempts: (settings == null ? void 0 : settings.cms_max_failed_attempts) || 10,
    cms_lockout_duration_minutes: (settings == null ? void 0 : settings.cms_lockout_duration_minutes) || "forever"
  });
  const { data: blockData, setData: setBlockData, post: postBlock, processing: blockProcessing, reset: resetBlock, errors: blockErrors } = useForm({
    type: "ip",
    value: "",
    reason: "Manual Block",
    duration: "forever"
  });
  const releaseBlock = async (block) => {
    if (!await confirmAction("Release this CMS security block?")) return;
    router.delete(`/admin/security/access-control/${block.id}`);
  };
  const submitSettings = (e) => {
    e.preventDefault();
    postSettings("/admin/security/access-control/settings");
  };
  const submitBlock = (e) => {
    e.preventDefault();
    postBlock("/admin/security/access-control", {
      onSuccess: () => resetBlock()
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Security Access Control", children: [
    /* @__PURE__ */ jsx(Head, { title: "Security Access Control" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-black uppercase tracking-[0.22em] text-admin-primary", children: "CMS Security" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-black text-admin-text", children: "Access Control" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-3xl text-sm font-semibold leading-6 text-admin-text-muted", children: "Configure CMS login failure limits, review temporary blocks, and manually block suspicious IPs." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-admin-border bg-admin-surface p-6 shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-lg font-black text-admin-text", children: "Rate Limiting Settings" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submitSettings, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-bold text-admin-text", children: "Max Failed Login Attempts (Last 30 mins)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  min: "1",
                  className: "w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 text-admin-text focus:border-admin-primary focus:ring-1 focus:ring-admin-primary",
                  value: settingsData.cms_max_failed_attempts,
                  onChange: (e) => setSettingsData("cms_max_failed_attempts", parseInt(e.target.value) || 10),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-bold text-admin-text", children: 'Lockout Duration (minutes, or "forever")' }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 text-admin-text focus:border-admin-primary focus:ring-1 focus:ring-admin-primary",
                  value: settingsData.cms_lockout_duration_minutes,
                  onChange: (e) => setSettingsData("cms_lockout_duration_minutes", e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-2 text-right", children: /* @__PURE__ */ jsx("button", { type: "submit", disabled: settingsProcessing, className: "rounded-xl bg-admin-primary px-5 py-2 font-black text-white hover:bg-admin-primary-hover disabled:opacity-50", children: "Save Settings" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-admin-border bg-admin-surface p-6 shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-lg font-black text-admin-text", children: "Add Manual Block" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submitBlock, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-bold text-admin-text", children: "Type" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    className: "w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 text-admin-text focus:border-admin-primary focus:ring-1 focus:ring-admin-primary",
                    value: blockData.type,
                    onChange: (e) => setBlockData("type", e.target.value),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "ip", children: "IP Address" }),
                      /* @__PURE__ */ jsx("option", { value: "email", children: "Email Address" }),
                      /* @__PURE__ */ jsx("option", { value: "device", children: "Device Hash" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-bold text-admin-text", children: "Duration (minutes)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    className: "w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 text-admin-text focus:border-admin-primary focus:ring-1 focus:ring-admin-primary",
                    value: blockData.duration,
                    onChange: (e) => setBlockData("duration", e.target.value),
                    placeholder: "forever",
                    required: true
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-bold text-admin-text", children: "Value (IP/Email/Hash)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 text-admin-text focus:border-admin-primary focus:ring-1 focus:ring-admin-primary",
                  value: blockData.value,
                  onChange: (e) => setBlockData("value", e.target.value),
                  required: true
                }
              ),
              blockErrors.value && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: blockErrors.value })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-bold text-admin-text", children: "Reason" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 text-admin-text focus:border-admin-primary focus:ring-1 focus:ring-admin-primary",
                  value: blockData.reason,
                  onChange: (e) => setBlockData("reason", e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-2 text-right", children: /* @__PURE__ */ jsx("button", { type: "submit", disabled: blockProcessing, className: "rounded-xl bg-red-600 px-5 py-2 font-black text-white hover:bg-red-700 disabled:opacity-50", children: "Block Access" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "border-b border-admin-border px-5 py-4", children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-admin-text", children: "Active Blocks" }) }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-admin-border text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-admin-surface-muted text-left text-xs font-black uppercase tracking-wider text-admin-text-muted", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3", children: "Email" }),
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3", children: "IP / Hash" }),
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3", children: "Reason" }),
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3", children: "Expires" }),
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3 text-right", children: "Action" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-admin-border", children: [
            blocks.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "px-5 py-8 text-center font-bold text-admin-text-muted", colSpan: 5, children: "No active blocks." }) }),
            blocks.map((block) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "px-5 py-4 font-bold text-admin-text", children: block.masked_email || "Any" }),
              /* @__PURE__ */ jsx("td", { className: "px-5 py-4 font-mono text-admin-text-muted", children: block.ip_address || block.device_hash || "Any" }),
              /* @__PURE__ */ jsx("td", { className: "px-5 py-4 font-bold text-admin-text-muted", children: block.reason }),
              /* @__PURE__ */ jsx("td", { className: "px-5 py-4 text-admin-text-muted", children: block.expires_at || "Permanent" }),
              /* @__PURE__ */ jsx("td", { className: "px-5 py-4 text-right", children: /* @__PURE__ */ jsx("button", { onClick: () => releaseBlock(block), className: "rounded-xl bg-admin-primary px-4 py-2 text-sm font-black text-white hover:bg-admin-primary-hover", children: "Unblock" }) })
            ] }, block.id))
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "border-b border-admin-border px-5 py-4", children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-admin-text", children: "Recent Failed Attempts" }) }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-admin-border text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-admin-surface-muted text-left text-xs font-black uppercase tracking-wider text-admin-text-muted", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3", children: "Email" }),
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3", children: "IP" }),
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3", children: "Category" }),
            /* @__PURE__ */ jsx("th", { className: "px-5 py-3", children: "Time" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-admin-border", children: [
            attempts.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "px-5 py-8 text-center font-bold text-admin-text-muted", colSpan: 4, children: "No failed attempts recorded." }) }),
            attempts.map((attempt) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "px-5 py-4 font-bold text-admin-text", children: attempt.masked_email || "Unknown" }),
              /* @__PURE__ */ jsx("td", { className: "px-5 py-4 font-mono text-admin-text-muted", children: attempt.ip_address || "Unknown" }),
              /* @__PURE__ */ jsx("td", { className: "px-5 py-4 font-bold text-admin-text-muted", children: attempt.failure_category }),
              /* @__PURE__ */ jsx("td", { className: "px-5 py-4 text-admin-text-muted", children: attempt.attempted_at })
            ] }, attempt.id))
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  AccessControl as default
};
