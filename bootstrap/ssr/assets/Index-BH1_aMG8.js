import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, usePage, Head, Link } from "@inertiajs/react";
import toast from "react-hot-toast";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import "react-dom";
import "lucide-react";
function AuditLogsIndex({ logs }) {
  var _a, _b, _c, _d;
  const { delete: destroy } = useForm();
  const { auth } = usePage().props;
  const [showConfirm, setShowConfirm] = useState(false);
  const handleClear = () => {
    destroy("/admin/audit-logs/clear", {
      preserveScroll: true,
      onSuccess: () => toast.success("All audit logs have been cleared.")
    });
  };
  const isSuperAdmin = ((_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.role) === "super_admin" || ((_b = auth == null ? void 0 : auth.user) == null ? void 0 : _b.role) === "superadmin" || ((_d = (_c = auth == null ? void 0 : auth.user) == null ? void 0 : _c.roles) == null ? void 0 : _d.includes("Super Administrator"));
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Audit Logs", children: [
    /* @__PURE__ */ jsx(Head, { title: "Audit Logs - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Audit Logs" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Recent admin and system activity." })
      ] }),
      isSuperAdmin && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowConfirm(true),
          className: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-200 dark:border-red-500/20 px-4 py-2 rounded-xl font-bold transition-colors text-sm",
          children: "Clear All Logs"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Action" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Target" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "User" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "IP" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Date" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-admin-border/50", children: logs.data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "px-6 py-12 text-center text-admin-text-muted font-medium", children: "No audit logs found." }) }) : logs.data.map((log) => {
        var _a2;
        return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-semibold text-admin-text", children: log.action }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-admin-text-muted", children: [
            log.target_type || "System",
            log.target_id ? ` #${log.target_id}` : ""
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted", children: ((_a2 = log.user) == null ? void 0 : _a2.name) || "System" }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted", children: log.ip_address || "-" }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted whitespace-nowrap", children: log.created_at })
        ] }, log.id);
      }) })
    ] }) }) }),
    logs.total > logs.per_page && /* @__PURE__ */ jsx("div", { className: "mt-6 flex gap-2", children: logs.links.map((link, idx) => /* @__PURE__ */ jsx(
      Link,
      {
        href: link.url || "#",
        className: `px-4 py-2 border rounded-xl text-sm font-semibold transition-all duration-200 ${link.active ? "bg-admin-primary text-white border-admin-primary" : "bg-admin-surface text-admin-text-muted border-admin-border hover:bg-admin-surface-muted"}`,
        dangerouslySetInnerHTML: { __html: link.label }
      },
      idx
    )) }),
    showConfirm && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface border border-admin-border rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-admin-text mb-2", children: "Clear Audit Logs?" }),
      /* @__PURE__ */ jsx("p", { className: "text-admin-text-muted mb-6 text-sm leading-relaxed", children: "Are you sure you want to clear ALL audit logs? This action cannot be undone." }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 justify-end", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowConfirm(false),
            className: "px-4 py-2 rounded-xl text-sm font-bold text-admin-text hover:bg-admin-surface-muted transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setShowConfirm(false);
              handleClear();
            },
            className: "px-4 py-2 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 transition-colors",
            children: "Yes, clear them"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  AuditLogsIndex as default
};
