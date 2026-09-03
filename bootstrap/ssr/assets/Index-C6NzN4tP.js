import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-ByoJzJm8.js";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-dom";
import "lucide-react";
function Index({ posts, filters = {} }) {
  const { delete: destroy } = useForm();
  const [from, setFrom] = useState(filters.from || "");
  const [to, setTo] = useState(filters.to || "");
  const handleDelete = async (id) => {
    if (await confirmAction("Are you sure you want to delete this post?")) {
      destroy(`/admin/posts/${id}`, {
        preserveScroll: true,
        onSuccess: () => toast.success("Post deleted successfully.")
      });
    }
  };
  const applyFilters = (event) => {
    event.preventDefault();
    router.get("/admin/posts", { from, to }, { preserveState: true, replace: true });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Blog Posts", children: [
    /* @__PURE__ */ jsx(Head, { title: "Blog Posts - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Blog Posts" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Manage your storefront blog articles." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/admin/posts/create",
          className: "inline-flex items-center justify-center bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-secondary transition-colors",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-1.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
            "New Post"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: applyFilters, className: "mb-6 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-end", children: [
      /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-gray-600 dark:text-gray-300", children: [
        "From",
        /* @__PURE__ */ jsx("input", { type: "date", value: from, onChange: (event) => setFrom(event.target.value), className: "mt-1 block rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white" })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-gray-600 dark:text-gray-300", children: [
        "To",
        /* @__PURE__ */ jsx("input", { type: "date", value: to, onChange: (event) => setTo(event.target.value), className: "mt-1 block rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "min-h-11 rounded-xl bg-brand-primary px-5 text-sm font-black uppercase tracking-wider text-white transition hover:-translate-y-0.5 hover:bg-brand-secondary", children: "Filter Dates" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 font-medium border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 w-16 text-center", children: "Nº" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Image" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Title" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Category" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Author" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-700", children: posts.data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "px-6 py-8 text-center text-gray-500 dark:text-gray-400", children: "No posts found." }) }) : posts.data.map((post, idx) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700/25 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-semibold text-gray-500 text-center", children: (posts.current_page - 1) * posts.per_page + idx + 1 }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: post.image ? /* @__PURE__ */ jsx("img", { src: post.image, alt: post.title, className: "h-10 w-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700" }) : /* @__PURE__ */ jsx("div", { className: "h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900 dark:text-white", children: post.title }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: post.slug })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: post.category ? /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-white", children: post.category.name }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs italic", children: "Uncategorized" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-500 dark:text-gray-400", children: post.user ? post.user.name : "-" }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: post.is_published ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500" }),
          post.scheduled_at && new Date(post.scheduled_at) > /* @__PURE__ */ new Date() ? "Scheduled" : "Published"
        ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gray-500" }),
          "Draft"
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Link, { href: `/admin/posts/${post.id}/comments`, className: "inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-600 dark:text-white hover:opacity-80 transition-opacity", children: "Comments" }),
          /* @__PURE__ */ jsx(Link, { href: `/admin/posts/${post.id}/edit`, className: "inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-600 dark:text-white hover:opacity-80 transition-opacity", children: "Edit" }),
          /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(post.id), className: "inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-700 dark:bg-red-600 dark:text-white hover:opacity-80 transition-opacity", children: "Delete" })
        ] }) })
      ] }, post.id)) })
    ] }) }) }),
    posts.total > posts.per_page && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col sm:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
        "Showing ",
        posts.from,
        " to ",
        posts.to,
        " of ",
        posts.total,
        " results"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: posts.links.map((link, idx) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${link.active ? "bg-brand-primary text-white border-brand-primary" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"}`,
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
