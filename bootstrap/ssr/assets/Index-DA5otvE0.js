import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import "react";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
function CustomersIndex({ customers }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Customers", children: [
    /* @__PURE__ */ jsx(Head, { title: "Customers — Rafel CMS" }),
    /* @__PURE__ */ jsxs("div", { className: "hidden sm:block mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Customers" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: [
        customers.total,
        " registered customers"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left whitespace-nowrap", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Customer" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Email" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs text-center", children: "Orders" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs text-right", children: "Spent" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Joined" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-admin-border/50", children: [
          customers.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "text-center py-12 text-admin-text-muted font-medium text-sm", children: "No customers yet." }) }),
          customers.data.map((c) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-admin-primary/10 text-admin-primary flex items-center justify-center font-bold text-sm flex-shrink-0", children: c.name.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-admin-text", children: c.name })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted", children: c.email }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center font-bold text-admin-text", children: c.orders_count }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-right font-bold text-admin-text", children: [
              "$",
              Number(c.total_spent).toFixed(2)
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted text-sm", children: new Date(c.created_at).toLocaleDateString() }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsx(
              Link,
              {
                href: `/admin/customers/${c.id}`,
                className: "text-sm font-semibold text-admin-primary hover:text-admin-primary-hover transition-colors",
                children: "View →"
              }
            ) })
          ] }, c.id))
        ] })
      ] }) }),
      customers.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-t border-admin-border/50 bg-admin-surface-muted/30", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-admin-text-muted", children: [
          "Page ",
          customers.current_page,
          " of ",
          customers.last_page
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: customers.links.filter((l) => !l.label.includes("...")).map((link, i) => link.url ? /* @__PURE__ */ jsx(
          Link,
          {
            href: link.url,
            className: `px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${link.active ? "bg-admin-primary text-white" : "text-admin-text border border-admin-border hover:bg-admin-surface-muted"}`,
            dangerouslySetInnerHTML: { __html: link.label }
          },
          i
        ) : /* @__PURE__ */ jsx(
          "span",
          {
            className: "px-3 py-1.5 text-xs font-bold text-admin-text-muted border border-admin-border/50 rounded-lg",
            dangerouslySetInnerHTML: { __html: link.label }
          },
          i
        )) })
      ] })
    ] })
  ] });
}
export {
  CustomersIndex as default
};
