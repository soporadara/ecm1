import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
function ReceiptShow({ receipt }) {
  var _a, _b, _c, _d, _e, _f;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 py-8 print:py-0 print:bg-white", children: [
    /* @__PURE__ */ jsx(Head, { title: `Receipt - ${receipt.receipt_number}` }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto mb-4 print:hidden flex justify-between items-center px-4", children: [
      /* @__PURE__ */ jsx(Link, { href: `/admin/logistics/orders/${receipt.order_id}`, className: "text-gray-600 hover:text-black", children: "← Back to Order" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.print(),
          className: "bg-admin-primary text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 shadow",
          children: "🖨️ Print Receipt"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto bg-white p-12 shadow-xl print:shadow-none print:p-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-12 border-b-2 border-gray-900 pb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "Logo", className: "h-16 object-contain mb-4" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold font-serif mb-1", children: "MVM Logistics" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Phnom Penh, Cambodia" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "info@mvmlogistics.asia" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black tracking-tighter uppercase mb-2", children: "RECEIPT" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 font-mono", children: [
            "#",
            receipt.receipt_number
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 font-mono", children: [
            "Date: ",
            new Date(receipt.created_at).toLocaleDateString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-200 pb-1", children: "Billed To" }),
        /* @__PURE__ */ jsx("p", { className: "font-bold text-lg", children: (_a = receipt.user) == null ? void 0 : _a.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
          "Code: ",
          /* @__PURE__ */ jsx("span", { className: "font-mono", children: (_b = receipt.user) == null ? void 0 : _b.customer_code })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: ((_c = receipt.user) == null ? void 0 : _c.phone_e164) || ((_d = receipt.user) == null ? void 0 : _d.phone) })
      ] }),
      /* @__PURE__ */ jsxs("table", { className: "w-full mb-12 text-left border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b-2 border-gray-900", children: [
          /* @__PURE__ */ jsx("th", { className: "py-3 font-bold text-sm uppercase", children: "Item Description" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 font-bold text-sm uppercase text-center", children: "Qty" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 font-bold text-sm uppercase text-right", children: "Amount" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200", children: ((_f = (_e = receipt.snapshot_json) == null ? void 0 : _e.items) == null ? void 0 : _f.map((item, idx) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsxs("td", { className: "py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold", children: item.name || item.product_name || "Item" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: item.description || item.type })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-4 text-center", children: item.quantity || 1 }),
          /* @__PURE__ */ jsx("td", { className: "py-4 text-right font-medium", children: "--" })
        ] }, idx))) || /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "py-4", children: /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Order Items" }) }),
          /* @__PURE__ */ jsx("td", { className: "py-4 text-center", children: "1" }),
          /* @__PURE__ */ jsx("td", { className: "py-4 text-right font-medium", children: "--" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-16", children: /* @__PURE__ */ jsxs("div", { className: "w-64 space-y-3", children: [
        (() => {
          var _a2, _b2, _c2;
          const currencyCode = ((_b2 = (_a2 = receipt.snapshot_json) == null ? void 0 : _a2.order) == null ? void 0 : _b2.currency_code) || ((_c2 = receipt.order) == null ? void 0 : _c2.currency_code) || "USD";
          const sym = currencyCode === "VND" ? "₫" : currencyCode === "KHR" ? "៛" : "$";
          return /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxs("span", { children: [
                sym,
                " ",
                receipt.subtotal
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { children: "Charges/Shipping" }),
              /* @__PURE__ */ jsxs("span", { children: [
                sym,
                " ",
                receipt.charges
              ] })
            ] }),
            parseFloat(receipt.discount) > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm text-red-600", children: [
              /* @__PURE__ */ jsx("span", { children: "Discount" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "- ",
                sym,
                " ",
                receipt.discount
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xl font-black border-t-2 border-gray-900 pt-3", children: [
              /* @__PURE__ */ jsx("span", { children: "TOTAL" }),
              /* @__PURE__ */ jsxs("span", { children: [
                sym,
                " ",
                receipt.total
              ] })
            ] })
          ] });
        })(),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm font-bold pt-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Status" }),
          /* @__PURE__ */ jsx("span", { className: `uppercase ${receipt.payment_status === "paid" ? "text-green-600" : "text-red-600"}`, children: receipt.payment_status })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center text-sm text-gray-500 border-t border-gray-200 pt-8 mt-auto", children: [
        /* @__PURE__ */ jsx("p", { children: "Thank you for choosing Rafel Logistics." }),
        /* @__PURE__ */ jsx("p", { className: "mt-1", children: "For support, please contact us on Telegram with your receipt number." })
      ] })
    ] })
  ] });
}
export {
  ReceiptShow as default
};
