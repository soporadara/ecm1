import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
function HowItWorks() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "How It Works — MVM Logistic" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Learn how MVM Logistic purchases products from Taobao, Tmall, 1688, Alibaba, Pinduoduo and AliExpress and delivers them to you." })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
        /* @__PURE__ */ jsx("h1", { className: "section-title", children: "How It Works" }),
        /* @__PURE__ */ jsx("p", { className: "section-sub", children: "Everything you need to know about our purchasing and delivery process." })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", color: "#6B7280", marginTop: "3rem" }, children: [
        /* @__PURE__ */ jsx("p", { style: { fontSize: "3rem", marginBottom: "1rem" }, children: "🚧" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Full guide coming soon. ",
          /* @__PURE__ */ jsx(Link, { href: "/", className: "btn-outline btn-sm", children: "← Back to Home" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  HowItWorks as default
};
