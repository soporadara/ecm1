import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-3Zrdf8uE.js";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-dom";
import "lucide-react";
function CategoriesIndex({ categories }) {
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);
  const filtered = categories.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleDelete = async (id) => {
    if (!await confirmAction("Delete this category? This cannot be undone.")) return;
    setDeleting(id);
    router.delete(`/admin/categories/${id}`, {
      onSuccess: () => {
        toast.success("Category deleted successfully");
        setDeleting(null);
      },
      onError: (errors) => {
        if (errors.error) toast.error(errors.error);
        else toast.error("Failed to delete category");
        setDeleting(null);
      },
      onFinish: () => setDeleting(null)
    });
  };
  return /* @__PURE__ */ jsxs(
    AdminLayout,
    {
      title: "Categories",
      actions: /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/admin/categories/create",
          className: "inline-flex items-center justify-center bg-admin-primary text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover hover:-translate-y-0.5 transition-all duration-200",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-1.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
            "New Category"
          ]
        }
      ),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Categories — Rafel CMS" }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:flex sm:items-center sm:justify-between gap-4 mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Product Categories" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Organize your products into categories and subcategories." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 overflow-hidden mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b border-admin-border", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-admin-text-muted", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search categories...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "flex-1 outline-none bg-transparent text-sm font-medium text-admin-text placeholder-admin-text-muted border-none ring-0 focus:ring-0"
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-admin-text-muted", children: [
            filtered.length,
            " result",
            filtered.length !== 1 ? "s" : ""
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("thead", { className: "text-xs text-admin-text-muted uppercase bg-admin-surface-muted/50 border-b border-admin-border", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold tracking-wider", children: "Icon/Image" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold tracking-wider", children: "Name" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold tracking-wider", children: "Type" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold tracking-wider", children: "Products" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold tracking-wider", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold tracking-wider text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-admin-border/50", children: [
            filtered.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 6, className: "text-center py-12 text-admin-text-muted font-medium text-sm", children: [
              "No categories found.",
              /* @__PURE__ */ jsx(Link, { href: "/admin/categories/create", className: "ml-2 text-admin-primary hover:underline font-bold", children: "Create one →" })
            ] }) }),
            filtered.map((cat) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: cat.image ? /* @__PURE__ */ jsx("img", { src: cat.image, alt: cat.name, className: "w-8 h-8 rounded-lg object-cover bg-admin-surface-muted border border-admin-border/50 shadow-sm" }) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-admin-surface-muted flex items-center justify-center text-admin-text-muted border border-admin-border/50 shadow-sm", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" }) }) }) }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-semibold text-admin-text", children: cat.name }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted font-medium", children: cat.parent_name ?? /* @__PURE__ */ jsx("span", { className: "text-admin-text-muted/50", children: "Root" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-bold text-admin-text", children: cat.products_count }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase ${cat.is_active ? "bg-admin-success/10 text-admin-success" : "bg-admin-surface-muted text-admin-text-muted border border-admin-border/50"}`, children: cat.is_active ? "Active" : "Inactive" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 justify-end", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: `/admin/categories/${cat.id}/edit`,
                    className: "inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-600 dark:text-white hover:opacity-80 transition-opacity",
                    children: "Edit"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(cat.id),
                    disabled: deleting === cat.id,
                    className: "inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-700 dark:bg-red-600 dark:text-white hover:opacity-80 transition-opacity disabled:opacity-50",
                    children: deleting === cat.id ? "..." : "Delete"
                  }
                )
              ] }) })
            ] }, cat.id))
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  CategoriesIndex as default
};
