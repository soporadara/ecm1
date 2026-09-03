import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import toast from "react-hot-toast";
import "react";
import "react-dom";
import "lucide-react";
function CouponCreate() {
  const { data, setData, post, processing, errors } = useForm({
    code: "",
    type: "percent",
    value: "",
    min_order: "",
    max_uses: "",
    expires_at: "",
    is_active: true
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/coupons", {
      onSuccess: () => toast.success("Coupon created successfully"),
      onError: () => toast.error("Failed to create coupon")
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "New Coupon", children: [
    /* @__PURE__ */ jsx(Head, { title: "New Coupon — Rafel CMS" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/coupons", className: "hover:text-indigo-600 dark:hover:text-white", children: "Coupons" }),
        /* @__PURE__ */ jsx("span", { children: "/" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-800 dark:text-gray-200 font-medium", children: "New" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5", children: "Coupon Code *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.code,
              onChange: (e) => setData("code", e.target.value.toUpperCase()),
              className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white font-mono uppercase focus:ring-indigo-500 focus:border-indigo-500",
              placeholder: "SAVE20",
              required: true
            }
          ),
          errors.code && /* @__PURE__ */ jsx("p", { className: "text-red-500 dark:text-red-400 text-xs mt-1", children: errors.code })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5", children: "Discount Type" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.type,
                onChange: (e) => setData("type", e.target.value),
                className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "percent", children: "Percentage (%)" }),
                  /* @__PURE__ */ jsx("option", { value: "fixed", children: "Fixed Amount ($)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5", children: "Value *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.value,
                onChange: (e) => setData("value", e.target.value),
                className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500",
                placeholder: data.type === "percent" ? "20" : "5.00",
                step: "0.01",
                min: "0",
                required: true
              }
            ),
            errors.value && /* @__PURE__ */ jsx("p", { className: "text-red-500 dark:text-red-400 text-xs mt-1", children: errors.value })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5", children: "Min. Order ($)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.min_order,
                onChange: (e) => setData("min_order", e.target.value),
                className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500",
                step: "0.01",
                min: "0",
                placeholder: "0.00"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5", children: "Max Uses" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.max_uses,
                onChange: (e) => setData("max_uses", e.target.value),
                className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500",
                min: "1",
                placeholder: "Unlimited"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5", children: "Expiry Date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              value: data.expires_at,
              onChange: (e) => setData("expires_at", e.target.value),
              className: "w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
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
              className: "w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-900"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "is_active", className: "text-sm text-gray-700 dark:text-gray-300", children: "Active immediately" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50",
              children: processing ? "Creating..." : "Create Coupon"
            }
          ),
          /* @__PURE__ */ jsx(Link, { href: "/admin/coupons", className: "px-5 py-2 text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors", children: "Cancel" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  CouponCreate as default
};
