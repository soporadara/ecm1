import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import "react";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
function Index({ users, filters }) {
  const { data, setData, get } = useForm({
    search: (filters == null ? void 0 : filters.search) || ""
  });
  const handleSearch = (e) => {
    e.preventDefault();
    get(route("admin.users.index"), { preserveState: true });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Users & Roles" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-6", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Manage Users & Roles" }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex flex-col sm:flex-row gap-4 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search customers by name or email...",
            value: data.search,
            onChange: (e) => setData("search", e.target.value),
            className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          }
        ) }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium", children: "Filter" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left text-gray-500 dark:text-gray-400", children: [
        /* @__PURE__ */ jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Customer" }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Email" }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Joined" }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-right", children: "Type" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: users.data.map((user) => /* @__PURE__ */ jsxs("tr", { className: "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3", children: [
            user.avatar ? /* @__PURE__ */ jsx("img", { src: user.avatar, alt: user.name, className: "w-8 h-8 rounded-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold uppercase", children: user.name.charAt(0) }),
            user.name
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: user.email }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: new Date(user.created_at).toLocaleDateString() }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300", children: "Customer" }) })
        ] }, user.id)) })
      ] }) }),
      users.links && users.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: users.links.map((link, index) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `px-4 py-2 text-sm border rounded-lg ${link.active ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"} ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        index
      )) }) })
    ] })
  ] });
}
export {
  Index as default
};
