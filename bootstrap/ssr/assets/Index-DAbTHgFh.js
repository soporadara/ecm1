import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-3Zrdf8uE.js";
import "react";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
function StaffIndex({ staff }) {
  const deleteStaff = async (id) => {
    if (await confirmAction("Are you sure you want to remove this staff member?")) {
      router.delete(`/admin/staff/${id}`);
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Staff & Roles", children: [
    /* @__PURE__ */ jsx(Head, { title: "Staff Management" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Staff Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Manage backend users and their roles." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/admin/staff/create",
          className: "inline-flex items-center justify-center bg-admin-primary text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover hover:-translate-y-0.5 transition-all duration-200",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-1.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
            "Add Staff Member"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 md:hidden", children: staff.data.map((user) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-lg font-black text-brand-primary", children: user.name.charAt(0) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("h2", { className: "truncate text-base font-black text-gray-950 dark:text-white", children: user.name }),
          /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold text-gray-500 dark:text-gray-400", children: user.email }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: user.roles.map((role) => /* @__PURE__ */ jsx("span", { className: "rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-black text-brand-primary", children: role.name }, role.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsx(Link, { href: `/admin/staff/${user.id}/edit`, className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-200 text-sm font-black text-gray-700 transition hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-gray-200", children: "Edit" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => deleteStaff(user.id),
            className: "inline-flex min-h-11 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-red-600 transition hover:-translate-y-0.5 hover:bg-red-100 disabled:opacity-50",
            disabled: user.id === 1,
            children: "Delete"
          }
        )
      ] })
    ] }, user.id)) }),
    /* @__PURE__ */ jsx("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Roles" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Created" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-admin-border/50", children: staff.data.map((user) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-admin-primary/10 flex items-center justify-center text-admin-primary font-bold shadow-inner", children: user.name.charAt(0).toUpperCase() }),
          /* @__PURE__ */ jsx("div", { className: "ml-4", children: /* @__PURE__ */ jsx("div", { className: "font-semibold text-admin-text", children: user.name }) })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted font-medium", children: user.email }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          user.roles.map((role) => /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-admin-primary/10 text-admin-primary", children: role.name }, role.id)),
          user.roles.length === 0 && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-admin-surface-muted text-admin-text-muted border border-admin-border/50", children: "No roles assigned" })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted", children: new Date(user.created_at).toLocaleDateString() }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Link, { href: `/admin/staff/${user.id}/edit`, className: "inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-600 dark:text-white hover:opacity-80 transition-opacity", children: "Edit" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => deleteStaff(user.id),
              disabled: user.id === 1,
              className: "inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-700 dark:bg-red-600 dark:text-white hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed",
              title: user.id === 1 ? "Primary Super Admin cannot be deleted" : "Delete user",
              children: "Delete"
            }
          )
        ] }) })
      ] }, user.id)) })
    ] }) }) })
  ] });
}
export {
  StaffIndex as default
};
