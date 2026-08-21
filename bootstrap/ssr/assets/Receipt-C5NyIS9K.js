import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
function Receipt({ receipt, settings }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const receiptDate = new Date(receipt.created_at);
  const dateFormatted = receiptDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  receiptDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const logoUrl = "/logo.png";
  const currencyCode = ((_b = (_a = receipt.snapshot_json) == null ? void 0 : _a.order) == null ? void 0 : _b.currency_code) || ((_c = receipt.order) == null ? void 0 : _c.currency_code) || "USD";
  const sym = currencyCode === "VND" ? "₫" : currencyCode === "KHR" ? "៛" : "$";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 py-8 print:py-0 print:bg-white text-gray-900 font-sans px-4", children: [
    /* @__PURE__ */ jsx(Head, { title: `Receipt - ${receipt.receipt_number}` }),
    /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto mb-6 print:hidden flex justify-end items-center", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => window.print(),
        className: "bg-gray-800 text-white px-5 py-2.5 rounded shadow hover:bg-gray-700 transition-colors flex items-center gap-2 font-medium text-sm",
        children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" }) }),
          "Print / Save PDF"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto bg-white p-10 md:p-14 shadow-lg border border-gray-200 print:border-none print:shadow-none print:p-0 relative", children: [
      receipt.payment_status === "paid" && /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 opacity-[0.05] pointer-events-none", children: /* @__PURE__ */ jsx("span", { className: "text-[12rem] font-black text-gray-900 uppercase tracking-tighter border-8 border-gray-900 p-8 rounded-3xl", children: "PAID" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start mb-12 border-b-2 border-gray-800 pb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 md:mb-0 flex-1", children: [
          /* @__PURE__ */ jsx("img", { src: logoUrl, alt: "Logo", className: "h-16 md:h-20 object-contain mb-4" }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 text-lg", children: (settings == null ? void 0 : settings.site_name) || "MVM Logistics" }),
            /* @__PURE__ */ jsx("p", { children: (settings == null ? void 0 : settings.store_address) || (settings == null ? void 0 : settings.address) || "Phnom Penh, Cambodia" }),
            /* @__PURE__ */ jsx("p", { children: (settings == null ? void 0 : settings.support_email) || (settings == null ? void 0 : settings.email) || "info@mvmlogistics.asia" }),
            /* @__PURE__ */ jsx("p", { children: (settings == null ? void 0 : settings.support_phone) || (settings == null ? void 0 : settings.phone) || "+855 31 766 9555" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-left md:text-right w-full md:w-auto mt-4 md:mt-0 flex-1", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black tracking-tighter uppercase text-gray-900 mb-2", children: "RECEIPT" }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 space-y-1", children: [
            /* @__PURE__ */ jsxs("p", { className: "flex justify-start md:justify-end gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold uppercase text-gray-500 w-24 md:w-auto", children: "Receipt No:" }),
              " ",
              /* @__PURE__ */ jsxs("span", { className: "font-mono text-gray-900 font-bold", children: [
                "#",
                receipt.receipt_number
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex justify-start md:justify-end gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold uppercase text-gray-500 w-24 md:w-auto", children: "Date:" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: dateFormatted })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex justify-start md:justify-end gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold uppercase text-gray-500 w-24 md:w-auto", children: "Status:" }),
              /* @__PURE__ */ jsx("span", { className: `font-bold uppercase tracking-wider ${receipt.payment_status === "paid" ? "text-green-600" : "text-red-600"}`, children: receipt.payment_status })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-10 flex flex-col md:flex-row justify-between gap-6", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-gray-400 mb-2", children: "Billed To" }),
        /* @__PURE__ */ jsx("p", { className: "font-bold text-xl text-gray-900 mb-1", children: (_d = receipt.user) == null ? void 0 : _d.name }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 space-y-1", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Customer Code: ",
            /* @__PURE__ */ jsx("span", { className: "font-mono font-medium", children: (_e = receipt.user) == null ? void 0 : _e.customer_code })
          ] }),
          /* @__PURE__ */ jsx("p", { children: ((_f = receipt.user) == null ? void 0 : _f.phone_e164) || ((_g = receipt.user) == null ? void 0 : _g.phone) || "N/A" }),
          ((_h = receipt.user) == null ? void 0 : _h.email) && /* @__PURE__ */ jsx("p", { children: receipt.user.email })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-10 relative z-10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-y-2 border-gray-800 text-gray-900 bg-gray-50", children: [
          /* @__PURE__ */ jsx("th", { className: "py-3 px-2 font-bold text-xs uppercase tracking-wider", children: "Description" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-2 font-bold text-xs uppercase tracking-wider text-center w-20", children: "Qty" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-2 font-bold text-xs uppercase tracking-wider text-right w-32", children: "Amount" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200", children: ((_j = (_i = receipt.snapshot_json) == null ? void 0 : _i.items) == null ? void 0 : _j.map((item, idx) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsxs("td", { className: "py-4 px-2", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: item.name || item.product_name || "Service Item" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-0.5", children: item.description || item.type || (item.order_number ? `Order REF: ${item.order_number}` : "") })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-4 px-2 text-center font-medium text-gray-700", children: item.quantity || 1 }),
          /* @__PURE__ */ jsx("td", { className: "py-4 px-2 text-right text-gray-400 font-mono text-sm", children: "--" })
        ] }, idx))) || /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "py-8 text-center text-gray-400 italic text-sm", colSpan: 3, children: "No items recorded for this receipt." }) }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start gap-8 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 text-sm text-gray-500", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider", children: "Payment Information" }),
          /* @__PURE__ */ jsx("p", { children: "All transactions are final." }),
          /* @__PURE__ */ jsx("p", { className: "mt-1", children: "For questions concerning this receipt, please contact our support team." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full md:w-72 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-600 text-sm", children: [
            /* @__PURE__ */ jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxs("span", { children: [
              sym,
              " ",
              Number(receipt.subtotal).toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-600 text-sm", children: [
            /* @__PURE__ */ jsx("span", { children: "Service & Shipping Fees" }),
            /* @__PURE__ */ jsxs("span", { children: [
              sym,
              " ",
              Number(receipt.charges).toFixed(2)
            ] })
          ] }),
          parseFloat(receipt.discount) > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-600 text-sm", children: [
            /* @__PURE__ */ jsx("span", { children: "Discount" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "- ",
              sym,
              " ",
              Number(receipt.discount).toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-t-2 border-gray-800 pt-3 mt-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-gray-900", children: "Total" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold text-gray-900", children: [
              sym,
              " ",
              Number(receipt.total).toFixed(2)
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center text-sm text-gray-500 border-t border-gray-200 pt-8", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 mb-1", children: (settings == null ? void 0 : settings.site_name) || "MVM Logistics" }),
        /* @__PURE__ */ jsx("p", { children: "Thank you for choosing us for your logistics needs." })
      ] })
    ] })
  ] });
}
export {
  Receipt as default
};
