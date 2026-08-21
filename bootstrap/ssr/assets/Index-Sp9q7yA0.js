import { jsxs, jsx } from "react/jsx-runtime";
import { Head, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-3Zrdf8uE.js";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-dom";
import "lucide-react";
function Reviews({ reviews }) {
  const [deletingId, setDeletingId] = useState(null);
  const deleteReview = async (id) => {
    if (await confirmAction("Are you sure you want to delete this review?")) {
      setDeletingId(id);
      router.delete(`/admin/reviews/${id}`, {
        preserveScroll: true,
        onSuccess: () => toast.success("Review deleted successfully."),
        onError: () => toast.error("Failed to delete review."),
        onFinish: () => setDeletingId(null)
      });
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Product Reviews", children: [
    /* @__PURE__ */ jsx(Head, { title: "Reviews - Admin" }),
    /* @__PURE__ */ jsx("div", { className: "mb-6 flex justify-between items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Product Reviews" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Manage customer feedback and ratings." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 font-medium border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Rating" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Product" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Customer" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 w-1/3", children: "Comment" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Date" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-700", children: reviews.data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "px-6 py-8 text-center text-gray-500", children: "No reviews found." }) }) : reviews.data.map((review) => {
        var _a, _b, _c;
        return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700/25 transition-colors", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-center text-yellow-400", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: `w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300 dark:text-gray-600 fill-current"}`, viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, i)) }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-gray-900 dark:text-white", children: ((_a = review.product) == null ? void 0 : _a.name) || "Unknown Product" }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-900 dark:text-white", children: ((_b = review.user) == null ? void 0 : _b.name) || "Guest" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: (_c = review.user) == null ? void 0 : _c.email })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-normal", children: review.comment }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-500 whitespace-nowrap", children: new Date(review.created_at).toLocaleDateString() }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => deleteReview(review.id),
              disabled: deletingId === review.id,
              className: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-50",
              children: deletingId === review.id ? "Deleting..." : "Delete"
            }
          ) })
        ] }, review.id);
      }) })
    ] }) }) })
  ] });
}
export {
  Reviews as default
};
