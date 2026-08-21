import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import "react";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
function StaffEdit({ staff, roles }) {
  const currentRoles = staff.roles.map((r) => r.name);
  const { data, setData, put, processing, errors } = useForm({
    name: staff.name,
    email: staff.email,
    password: "",
    roles: currentRoles
  });
  const selectRole = (roleName) => {
    setData("roles", [roleName]);
  };
  const submit = (e) => {
    e.preventDefault();
    put(`/admin/staff/${staff.id}`);
  };
  const isPrimarySuperAdmin = staff.id === 1;
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Edit Staff Member", children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit ${staff.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Edit Staff Member" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Update user details and access levels" })
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
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: [
              "Change Password",
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs font-normal ml-2", children: "(leave blank to keep current)" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                value: data.password,
                onChange: (e) => setData("password", e.target.value),
                className: "w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:ring-brand-primary focus:border-brand-primary"
              }
            ),
            errors.password && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.password })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3", children: "Assign Roles" }),
          isPrimarySuperAdmin && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm rounded-lg border border-yellow-200 dark:border-yellow-800/50", children: [
            /* @__PURE__ */ jsx("strong", { children: "Note:" }),
            " This is the primary Super Administrator. The Super Administrator role cannot be removed from this account."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700", children: roles.map((role) => {
            const isSuperAdminRole = role.name === "Super Administrator";
            const disabled = isPrimarySuperAdmin && isSuperAdminRole;
            return /* @__PURE__ */ jsxs("label", { className: `flex items-start ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer group"}`, children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center h-5", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name: "staff_role",
                  checked: data.roles.includes(role.name),
                  onChange: () => !disabled && selectRole(role.name),
                  disabled,
                  className: "h-5 w-5 border-gray-300 text-brand-primary focus:ring-brand-primary dark:border-gray-600 dark:bg-gray-700 disabled:opacity-50"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-3 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: `font-medium text-gray-900 dark:text-gray-200 ${!disabled && "group-hover:text-brand-primary transition-colors"}`, children: role.name }),
                /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs font-semibold text-gray-500 dark:text-gray-400", children: [
                  role.name === "Super Administrator" && "Full control of CMS, staff, roles, security, and all content.",
                  role.name === "Administrator" && "Daily operations, content, orders, customers, settings, and reports.",
                  role.name === "Logistics" && "Dashboard, Customers, Orders, Reports, Team Notes, Banners, Customer Reviews, Pop-up Ads."
                ] })
              ] })
            ] }, role.id);
          }) }),
          errors.roles && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.roles })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 dark:border-gray-700 sm:flex-row sm:justify-end", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/staff", className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-200 px-5 text-sm font-black text-gray-700 transition hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-gray-200", children: "Cancel" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "min-h-11 rounded-xl bg-brand-primary px-6 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-secondary disabled:opacity-50",
            children: processing ? "Saving..." : "Save Changes"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  StaffEdit as default
};
