import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { router, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import { Search, Trash2 } from "lucide-react";
import "react-dom";
import "react-hot-toast";
function Index({ quotes, filters, statuses }) {
  const [search, setSearch] = useState(filters.search || "");
  const [status, setStatus] = useState(filters.status || "");
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search !== (filters.search || "") || status !== (filters.status || "")) {
        router.get(
          route("admin.quote-requests.index"),
          { search, status },
          { preserveState: true, preserveScroll: true }
        );
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [search, status]);
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const onStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const updateStatus = (id, newStatus) => {
    router.put(route("admin.quote-requests.update", id), { status: newStatus }, {
      preserveScroll: true
    });
  };
  const deleteQuote = (id) => {
    if (confirm("Are you sure you want to delete this quote request?")) {
      router.delete(route("admin.quote-requests.destroy", id), {
        preserveScroll: true
      });
    }
  };
  const getStatusColor = (status2) => {
    switch (status2) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "quoted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Quote Requests" }),
    /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 md:px-8", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-slate-900 dark:text-white", children: "Quote Requests" }) }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-6", children: /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900", children: [
        /* @__PURE__ */ jsx("div", { className: "border-b border-slate-200 p-4 dark:border-slate-800 sm:flex sm:items-center sm:justify-between gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative max-w-xs flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsx(Search, { className: "h-5 w-5 text-slate-400" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: search,
                onChange: onSearchChange,
                className: "block w-full rounded-lg border-0 py-2 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:ring-slate-700",
                placeholder: "Search requests..."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: status,
              onChange: onStatusChange,
              className: "block rounded-lg border-0 py-2 pl-3 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:ring-slate-700",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "All Statuses" }),
                statuses.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s.charAt(0).toUpperCase() + s.slice(1) }, s))
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-slate-200 dark:divide-slate-800", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-slate-50 dark:bg-slate-800/50", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { scope: "col", className: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-white sm:pl-6", children: "Contact" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white", children: "Description" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white", children: "Status" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white", children: "Date" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "relative py-3.5 pl-3 pr-4 sm:pr-6", children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Actions" }) })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900", children: [
            quotes.data.map((quote) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsxs("td", { className: "whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6", children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium text-slate-900 dark:text-white", children: quote.name }),
                /* @__PURE__ */ jsx("div", { className: "text-slate-500", children: quote.phone }),
                quote.email && /* @__PURE__ */ jsx("div", { className: "text-slate-500", children: quote.email })
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-4 text-sm text-slate-500 dark:text-slate-400 max-w-md", children: /* @__PURE__ */ jsx("div", { className: "font-medium text-slate-900 dark:text-white whitespace-pre-wrap", children: quote.description }) }),
              /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-3 py-4 text-sm", children: /* @__PURE__ */ jsx(
                "select",
                {
                  value: quote.status,
                  onChange: (e) => updateStatus(quote.id, e.target.value),
                  className: `rounded-full px-2.5 py-0.5 text-xs font-medium border-0 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-brand-primary cursor-pointer ${getStatusColor(quote.status)}`,
                  children: statuses.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s.toUpperCase() }, s))
                }
              ) }),
              /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400", children: new Date(quote.created_at).toLocaleDateString() }),
              /* @__PURE__ */ jsx("td", { className: "relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6", children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => deleteQuote(quote.id),
                  className: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 ml-4",
                  title: "Delete",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                }
              ) })
            ] }, quote.id)),
            quotes.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400", children: "No quote requests found." }) })
          ] })
        ] }) })
      ] }) })
    ] })
  ] });
}
export {
  Index as default
};
