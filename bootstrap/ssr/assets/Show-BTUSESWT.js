import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage, useForm, Link } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-C3efSGPT.js";
import { P as ProductCard } from "./ProductCard-CIooOy7p.js";
import { useState, useEffect } from "react";
import "framer-motion";
import "axios";
import "lucide-react";
import "./useTranslation-CqoVm-kK.js";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function QuickCheckoutModal({ isOpen, onClose, product, variant, quantity }) {
  var _a, _b, _c;
  const { auth } = usePage().props;
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const unitPrice = variant ? variant.price : product.sale_price || product.price;
  const subtotal = unitPrice * quantity;
  let discountAmount = 0;
  if (couponDiscount) {
    if (couponDiscount.type === "percent") {
      discountAmount = subtotal * (couponDiscount.value / 100);
    } else {
      discountAmount = couponDiscount.value;
    }
  }
  const total = Math.max(0, subtotal - discountAmount);
  const { data, setData, post, processing, errors, reset } = useForm({
    product_id: product.id,
    product_variant_id: variant ? variant.id : null,
    quantity,
    shipping_address: "",
    shipping_phone: ((_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.phone) || "",
    payment_method: "cod",
    map_coordinates: "",
    coupon_code: ""
  });
  const applyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode) return;
    setIsApplyingCoupon(true);
    setCouponError("");
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ code: couponCode })
      });
      const result = await res.json();
      if (result.valid) {
        setCouponDiscount(result.coupon);
        setData("coupon_code", result.coupon.code);
      } else {
        setCouponError(result.message);
        setCouponDiscount(null);
        setData("coupon_code", "");
      }
    } catch (err) {
      setCouponError("Error validating coupon");
    }
    setIsApplyingCoupon(false);
  };
  const submitOrder = (e) => {
    e.preventDefault();
    post("/checkout/quick", {
      preserveScroll: true,
      onSuccess: () => {
        onClose();
      }
    });
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row", children: [
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white z-20", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-6 font-serif", children: "Quick Checkout" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsx("img", { src: (_c = (_b = product.images) == null ? void 0 : _b[0]) == null ? void 0 : _c.path, alt: product.name, className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-800 dark:text-gray-200", children: product.name }),
            variant && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
              variant.size,
              " / ",
              variant.color
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium mt-1", children: [
              "$",
              unitPrice,
              " x ",
              quantity
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { id: "quick-checkout-form", onSubmit: submitOrder, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Delivery Address" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                required: true,
                rows: 2,
                className: "w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded shadow-sm focus:border-brand-primary focus:ring-brand-primary",
                placeholder: "Street name, Building, Apartment No.",
                value: data.shipping_address,
                onChange: (e) => setData("shipping_address", e.target.value)
              }
            ),
            errors.shipping_address && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.shipping_address })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Phone Number" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                required: true,
                className: "w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded shadow-sm focus:border-brand-primary focus:ring-brand-primary",
                placeholder: "+855 12 345 678",
                value: data.shipping_phone,
                onChange: (e) => setData("shipping_phone", e.target.value)
              }
            ),
            errors.shipping_phone && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.shipping_phone })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Payment Method" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded shadow-sm focus:border-brand-primary focus:ring-brand-primary",
                value: data.payment_method,
                onChange: (e) => setData("payment_method", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "cod", children: "Cash on Delivery" }),
                  /* @__PURE__ */ jsx("option", { value: "aba", children: "ABA Pay" }),
                  /* @__PURE__ */ jsx("option", { value: "card", children: "Credit Card" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 p-6 md:p-8 bg-gray-50 dark:bg-gray-800/50 flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Pin Your Location (Optional)" }),
          /* @__PURE__ */ jsxs("div", { className: "w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative flex items-center justify-center group cursor-pointer border border-gray-300 dark:border-gray-600", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center p-4", children: [
              /* @__PURE__ */ jsxs("svg", { className: "w-8 h-8 text-red-500 mx-auto mb-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
                "Map UI requires ",
                /* @__PURE__ */ jsx("code", { className: "font-bold", children: "VITE_GOOGLE_MAPS_API_KEY" }),
                " in .env"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setData("map_coordinates", "11.5564, 104.9282"),
                className: "px-4 py-2 bg-white text-gray-900 font-bold rounded shadow-lg text-sm hover:bg-gray-100 transition-colors",
                children: "Drop Pin Here"
              }
            ) })
          ] }),
          data.map_coordinates && /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-600 mt-2 font-medium", children: [
            "✓ Location pinned: ",
            data.map_coordinates
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Have a coupon?" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "flex-1 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded shadow-sm focus:border-brand-primary focus:ring-brand-primary uppercase text-sm",
                placeholder: "ENTER CODE",
                value: couponCode,
                onChange: (e) => setCouponCode(e.target.value.toUpperCase()),
                disabled: couponDiscount !== null
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: applyCoupon,
                disabled: !couponCode || couponDiscount !== null || isApplyingCoupon,
                className: "px-4 bg-gray-900 dark:bg-gray-700 text-white font-bold rounded hover:bg-gray-800 disabled:opacity-50 text-sm",
                children: isApplyingCoupon ? "..." : couponDiscount ? "Applied" : "Apply"
              }
            )
          ] }),
          couponError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: couponError })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm text-gray-600 dark:text-gray-400", children: [
            /* @__PURE__ */ jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "$",
              subtotal.toFixed(2)
            ] })
          ] }),
          couponDiscount && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm text-green-600 dark:text-green-400 font-medium", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Discount (",
              couponDiscount.code,
              ")"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "-$",
              discountAmount.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "$",
              total.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            form: "quick-checkout-form",
            type: "submit",
            disabled: processing,
            className: "w-full mt-6 h-14 bg-brand-primary text-white font-bold uppercase tracking-widest hover:bg-brand-secondary transition-colors rounded shadow-lg shadow-red-500/30 disabled:opacity-50",
            children: processing ? "Processing..." : "Place Order Now"
          }
        )
      ] })
    ] })
  ] });
}
function Show({ product, relatedProducts }) {
  var _a, _b;
  const { auth } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    product_id: product.id,
    product_variant_id: null,
    quantity: 1
  });
  const reviewForm = useForm({
    rating: 5,
    comment: ""
  });
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isQuickCheckoutOpen, setIsQuickCheckoutOpen] = useState(false);
  const variants = product.variants || [];
  const sizes = Array.from(new Set(variants.map((v) => v.size).filter(Boolean)));
  const colors = Array.from(new Set(variants.map((v) => v.color).filter(Boolean)));
  useEffect(() => {
    if (sizes.length === 1 && !selectedSize) setSelectedSize(sizes[0]);
    if (colors.length === 1 && !selectedColor) setSelectedColor(colors[0]);
  }, [sizes, colors]);
  const activeVariant = variants.find((v) => {
    const sizeMatch = sizes.length === 0 || v.size === selectedSize;
    const colorMatch = colors.length === 0 || v.color === selectedColor;
    return sizeMatch && colorMatch;
  });
  useEffect(() => {
    setData("quantity", qty);
    if (activeVariant) {
      setData("product_variant_id", activeVariant.id);
    } else {
      setData("product_variant_id", null);
    }
  }, [qty, activeVariant]);
  const handleQtyChange = (e) => {
    const val = parseInt(e.target.value);
    if (val > 0) setQty(val);
  };
  const addToCart = (e) => {
    e.preventDefault();
    if (variants.length > 0 && !activeVariant) {
      alert("Please select valid options.");
      return;
    }
    post("/cart", { preserveScroll: true });
  };
  const submitReview = (e) => {
    e.preventDefault();
    reviewForm.post(`/products/${product.id}/reviews`, {
      preserveScroll: true,
      onSuccess: () => {
        reviewForm.reset();
        alert("Review submitted successfully!");
      }
    });
  };
  const images = ((_a = product.images) == null ? void 0 : _a.length) > 0 ? product.images : [{ id: 0, path: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" }];
  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
  };
  const displayPrice = (activeVariant == null ? void 0 : activeVariant.price) || product.sale_price || product.price;
  const stockToDisplay = activeVariant ? activeVariant.stock : product.stock;
  const discount = product.sale_price ? Math.round((parseFloat(product.price) - parseFloat(product.sale_price)) / parseFloat(product.price) * 100) : 0;
  return /* @__PURE__ */ jsxs(
    MainLayout,
    {
      title: product.name,
      description: product.short_description || product.description.substring(0, 150),
      children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gray-100 dark:bg-gray-900 py-6 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-2 text-sm text-gray-500 dark:text-gray-400 font-medium", children: [
          /* @__PURE__ */ jsx(Link, { href: "/", className: "hover:text-brand-primary", children: "Home" }),
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx(Link, { href: "/shop", className: "hover:text-brand-primary", children: "Shop" }),
          /* @__PURE__ */ jsx("span", { children: "/" }),
          product.category && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Link, { href: `/shop?category=${product.category.slug}`, className: "hover:text-brand-primary", children: product.category.name }),
            /* @__PURE__ */ jsx("span", { children: "/" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-900 dark:text-gray-200", children: product.name })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8 py-12 lg:py-20 transition-colors duration-300", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12 lg:gap-20", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 flex flex-col md:flex-row-reverse gap-4", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "w-full relative bg-gray-50 dark:bg-gray-800 rounded overflow-hidden cursor-zoom-in group flex items-center justify-center max-h-[500px]",
                onClick: () => setIsLightboxOpen(true),
                style: { minHeight: "400px" },
                children: [
                  discount > 0 && /* @__PURE__ */ jsxs("span", { className: "absolute top-4 left-4 bg-brand-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider z-10", children: [
                    "-",
                    discount,
                    "% Off"
                  ] }),
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: images[activeImageIndex].path,
                      alt: product.name,
                      className: "max-w-full max-h-[500px] object-contain transition-opacity duration-300"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/10 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "bg-white/80 dark:bg-black/60 rounded-full p-3 shadow-lg", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-gray-900 dark:text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" }) }) }) })
                ]
              }
            ),
            images.length > 1 && /* @__PURE__ */ jsx("div", { className: "flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0 no-scrollbar", children: images.map((img, idx) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setActiveImageIndex(idx),
                className: `w-20 md:w-full aspect-[4/5] shrink-0 border-2 rounded overflow-hidden transition-colors ${activeImageIndex === idx ? "border-brand-primary opacity-100" : "border-transparent opacity-60 hover:opacity-100 dark:opacity-40 dark:hover:opacity-100"}`,
                children: /* @__PURE__ */ jsx("img", { src: img.path, className: "w-full h-full object-cover bg-gray-100 dark:bg-gray-800", alt: "thumbnail" })
              },
              img.id || idx
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2", children: [
            product.category && /* @__PURE__ */ jsx("div", { className: "text-sm font-bold tracking-widest text-brand-primary uppercase mb-2", children: product.category.name }),
            /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-bold text-brand-secondary dark:text-white mb-4 font-serif tracking-tight leading-tight transition-colors duration-300", children: product.name }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 mb-6", children: product.sale_price && !(activeVariant == null ? void 0 : activeVariant.price) ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("span", { className: "text-3xl font-bold text-brand-primary", children: [
                "$",
                product.sale_price
              ] }),
              /* @__PURE__ */ jsxs("del", { className: "text-xl text-gray-400 dark:text-gray-500", children: [
                "$",
                product.price
              ] })
            ] }) : /* @__PURE__ */ jsxs("span", { className: "text-3xl font-bold text-brand-secondary dark:text-white", children: [
              "$",
              displayPrice
            ] }) }),
            product.short_description && /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light transition-colors duration-300", children: product.short_description }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6 mb-8 border-t border-gray-100 dark:border-gray-800 pt-8 transition-colors duration-300", children: [
              colors.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-3", children: /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-brand-secondary dark:text-gray-200 uppercase tracking-wider", children: [
                  "Color: ",
                  selectedColor || "Select"
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: colors.map((color) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setSelectedColor(color),
                    className: `px-6 py-3 border text-sm font-medium transition-colors ${selectedColor === color ? "border-brand-primary text-brand-primary bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-brand-primary hover:text-brand-primary bg-white dark:bg-gray-800"}`,
                    children: color
                  },
                  color
                )) })
              ] }),
              sizes.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-3", children: /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-brand-secondary dark:text-gray-200 uppercase tracking-wider", children: [
                  "Size: ",
                  selectedSize || "Select"
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: sizes.map((size) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setSelectedSize(size),
                    className: `min-w-[3rem] h-12 px-4 flex items-center justify-center border text-sm font-medium transition-colors ${selectedSize === size ? "border-brand-primary text-brand-primary bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-brand-primary hover:text-brand-primary bg-white dark:bg-gray-800"}`,
                    children: size
                  },
                  size
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-4 py-4 mb-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 h-14 w-full sm:w-32 items-center transition-colors duration-300", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "px-4 text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary text-xl h-full flex items-center",
                    onClick: () => qty > 1 && setQty(qty - 1),
                    children: "-"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    className: "w-full text-center focus:outline-none font-bold text-lg bg-transparent dark:text-white",
                    value: qty,
                    onChange: handleQtyChange,
                    min: "1"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "px-4 text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary text-xl h-full flex items-center",
                    onClick: () => setQty(qty + 1),
                    children: "+"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsQuickCheckoutOpen(true),
                  disabled: stockToDisplay < 1 || variants.length > 0 && !activeVariant,
                  className: "flex-1 h-14 bg-[#f75b5b] text-white font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:shadow-none",
                  children: stockToDisplay < 1 ? "Out of Stock" : variants.length > 0 && !activeVariant ? "Select Options" : "Buy Now"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: addToCart,
                  disabled: processing || stockToDisplay < 1 || variants.length > 0 && !activeVariant,
                  className: "flex-1 h-14 bg-gray-900 dark:bg-gray-700 text-white font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors disabled:opacity-50",
                  children: processing ? "Adding..." : "Add to Cart"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 dark:text-gray-400 space-y-3 mb-10 py-6 border-t border-b border-gray-100 dark:border-gray-800 transition-colors duration-300", children: [
              /* @__PURE__ */ jsxs("p", { className: "flex", children: [
                /* @__PURE__ */ jsx("span", { className: "w-32 font-medium text-brand-secondary dark:text-gray-300", children: "Availability:" }),
                " ",
                stockToDisplay > 0 ? /* @__PURE__ */ jsxs("span", { className: "text-green-600 dark:text-green-400", children: [
                  stockToDisplay,
                  " in stock"
                ] }) : /* @__PURE__ */ jsx("span", { className: "text-red-600 dark:text-red-400", children: "Out of stock" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "flex", children: [
                /* @__PURE__ */ jsx("span", { className: "w-32 font-medium text-brand-secondary dark:text-gray-300", children: "SKU:" }),
                " ",
                (activeVariant == null ? void 0 : activeVariant.sku) || product.sku
              ] }),
              product.barcode && /* @__PURE__ */ jsxs("p", { className: "flex", children: [
                /* @__PURE__ */ jsx("span", { className: "w-32 font-medium text-brand-secondary dark:text-gray-300", children: "Barcode:" }),
                " ",
                product.barcode
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 dark:border-gray-800 transition-colors duration-300", children: [
              /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-200 dark:border-gray-800", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setActiveTab(activeTab === "description" ? "" : "description"),
                    className: "w-full flex justify-between items-center py-5 text-left font-bold text-brand-secondary dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors uppercase tracking-wider text-sm",
                    children: [
                      "Description",
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-light", children: activeTab === "description" ? "-" : "+" })
                    ]
                  }
                ),
                activeTab === "description" && /* @__PURE__ */ jsx("div", { className: "pb-6 prose dark:prose-invert prose-sm text-gray-600 dark:text-gray-300 max-w-none transition-colors duration-300", dangerouslySetInnerHTML: { __html: product.description || "Premium quality product." } })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-200 dark:border-gray-800", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setActiveTab(activeTab === "reviews" ? "" : "reviews"),
                    className: "w-full flex justify-between items-center py-5 text-left font-bold text-brand-secondary dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors uppercase tracking-wider text-sm",
                    children: [
                      "Reviews (",
                      ((_b = product.reviews) == null ? void 0 : _b.length) || 0,
                      ")",
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-light", children: activeTab === "reviews" ? "-" : "+" })
                    ]
                  }
                ),
                activeTab === "reviews" && /* @__PURE__ */ jsxs("div", { className: "pb-6", children: [
                  /* @__PURE__ */ jsx("div", { className: "space-y-6 mb-8", children: product.reviews && product.reviews.length > 0 ? product.reviews.map((review) => {
                    var _a2;
                    return /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-100 dark:border-gray-800 pb-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                        /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900 dark:text-white", children: ((_a2 = review.user) == null ? void 0 : _a2.name) || "User" }),
                        /* @__PURE__ */ jsx("div", { className: "flex text-yellow-400 text-sm", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: `w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300 dark:text-gray-700"}`, viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, i)) })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 text-sm", children: review.comment })
                    ] }, review.id);
                  }) : /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm", children: "No reviews yet. Be the first to review!" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg transition-colors duration-300", children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white mb-4", children: "Write a Review" }),
                    auth.user ? /* @__PURE__ */ jsxs("form", { onSubmit: submitReview, className: "space-y-4", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Rating" }),
                        /* @__PURE__ */ jsxs(
                          "select",
                          {
                            className: "w-full sm:w-1/3 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm transition-colors",
                            value: reviewForm.data.rating,
                            onChange: (e) => reviewForm.setData("rating", parseInt(e.target.value)),
                            children: [
                              /* @__PURE__ */ jsx("option", { value: 5, children: "5 Stars - Excellent" }),
                              /* @__PURE__ */ jsx("option", { value: 4, children: "4 Stars - Good" }),
                              /* @__PURE__ */ jsx("option", { value: 3, children: "3 Stars - Average" }),
                              /* @__PURE__ */ jsx("option", { value: 2, children: "2 Stars - Poor" }),
                              /* @__PURE__ */ jsx("option", { value: 1, children: "1 Star - Terrible" })
                            ]
                          }
                        ),
                        reviewForm.errors.rating && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: reviewForm.errors.rating })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Your Comment" }),
                        /* @__PURE__ */ jsx(
                          "textarea",
                          {
                            rows: 4,
                            className: "w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm transition-colors",
                            value: reviewForm.data.comment,
                            onChange: (e) => reviewForm.setData("comment", e.target.value),
                            placeholder: "What did you like or dislike?"
                          }
                        ),
                        reviewForm.errors.comment && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: reviewForm.errors.comment })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "submit",
                          disabled: reviewForm.processing,
                          className: "px-6 py-2 bg-brand-secondary text-white text-sm font-bold tracking-widest uppercase hover:bg-brand-primary transition-colors rounded disabled:opacity-50",
                          children: reviewForm.processing ? "Submitting..." : "Submit Review"
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
                      "You must be ",
                      /* @__PURE__ */ jsx(Link, { href: "/login", className: "text-brand-primary hover:underline", children: "logged in" }),
                      " to post a review."
                    ] })
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        relatedProducts && relatedProducts.length > 0 && /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16 transition-colors duration-300", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold text-center text-brand-secondary dark:text-white mb-10 font-serif", children: "You May Also Like" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: relatedProducts.map((relatedProduct) => /* @__PURE__ */ jsx(ProductCard, { product: relatedProduct }, relatedProduct.id)) })
        ] }) }),
        isLightboxOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] bg-black flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsLightboxOpen(false),
              className: "absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2",
              "aria-label": "Close lightbox",
              children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          ),
          images.length > 1 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: prevImage,
              className: "absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all z-50",
              "aria-label": "Previous image",
              children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "w-full h-full max-w-6xl max-h-[90vh] mx-auto p-4 flex items-center justify-center cursor-default", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: images[activeImageIndex].path,
              alt: product.name,
              className: "max-w-full max-h-full object-contain"
            }
          ) }),
          images.length > 1 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: nextImage,
              className: "absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all z-50",
              "aria-label": "Next image",
              children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
            }
          ),
          images.length > 1 && /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] p-2 bg-black/50 rounded-lg backdrop-blur-sm", children: images.map((img, idx) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveImageIndex(idx),
              className: `w-16 h-16 shrink-0 border-2 rounded transition-colors ${activeImageIndex === idx ? "border-brand-primary" : "border-transparent opacity-50 hover:opacity-100"}`,
              children: /* @__PURE__ */ jsx("img", { src: img.path, className: "w-full h-full object-cover", alt: "thumbnail" })
            },
            img.id || idx
          )) })
        ] }),
        /* @__PURE__ */ jsx(
          QuickCheckoutModal,
          {
            isOpen: isQuickCheckoutOpen,
            onClose: () => setIsQuickCheckoutOpen(false),
            product,
            variant: activeVariant,
            quantity: qty
          }
        )
      ]
    }
  );
}
export {
  Show as default
};
