import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
function ShippingRates() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "Shipping Rates — MVM Logistic" }) }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
        /* @__PURE__ */ jsx("h1", { className: "section-title", children: "Shipping Rates" }),
        /* @__PURE__ */ jsx("p", { className: "section-sub", children: "International shipping rates from our warehouses to your country." })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", color: "#6B7280", marginTop: "3rem" }, children: [
        /* @__PURE__ */ jsx("p", { style: { fontSize: "3rem", marginBottom: "1rem" }, children: "🚧" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Rate tables coming soon. ",
          /* @__PURE__ */ jsx(Link, { href: "/", className: "btn-outline btn-sm", children: "← Back to Home" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ShippingRates as default
};
