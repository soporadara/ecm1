import { jsxs, jsx } from "react/jsx-runtime";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-C3efSGPT.js";
import { useRef, useState, useMemo } from "react";
import { CheckCircle2, Home, Plus, MapPin, X, Image, FileText, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { u as useTranslation } from "./useTranslation-CqoVm-kK.js";
import "framer-motion";
import "axios";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
const blankProduct = () => ({
  name: "",
  description: "",
  quantity: 1,
  type: "",
  color: "",
  size: "",
  customer_note: "",
  urls: [""],
  images: [],
  pdfs: []
});
const domainFromUrl = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
};
function FileDropInput({
  id,
  label,
  files,
  accept,
  maxFiles,
  icon,
  onChange,
  onClear
}) {
  const Icon = icon === "image" ? Image : FileText;
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/70", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("label", { htmlFor: id, className: "font-black text-gray-800 dark:text-white", children: [
        label,
        " (",
        files.length,
        ")"
      ] }),
      files.length > 0 && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onClear,
          className: "inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-white hover:text-red-600 dark:hover:bg-gray-900",
          "aria-label": `Clear ${label}`,
          children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4", "aria-hidden": "true" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        id,
        type: "file",
        multiple: true,
        accept,
        onChange: (event) => onChange(Array.from(event.target.files || []).slice(0, maxFiles)),
        className: "sr-only"
      }
    ),
    /* @__PURE__ */ jsxs(
      "label",
      {
        htmlFor: id,
        className: "flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white px-4 py-6 text-center transition hover:border-brand-primary hover:bg-red-50/40 focus-within:border-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-900/70",
        children: [
          /* @__PURE__ */ jsx("span", { className: "mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary", children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2 text-sm font-black text-white transition hover:bg-brand-primary dark:bg-white dark:text-gray-950", children: [
            /* @__PURE__ */ jsx(UploadCloud, { className: "h-4 w-4", "aria-hidden": "true" }),
            "Choose files"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "mt-3 text-xs font-semibold text-gray-500", children: [
            "Select multiple files, up to ",
            maxFiles,
            "."
          ] })
        ]
      }
    ),
    files.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-2", children: files.map((file, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-gray-600 dark:bg-gray-900 dark:text-gray-300", children: [
      /* @__PURE__ */ jsx("span", { className: "truncate", children: file.name }),
      /* @__PURE__ */ jsxs("span", { className: "shrink-0 text-gray-400", children: [
        Math.ceil(file.size / 1024),
        " KB"
      ] })
    ] }, `${file.name}-${index}`)) })
  ] });
}
function ManualOrderForm({ auth, quoteMessages, limits }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  const { t } = useTranslation();
  const { flash } = usePage().props;
  const formRef = useRef(null);
  const submittedOrder = flash == null ? void 0 : flash.submitted_order;
  const [showSuccessModal, setShowSuccessModal] = useState(Boolean(submittedOrder));
  const parsePhone = (phoneStr) => {
    if (!phoneStr) return { code: "+855", num: "" };
    if (phoneStr.startsWith("+84")) return { code: "+84", num: phoneStr.substring(3).replace(/^0+/, "") };
    if (phoneStr.startsWith("+856")) return { code: "+856", num: phoneStr.substring(4).replace(/^0+/, "") };
    if (phoneStr.startsWith("+855")) return { code: "+855", num: phoneStr.substring(4).replace(/^0+/, "") };
    return { code: "+855", num: phoneStr.replace(/^0+/, "") };
  };
  const initialPhone = parsePhone(((_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.phone_e164) || "");
  const [phoneCode, setPhoneCode] = useState(initialPhone.code);
  const [phoneNum, setPhoneNum] = useState(initialPhone.num);
  const [expandedProducts, setExpandedProducts] = useState([true]);
  const toggleProductExpanded = (index) => {
    setExpandedProducts((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };
  const savedAddresses = ((_b = auth == null ? void 0 : auth.user) == null ? void 0 : _b.addresses) || [];
  const defaultAddress = savedAddresses.find((a) => a.is_default) || savedAddresses[0] || null;
  const [selectedAddressId, setSelectedAddressId] = useState((defaultAddress == null ? void 0 : defaultAddress.id) ?? "new");
  const [showNewAddressForm, setShowNewAddressForm] = useState(savedAddresses.length === 0);
  const [newAddress, setNewAddress] = useState({
    address_line_1: "",
    address_line_2: "",
    city: "",
    province: "",
    postal_code: "",
    address_notes: "",
    save_address_to_profile: true
  });
  const activeAddress = selectedAddressId !== "new" ? savedAddresses.find((a) => a.id === selectedAddressId) || null : null;
  const { data, setData, post, processing, errors, reset } = useForm({
    contact_email: ((_c = auth == null ? void 0 : auth.user) == null ? void 0 : _c.email) || "",
    save_email_to_profile: false,
    contact_phone: ((_d = auth == null ? void 0 : auth.user) == null ? void 0 : _d.phone_e164) || "",
    save_phone_to_profile: false,
    address_line_1: (defaultAddress == null ? void 0 : defaultAddress.address_line_1) || ((_e = auth == null ? void 0 : auth.user) == null ? void 0 : _e.address_line_1) || "",
    address_line_2: (defaultAddress == null ? void 0 : defaultAddress.address_line_2) || ((_f = auth == null ? void 0 : auth.user) == null ? void 0 : _f.address_line_2) || "",
    city: (defaultAddress == null ? void 0 : defaultAddress.city) || ((_g = auth == null ? void 0 : auth.user) == null ? void 0 : _g.city) || "",
    province: (defaultAddress == null ? void 0 : defaultAddress.province) || ((_h = auth == null ? void 0 : auth.user) == null ? void 0 : _h.province) || "",
    postal_code: (defaultAddress == null ? void 0 : defaultAddress.postal_code) || ((_i = auth == null ? void 0 : auth.user) == null ? void 0 : _i.postal_code) || "",
    delivery_notes: (defaultAddress == null ? void 0 : defaultAddress.address_notes) || ((_j = auth == null ? void 0 : auth.user) == null ? void 0 : _j.address_notes) || "",
    save_address_to_profile: false,
    message: "",
    currency_code: ((_k = auth == null ? void 0 : auth.user) == null ? void 0 : _k.preferred_currency) === "VND" ? "VND" : "USD",
    products: [blankProduct()]
  });
  const selectSavedAddress = (addr) => {
    setSelectedAddressId(addr.id);
    setShowNewAddressForm(false);
    setData((prev) => ({
      ...prev,
      address_line_1: addr.address_line_1,
      address_line_2: addr.address_line_2 || "",
      city: addr.city || "",
      province: addr.province || "",
      postal_code: addr.postal_code || "",
      delivery_notes: addr.address_notes || ""
    }));
  };
  const openNewAddressForm = () => {
    setSelectedAddressId("new");
    setShowNewAddressForm(true);
    setNewAddress({ address_line_1: "", address_line_2: "", city: "", province: "", postal_code: "", address_notes: "", save_address_to_profile: true });
  };
  const totals = useMemo(() => {
    const productCount = data.products.length;
    const totalQuantity = data.products.reduce((sum, product) => sum + Math.max(Number(product.quantity) || 0, 0), 0);
    return { productCount, totalQuantity };
  }, [data.products]);
  const updateProduct = (index, patch) => {
    const products = [...data.products];
    products[index] = { ...products[index], ...patch };
    setData("products", products);
  };
  const addProduct = () => {
    if (data.products.length >= ((limits == null ? void 0 : limits.max_products) || 20)) return;
    setExpandedProducts((prev) => [...prev, true]);
    setData("products", [...data.products, blankProduct()]);
  };
  const duplicateProduct = (index) => {
    if (data.products.length >= ((limits == null ? void 0 : limits.max_products) || 20)) return;
    const clone = { ...data.products[index], images: [], pdfs: [], urls: [...data.products[index].urls] };
    setExpandedProducts((prev) => [...prev.slice(0, index + 1), true, ...prev.slice(index + 1)]);
    setData("products", [...data.products.slice(0, index + 1), clone, ...data.products.slice(index + 1)]);
  };
  const removeProduct = (index) => {
    if (data.products.length === 1) return;
    setExpandedProducts((prev) => prev.filter((_, i) => i !== index));
    setData("products", data.products.filter((_, i) => i !== index));
  };
  const submit = (e) => {
    e.preventDefault();
    const fullPhone = phoneNum ? `${phoneCode}${phoneNum}` : "";
    data.contact_phone = fullPhone;
    post("/manual-order", {
      forceFormData: true,
      preserveScroll: true,
      onError: (submitErrors) => {
        toast.error("Validation failed. Please check the highlighted fields.");
      }
    });
  };
  if (!(auth == null ? void 0 : auth.user)) {
    return /* @__PURE__ */ jsxs(MainLayout, { title: (quoteMessages == null ? void 0 : quoteMessages.page_title) || "Sign In Required", children: [
      /* @__PURE__ */ jsx(Head, { title: (quoteMessages == null ? void 0 : quoteMessages.page_title) || "Sign In Required" }),
      /* @__PURE__ */ jsxs("div", { className: "flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://img.freepik.com/premium-vector/cambodia-boy-greeting-character_51635-4309.jpg",
            alt: "Cambodian Greeting",
            className: "mb-8 h-64 w-auto object-contain"
          }
        ),
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-black text-gray-900 dark:text-white", children: "You need to sign in first before use Manual Order" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => window.dispatchEvent(new CustomEvent("open-login-modal")),
            className: "mt-6 rounded-xl bg-brand-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-primary/50",
            children: "Sign up / Sign in click here"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(MainLayout, { title: (quoteMessages == null ? void 0 : quoteMessages.page_title) || "Create Manual Order", children: [
    /* @__PURE__ */ jsx(Head, { title: (quoteMessages == null ? void 0 : quoteMessages.page_title) || "Create Manual Order" }),
    submittedOrder && showSuccessModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[120] bg-black/50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mb-5", children: "✓" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white", children: quoteMessages == null ? void 0 : quoteMessages.success_title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-3", children: quoteMessages == null ? void 0 : quoteMessages.success_description }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 bg-gray-50 dark:bg-gray-800 rounded-xl p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Order number" }),
        /* @__PURE__ */ jsx("p", { className: "font-mono font-bold text-lg text-gray-900 dark:text-white", children: submittedOrder.order_number }),
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-brand-primary mt-1", children: submittedOrder.customer_status_label || (submittedOrder.status === "submitted" ? "Progress" : String(submittedOrder.status).replace("_", " ")) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wide text-gray-500 mt-1", children: submittedOrder.currency_code || data.currency_code })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col sm:flex-row gap-3 justify-center", children: [
        /* @__PURE__ */ jsx(Link, { href: `/my-orders/${submittedOrder.id}`, className: "px-5 py-3 rounded-xl bg-brand-primary text-white font-bold", children: (quoteMessages == null ? void 0 : quoteMessages.view_order_button_text) || "View Your Order" }),
        /* @__PURE__ */ jsx("button", { onClick: () => {
          reset();
          setStep("edit");
          setShowSuccessModal(false);
        }, className: "px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-bold", children: (quoteMessages == null ? void 0 : quoteMessages.create_another_button_text) || "Create Another Request" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-[0.25em] text-brand-primary", children: "Logistics quotation" }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-serif mt-2", children: (quoteMessages == null ? void 0 : quoteMessages.page_title) || t("manual_order.title", "Create Manual Order") }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-3 max-w-2xl", children: quoteMessages == null ? void 0 : quoteMessages.intro })
        ] }),
        /* @__PURE__ */ jsx(Link, { href: "/my-orders", className: "inline-flex justify-center rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-3 font-bold hover:text-brand-primary", children: "My Orders" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8", children: [
        /* @__PURE__ */ jsxs("form", { id: "manual-order-form", ref: formRef, onSubmit: submit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold", children: "1" }),
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white", children: t("manual_order.customer_info", "Customer Information") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Full name" }),
                /* @__PURE__ */ jsx("input", { value: ((_l = auth == null ? void 0 : auth.user) == null ? void 0 : _l.name) || "", readOnly: true, className: "w-full rounded-xl border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 px-4 py-3" }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
                  "Your name is taken from your account profile. ",
                  /* @__PURE__ */ jsx(Link, { href: "/profile", className: "text-brand-primary", children: "Edit Profile" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Customer ID" }),
                /* @__PURE__ */ jsx("input", { value: ((_m = auth == null ? void 0 : auth.user) == null ? void 0 : _m.customer_code) || "", readOnly: true, className: "w-full rounded-xl border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 px-4 py-3 font-mono" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Locked login email" }),
                /* @__PURE__ */ jsx("div", { className: "w-full rounded-xl border border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 px-4 py-3 break-all text-sm text-gray-900 dark:text-gray-300", children: ((_n = auth == null ? void 0 : auth.user) == null ? void 0 : _n.email) || "" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Your login email is protected and cannot be changed from this page." })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Order contact email" }),
                /* @__PURE__ */ jsx("input", { type: "email", value: data.contact_email, onChange: (e) => setData("contact_email", e.target.value), className: "w-full rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3" }),
                /* @__PURE__ */ jsxs("label", { className: "mt-3 flex items-center gap-3 text-xs font-semibold text-gray-500", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.save_email_to_profile, onChange: (e) => setData("save_email_to_profile", e.target.checked) }),
                  " Save as preferred contact email"
                ] }),
                errors.contact_email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.contact_email })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Phone number" }),
                /* @__PURE__ */ jsxs("div", { className: "flex shadow-sm rounded-xl", children: [
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: phoneCode,
                      onChange: (e) => setPhoneCode(e.target.value),
                      className: "min-w-[110px] shrink-0 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-2 sm:px-3 py-3 text-sm font-semibold text-gray-950 focus:border-brand-primary focus:ring-0 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-brand-primary",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "+855", children: "🇰🇭 +855" }),
                        /* @__PURE__ */ jsx("option", { value: "+84", children: "🇻🇳 +84" }),
                        /* @__PURE__ */ jsx("option", { value: "+856", children: "🇱🇦 +856" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "tel",
                      value: phoneNum,
                      onChange: (e) => setPhoneNum(e.target.value.replace(/\D/g, "")),
                      placeholder: "12 345 678",
                      className: "w-full rounded-r-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-950 placeholder:text-gray-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:border-brand-primary"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "mt-3 flex items-center gap-3 text-xs font-semibold text-gray-500", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.save_phone_to_profile, onChange: (e) => setData("save_phone_to_profile", e.target.checked) }),
                  " Save this phone number to my profile"
                ] }),
                errors.contact_phone && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.contact_phone })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold", children: "2" }),
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white", children: t("manual_order.delivery_address", "Delivery Address") })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Select a delivery address for this order." }),
            savedAddresses.length > 0 && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4", children: [
              savedAddresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => selectSavedAddress(addr),
                    className: `relative text-left rounded-2xl border-2 p-4 transition-all duration-200 focus:outline-none ${isSelected ? "border-brand-primary bg-brand-primary/5 shadow-md" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 hover:border-brand-primary/50 hover:shadow-sm"}`,
                    children: [
                      isSelected && /* @__PURE__ */ jsx("span", { className: "absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-white", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }) }),
                      addr.is_default && /* @__PURE__ */ jsxs("span", { className: "mb-2 inline-flex items-center gap-1 rounded-full bg-brand-primary/10 px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-brand-primary", children: [
                        /* @__PURE__ */ jsx(Home, { className: "h-3 w-3" }),
                        " Default"
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "font-bold text-sm text-gray-900 dark:text-white leading-snug", children: addr.address_line_1 }),
                      addr.address_line_2 && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: addr.address_line_2 }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: [addr.city, addr.province, addr.postal_code].filter(Boolean).join(", ") }),
                      addr.address_notes && /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] italic text-gray-400", children: addr.address_notes })
                    ]
                  },
                  addr.id
                );
              }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: openNewAddressForm,
                  className: `flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 transition-all duration-200 focus:outline-none ${selectedAddressId === "new" ? "border-brand-primary bg-brand-primary/5" : "border-gray-200 dark:border-gray-700 hover:border-brand-primary/50"}`,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary", children: /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5" }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-brand-primary", children: "Add New Address" })
                  ]
                }
              )
            ] }),
            (showNewAddressForm || savedAddresses.length === 0) && /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl border border-brand-primary/30 bg-brand-primary/3 p-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-brand-primary" }),
                /* @__PURE__ */ jsx("h3", { className: "font-black text-gray-900 dark:text-white text-sm", children: savedAddresses.length === 0 ? "Enter Delivery Address" : "Add New Address" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold mb-1", children: [
                    "Address line 1 ",
                    /* @__PURE__ */ jsx("span", { className: "text-brand-primary", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      value: savedAddresses.length === 0 ? data.address_line_1 : newAddress.address_line_1,
                      onChange: (e) => {
                        if (savedAddresses.length === 0) {
                          setData("address_line_1", e.target.value);
                        } else {
                          const val = e.target.value;
                          setNewAddress((prev) => ({ ...prev, address_line_1: val }));
                          setData("address_line_1", val);
                        }
                      },
                      placeholder: "House number, street, ward",
                      className: "w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 focus:border-brand-primary focus:ring-brand-primary"
                    }
                  ),
                  errors.address_line_1 && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.address_line_1 })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    placeholder: "Address line 2 (optional)",
                    value: savedAddresses.length === 0 ? data.address_line_2 : newAddress.address_line_2,
                    onChange: (e) => {
                      if (savedAddresses.length === 0) setData("address_line_2", e.target.value);
                      else {
                        setNewAddress((prev) => ({ ...prev, address_line_2: e.target.value }));
                        setData("address_line_2", e.target.value);
                      }
                    },
                    className: "w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 focus:border-brand-primary focus:ring-brand-primary"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    placeholder: "City",
                    value: savedAddresses.length === 0 ? data.city : newAddress.city,
                    onChange: (e) => {
                      if (savedAddresses.length === 0) setData("city", e.target.value);
                      else {
                        setNewAddress((prev) => ({ ...prev, city: e.target.value }));
                        setData("city", e.target.value);
                      }
                    },
                    className: "w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 focus:border-brand-primary focus:ring-brand-primary"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    placeholder: "Province / State",
                    value: savedAddresses.length === 0 ? data.province : newAddress.province,
                    onChange: (e) => {
                      if (savedAddresses.length === 0) setData("province", e.target.value);
                      else {
                        setNewAddress((prev) => ({ ...prev, province: e.target.value }));
                        setData("province", e.target.value);
                      }
                    },
                    className: "w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 focus:border-brand-primary focus:ring-brand-primary"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    placeholder: "Postal code (optional)",
                    value: savedAddresses.length === 0 ? data.postal_code : newAddress.postal_code,
                    onChange: (e) => {
                      if (savedAddresses.length === 0) setData("postal_code", e.target.value);
                      else {
                        setNewAddress((prev) => ({ ...prev, postal_code: e.target.value }));
                        setData("postal_code", e.target.value);
                      }
                    },
                    className: "w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 focus:border-brand-primary focus:ring-brand-primary"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    placeholder: "Delivery notes (optional)",
                    value: savedAddresses.length === 0 ? data.delivery_notes : newAddress.address_notes,
                    onChange: (e) => {
                      if (savedAddresses.length === 0) setData("delivery_notes", e.target.value);
                      else {
                        setNewAddress((prev) => ({ ...prev, address_notes: e.target.value }));
                        setData("delivery_notes", e.target.value);
                      }
                    },
                    rows: 2,
                    className: "md:col-span-2 w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 focus:border-brand-primary focus:ring-brand-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "mt-4 flex items-center gap-3 text-sm font-semibold text-gray-500 cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: savedAddresses.length === 0 ? data.save_address_to_profile : newAddress.save_address_to_profile,
                    onChange: (e) => {
                      if (savedAddresses.length === 0) setData("save_address_to_profile", e.target.checked);
                      else setNewAddress((prev) => ({ ...prev, save_address_to_profile: e.target.checked }));
                    },
                    className: "rounded"
                  }
                ),
                "Save this address to my profile for future orders"
              ] })
            ] }),
            activeAddress && !showNewAddressForm && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-start gap-3 rounded-xl bg-gray-50 dark:bg-gray-800 p-4", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-brand-primary mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold text-sm text-gray-900 dark:text-white", children: "Delivering to:" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-0.5", children: [
                  activeAddress.address_line_1,
                  activeAddress.address_line_2 && `, ${activeAddress.address_line_2}`,
                  activeAddress.city && `, ${activeAddress.city}`,
                  activeAddress.province && `, ${activeAddress.province}`,
                  activeAddress.postal_code && ` ${activeAddress.postal_code}`
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold", children: "3" }),
                /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white", children: t("manual_order.requested_products", "Requested Products") })
              ] }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: addProduct, className: "rounded-xl bg-gray-900 text-white px-5 py-2.5 font-bold transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-lg hover:-translate-y-0.5", children: "Add Another Product" })
            ] }),
            data.products.map((product, index) => /* @__PURE__ */ jsxs("div", { id: `product-card-${index}`, className: "scroll-mt-24 group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-brand-primary/50 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 px-6 py-5 bg-gray-50/50 dark:bg-gray-800/50 transition-colors duration-300 group-hover:bg-brand-primary/5", children: [
                /* @__PURE__ */ jsxs("h3", { className: "font-black text-gray-900 dark:text-white transition-colors group-hover:text-brand-primary flex items-center gap-3 cursor-pointer", onClick: () => toggleProductExpanded(index), children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                      "aria-label": expandedProducts[index] ? "Collapse product" : "Expand product",
                      children: /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: `w-5 h-5 transform transition-transform duration-300 ${expandedProducts[index] ? "rotate-180" : ""}`,
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
                        }
                      )
                    }
                  ),
                  "Product ",
                  index + 1,
                  !expandedProducts[index] && product.name && /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-gray-500 ml-2 truncate max-w-[200px] md:max-w-xs block", children: [
                    "— ",
                    product.name
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => duplicateProduct(index), className: "text-sm font-bold px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-green-500 hover:bg-green-500 hover:text-white hover:shadow-md", children: "Duplicate" }),
                  /* @__PURE__ */ jsx("button", { type: "button", disabled: data.products.length === 1, onClick: () => removeProduct(index), className: "text-sm font-bold px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm text-red-600 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-md disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-red-600", children: "Remove" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `transition-all duration-500 overflow-hidden ${expandedProducts[index] ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"}`, children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-5 px-6 pb-6 md:grid-cols-12 pt-5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-brand-primary/20 bg-red-50/50 p-4 dark:bg-red-950/10 md:col-span-12", children: [
                    /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between gap-3", children: [
                      /* @__PURE__ */ jsx("label", { className: "block text-sm font-black text-gray-900 dark:text-white", children: "Product name" }),
                      /* @__PURE__ */ jsx("span", { className: "rounded-full bg-brand-primary px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white", children: "Start here" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        value: product.name,
                        onChange: (e) => updateProduct(index, { name: e.target.value }),
                        placeholder: "Type the product name, item title, or what you want us to buy",
                        className: "w-full rounded-xl border-gray-200 bg-white px-4 py-4 text-base font-bold text-gray-950 shadow-sm placeholder:font-semibold placeholder:text-gray-400 focus:border-brand-primary focus:ring-brand-primary/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-semibold text-gray-500", children: "Example: white running shoes, phone case, dress, laptop stand." }),
                    errors[`products.${index}.name`] && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors[`products.${index}.name`] })
                  ] }),
                  /* @__PURE__ */ jsx("textarea", { placeholder: "Product description", value: product.description, onChange: (e) => updateProduct(index, { description: e.target.value }), rows: 3, className: "md:col-span-12 rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3" }),
                  /* @__PURE__ */ jsxs("div", { className: "md:col-span-4", children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Quantity" }),
                    /* @__PURE__ */ jsxs("div", { className: "inline-flex h-12 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm transition-all focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20", children: [
                      /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Decrease quantity", disabled: product.quantity <= 0.1, onClick: () => updateProduct(index, { quantity: product.quantity > 1 ? product.quantity - 1 : Math.max(0.1, Number((product.quantity - 0.1).toFixed(1))) }), className: "w-12 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors disabled:opacity-40", children: "-" }),
                      /* @__PURE__ */ jsx("input", { type: "number", min: 0.1, step: 0.1, max: (limits == null ? void 0 : limits.max_quantity) || 999, value: product.quantity, onChange: (e) => updateProduct(index, { quantity: Math.max(0.1, Number(e.target.value) || 0.1) }), className: "w-20 text-center border-x border-gray-200 dark:border-gray-700 focus:border-brand-primary focus:ring-0" }),
                      /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Increase quantity", onClick: () => updateProduct(index, { quantity: Math.min((limits == null ? void 0 : limits.max_quantity) || 999, product.quantity >= 1 ? product.quantity + 1 : Number((product.quantity + 0.1).toFixed(1))) }), className: "w-12 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors", children: "+" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/70 md:col-span-8 md:grid-cols-3", children: [
                    /* @__PURE__ */ jsx("input", { placeholder: "Color", value: product.color, onChange: (e) => updateProduct(index, { color: e.target.value }), className: "w-full rounded-xl border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 shadow-sm transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 hover:border-brand-primary/50" }),
                    /* @__PURE__ */ jsx("input", { placeholder: "Type, model, or material", value: product.type, onChange: (e) => updateProduct(index, { type: e.target.value }), className: "w-full rounded-xl border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 shadow-sm transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 hover:border-brand-primary/50" }),
                    /* @__PURE__ */ jsx("input", { placeholder: "Size or dimensions", value: product.size, onChange: (e) => updateProduct(index, { size: e.target.value }), className: "w-full rounded-xl border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 shadow-sm transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 hover:border-brand-primary/50" })
                  ] }),
                  /* @__PURE__ */ jsx("textarea", { placeholder: "Product note", value: product.customer_note, onChange: (e) => updateProduct(index, { customer_note: e.target.value }), rows: 2, className: "md:col-span-12 rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3 border-t border-gray-100 px-6 py-6 dark:border-gray-800", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("h4", { className: "font-bold text-gray-900 dark:text-white", children: [
                      t("manual_order.product_urls", "Product URLs"),
                      " (",
                      product.urls.filter(Boolean).length,
                      ")"
                    ] }),
                    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateProduct(index, { urls: [...product.urls, ""] }), className: "text-sm font-bold text-brand-primary transition-colors hover:text-green-500", children: t("manual_order.add_url", "+ Add Another URL") })
                  ] }),
                  product.urls.map((url, urlIndex) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
                    /* @__PURE__ */ jsx("input", { value: url, placeholder: "https://supplier.example/product", onChange: (e) => updateProduct(index, { urls: product.urls.map((u, i) => i === urlIndex ? e.target.value : u) }), className: "flex-1 rounded-xl border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 shadow-sm transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 hover:border-brand-primary/50" }),
                    domainFromUrl(url) && /* @__PURE__ */ jsxs("a", { href: url, target: "_blank", rel: "noopener noreferrer", className: "px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-bold text-gray-900 dark:text-white text-center shadow-sm transition-all hover:border-brand-primary hover:text-brand-primary", children: [
                      t("manual_order.view", "View"),
                      " ",
                      domainFromUrl(url)
                    ] }),
                    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateProduct(index, { urls: product.urls.filter((_, i) => i !== urlIndex) }), className: "px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm text-red-600 dark:text-red-500 font-bold transition-all hover:border-red-500 hover:bg-red-500 hover:text-white dark:hover:text-white", children: t("manual_order.remove", "Remove") })
                  ] }, urlIndex))
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-5 border-t border-gray-100 px-6 py-6 dark:border-gray-800 md:grid-cols-2", children: [
                  /* @__PURE__ */ jsx(
                    FileDropInput,
                    {
                      id: `product-${index}-images`,
                      label: "Images",
                      files: product.images,
                      accept: "image/*",
                      maxFiles: (limits == null ? void 0 : limits.max_images_per_product) || 6,
                      icon: "image",
                      onChange: (files) => updateProduct(index, { images: files }),
                      onClear: () => updateProduct(index, { images: [] })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    FileDropInput,
                    {
                      id: `product-${index}-pdfs`,
                      label: "PDF documents",
                      files: product.pdfs,
                      accept: "application/pdf,.pdf",
                      maxFiles: (limits == null ? void 0 : limits.max_pdfs_per_product) || 5,
                      icon: "pdf",
                      onChange: (files) => updateProduct(index, { pdfs: files }),
                      onClear: () => updateProduct(index, { pdfs: [] })
                    }
                  )
                ] })
              ] })
            ] }, index))
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white mb-4", children: t("manual_order.additional_notes", "Additional Notes") }),
            /* @__PURE__ */ jsx("textarea", { value: data.message, onChange: (e) => setData("message", e.target.value), maxLength: 2e3, rows: 4, placeholder: "Tell us anything else we should know about the product, supplier, size, delivery, or special requirements.", className: "w-full rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
              data.message.length,
              "/2000"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end gap-3 mt-8 pb-24 lg:pb-0", children: /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "px-8 py-3 rounded-xl bg-brand-primary text-white font-black disabled:opacity-50 transition-transform hover:scale-105", children: processing ? "Submitting..." : (quoteMessages == null ? void 0 : quoteMessages.submit_button_text) || "Submit Manual Order" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 flex items-center justify-between gap-4 pb-safe", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider", children: "Total" }),
            /* @__PURE__ */ jsxs("span", { className: "text-lg font-black text-gray-900 dark:text-white", children: [
              totals.totalQuantity,
              " items"
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "submit", form: "manual-order-form", disabled: processing, className: "flex-1 max-w-[200px] px-6 py-3.5 rounded-xl bg-brand-primary text-white font-black shadow-lg disabled:opacity-50 transition-transform active:scale-95 text-center", children: processing ? "Submitting..." : "Submit Order" })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "lg:sticky lg:top-24 h-fit bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-black text-gray-900 dark:text-white", children: t("manual_order.request_summary", "Request Summary") }),
          /* @__PURE__ */ jsxs("dl", { className: "mt-5 space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { children: "Products" }),
              /* @__PURE__ */ jsx("dd", { className: "font-bold", children: totals.productCount })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { children: "Total quantity" }),
              /* @__PURE__ */ jsx("dd", { className: "font-bold", children: totals.totalQuantity })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { children: "Currency" }),
              /* @__PURE__ */ jsx("dd", { className: "font-bold", children: data.currency_code })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { children: "Logistics fee" }),
              /* @__PURE__ */ jsx("dd", { className: "font-bold", children: "Pending" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-white p-3 text-xs font-semibold leading-5 text-gray-500 dark:bg-gray-950 dark:text-gray-400", children: "Product prices are hidden from customers until our team reviews and confirms them." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 text-xs text-gray-500", children: quoteMessages == null ? void 0 : quoteMessages.pricing_disclaimer }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid grid-cols-1 gap-2", children: [
            /* @__PURE__ */ jsx(Link, { href: "/my-orders", className: "rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-center font-bold", children: "My Orders" }),
            /* @__PURE__ */ jsx(Link, { href: "/contact", className: "rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-center font-bold", children: "Contact Us" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ManualOrderForm as default
};
