import { jsxs, jsx } from "react/jsx-runtime";
import React from "react";
import { router, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
function Customers({ customers, filters }) {
  const [search, setSearch] = React.useState(filters.search || "");
  const [startDate, setStartDate] = React.useState(filters.start_date || "");
  const [endDate, setEndDate] = React.useState(filters.end_date || "");
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.get("/admin/logistics/customers", { search, start_date: startDate, end_date: endDate }, { preserveState: true });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search, startDate, endDate]);
  return /* @__PURE__ */ jsxs(
    AdminLayout,
    {
      title: "Logistics Customers",
      description: "Select a customer to view or manage their manual orders.",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Customers — Logistics CRM" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface rounded-2xl border border-admin-border/50 shadow-sm shadow-admin-border/20 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-admin-border bg-admin-surface-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 max-w-3xl items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search code, name, phone, email...",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "w-full pl-11 pr-4 py-2 border border-admin-border/60 rounded-xl bg-white shadow-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/50 focus:border-admin-primary transition-all text-sm font-medium placeholder:font-normal"
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-admin-text-muted/70", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  value: startDate,
                  onChange: (e) => setStartDate(e.target.value),
                  className: "px-3 py-2 border border-admin-border/60 rounded-xl bg-white shadow-sm text-admin-text text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary/50 focus:border-admin-primary",
                  title: "Start Date"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-admin-text-muted text-sm font-medium", children: "to" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  value: endDate,
                  onChange: (e) => setEndDate(e.target.value),
                  className: "px-3 py-2 border border-admin-border/60 rounded-xl bg-white shadow-sm text-admin-text text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary/50 focus:border-admin-primary",
                  title: "End Date"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-admin-surface-muted/50 border-b border-admin-border", children: [
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Customer Code" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Customer Name" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Contact Info" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Total Orders" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Last Order Date" }),
              /* @__PURE__ */ jsx("th", { className: "text-right px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-admin-border/50", children: [
              customers.data.map((customer, idx) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-bold text-admin-primary", children: customer.customer_code || "N/A" }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-semibold text-admin-text", children: customer.name }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-admin-text", children: customer.phone || "No phone" }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-admin-text-muted mt-1", children: customer.email })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-admin-secondary/10 text-admin-secondary font-bold text-xs", children: [
                  customer.total_orders,
                  " Orders"
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted font-medium", children: customer.last_order_date }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: `/admin/logistics/customers/${customer.id}/orders`,
                    className: "inline-flex items-center gap-1.5 px-4 py-2 bg-admin-primary/10 text-admin-primary hover:bg-admin-primary hover:text-white rounded-lg text-sm font-semibold transition-all whitespace-nowrap shadow-sm hover:shadow",
                    children: [
                      "View Orders",
                      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })
                    ]
                  }
                ) })
              ] }, customer.id)),
              customers.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "px-6 py-12 text-center text-admin-text-muted", children: "No customers found." }) })
            ] })
          ] }) }),
          customers.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-t border-admin-border flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-admin-text-muted", children: [
              "Showing page ",
              customers.current_page,
              " of ",
              customers.last_page
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: customers.links.map((link, idx) => /* @__PURE__ */ jsx(
              Link,
              {
                href: link.url || "#",
                className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${link.active ? "bg-admin-primary text-white" : "bg-admin-surface-muted text-admin-text-muted hover:text-admin-text"} ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`,
                dangerouslySetInnerHTML: { __html: link.label }
              },
              idx
            )) })
          ] })
        ] })
      ]
    }
  );
}
export {
  Customers as default
};
