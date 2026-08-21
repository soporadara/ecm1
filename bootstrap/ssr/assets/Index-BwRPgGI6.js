import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link, router } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-BSaLUdaW.js";
import "react";
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
function Index({ cart }) {
  var _a;
  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    router.patch(`/cart/${itemId}`, { quantity }, { preserveScroll: true });
  };
  const removeItem = (itemId) => {
    router.delete(`/cart/${itemId}`, { preserveScroll: true });
  };
  const subtotal = ((_a = cart == null ? void 0 : cart.items) == null ? void 0 : _a.reduce((total, item) => {
    var _a2;
    const itemPrice = parseFloat(((_a2 = item.product_variant) == null ? void 0 : _a2.price) || item.product.sale_price || item.product.price);
    return total + itemPrice * item.quantity;
  }, 0)) || 0;
  return /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Shopping Cart" }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-100 py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl font-bold text-brand-secondary font-serif mb-4", children: "Cart" }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center space-x-2 text-sm", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", className: "text-gray-500 hover:text-brand-primary", children: "Home" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "•" }),
        /* @__PURE__ */ jsx("span", { className: "text-brand-primary", children: "Cart" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8 py-16", children: !cart || cart.items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-20 bg-white border border-gray-100 rounded-lg shadow-sm", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-20 h-20 mx-auto text-gray-300 mb-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1, d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-brand-secondary mb-4", children: "Your cart is currently empty." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-8", children: "Before proceed to checkout you must add some products to your shopping cart." }),
      /* @__PURE__ */ jsx(Link, { href: "/shop", className: "inline-block px-8 py-4 bg-brand-primary text-white font-bold rounded hover:bg-red-600 transition-colors", children: "Return To Shop" })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-2/3", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 text-brand-secondary uppercase text-sm tracking-wider", children: [
            /* @__PURE__ */ jsx("th", { className: "p-6 font-bold", colSpan: 2, children: "Product" }),
            /* @__PURE__ */ jsx("th", { className: "p-6 font-bold", children: "Price" }),
            /* @__PURE__ */ jsx("th", { className: "p-6 font-bold", children: "Quantity" }),
            /* @__PURE__ */ jsx("th", { className: "p-6 font-bold", children: "Total" }),
            /* @__PURE__ */ jsx("th", { className: "p-6 font-bold text-right", children: "Remove" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: cart.items.map((item) => {
            var _a2, _b, _c, _d, _e;
            return /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-6 w-24", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: ((_a2 = item.product_variant) == null ? void 0 : _a2.image) || ((_c = (_b = item.product.images) == null ? void 0 : _b[0]) == null ? void 0 : _c.path) || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
                  alt: item.product.name,
                  className: "w-20 h-24 object-cover rounded bg-gray-50"
                }
              ) }),
              /* @__PURE__ */ jsxs("td", { className: "p-6", children: [
                /* @__PURE__ */ jsx(Link, { href: `/shop/${item.product.slug}`, className: "font-bold text-brand-secondary hover:text-brand-primary transition-colors text-lg font-serif", children: item.product.name }),
                item.product_variant && /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 mt-1", children: [
                  item.product_variant.size && /* @__PURE__ */ jsxs("span", { children: [
                    "Size: ",
                    item.product_variant.size
                  ] }),
                  item.product_variant.size && item.product_variant.color && /* @__PURE__ */ jsx("span", { className: "mx-2", children: "|" }),
                  item.product_variant.color && /* @__PURE__ */ jsxs("span", { children: [
                    "Color: ",
                    item.product_variant.color
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("td", { className: "p-6 font-medium text-gray-600", children: [
                "$",
                parseFloat(((_d = item.product_variant) == null ? void 0 : _d.price) || item.product.sale_price || item.product.price).toFixed(2)
              ] }),
              /* @__PURE__ */ jsx("td", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex border border-gray-300 rounded overflow-hidden h-10 w-28", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "px-3 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors",
                    onClick: () => updateQuantity(item.id, item.quantity - 1),
                    children: "-"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    readOnly: true,
                    className: "w-full text-center focus:outline-none font-bold bg-white",
                    value: item.quantity
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "px-3 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors",
                    onClick: () => updateQuantity(item.id, item.quantity + 1),
                    children: "+"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxs("td", { className: "p-6 font-bold text-brand-secondary", children: [
                "$",
                (parseFloat(((_e = item.product_variant) == null ? void 0 : _e.price) || item.product.sale_price || item.product.price) * item.quantity).toFixed(2)
              ] }),
              /* @__PURE__ */ jsx("td", { className: "p-6 text-right", children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => removeItem(item.id),
                  className: "w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-brand-primary hover:text-white transition-colors",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                }
              ) })
            ] }, item.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-between items-center", children: /* @__PURE__ */ jsx(Link, { href: "/shop", className: "px-6 py-3 border-2 border-brand-secondary text-brand-secondary font-bold rounded hover:bg-brand-secondary hover:text-white transition-colors", children: "Continue Shopping" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/3", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-8 rounded-lg border-2 border-brand-primary sticky top-24", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-brand-secondary mb-6 font-serif", children: "Cart Totals" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-b border-gray-200 pb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600 font-medium", children: "Subtotal" }),
            /* @__PURE__ */ jsxs("span", { className: "font-bold text-gray-900", children: [
              "$",
              subtotal.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pt-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-brand-secondary", children: "Total" }),
            /* @__PURE__ */ jsxs("span", { className: "text-3xl font-bold text-brand-primary", children: [
              "$",
              subtotal.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/checkout",
            className: "block text-center w-full bg-brand-primary text-white font-bold uppercase tracking-wider py-4 rounded hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30",
            children: "Proceed To Checkout"
          }
        )
      ] }) })
    ] }) })
  ] });
}
export {
  Index as default
};
