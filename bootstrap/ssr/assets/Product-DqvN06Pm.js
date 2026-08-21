var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link, Head, router } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-BSaLUdaW.js";
import { Component, useState } from "react";
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
class ErrorBoundary extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      hasError: false,
      error: null
    });
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full space-y-8 bg-white dark:bg-black p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-red-600 dark:text-red-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mt-6 text-3xl font-extrabold text-gray-900 dark:text-white font-serif", children: "Unable to load product preview" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: "We could not retrieve this product. Please check the link or use Manual Order." })
        ] }),
        process.env.NODE_ENV === "development" && this.state.error && /* @__PURE__ */ jsx("div", { className: "mt-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg text-left overflow-auto text-xs text-red-700 dark:text-red-400", children: this.state.error.toString() }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col space-y-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => window.location.reload(),
              className: "w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold uppercase tracking-widest text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors",
              children: "Retry"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/",
              className: "w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors",
              children: "Back to Import"
            }
          )
        ] })
      ] }) });
    }
    return this.props.children;
  }
}
function ImportedProductPage({ importResult, importJob }) {
  var _a;
  const isFailed = (importResult == null ? void 0 : importResult.status) === "failed" || !(importResult == null ? void 0 : importResult.success);
  const importedProduct = importResult == null ? void 0 : importResult.data;
  const normalizeImportedProduct = (product) => ({
    provider: (product == null ? void 0 : product.provider) ?? (product == null ? void 0 : product.marketplace) ?? "taobao",
    source_url: (product == null ? void 0 : product.source_url) ?? (product == null ? void 0 : product.original_url) ?? "",
    normalized_url: (product == null ? void 0 : product.normalized_url) ?? "",
    external_product_id: (product == null ? void 0 : product.external_product_id) ?? (product == null ? void 0 : product.original_id) ?? "",
    selected_external_sku_id: (product == null ? void 0 : product.selected_external_sku_id) ?? null,
    title: (product == null ? void 0 : product.title) ?? "Unknown Product",
    original_title: (product == null ? void 0 : product.original_title) ?? (product == null ? void 0 : product.title) ?? "",
    description: (product == null ? void 0 : product.description) ?? (product == null ? void 0 : product.short_description) ?? (product == null ? void 0 : product.full_description) ?? "",
    translated_title: (product == null ? void 0 : product.translated_title) ?? "",
    short_description: (product == null ? void 0 : product.short_description) ?? "",
    full_description: (product == null ? void 0 : product.full_description) ?? (product == null ? void 0 : product.description) ?? "",
    source_currency: (product == null ? void 0 : product.source_currency) ?? "CNY",
    source_price: (product == null ? void 0 : product.source_price) ?? (product == null ? void 0 : product.price_cny) ?? null,
    price_cny: Number((product == null ? void 0 : product.price_cny) ?? (product == null ? void 0 : product.source_price) ?? 0),
    converted_usd_price: (product == null ? void 0 : product.converted_usd_price) ?? (product == null ? void 0 : product.price_usd) ?? null,
    converted_khr_price: (product == null ? void 0 : product.converted_khr_price) ?? null,
    images: Array.isArray(product == null ? void 0 : product.images) ? product.images : [],
    variants: Array.isArray(product == null ? void 0 : product.variants) ? product.variants : [],
    options: Array.isArray(product == null ? void 0 : product.options) ? product.options : Array.isArray(product == null ? void 0 : product.option_groups) ? product.option_groups : [],
    metadata: (product == null ? void 0 : product.metadata) && typeof product.metadata === "object" && !Array.isArray(product.metadata) ? product.metadata : {},
    seller: (product == null ? void 0 : product.seller) && typeof product.seller === "object" ? product.seller : { name: (product == null ? void 0 : product.seller_name) || "" },
    delivery: (product == null ? void 0 : product.delivery) && typeof product.delivery === "object" ? product.delivery : {},
    prices: (product == null ? void 0 : product.prices) && typeof product.prices === "object" ? product.prices : {},
    attributes: (product == null ? void 0 : product.attributes) && typeof product.attributes === "object" ? product.attributes : {},
    main_image: (product == null ? void 0 : product.main_image) ?? (Array.isArray(product == null ? void 0 : product.images) && product.images.length > 0 ? product.images[0] : "")
  });
  const safeProduct = normalizeImportedProduct(importedProduct);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [remarks, setRemarks] = useState("");
  const [activeImage, setActiveImage] = useState(safeProduct.main_image);
  let currentPriceCny = safeProduct.price_cny;
  let selectedVariant = null;
  const handleAddToCart = () => {
    if (Object.keys(selectedOptions).length !== safeProduct.options.length) {
      alert("Please select all options.");
      return;
    }
    router.post("/logistics/import/confirm", {
      importJob,
      quantity,
      options: Object.values(selectedOptions),
      remarks
    }, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        alert("Added to order successfully!");
      }
    });
  };
  if (Object.keys(selectedOptions).length === safeProduct.options.length) {
    selectedVariant = safeProduct.variants.find((v) => {
      return v.attributes.every((attr) => selectedOptions[attr.name] === attr.value);
    });
    if (selectedVariant) {
      currentPriceCny = selectedVariant.price_cny;
      if (selectedVariant.image) {
        setActiveImage(selectedVariant.image);
      }
    }
  }
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs(MainLayout, { title: isFailed ? "Import Failed" : safeProduct.title, description: safeProduct.description, children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsxs("title", { children: [
      isFailed ? "Import Failed" : safeProduct.title,
      " — MVM Logistic"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-900 min-h-screen py-12", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: isFailed ? /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-8 border border-red-100 dark:border-red-900 text-center shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-red-600 dark:text-red-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-2", children: ((_a = importResult == null ? void 0 : importResult.error) == null ? void 0 : _a.message) || "The provider did not return usable product information." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 mb-8", children: "Please check the link, try again, or create a Manual Order instead." }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/logistics/import",
            className: "px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
            children: "Back to Import"
          }
        ),
        /* @__PURE__ */ jsx("button", { className: "px-6 py-2.5 rounded-lg border border-transparent bg-brand-primary text-white text-sm font-bold uppercase tracking-widest shadow-sm hover:bg-brand-secondary transition-colors", children: "Manual Order" })
      ] })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-6 py-4 rounded-xl flex items-center gap-4 mb-8 border border-green-200 dark:border-green-800", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl", children: "✅" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-sm uppercase tracking-wider", children: "Product Imported Successfully" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs opacity-80", children: [
            "This product details were fetched from ",
            /* @__PURE__ */ jsx("strong", { children: safeProduct.provider }),
            "."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col lg:flex-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800", children: [
          /* @__PURE__ */ jsxs("div", { className: "aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-4 relative", children: [
            /* @__PURE__ */ jsx("img", { src: activeImage, className: "w-full h-full object-cover", alt: "Product" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-widest text-brand-secondary", children: safeProduct.provider })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-4 overflow-x-auto pb-2", children: safeProduct.images.map((img, idx) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveImage(img),
              className: `w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === img ? "border-brand-primary" : "border-transparent hover:border-gray-300"}`,
              children: /* @__PURE__ */ jsx("img", { src: img, className: "w-full h-full object-cover", alt: "" })
            },
            idx
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 p-6 lg:p-10", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl lg:text-3xl font-bold text-brand-secondary dark:text-white mb-2 leading-tight", children: safeProduct.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-6 font-serif italic", children: safeProduct.original_title }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2 mb-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-3xl font-bold text-brand-primary font-serif", children: [
                "¥ ",
                currentPriceCny.toFixed(2)
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 uppercase tracking-widest font-bold", children: "CNY" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 font-medium", children: [
              "Estimated: $",
              (currentPriceCny * 1.05 / 7.2).toFixed(2),
              " USD"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
            e.preventDefault();
            handleAddToCart();
          }, className: "space-y-6", children: [
            safeProduct.options.map((option, optIdx) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold uppercase tracking-widest text-brand-secondary dark:text-gray-300 mb-3", children: option.name }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: option.values.map((val, valIdx) => {
                const isSelected = selectedOptions[option.name] === val;
                return /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedOptions({ ...selectedOptions, [option.name]: val }),
                    className: `px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${isSelected ? "border-brand-primary bg-brand-primary/5 text-brand-primary shadow-[0_0_0_1px_rgba(220,38,38,1)]" : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`,
                    children: val
                  },
                  valIdx
                );
              }) })
            ] }, optIdx)),
            /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-6 mb-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold uppercase tracking-widest text-brand-secondary dark:text-gray-300 mb-3", children: "Quantity" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 h-12 w-32", children: [
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setQuantity(Math.max(1, quantity - 1)), className: "px-4 text-gray-500 hover:text-brand-primary transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 h-full font-bold", children: "-" }),
                  /* @__PURE__ */ jsx("input", { type: "number", value: quantity, readOnly: true, className: "w-full text-center bg-transparent outline-none font-bold text-brand-secondary dark:text-white" }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setQuantity(quantity + 1), className: "px-4 text-gray-500 hover:text-brand-primary transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 h-full font-bold", children: "+" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold uppercase tracking-widest text-brand-secondary dark:text-gray-300 mb-3", children: "Remarks for Buyer" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: remarks,
                    onChange: (e) => setRemarks(e.target.value),
                    className: "w-full px-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-brand-secondary dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary h-12",
                    placeholder: "Any special instructions..."
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "w-full bg-brand-primary text-white font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-brand-secondary transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5",
                children: "Add to Purchase List"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-gray-400 mt-4", children: "The final price may vary slightly based on actual seller charges and domestic shipping. We will confirm before deducting your wallet." })
          ] })
        ] })
      ] })
    ] }) }) })
  ] }) });
}
export {
  ImportedProductPage as default
};
