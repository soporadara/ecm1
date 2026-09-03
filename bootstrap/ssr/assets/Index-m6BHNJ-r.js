import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-ByoJzJm8.js";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-dom";
import "lucide-react";
function BrandsIndex({ brands }) {
  const [editing, setEditing] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const createForm = useForm({ name: "", logo: "" });
  const editForm = useForm({ name: "", logo: "" });
  const handleCreate = (e) => {
    e.preventDefault();
    createForm.post("/admin/brands", {
      onSuccess: () => {
        toast.success("Brand created successfully");
        createForm.reset();
        setShowCreate(false);
      },
      onError: () => toast.error("Failed to create brand")
    });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    if (!editing) return;
    editForm.put(`/admin/brands/${editing.id}`, {
      onSuccess: () => {
        toast.success("Brand updated successfully");
        setEditing(null);
      },
      onError: () => toast.error("Failed to update brand")
    });
  };
  const handleDelete = async (id) => {
    if (!await confirmAction("Delete this brand?")) return;
    router.delete(`/admin/brands/${id}`, {
      onSuccess: () => toast.success("Brand deleted successfully"),
      onError: () => toast.error("Failed to delete brand")
    });
  };
  return /* @__PURE__ */ jsxs(
    AdminLayout,
    {
      title: "Brands",
      actions: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowCreate(true),
          className: "inline-flex items-center justify-center bg-admin-primary text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover hover:-translate-y-0.5 transition-all duration-200",
          children: "+ New Brand"
        }
      ),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Brands — Rafel CMS" }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:flex sm:items-center sm:justify-between gap-4 mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Brands" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: [
            brands.length,
            " brands in your store"
          ] })
        ] }) }),
        showCreate && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-admin-surface-muted/80 z-50 flex items-center justify-center px-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface rounded-2xl shadow-xl w-full max-w-md p-6 border border-admin-border/50", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-black text-admin-text mb-4", children: "New Brand" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleCreate, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1.5", children: "Brand Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: createForm.data.name,
                  onChange: (e) => createForm.setData("name", e.target.value),
                  className: "h-11 w-full rounded-xl border border-admin-border bg-admin-surface px-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1.5", children: "Logo URL" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: createForm.data.logo,
                  onChange: (e) => createForm.setData("logo", e.target.value),
                  className: "h-11 w-full rounded-xl border border-admin-border bg-admin-surface px-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20",
                  placeholder: "https://..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: createForm.processing,
                  className: "px-5 py-2.5 bg-admin-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover transition-all disabled:opacity-50",
                  children: "Create Brand"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowCreate(false),
                  className: "px-5 py-2.5 text-sm font-bold text-admin-text border border-admin-border rounded-xl hover:bg-admin-surface-muted transition-colors",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs", children: "Brand" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs text-center", children: "Products" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 tracking-wider uppercase text-xs text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-admin-border/50", children: [
            brands.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 3, className: "text-center py-10 text-admin-text-muted font-medium text-sm", children: "No brands yet." }) }),
            brands.map((b) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                b.logo ? /* @__PURE__ */ jsx("img", { src: b.logo, alt: b.name, className: "w-8 h-8 object-contain rounded-lg bg-admin-surface-muted border border-admin-border/50 shadow-sm p-0.5" }) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-admin-surface-muted flex items-center justify-center text-admin-text-muted text-xs font-bold border border-admin-border/50 shadow-sm", children: b.name.charAt(0) }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-admin-text", children: b.name })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center font-bold text-admin-text", children: b.products_count }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setEditing(b);
                      editForm.setData({ name: b.name, logo: b.logo ?? "" });
                    },
                    className: "text-sm font-semibold text-admin-primary hover:text-admin-primary-hover transition-colors",
                    children: "Edit"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(b.id),
                    className: "text-sm font-semibold text-admin-danger hover:text-red-700 transition-colors",
                    children: "Delete"
                  }
                )
              ] }) })
            ] }, b.id))
          ] })
        ] }) }) }),
        editing && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-admin-surface-muted/80 z-50 flex items-center justify-center px-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface rounded-2xl shadow-xl w-full max-w-md p-6 border border-admin-border/50", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-black text-admin-text mb-4", children: "Edit Brand" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleEdit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1.5", children: "Brand Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: editForm.data.name,
                  onChange: (e) => editForm.setData("name", e.target.value),
                  className: "h-11 w-full rounded-xl border border-admin-border bg-admin-surface px-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1.5", children: "Logo URL" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: editForm.data.logo,
                  onChange: (e) => editForm.setData("logo", e.target.value),
                  className: "h-11 w-full rounded-xl border border-admin-border bg-admin-surface px-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: editForm.processing,
                  className: "px-5 py-2.5 bg-admin-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover transition-all disabled:opacity-50",
                  children: "Save"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setEditing(null),
                  className: "px-5 py-2.5 text-sm font-bold text-admin-text border border-admin-border rounded-xl hover:bg-admin-surface-muted transition-colors",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  BrandsIndex as default
};
