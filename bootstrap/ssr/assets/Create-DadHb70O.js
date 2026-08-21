import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import "react-dom";
import "react-hot-toast";
function StaffCreate({ roles }) {
  const [showPassword, setShowPassword] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    roles: []
  });
  const selectRole = (roleName) => {
    setData("roles", [roleName]);
  };
  const submit = (e) => {
    e.preventDefault();
    post("/admin/staff");
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Add Staff Member", children: [
    /* @__PURE__ */ jsx(Head, { title: "Add Staff Member" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Add Staff Member" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Create a new backend user and assign roles" })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/admin/staff",
          className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium",
          children: "← Back to Staff"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Full Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                className: "w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:ring-brand-primary focus:border-brand-primary",
                required: true
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Email Address" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: data.email,
                onChange: (e) => setData("email", e.target.value),
                className: "w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:ring-brand-primary focus:border-brand-primary",
                required: true
              }
            ),
            errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Password" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: showPassword ? "text" : "password",
                  value: data.password,
                  onChange: (e) => setData("password", e.target.value),
                  className: "w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:ring-brand-primary focus:border-brand-primary pr-10",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowPassword(!showPassword),
                  className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none",
                  tabIndex: -1,
                  children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Eye, { className: "h-5 w-5" })
                }
              )
            ] }),
            errors.password && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.password })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3", children: "Assign Roles" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700", children: roles.map((role) => /* @__PURE__ */ jsxs("label", { className: "flex items-start cursor-pointer group", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center h-5", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                name: "staff_role",
                checked: data.roles.includes(role.name),
                onChange: () => selectRole(role.name),
                className: "h-5 w-5 border-gray-300 text-brand-primary focus:ring-brand-primary dark:border-gray-600 dark:bg-gray-700"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "ml-3 text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 dark:text-gray-200 group-hover:text-brand-primary transition-colors", children: role.name }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs font-semibold text-gray-500 dark:text-gray-400", children: [
                role.name === "Super Administrator" && "Full control of CMS, staff, roles, security, and all content.",
                role.name === "Administrator" && "Daily operations, content, orders, customers, settings, and reports.",
                role.name === "Logistics" && "Dashboard, Customers, Orders, Reports, Team Notes, Banners, Customer Reviews, Pop-up Ads."
              ] })
            ] })
          ] }, role.id)) }),
          errors.roles && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.roles })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 dark:border-gray-700 sm:flex-row sm:justify-end", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/staff", className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-200 px-5 text-sm font-black text-gray-700 transition hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary active:scale-[0.98] dark:border-gray-700 dark:text-gray-200", children: "Cancel" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "min-h-11 rounded-xl bg-brand-primary px-6 text-sm font-black text-white shadow-[0_8px_20px_-8px_rgba(var(--brand-primary-rgb),0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(var(--brand-primary-rgb),0.6)] hover:bg-brand-secondary active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100",
            children: processing ? "Creating..." : "Create Staff Member"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  StaffCreate as default
};
