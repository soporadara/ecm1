import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
function CustomerManagement({ customers, filters }) {
  const { auth } = usePage().props;
  const [search, setSearch] = useState(filters.search || "");
  const [editingCustomer, setEditingCustomer] = useState(null);
  const editForm = useForm({
    name: "",
    email: "",
    phone_e164: ""
  });
  const openEditModal = (user) => {
    setEditingCustomer(user);
    editForm.setData({
      name: user.name,
      email: user.email,
      phone_e164: user.phone_e164 || ""
    });
  };
  const submitEdit = (e) => {
    e.preventDefault();
    if (!editingCustomer) return;
    editForm.put(`/admin/customers-management/${editingCustomer.id}`, {
      onSuccess: () => setEditingCustomer(null)
    });
  };
  const [resettingCustomer, setResettingCustomer] = useState(null);
  const passwordForm = useForm({
    password: "",
    password_confirmation: ""
  });
  const submitPasswordReset = (e) => {
    e.preventDefault();
    if (!resettingCustomer) return;
    passwordForm.post(`/admin/customers-management/${resettingCustomer.id}/reset-password`, {
      onSuccess: () => {
        setResettingCustomer(null);
        passwordForm.reset();
      }
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    router.get("/admin/customers-management", { search }, { preserveState: true });
  };
  const [confirmAction, setConfirmAction] = useState(null);
  const toggleStatus = (user) => {
    const action = user.account_status === "frozen" ? "Unfreeze" : "Freeze";
    setConfirmAction({
      type: "freeze",
      user,
      message: `Are you sure you want to ${action.toLowerCase()} this account?`,
      action,
      buttonClass: "bg-admin-text"
    });
  };
  const deleteCustomer = (user) => {
    setConfirmAction({
      type: "delete",
      user,
      message: "Are you absolutely sure you want to delete this customer? This cannot be undone.",
      action: "Delete",
      buttonClass: "bg-admin-danger"
    });
  };
  const executeConfirmAction = () => {
    if (!confirmAction) return;
    if (confirmAction.type === "freeze") {
      router.post(`/admin/customers-management/${confirmAction.user.id}/toggle-status`, {}, { preserveScroll: true });
    } else if (confirmAction.type === "delete") {
      router.delete(`/admin/customers-management/${confirmAction.user.id}`, { preserveScroll: true });
    }
    setConfirmAction(null);
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Customers", children: [
    /* @__PURE__ */ jsx(Head, { title: "Customers" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Customers" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-admin-text-muted mt-1", children: "Manage login info, passwords, and account status." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface rounded-2xl border border-admin-border/50 shadow-sm shadow-admin-border/20 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-admin-border bg-admin-surface-muted/30", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex gap-2 max-w-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted/70 pointer-events-none", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search name, email, phone...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "w-full pl-10 pr-4 py-2 border border-admin-border/60 rounded-xl bg-white shadow-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/50 focus:border-admin-primary transition-all text-sm font-medium placeholder:font-normal"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "px-4 py-2 bg-admin-primary text-white text-sm font-semibold rounded-xl hover:bg-admin-primary-hover shadow-sm transition-colors", children: "Search" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-admin-surface-muted/50 border-b border-admin-border", children: [
          /* @__PURE__ */ jsx("th", { className: "text-center px-4 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider w-12", children: "No." }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Customer ID" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Name" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Email" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Phone" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "text-right px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-admin-border", children: [
          customers.data.map((user, index) => {
            const rowNumber = (customers.current_page - 1) * 15 + index + 1;
            return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-4 text-center text-xs font-black text-admin-text-muted", children: rowNumber }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: "inline-block rounded-lg bg-admin-primary/10 px-2.5 py-1 text-xs font-black tracking-wider text-admin-primary font-mono", children: user.customer_code || "—" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-bold text-admin-text", children: user.name }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted", children: user.email }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted", children: user.phone_e164 || "N/A" }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-bold rounded-full ${user.account_status === "frozen" ? "bg-admin-danger/10 text-admin-danger" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`, children: user.account_status === "frozen" ? "Frozen" : "Active" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-2", children: /* @__PURE__ */ jsx("button", { onClick: () => openEditModal(user), className: "inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-600 dark:text-white hover:opacity-80 transition-opacity", children: "Edit" }) }) })
            ] }, user.id);
          }),
          customers.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "px-6 py-12 text-center text-admin-text-muted", children: "No customers found." }) })
        ] })
      ] }) })
    ] }),
    editingCustomer && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface rounded-2xl w-full max-w-md shadow-2xl p-6 relative", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-admin-text mb-4", children: "Edit Customer Info" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submitEdit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1", children: "Name" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: editForm.data.name, onChange: (e) => editForm.setData("name", e.target.value), className: "w-full bg-admin-surface-muted border-none rounded-xl px-4 py-2 text-admin-text focus:ring-2 focus:ring-admin-primary/50" }),
          editForm.errors.name && /* @__PURE__ */ jsx("p", { className: "text-xs text-admin-danger mt-1", children: editForm.errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1", children: "Email" }),
          /* @__PURE__ */ jsx("input", { type: "email", value: editForm.data.email, onChange: (e) => editForm.setData("email", e.target.value), className: "w-full bg-admin-surface-muted border-none rounded-xl px-4 py-2 text-admin-text focus:ring-2 focus:ring-admin-primary/50" }),
          editForm.errors.email && /* @__PURE__ */ jsx("p", { className: "text-xs text-admin-danger mt-1", children: editForm.errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1", children: "Phone" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: editForm.data.phone_e164, onChange: (e) => editForm.setData("phone_e164", e.target.value), className: "w-full bg-admin-surface-muted border-none rounded-xl px-4 py-2 text-admin-text focus:ring-2 focus:ring-admin-primary/50" }),
          editForm.errors.phone_e164 && /* @__PURE__ */ jsx("p", { className: "text-xs text-admin-danger mt-1", children: editForm.errors.phone_e164 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 mt-6 mb-6", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setEditingCustomer(null), className: "px-5 py-2.5 text-sm font-bold text-admin-text hover:bg-admin-surface-muted active:scale-[0.98] rounded-xl transition-all", children: "Cancel" }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: editForm.processing, className: "px-5 py-2.5 text-sm font-bold bg-admin-primary text-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] hover:bg-admin-primary/90 transition-all disabled:opacity-50 disabled:active:scale-100 disabled:hover:translate-y-0", children: "Save Changes" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-admin-border/50 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1", children: "Advanced Actions" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
            setResettingCustomer(editingCustomer);
            setEditingCustomer(null);
          }, className: "w-full px-4 py-3 text-sm font-bold text-left text-yellow-700 bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300 hover:shadow-sm dark:bg-yellow-900/20 dark:border-yellow-700/50 dark:text-yellow-400 dark:hover:bg-yellow-900/40 rounded-xl transition-all", children: "Reset Password" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
            toggleStatus(editingCustomer);
            setEditingCustomer(null);
          }, className: "w-full px-4 py-3 text-sm font-bold text-left text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 rounded-xl transition-all", children: editingCustomer.account_status === "frozen" ? "Unfreeze Account" : "Freeze Account" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
            deleteCustomer(editingCustomer);
            setEditingCustomer(null);
          }, className: "w-full px-4 py-3 text-sm font-bold text-left text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-400 dark:hover:bg-red-900/40 rounded-xl transition-all", children: "Delete Customer" })
        ] })
      ] })
    ] }) }),
    resettingCustomer && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface rounded-2xl w-full max-w-md shadow-2xl p-6 relative", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-admin-text mb-4", children: [
        "Reset Password for ",
        resettingCustomer.name
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submitPasswordReset, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1", children: "New Password" }),
          /* @__PURE__ */ jsx("input", { type: "password", value: passwordForm.data.password, onChange: (e) => passwordForm.setData("password", e.target.value), className: "w-full bg-admin-surface-muted border-none rounded-xl px-4 py-2 text-admin-text focus:ring-2 focus:ring-admin-primary/50" }),
          passwordForm.errors.password && /* @__PURE__ */ jsx("p", { className: "text-xs text-admin-danger mt-1", children: passwordForm.errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1", children: "Confirm New Password" }),
          /* @__PURE__ */ jsx("input", { type: "password", value: passwordForm.data.password_confirmation, onChange: (e) => passwordForm.setData("password_confirmation", e.target.value), className: "w-full bg-admin-surface-muted border-none rounded-xl px-4 py-2 text-admin-text focus:ring-2 focus:ring-admin-primary/50" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
            setResettingCustomer(null);
            passwordForm.reset();
          }, className: "px-5 py-2.5 text-sm font-bold text-admin-text hover:bg-admin-surface-muted active:scale-[0.98] rounded-xl transition-all", children: "Cancel" }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: passwordForm.processing, className: "px-5 py-2.5 text-sm font-bold bg-admin-danger text-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] hover:bg-admin-danger/90 transition-all disabled:opacity-50 disabled:active:scale-100 disabled:hover:translate-y-0", children: "Reset Password" })
        ] })
      ] })
    ] }) }),
    confirmAction && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface rounded-2xl w-full max-w-sm shadow-2xl p-6 relative text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-admin-surface-muted rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-admin-text-muted", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-admin-text mb-2", children: "Are you sure?" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-admin-text-muted mb-6", children: confirmAction.message }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-3", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setConfirmAction(null), className: "px-5 py-2.5 text-sm font-bold text-admin-text bg-admin-surface-muted hover:bg-admin-border/50 rounded-xl transition", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: executeConfirmAction, className: `px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg transition ${confirmAction.buttonClass} hover:opacity-90`, children: confirmAction.action })
      ] })
    ] }) })
  ] });
}
export {
  CustomerManagement as default
};
