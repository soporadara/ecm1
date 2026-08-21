import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-3Zrdf8uE.js";
import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import "react-dom";
function Index({ categories }) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
    name: "",
    slug: ""
  });
  const openCreate = () => {
    reset();
    setIsCreating(true);
  };
  const openEdit = (category) => {
    setData({ name: category.name, slug: category.slug });
    setEditingCategory(category);
  };
  const closeForm = () => {
    setIsCreating(false);
    setEditingCategory(null);
    reset();
  };
  const submit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      put(`/admin/post-categories/${editingCategory.id}`, {
        onSuccess: () => {
          closeForm();
          toast.success("Category updated successfully");
        }
      });
    } else {
      post("/admin/post-categories", {
        onSuccess: () => {
          closeForm();
          toast.success("Category created successfully");
        }
      });
    }
  };
  const handleDelete = async (category) => {
    if (!await confirmAction(`Are you sure you want to delete ${category.name}?`)) return;
    destroy(`/admin/post-categories/${category.id}`, {
      onSuccess: () => toast.success("Category deleted successfully")
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Blog Categories", children: [
    /* @__PURE__ */ jsx(Head, { title: "Blog Categories - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Blog Categories" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Organize your blog posts into topics." })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: openCreate, className: "inline-flex items-center gap-2 bg-admin-primary text-white px-4 py-2 rounded-xl font-bold hover:bg-admin-primary/90 transition-colors shadow-sm", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }),
        "Add Category"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm whitespace-nowrap", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-admin-surface-muted border-b border-admin-border/50 text-admin-text-muted", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold", children: "Category Name" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold", children: "Slug" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold text-center", children: "Posts" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-admin-border/50", children: [
        categories.map((category) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/50 transition-colors", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-bold text-admin-text", children: category.name }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted", children: category.slug }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center min-w-[2rem] h-6 px-2 rounded-full bg-admin-primary/10 text-admin-primary font-bold text-xs", children: category.posts_count }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => openEdit(category), className: "p-2 text-admin-text-muted hover:text-admin-primary hover:bg-admin-primary/10 rounded-lg transition-colors", children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(category), className: "p-2 text-admin-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
          ] }) })
        ] }, category.id)),
        categories.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-6 py-8 text-center text-admin-text-muted font-medium", children: "No categories found. Create one to get started." }) })
      ] })
    ] }) }),
    (isCreating || editingCategory) && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-admin-border/50", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-admin-border/50", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-admin-text", children: editingCategory ? "Edit Category" : "New Category" }),
        /* @__PURE__ */ jsx("button", { onClick: closeForm, className: "text-admin-text-muted hover:text-admin-text p-1 rounded-lg hover:bg-admin-surface-muted transition-colors", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1.5", children: "Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                className: "w-full bg-admin-surface-muted border-admin-border text-admin-text rounded-xl focus:ring-admin-primary focus:border-admin-primary h-11 px-4 font-medium",
                required: true
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1.5", children: "Slug (optional)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.slug,
                onChange: (e) => setData("slug", e.target.value),
                placeholder: "Auto-generated if empty",
                className: "w-full bg-admin-surface-muted border-admin-border text-admin-text rounded-xl focus:ring-admin-primary focus:border-admin-primary h-11 px-4 font-medium"
              }
            ),
            errors.slug && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.slug })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-end gap-3", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: closeForm, className: "px-5 py-2.5 rounded-xl font-bold text-admin-text hover:bg-admin-surface-muted transition-colors", children: "Cancel" }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "px-5 py-2.5 rounded-xl font-bold bg-admin-primary text-white hover:bg-admin-primary/90 disabled:opacity-50 transition-colors shadow-sm", children: processing ? "Saving..." : "Save Category" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Index as default
};
