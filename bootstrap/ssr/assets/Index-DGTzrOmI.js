import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-3Zrdf8uE.js";
import toast from "react-hot-toast";
import "react";
import "react-dom";
import "lucide-react";
function Index({ pages }) {
  const { delete: destroy } = useForm();
  const handleDelete = async (id) => {
    if (await confirmAction("Are you sure you want to delete this page?")) {
      destroy(`/admin/pages/${id}`, {
        preserveScroll: true,
        onSuccess: () => toast.success("Page deleted successfully.")
      });
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Pages", children: [
    /* @__PURE__ */ jsx(Head, { title: "Pages - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Pages" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Manage your storefront static pages." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/admin/pages/create",
          className: "inline-flex items-center justify-center bg-admin-primary text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover hover:-translate-y-0.5 transition-all duration-200",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-1.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
            "New Page"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Title" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Slug" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-admin-border/50", children: pages.data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-6 py-12 text-center text-admin-text-muted font-medium", children: "No pages found." }) }) : pages.data.map((page) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-semibold text-admin-text", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { children: page.title }),
          page.is_system && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-admin-primary/10 text-admin-primary", children: "System" })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted font-medium", children: page.slug }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: page.is_private ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-admin-danger/10 text-admin-danger border border-admin-danger/20", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-admin-danger" }),
          "Private"
        ] }) : page.is_published ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-admin-success/10 text-admin-success", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-admin-success" }),
          "Published"
        ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-admin-surface-muted text-admin-text-muted border border-admin-border/50", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-admin-text-muted/50" }),
          "Draft"
        ] }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-right space-x-4", children: [
          /* @__PURE__ */ jsx(Link, { href: `/admin/pages/${page.id}/edit`, className: "text-sm font-semibold text-admin-primary hover:text-admin-primary-hover transition-colors", children: "Edit" }),
          /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(page.id), className: "text-sm font-semibold text-admin-danger hover:text-red-700 transition-colors", children: "Delete" })
        ] })
      ] }, page.id)) })
    ] }) }) }),
    pages.total > pages.per_page && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col sm:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium text-admin-text-muted", children: [
        "Showing ",
        pages.from,
        " to ",
        pages.to,
        " of ",
        pages.total,
        " results"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: pages.links.map((link, idx) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `px-4 py-2 border rounded-xl text-sm font-semibold transition-all duration-200 ${link.active ? "bg-admin-primary text-white border-admin-primary shadow-sm shadow-admin-primary/20" : "bg-admin-surface text-admin-text-muted border-admin-border hover:bg-admin-surface-muted hover:text-admin-text"}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        idx
      )) })
    ] })
  ] });
}
export {
  Index as default
};
