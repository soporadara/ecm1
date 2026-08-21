import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
function Track() {
  const [trackingNumber, setTrackingNumber] = useState("");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "Track Parcel — MVM Logistic" }) }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsxs("div", { className: "container-narrow", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
        /* @__PURE__ */ jsx("h1", { className: "section-title", children: "Track Your Parcel" }),
        /* @__PURE__ */ jsx("p", { className: "section-sub", children: "Enter your tracking number to see the latest status of your shipment." })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { maxWidth: 480, margin: "0 auto", display: "flex", gap: "0.75rem", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: trackingNumber,
            onChange: (e) => setTrackingNumber(e.target.value),
            placeholder: "Enter tracking number…",
            className: "form-input",
            style: { flex: 1, minWidth: 200 }
          }
        ),
        /* @__PURE__ */ jsx("button", { className: "btn-primary", disabled: !trackingNumber.trim(), children: "Track →" })
      ] }),
      /* @__PURE__ */ jsxs("p", { style: { textAlign: "center", color: "#9CA3AF", fontSize: "0.85rem", marginTop: "1.5rem" }, children: [
        "Full tracking system coming soon. ",
        /* @__PURE__ */ jsx(Link, { href: "/", style: { color: "#4F46E5" }, children: "Back to home →" })
      ] })
    ] }) })
  ] });
}
export {
  Track as default
};
