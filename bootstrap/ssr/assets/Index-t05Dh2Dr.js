import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import { Image, Edit2, Trash2, X, Check, Plus } from "lucide-react";
import toast from "react-hot-toast";
import "react-dom";
function Index({ methods }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors, transform } = useForm({
    bank_name: "",
    account_name: "",
    account_number: "",
    logo: null,
    qr_code: null,
    is_active: true,
    sort_order: 0
  });
  const openModal = (method = null) => {
    clearErrors();
    if (method) {
      setEditingMethod(method);
      setData({
        bank_name: method.bank_name,
        account_name: method.account_name,
        account_number: method.account_number,
        logo: null,
        qr_code: null,
        is_active: method.is_active,
        sort_order: method.sort_order
      });
    } else {
      setEditingMethod(null);
      reset();
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMethod(null);
    reset();
    clearErrors();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      onSuccess: () => {
        closeModal();
        toast.success(`Payment method ${editingMethod ? "updated" : "created"} successfully`);
      },
      onError: (err) => {
        console.error("Form error:", err);
        toast.error("Failed to save. Check console for details.");
      },
      preserveScroll: true
    };
    transform((data2) => ({
      ...data2,
      is_active: data2.is_active ? 1 : 0
    }));
    if (editingMethod) {
      post(route("admin.receipt-payments.update", editingMethod.id) + "?_method=PUT", { ...options, forceFormData: true });
    } else {
      post(route("admin.receipt-payments.store"), { ...options, forceFormData: true });
    }
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this payment method?")) {
      destroy(route("admin.receipt-payments.destroy", id), {
        onSuccess: () => toast.success("Payment method deleted successfully"),
        preserveScroll: true
      });
    }
  };
  return /* @__PURE__ */ jsxs(
    AdminLayout,
    {
      title: "Receipt Payment Methods",
      actions: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => openModal(),
          className: "flex items-center gap-2 bg-admin-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-admin-primary/90 transition-colors",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Add Method" })
          ]
        }
      ),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Receipt Payment Methods" }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-admin-border overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-admin-surface/50 border-b border-admin-border", children: [
            /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Bank/Method" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Account Details" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider text-center", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-admin-border", children: methods.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "py-8 text-center text-admin-text-muted", children: "No payment methods found. Add one to get started." }) }) : methods.map((method) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface/30 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg border border-admin-border bg-white flex items-center justify-center overflow-hidden", children: method.logo_url ? /* @__PURE__ */ jsx("img", { src: method.logo_url, alt: method.bank_name, className: "w-full h-full object-contain p-1" }) : /* @__PURE__ */ jsx(Image, { className: "w-5 h-5 text-admin-text-muted" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold text-admin-text text-sm", children: method.bank_name }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-admin-text-muted", children: [
                  "Order: ",
                  method.sort_order
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "py-3 px-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-admin-text text-sm", children: method.account_name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-mono text-admin-text-muted mt-0.5", children: method.account_number })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${method.is_active ? "bg-green-100 text-green-800 border border-green-200" : "bg-gray-100 text-gray-800 border border-gray-200"}`, children: method.is_active ? "Active" : "Inactive" }) }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => openModal(method),
                  className: "p-1.5 text-admin-text-muted hover:text-admin-primary bg-admin-surface hover:bg-admin-primary/10 rounded-lg transition-colors border border-transparent hover:border-admin-primary/20",
                  title: "Edit",
                  children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDelete(method.id),
                  className: "p-1.5 text-admin-text-muted hover:text-red-600 bg-admin-surface hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200",
                  title: "Delete",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] }) })
          ] }, method.id)) })
        ] }) }) }),
        isModalOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: closeModal }),
          /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-admin-border bg-admin-surface/50", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-black text-admin-text", children: editingMethod ? "Edit Payment Method" : "Add Payment Method" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: closeModal,
                  className: "p-2 text-admin-text-muted hover:text-admin-text hover:bg-admin-surface rounded-xl transition-colors",
                  children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, className: "flex-1 overflow-y-auto p-6 space-y-5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 md:col-span-2", children: [
                /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-admin-text", children: [
                  "Bank / Method Name ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.bank_name,
                    onChange: (e) => setData("bank_name", e.target.value),
                    className: "w-full px-4 py-2.5 rounded-xl border border-admin-border bg-white focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all text-sm outline-none",
                    placeholder: "e.g. ABA Bank",
                    required: true
                  }
                ),
                errors.bank_name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.bank_name })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-admin-text", children: [
                  "Account Name ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.account_name,
                    onChange: (e) => setData("account_name", e.target.value),
                    className: "w-full px-4 py-2.5 rounded-xl border border-admin-border bg-white focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all text-sm outline-none",
                    placeholder: "e.g. MVM Logistics",
                    required: true
                  }
                ),
                errors.account_name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.account_name })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-admin-text", children: [
                  "Account Number ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.account_number,
                    onChange: (e) => setData("account_number", e.target.value),
                    className: "w-full px-4 py-2.5 rounded-xl border border-admin-border bg-white focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all text-sm outline-none font-mono",
                    placeholder: "e.g. 001 234 567",
                    required: true
                  }
                ),
                errors.account_number && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.account_number })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-admin-text", children: "Bank Logo / Icon" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  (data.logo || (editingMethod == null ? void 0 : editingMethod.logo_url)) && /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg border border-admin-border bg-white flex items-center justify-center overflow-hidden shrink-0", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: data.logo ? URL.createObjectURL(data.logo) : editingMethod.logo_url,
                      alt: "Preview",
                      className: "w-full h-full object-contain p-1"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "file",
                      accept: "image/*",
                      onChange: (e) => {
                        var _a;
                        return setData("logo", ((_a = e.target.files) == null ? void 0 : _a[0]) || null);
                      },
                      className: "w-full text-sm text-admin-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-surface file:text-admin-text hover:file:bg-admin-border/50 transition-colors cursor-pointer"
                    }
                  ) })
                ] }),
                errors.logo && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.logo })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 md:col-span-2 border-t border-admin-border pt-4", children: [
                /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-admin-text flex items-center gap-2", children: [
                  "KHQR Code Image",
                  /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] uppercase font-black tracking-wider", children: "Recommended" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-admin-text-muted mb-2", children: "Upload the KHQR code image to display on receipts." }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  (data.qr_code || (editingMethod == null ? void 0 : editingMethod.qr_code_url)) && /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-lg border border-admin-border bg-white flex items-center justify-center overflow-hidden shrink-0", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: data.qr_code ? URL.createObjectURL(data.qr_code) : editingMethod.qr_code_url,
                      alt: "Preview",
                      className: "w-full h-full object-contain p-1"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "file",
                      accept: "image/*",
                      onChange: (e) => {
                        var _a;
                        return setData("qr_code", ((_a = e.target.files) == null ? void 0 : _a[0]) || null);
                      },
                      className: "w-full text-sm text-admin-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-surface file:text-admin-text hover:file:bg-admin-border/50 transition-colors cursor-pointer"
                    }
                  ) })
                ] }),
                errors.qr_code && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.qr_code })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-admin-text", children: "Sort Order" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: data.sort_order,
                    onChange: (e) => setData("sort_order", parseInt(e.target.value) || 0),
                    className: "w-full px-4 py-2.5 rounded-xl border border-admin-border bg-white focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all text-sm outline-none"
                  }
                ),
                errors.sort_order && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.sort_order })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center mt-7", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer group", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: data.is_active,
                      onChange: (e) => setData("is_active", e.target.checked),
                      className: "peer sr-only"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-lg border-2 border-admin-border bg-admin-surface peer-checked:bg-admin-primary peer-checked:border-admin-primary transition-colors group-hover:border-admin-primary/50" }),
                  /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-admin-text group-hover:text-admin-primary transition-colors select-none", children: "Active (Show on receipts)" })
              ] }) })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 px-6 py-4 border-t border-admin-border bg-admin-surface/50", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: closeModal,
                  className: "px-5 py-2.5 text-sm font-bold text-admin-text hover:bg-admin-border/50 rounded-xl transition-colors",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleSubmit,
                  disabled: processing,
                  className: "flex items-center gap-2 px-6 py-2.5 bg-admin-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-admin-primary/90 transition-colors disabled:opacity-50",
                  children: processing ? "Saving..." : "Save Method"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  Index as default
};
