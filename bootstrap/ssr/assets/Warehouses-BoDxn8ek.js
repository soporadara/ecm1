import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
function Warehouses() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "Warehouses — MVM Logistic" }) }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
        /* @__PURE__ */ jsx("h1", { className: "section-title", children: "Our Warehouses" }),
        /* @__PURE__ */ jsx("p", { className: "section-sub", children: "We operate warehouses in Asia to receive, inspect and consolidate your parcels." })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", color: "#6B7280", marginTop: "3rem" }, children: [
        /* @__PURE__ */ jsx("p", { style: { fontSize: "3rem", marginBottom: "1rem" }, children: "🏭" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Warehouse details coming soon. ",
          /* @__PURE__ */ jsx(Link, { href: "/", className: "btn-outline btn-sm", children: "← Back to Home" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Warehouses as default
};
