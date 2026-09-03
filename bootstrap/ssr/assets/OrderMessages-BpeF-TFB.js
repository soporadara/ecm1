import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head } from "@inertiajs/react";
import toast from "react-hot-toast";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import "react";
import "react-dom";
import "lucide-react";
function OrderMessages({ fields, settings }) {
  const { data, setData, post, processing, errors } = useForm({
    settings: Object.keys(fields || {}).reduce((acc, key) => {
      acc[key] = (settings == null ? void 0 : settings[key]) || "";
      return acc;
    }, {})
  });
  const submit = (event) => {
    event.preventDefault();
    post("/admin/content-settings/order-messages", {
      preserveScroll: true,
      onSuccess: () => toast.success("Quote wording updated."),
      onError: () => toast.error("Please check the fields and try again.")
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Quote Wording", children: [
    /* @__PURE__ */ jsx(Head, { title: "Quote Wording - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Manual Order Wording" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Edit public Manual Order copy, notices, and success modal text." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm space-y-5", children: [
      Object.entries(fields || {}).map(([key, label]) => {
        const isLong = key.includes("description") || key.includes("introduction") || key.includes("notice") || key.includes("disclaimer");
        return /* @__PURE__ */ jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsx("span", { className: "mb-2 block text-sm font-bold text-admin-text", children: label }),
          isLong ? /* @__PURE__ */ jsx(
            "textarea",
            {
              value: data.settings[key],
              onChange: (event) => setData("settings", { ...data.settings, [key]: event.target.value }),
              rows: 3,
              className: "w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-3 text-admin-text"
            }
          ) : /* @__PURE__ */ jsx(
            "input",
            {
              value: data.settings[key],
              onChange: (event) => setData("settings", { ...data.settings, [key]: event.target.value }),
              className: "w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-3 text-admin-text"
            }
          ),
          errors[`settings.${key}`] && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-bold text-admin-danger", children: errors[`settings.${key}`] })
        ] }, key);
      }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end border-t border-admin-border pt-5", children: /* @__PURE__ */ jsx("button", { disabled: processing, className: "rounded-xl bg-admin-primary px-6 py-3 text-sm font-black uppercase tracking-wider text-white hover:opacity-90 disabled:opacity-60", children: "Save Wording" }) })
    ] })
  ] });
}
export {
  OrderMessages as default
};
