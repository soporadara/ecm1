import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import toast from "react-hot-toast";
import "react";
import "react-dom";
import "lucide-react";
function CategoryCreate({ parents }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    slug: "",
    parent_id: "",
    description: "",
    image: "",
    is_active: true
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/categories", {
      onSuccess: () => {
        toast.success("Category created successfully");
      },
      onError: () => {
        toast.error("Please check the form for errors");
      }
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "New Category", children: [
    /* @__PURE__ */ jsx(Head, { title: "New Category — Rafel CMS" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/categories", className: "hover:text-indigo-600 dark:hover:text-white", children: "Categories" }),
        /* @__PURE__ */ jsx("span", { children: "/" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 dark:text-gray-200 font-medium", children: "New" })
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
                onChange: (e) => {
                  setData("name", e.target.value);
                  if (!data.slug) {
                    setData("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
                  }
                },
                className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
                placeholder: "e.g. Men's Clothing"
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
                className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
                placeholder: "mens-clothing"
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
              className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none",
              placeholder: "Optional description for this category..."
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
              className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
              placeholder: "https://..."
            }
          )
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
              children: processing ? "Creating..." : "Create Category"
            }
          ),
          /* @__PURE__ */ jsx(Link, { href: "/admin/categories", className: "px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors", children: "Cancel" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  CategoryCreate as default
};
