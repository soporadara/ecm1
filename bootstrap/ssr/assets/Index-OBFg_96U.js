import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-BSaLUdaW.js";
import { useState } from "react";
import "framer-motion";
import "axios";
import "lucide-react";
import "./useTranslation-_E1z7JpE.js";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function Index({ cart, auth }) {
  const { data, setData, post, processing, errors } = useForm({
    shipping_address: "",
    shipping_province: "",
    shipping_district: "",
    shipping_commune: "",
    shipping_phone: "",
    payment_method: "cod"
  });
  const [paymentModal, setPaymentModal] = useState(false);
  const subtotal = cart.items.reduce((total, item) => {
    var _a;
    const itemPrice = parseFloat(((_a = item.product_variant) == null ? void 0 : _a.price) || item.product.sale_price || item.product.price);
    return total + itemPrice * item.quantity;
  }, 0);
  const submit = (e) => {
    e.preventDefault();
    if (data.payment_method !== "cod" && !paymentModal) {
      setPaymentModal(true);
      return;
    }
    post("/checkout");
  };
  const confirmMockPayment = () => {
    setPaymentModal(false);
    post("/checkout");
  };
  return /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Checkout" }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-100 py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-brand-secondary mb-8 text-center font-serif", children: "Checkout" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-2/3 bg-white p-8 rounded-lg shadow-sm border border-gray-200", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-brand-secondary mb-6 border-b pb-4", children: "Shipping Details (Cambodia)" }),
          !auth.user && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-blue-50 text-blue-800 rounded", children: [
            "Returning customer? ",
            /* @__PURE__ */ jsx(Link, { href: "/login", className: "font-bold underline", children: "Click here to login" })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Phone Number *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    className: "w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-brand-primary",
                    value: data.shipping_phone,
                    onChange: (e) => setData("shipping_phone", e.target.value)
                  }
                ),
                errors.shipping_phone && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.shipping_phone })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Province / City *" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    className: "w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-brand-primary bg-white",
                    value: data.shipping_province,
                    onChange: (e) => setData("shipping_province", e.target.value),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Select Province" }),
                      /* @__PURE__ */ jsx("option", { value: "Phnom Penh", children: "Phnom Penh" }),
                      /* @__PURE__ */ jsx("option", { value: "Siem Reap", children: "Siem Reap" }),
                      /* @__PURE__ */ jsx("option", { value: "Battambang", children: "Battambang" }),
                      /* @__PURE__ */ jsx("option", { value: "Sihanoukville", children: "Sihanoukville" }),
                      /* @__PURE__ */ jsx("option", { value: "Kandal", children: "Kandal" })
                    ]
                  }
                ),
                errors.shipping_province && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.shipping_province })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "District / Khan *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    className: "w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-brand-primary",
                    value: data.shipping_district,
                    onChange: (e) => setData("shipping_district", e.target.value)
                  }
                ),
                errors.shipping_district && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.shipping_district })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Commune / Sangkat *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    className: "w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-brand-primary",
                    value: data.shipping_commune,
                    onChange: (e) => setData("shipping_commune", e.target.value)
                  }
                ),
                errors.shipping_commune && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.shipping_commune })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Street Address (House No, Street) *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "House number and street name",
                  className: "w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-brand-primary",
                  value: data.shipping_address,
                  onChange: (e) => setData("shipping_address", e.target.value)
                }
              ),
              errors.shipping_address && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.shipping_address })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/3", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 border-2 border-brand-primary p-6 rounded-lg sticky top-24", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-brand-secondary mb-6 uppercase tracking-wider", children: "Your Order" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-6 border-b border-gray-200 pb-6", children: cart.items.map((item) => {
            var _a;
            return /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
                item.product.name,
                item.product_variant && /* @__PURE__ */ jsxs("span", { className: "text-xs ml-1 text-gray-400", children: [
                  "(",
                  item.product_variant.size,
                  " / ",
                  item.product_variant.color,
                  ")"
                ] }),
                /* @__PURE__ */ jsxs("strong", { className: "text-gray-900 ml-1", children: [
                  "× ",
                  item.quantity
                ] })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-gray-900", children: [
                "$",
                (parseFloat(((_a = item.product_variant) == null ? void 0 : _a.price) || item.product.sale_price || item.product.price) * item.quantity).toFixed(2)
              ] })
            ] }, item.id);
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-brand-secondary", children: "Total" }),
            /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-brand-primary", children: [
              "$",
              subtotal.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-brand-secondary mb-3", children: "Payment Method" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-6", children: [
            /* @__PURE__ */ jsx("label", { className: `block p-4 border rounded cursor-pointer transition-colors ${data.payment_method === "cod" ? "border-brand-primary bg-red-50" : "border-gray-200 bg-white hover:border-brand-primary"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "payment", value: "cod", checked: data.payment_method === "cod", onChange: () => setData("payment_method", "cod"), className: "w-4 h-4 text-brand-primary focus:ring-brand-primary" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: "Cash on Delivery" })
            ] }) }),
            /* @__PURE__ */ jsx("label", { className: `block p-4 border rounded cursor-pointer transition-colors ${data.payment_method === "aba" ? "border-brand-primary bg-red-50" : "border-gray-200 bg-white hover:border-brand-primary"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "payment", value: "aba", checked: data.payment_method === "aba", onChange: () => setData("payment_method", "aba"), className: "w-4 h-4 text-brand-primary focus:ring-brand-primary" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: "ABA PayWay (Mock)" })
            ] }) }),
            /* @__PURE__ */ jsx("label", { className: `block p-4 border rounded cursor-pointer transition-colors ${data.payment_method === "khqr" ? "border-brand-primary bg-red-50" : "border-gray-200 bg-white hover:border-brand-primary"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "payment", value: "khqr", checked: data.payment_method === "khqr", onChange: () => setData("payment_method", "khqr"), className: "w-4 h-4 text-brand-primary focus:ring-brand-primary" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: "KHQR Scan (Mock)" })
            ] }) }),
            /* @__PURE__ */ jsx("label", { className: `block p-4 border rounded cursor-pointer transition-colors ${data.payment_method === "card" ? "border-brand-primary bg-red-50" : "border-gray-200 bg-white hover:border-brand-primary"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "payment", value: "card", checked: data.payment_method === "card", onChange: () => setData("payment_method", "card"), className: "w-4 h-4 text-brand-primary focus:ring-brand-primary" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: "Credit Card (Mock)" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: submit,
              disabled: processing,
              className: "w-full bg-brand-primary text-white font-bold uppercase tracking-wider py-4 rounded hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30 disabled:opacity-50",
              children: processing ? "Processing..." : "Place Order"
            }
          )
        ] }) })
      ] })
    ] }) }),
    paymentModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 text-brand-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-2", children: "Simulated Payment Gateway" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 mb-6", children: [
        "This is a mock checkout interface for staging. No real transactions will occur. Amount: ",
        /* @__PURE__ */ jsxs("strong", { children: [
          "$",
          subtotal.toFixed(2)
        ] }),
        " via ",
        /* @__PURE__ */ jsx("strong", { children: data.payment_method.toUpperCase() }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-center", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setPaymentModal(false), className: "px-6 py-3 border border-gray-300 rounded font-bold text-gray-600 hover:bg-gray-50 transition-colors", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: confirmMockPayment, disabled: processing, className: "px-6 py-3 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition-colors", children: "Simulate Success" })
      ] })
    ] }) })
  ] });
}
export {
  Index as default
};
