import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import "react-dom";
import "lucide-react";
const money = (value, currency = "USD") => {
  if (value === null || value === void 0 || value === "") return "Pending";
  if (currency === "VND") return `₫${Math.round(Number(value || 0)).toLocaleString("en-US")}`;
  return `$${Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
const label = (value) => {
  if (value === "in_progress") return "Progress";
  return String(value || "not set").replace(/_/g, " ");
};
function OrderShow({ order, statuses, paymentStatuses = [], auditLogs }) {
  var _a, _b, _c, _d, _e, _f;
  const initVal = (val) => !val || Number(val) === 0 ? "" : val;
  const { data, setData, put, processing, recentlySuccessful } = useForm({
    status: order.status,
    payment_status: order.payment_status || "unpaid",
    internal_note: "",
    public_message: order.customer_visible_note || "",
    currency_code: order.currency_code || "USD",
    subtotal: initVal(order.subtotal_amount || order.subtotal),
    logistics_fee: initVal(order.logistics_fee_amount || order.logistics_fee),
    service_fee: initVal(order.service_fee_amount || order.service_fee || order.service_charge),
    delivery_fee: initVal(order.delivery_fee_amount || order.delivery_fee || order.delivery_charge),
    discount: initVal(order.discount_amount || order.discount),
    pricing_notes: order.pricing_notes || ""
  });
  const updateStatus = (event) => {
    event.preventDefault();
    put(`/admin/logistics/orders/${order.id}`, { preserveScroll: true });
  };
  const allImages = ((_a = order.items) == null ? void 0 : _a.flatMap((item) => item.images || [])) || [];
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const openLightbox = (image) => {
    const index = allImages.findIndex((img) => img.id === image.id);
    if (index !== -1) setLightboxIndex(index);
  };
  const handleExport = async (type) => {
    try {
      if (type === "pdf") {
        window.open(`/admin/receipts/generate/${order.id}`, "_blank");
        return;
      }
      const toastId = toast.loading(`Exporting CSV...`);
      const url = `/admin/logistics/orders/${order.id}/export?type=csv`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Export failed");
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `order_${order.order_number}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(`Exported CSV successfully!`, { id: toastId });
    } catch (error) {
      toast.error(`Failed to export CSV`);
    }
  };
  const hasAnyPricing = data.subtotal !== "" || data.logistics_fee !== "" || data.service_fee !== "" || data.delivery_fee !== "" || data.discount !== "";
  const total = hasAnyPricing ? Number(data.subtotal || 0) + Number(data.logistics_fee || 0) + Number(data.service_fee || 0) + Number(data.delivery_fee || 0) - Number(data.discount || 0) : "";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(AdminLayout, { title: `Order ${order.order_number}`, children: [
      /* @__PURE__ */ jsx(Head, { title: `Order ${order.order_number}` }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mb-6 lg:flex-row lg:items-end lg:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Link, { href: "/admin/logistics/orders", className: "text-admin-text-muted hover:text-admin-text text-sm font-medium mb-2 inline-block", children: "Back to Orders" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold text-admin-text", children: [
            "Order ",
            order.order_number
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-admin-text-muted", children: [
            label(order.status),
            " · ",
            ((_b = order.items) == null ? void 0 : _b.length) || 0,
            " product request(s) · ",
            new Date(order.created_at).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxs("button", { className: "rounded-xl bg-admin-surface border border-admin-border px-5 py-3 text-sm font-black uppercase tracking-wider text-admin-text hover:bg-admin-surface-muted transition-colors flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
            "Export",
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 opacity-50", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white dark:bg-admin-surface border border-admin-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] overflow-hidden", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => handleExport("pdf"), className: "block w-full text-left px-4 py-3 text-sm font-bold text-admin-text hover:bg-admin-surface-muted transition-colors", children: "Export as PDF" }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleExport("csv"), className: "block w-full text-left px-4 py-3 text-sm font-bold text-admin-text hover:bg-admin-surface-muted transition-colors", children: "Export as CSV" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-admin-text mb-4", children: "Customer Snapshot" }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-admin-text-muted font-bold uppercase text-xs", children: "Customer" }),
                /* @__PURE__ */ jsxs(Link, { href: `/admin/customers/${order.user_id}`, className: "font-bold text-admin-primary hover:underline", children: [
                  order.customer_name_snapshot || ((_c = order.user) == null ? void 0 : _c.name),
                  " (",
                  order.customer_code_snapshot || ((_d = order.user) == null ? void 0 : _d.customer_code),
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-admin-text-muted font-bold uppercase text-xs", children: "Contact" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-admin-text", children: order.customer_email_snapshot }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-admin-text", children: order.customer_phone_snapshot })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsx("p", { className: "text-admin-text-muted font-bold uppercase text-xs", children: "Delivery Address" }),
                /* @__PURE__ */ jsx("p", { className: "whitespace-pre-line font-medium text-admin-text", children: order.delivery_address_snapshot || order.shipping_address })
              ] }),
              order.customer_notes && /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsx("p", { className: "text-admin-text-muted font-bold uppercase text-xs", children: "Customer Message" }),
                /* @__PURE__ */ jsx("p", { className: "rounded-xl bg-admin-surface-muted p-3 font-medium text-admin-text", children: order.customer_notes })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-admin-border/50 bg-admin-surface p-0 shadow-sm overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-admin-border/50", children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-admin-text", children: "Requested Products" }) }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm whitespace-nowrap", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-admin-surface-muted/50 text-admin-text-muted uppercase text-[10px] font-black tracking-wider", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Product Details" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Attributes" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Pricing" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "References" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-admin-border/50", children: (_e = order.items) == null ? void 0 : _e.map((item, index) => {
                var _a2, _b2, _c2;
                return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 align-top whitespace-normal min-w-[250px]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black uppercase text-admin-text-muted", children: [
                      "Item ",
                      index + 1
                    ] }),
                    /* @__PURE__ */ jsx("strong", { className: "text-admin-text text-base", children: item.product_name }),
                    item.description && /* @__PURE__ */ jsx("p", { className: "text-xs text-admin-text-muted mt-1", children: item.description }),
                    item.customer_notes && /* @__PURE__ */ jsxs("div", { className: "mt-2 rounded-lg bg-admin-surface-muted p-2 text-xs text-admin-text", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-bold block mb-1", children: "Note:" }),
                      item.customer_notes
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 align-top", children: item.type || item.color || item.size ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 text-xs text-admin-text font-medium", children: [
                    item.type && /* @__PURE__ */ jsxs("span", { children: [
                      "Type: ",
                      item.type
                    ] }),
                    item.color && /* @__PURE__ */ jsxs("span", { children: [
                      "Color: ",
                      item.color
                    ] }),
                    item.size && /* @__PURE__ */ jsxs("span", { children: [
                      "Size: ",
                      item.size
                    ] })
                  ] }) : /* @__PURE__ */ jsx("span", { className: "text-admin-text-muted text-xs italic", children: "N/A" }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 align-top", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 text-sm", children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-admin-text-muted text-xs", children: [
                      "Qty: ",
                      /* @__PURE__ */ jsx("strong", { className: "text-admin-text", children: item.quantity })
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "text-admin-text-muted text-xs", children: [
                      "Unit: ",
                      /* @__PURE__ */ jsx("strong", { className: "text-admin-text", children: money(item.price || item.estimated_unit_price, order.currency_code || "USD") })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "mt-1 font-black text-admin-primary", children: money(item.line_total || Number(item.price || 0) * Number(item.quantity || 0), order.currency_code || "USD") })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 align-top min-w-[200px] whitespace-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
                    ((_a2 = item.urls) == null ? void 0 : _a2.length) > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: item.urls.map((url) => {
                      const ensureHttp = (u) => !u.startsWith("http://") && !u.startsWith("https://") ? `https://${u}` : u;
                      return /* @__PURE__ */ jsx("a", { href: ensureHttp(url.url), target: "_blank", rel: "noreferrer", className: "text-xs font-semibold text-admin-primary hover:underline break-all", children: url.domain || url.url }, url.id);
                    }) }),
                    ((_b2 = item.images) == null ? void 0 : _b2.length) > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: item.images.map((image) => /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => openLightbox(image),
                        className: "block w-12 h-12 shrink-0 overflow-hidden rounded bg-admin-surface-muted border border-admin-border hover:border-admin-primary transition-colors cursor-zoom-in",
                        children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: image.thumbnail_url || image.url,
                            alt: image.original_filename || "Reference",
                            className: "h-full w-full object-cover",
                            onError: (e) => {
                              e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
                              e.currentTarget.className = "h-full w-full object-cover p-2 opacity-50";
                            }
                          }
                        )
                      },
                      image.id
                    )) }),
                    ((_c2 = item.attachments) == null ? void 0 : _c2.length) > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: item.attachments.map((file) => /* @__PURE__ */ jsxs("a", { href: file.download_url, className: "inline-flex items-center gap-1 rounded bg-admin-surface-muted px-2 py-1 text-[10px] font-bold text-admin-text hover:text-admin-primary border border-admin-border", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" }) }),
                      file.original_filename || "File"
                    ] }, file.id)) })
                  ] }) })
                ] }, item.id);
              }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-admin-text mb-4", children: "Status History" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: ((_f = order.status_histories) == null ? void 0 : _f.length) > 0 ? order.status_histories.map((history) => /* @__PURE__ */ jsxs("div", { className: "border-l-2 border-admin-primary pl-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold capitalize text-admin-text", children: label(history.to_status) }),
              history.public_message && /* @__PURE__ */ jsx("p", { className: "text-sm text-admin-text-muted", children: history.public_message }),
              history.internal_note && /* @__PURE__ */ jsxs("p", { className: "text-xs text-admin-text-muted", children: [
                "Internal: ",
                history.internal_note
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-admin-text-muted", children: new Date(history.created_at).toLocaleString() })
            ] }, history.id)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-admin-text-muted", children: "No status history yet." }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-admin-text mb-4", children: "Status & Pricing" }),
            /* @__PURE__ */ jsxs("form", { onSubmit: updateStatus, className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1", children: "Status" }),
                /* @__PURE__ */ jsx("select", { value: data.status, onChange: (event) => setData("status", event.target.value), className: "w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 font-medium capitalize", children: statuses == null ? void 0 : statuses.map((status) => /* @__PURE__ */ jsx("option", { value: status, children: label(status) }, status)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1", children: "Budget Status" }),
                /* @__PURE__ */ jsx("select", { value: data.payment_status, onChange: (event) => setData("payment_status", event.target.value), className: "w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 font-medium capitalize", children: paymentStatuses == null ? void 0 : paymentStatuses.map((status) => /* @__PURE__ */ jsx("option", { value: status, children: label(status) }, status)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1", children: "Order Currency" }),
                /* @__PURE__ */ jsxs("select", { value: data.currency_code, onChange: (event) => setData("currency_code", event.target.value), className: "w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 font-medium", children: [
                  /* @__PURE__ */ jsx("option", { value: "USD", children: "USD - United States Dollar" }),
                  /* @__PURE__ */ jsx("option", { value: "VND", children: "VND - Vietnamese Dong" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-medium text-admin-text-muted", children: "Changing currency after pricing requires re-entering or converting all amounts." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-admin-text-muted", children: [
                  "Subtotal",
                  /* @__PURE__ */ jsx("input", { type: "number", step: "any", placeholder: "0.00", value: data.subtotal, onChange: (event) => setData("subtotal", event.target.value), className: "mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-admin-text-muted", children: [
                  "Logistics Fee",
                  /* @__PURE__ */ jsx("input", { type: "number", step: "any", placeholder: "0.00", value: data.logistics_fee, onChange: (event) => setData("logistics_fee", event.target.value), className: "mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-admin-text-muted", children: [
                  "Service Fee",
                  /* @__PURE__ */ jsx("input", { type: "number", step: "any", placeholder: "0.00", value: data.service_fee, onChange: (event) => setData("service_fee", event.target.value), className: "mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-admin-text-muted", children: [
                  "Delivery Fee",
                  /* @__PURE__ */ jsx("input", { type: "number", step: "any", placeholder: "0.00", value: data.delivery_fee, onChange: (event) => setData("delivery_fee", event.target.value), className: "mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-admin-text-muted col-span-2", children: [
                  "Discount",
                  /* @__PURE__ */ jsx("input", { type: "number", step: "any", placeholder: "0.00", value: data.discount, onChange: (event) => setData("discount", event.target.value), className: "mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-admin-surface-muted p-4 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-black text-admin-text", children: [
                  /* @__PURE__ */ jsx("span", { children: "Calculated Total" }),
                  /* @__PURE__ */ jsx("span", { children: total === "" ? money("") : money(Math.max(Number(total), 0), data.currency_code) })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-bold uppercase text-admin-text-muted", children: label(order.pricing_status) })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted", children: [
                "Customer Note",
                /* @__PURE__ */ jsx("textarea", { value: data.public_message, onChange: (event) => setData("public_message", event.target.value), className: "mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text", rows: 3 })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted", children: [
                "Pricing Notes",
                /* @__PURE__ */ jsx("textarea", { value: data.pricing_notes, onChange: (event) => setData("pricing_notes", event.target.value), className: "mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text", rows: 3 })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted", children: [
                "Internal Note",
                /* @__PURE__ */ jsx("textarea", { value: data.internal_note, onChange: (event) => setData("internal_note", event.target.value), className: "mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text", rows: 2 })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
                /* @__PURE__ */ jsxs("button", { type: "submit", disabled: processing, className: "w-full rounded-xl bg-admin-primary py-3 text-sm font-black uppercase tracking-wider text-white hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2", children: [
                  "Save Changes",
                  recentlySuccessful && /* @__PURE__ */ jsx("span", { className: "bg-white/20 text-white text-xs px-2 py-0.5 rounded-full animate-pulse", children: "Saved Successfully!" })
                ] }),
                /* @__PURE__ */ jsx(Link, { href: "/admin/logistics/orders", className: "w-full rounded-xl bg-admin-surface-muted border border-admin-border py-3 text-sm font-black uppercase tracking-wider text-admin-text hover:bg-admin-border/50 text-center flex items-center justify-center transition-colors", children: "Exit" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-admin-text mb-4", children: "Audit Logs" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-72 overflow-y-auto", children: (auditLogs == null ? void 0 : auditLogs.length) > 0 ? auditLogs.map((log) => {
              var _a2;
              return /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-admin-text", children: log.action }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-admin-text-muted", children: [
                  new Date(log.created_at).toLocaleString(),
                  " by ",
                  ((_a2 = log.user) == null ? void 0 : _a2.name) || "System"
                ] })
              ] }, log.id);
            }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-admin-text-muted", children: "No audit logs found." }) })
          ] })
        ] })
      ] })
    ] }),
    lightboxIndex !== null && allImages[lightboxIndex] && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setLightboxIndex(null), className: "absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[110]", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-6 left-6 flex gap-4 z-[110]", children: /* @__PURE__ */ jsxs("a", { href: allImages[lightboxIndex].url, download: true, target: "_blank", rel: "noreferrer", className: "flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors backdrop-blur-md", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
        "Download"
      ] }) }),
      allImages.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setLightboxIndex((prev) => prev && prev > 0 ? prev - 1 : allImages.length - 1), className: "absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-[110] bg-black/40 hover:bg-black/60 p-3 rounded-full backdrop-blur-md", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) }),
        /* @__PURE__ */ jsx("button", { onClick: () => setLightboxIndex((prev) => prev !== null && prev < allImages.length - 1 ? prev + 1 : 0), className: "absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-[110] bg-black/40 hover:bg-black/60 p-3 rounded-full backdrop-blur-md", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) })
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: allImages[lightboxIndex].url,
          alt: "Preview",
          className: "max-h-full max-w-full object-contain pointer-events-none shadow-2xl"
        }
      )
    ] })
  ] });
}
export {
  OrderShow as default
};
