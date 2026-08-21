import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-3Zrdf8uE.js";
import toast from "react-hot-toast";
import "react";
import "react-dom";
import "lucide-react";
function Index({ products }) {
  const { delete: destroy } = useForm();
  const handleDelete = async (id) => {
    if (await confirmAction("Are you sure you want to delete this product?")) {
      destroy(`/admin/products/${id}`, {
        preserveScroll: true,
        onSuccess: () => toast.success("Product deleted successfully.")
      });
    }
  };
  return /* @__PURE__ */ jsxs(
    AdminLayout,
    {
      title: "Products",
      actions: /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/admin/products/create",
          className: "inline-flex items-center justify-center bg-admin-primary text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover hover:-translate-y-0.5 transition-all duration-200",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 mr-1.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
            "New Product"
          ]
        }
      ),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Products - Admin" }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:flex sm:items-center sm:justify-between gap-4 mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Products" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Manage your catalog and inventory." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Product" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Price" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Category" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Stock" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-admin-border/50", children: products.data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "px-6 py-12 text-center text-admin-text-muted font-medium", children: "No products found." }) }) : products.data.map((product) => {
            var _a;
            return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                product.images && product.images.length > 0 ? /* @__PURE__ */ jsx("img", { src: product.images[0].path, alt: product.name, className: "h-12 w-12 rounded-xl object-cover bg-admin-bg border border-admin-border" }) : /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-admin-surface-muted border border-admin-border flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-admin-text-muted", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "font-semibold text-admin-text", children: product.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-admin-text-muted mt-1", children: product.sku || "No SKU" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: product.sale_price ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxs("span", { className: "font-bold text-admin-primary", children: [
                  "$",
                  parseFloat(product.sale_price).toFixed(2)
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-admin-text-muted line-through", children: [
                  "$",
                  parseFloat(product.price).toFixed(2)
                ] })
              ] }) : /* @__PURE__ */ jsxs("span", { className: "font-bold text-admin-text", children: [
                "$",
                parseFloat(product.price).toFixed(2)
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-admin-text-muted", children: ((_a = product.category) == null ? void 0 : _a.name) || "-" }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: product.stock > 0 ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-admin-success/10 text-admin-success", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-admin-success" }),
                product.stock,
                " In Stock"
              ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-admin-danger/10 text-admin-danger", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-admin-danger" }),
                "Out of Stock"
              ] }) }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-right space-x-4", children: [
                /* @__PURE__ */ jsx(Link, { href: `/admin/products/${product.id}/edit`, className: "text-sm font-semibold text-admin-primary hover:text-admin-primary-hover transition-colors", children: "Edit" }),
                /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(product.id), className: "text-sm font-semibold text-admin-danger hover:text-red-700 transition-colors", children: "Delete" })
              ] })
            ] }, product.id);
          }) })
        ] }) }) }),
        products.total > products.per_page && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col sm:flex-row justify-between items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium text-admin-text-muted", children: [
            "Showing ",
            products.from,
            " to ",
            products.to,
            " of ",
            products.total,
            " results"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: products.links.map((link, idx) => /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url || "#",
              className: `px-4 py-2 border rounded-xl text-sm font-semibold transition-all duration-200 ${link.active ? "bg-admin-primary text-white border-admin-primary shadow-sm shadow-admin-primary/20" : "bg-admin-surface text-admin-text-muted border-admin-border hover:bg-admin-surface-muted hover:text-admin-text"}`,
              dangerouslySetInnerHTML: { __html: link.label }
            },
            idx
          )) })
        ] })
      ]
    }
  );
}
export {
  Index as default
};
