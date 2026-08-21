import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import toast from "react-hot-toast";
import "react";
import "react-dom";
import "lucide-react";
function CategoryEdit({ category, parents }) {
  var _a;
  const { data, setData, put, processing, errors } = useForm({
    name: category.name,
    slug: category.slug,
    parent_id: ((_a = category.parent_id) == null ? void 0 : _a.toString()) ?? "",
    description: category.description ?? "",
    image: category.image ?? "",
    is_active: category.is_active
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/admin/categories/${category.id}`, {
      onSuccess: () => {
        toast.success("Category updated successfully");
      },
      onError: () => {
        toast.error("Please check the form for errors");
      }
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Edit Category", children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit ${category.name} — Rafel CMS` }),
    /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/categories", className: "hover:text-indigo-600 dark:hover:text-white", children: "Categories" }),
        /* @__PURE__ */ jsx("span", { children: "/" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 dark:text-gray-200 font-medium", children: category.name })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5", children: "Name *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5", children: "Slug" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.slug,
                onChange: (e) => setData("slug", e.target.value),
                className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              }
            ),
            errors.slug && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.slug })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5", children: "Parent Category" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: data.parent_id,
              onChange: (e) => setData("parent_id", e.target.value),
              className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "No parent (top-level)" }),
                parents.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.name }, p.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5", children: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: data.description,
              onChange: (e) => setData("description", e.target.value),
              rows: 3,
              className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5", children: "Image URL" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.image,
              onChange: (e) => setData("image", e.target.value),
              className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            }
          ),
          data.image && /* @__PURE__ */ jsx("img", { src: data.image, alt: "Preview", className: "mt-2 h-20 w-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "is_active",
              checked: data.is_active,
              onChange: (e) => setData("is_active", e.target.checked),
              className: "w-4 h-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-indigo-600 focus:ring-indigo-500"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "is_active", className: "text-sm text-gray-700 dark:text-gray-300", children: "Active (visible on storefront)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50",
              children: processing ? "Saving..." : "Save Changes"
            }
          ),
          /* @__PURE__ */ jsx(Link, { href: "/admin/categories", className: "px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors", children: "Cancel" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  CategoryEdit as default
};
