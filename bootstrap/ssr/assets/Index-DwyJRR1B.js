import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-3Zrdf8uE.js";
import toast from "react-hot-toast";
import "react";
import "react-dom";
import "lucide-react";
function CouponsIndex({ coupons }) {
  const handleDelete = async (id) => {
    if (!await confirmAction("Delete this coupon?")) return;
    router.delete(`/admin/coupons/${id}`, {
      onSuccess: () => toast.success("Coupon deleted successfully"),
      onError: () => toast.error("Failed to delete coupon")
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Coupons", children: [
    /* @__PURE__ */ jsx(Head, { title: "Coupons — Rafel CMS" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Coupons & Discounts" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-0.5", children: [
          coupons.length,
          " coupon",
          coupons.length !== 1 ? "s" : "",
          " available"
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/admin/coupons/create",
          className: "inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors",
          children: "+ New Coupon"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left text-gray-500 dark:text-gray-400", children: [
      /* @__PURE__ */ jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold", children: "Code" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold hidden sm:table-cell", children: "Discount" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-center hidden md:table-cell", children: "Uses" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold hidden lg:table-cell", children: "Expires" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-center", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-700", children: [
        coupons.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 6, className: "text-center py-12 text-gray-400 dark:text-gray-500 text-sm", children: [
          "No coupons yet. ",
          /* @__PURE__ */ jsx(Link, { href: "/admin/coupons/create", className: "text-indigo-600 dark:text-white hover:underline", children: "Create one →" })
        ] }) }),
        coupons.map((c) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-gray-900 dark:text-white", children: /* @__PURE__ */ jsx("span", { className: "font-mono font-bold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded", children: c.code }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 hidden sm:table-cell", children: [
            c.type === "percent" ? `${c.value}% off` : `$${c.value.toFixed(2)} off`,
            c.min_order > 0 && /* @__PURE__ */ jsxs("span", { className: "text-gray-400 dark:text-gray-500 text-xs ml-1", children: [
              "(min $",
              c.min_order,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-center hidden md:table-cell", children: [
            c.used_count,
            c.max_uses ? `/${c.max_uses}` : ""
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 hidden lg:table-cell", children: c.expires_at ?? /* @__PURE__ */ jsx("span", { className: "text-gray-400 dark:text-gray-500 italic", children: "No expiry" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.is_active ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`, children: c.is_active ? "Active" : "Disabled" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: `/admin/coupons/${c.id}/edit`,
                className: "text-indigo-600 dark:text-white hover:text-indigo-900 dark:hover:text-white font-medium",
                children: "Edit"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(c.id),
                className: "text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-medium",
                children: "Delete"
              }
            )
          ] }) })
        ] }, c.id))
      ] })
    ] }) })
  ] });
}
export {
  CouponsIndex as default
};
