import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import "react-dom";
import "lucide-react";
const label = (value) => String(value || "").replace(/_/g, " ");
function MessageEditor({ message, staff, statuses }) {
  const { data, setData, patch, processing } = useForm({
    status: message.status,
    assigned_to: message.assigned_to || "",
    internal_notes: message.internal_notes || ""
  });
  const submit = (event) => {
    event.preventDefault();
    patch(`/admin/contact-messages/${message.id}`, {
      preserveScroll: true,
      onSuccess: () => toast.success("Message updated.")
    });
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-4 grid gap-3 rounded-xl bg-admin-surface-muted p-4 md:grid-cols-3", children: [
    /* @__PURE__ */ jsx("select", { value: data.status, onChange: (event) => setData("status", event.target.value), className: "rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-sm font-bold capitalize", children: statuses.map((status) => /* @__PURE__ */ jsx("option", { value: status, children: label(status) }, status)) }),
    /* @__PURE__ */ jsxs("select", { value: data.assigned_to, onChange: (event) => setData("assigned_to", event.target.value), className: "rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-sm font-bold", children: [
      /* @__PURE__ */ jsx("option", { value: "", children: "Unassigned" }),
      staff.map((user) => /* @__PURE__ */ jsx("option", { value: user.id, children: user.name }, user.id))
    ] }),
    /* @__PURE__ */ jsx("button", { disabled: processing, className: "rounded-xl bg-admin-primary px-4 py-2 text-sm font-black uppercase tracking-wider text-white disabled:opacity-60", children: "Save" }),
    /* @__PURE__ */ jsx("textarea", { value: data.internal_notes, onChange: (event) => setData("internal_notes", event.target.value), rows: 2, placeholder: "Internal notes", className: "md:col-span-3 rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-sm" })
  ] });
}
function ContactMessagesIndex({ messages, filters = {}, staff = [], statuses = [] }) {
  const [search, setSearch] = useState(filters.search || "");
  const [status, setStatus] = useState(filters.status || "");
  const applyFilters = (event) => {
    event.preventDefault();
    router.get("/admin/contact-messages", { search, status }, { preserveState: true, replace: true });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Contact Messages", children: [
    /* @__PURE__ */ jsx(Head, { title: "Contact Messages - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Contact Messages" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Review support messages from customers and visitors." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: applyFilters, className: "flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx("input", { value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Name, email, customer ID, order", className: "min-w-[260px] rounded-xl border border-admin-border bg-admin-surface px-4 py-2.5 text-sm font-medium" }),
        /* @__PURE__ */ jsxs("select", { value: status, onChange: (event) => setStatus(event.target.value), className: "rounded-xl border border-admin-border bg-admin-surface px-4 py-2.5 text-sm font-medium capitalize", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "All statuses" }),
          statuses.map((item) => /* @__PURE__ */ jsx("option", { value: item, children: label(item) }, item))
        ] }),
        /* @__PURE__ */ jsx("button", { className: "rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white", children: "Filter" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: messages.data.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-admin-border bg-admin-surface p-10 text-center text-admin-text-muted", children: "No contact messages found." }) : messages.data.map((message) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-full bg-admin-primary/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-admin-primary", children: label(message.status) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-admin-text-muted", children: new Date(message.created_at).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "mt-3 text-lg font-black text-admin-text", children: message.subject }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm font-medium text-admin-text-muted", children: [
            message.name,
            " · ",
            message.email,
            " ",
            message.phone ? `· ${message.phone}` : ""
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs font-bold text-admin-text-muted", children: [
            "Customer: ",
            message.customer_code || "Visitor",
            " ",
            message.order_number ? `· Order ${message.order_number}` : ""
          ] })
        ] }),
        message.assignee && /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-admin-text-muted", children: [
          "Assigned to ",
          message.assignee.name
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 whitespace-pre-line rounded-xl bg-admin-surface-muted p-4 text-sm leading-6 text-admin-text", children: message.message }),
      message.attachment_original_filename && /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs font-bold text-admin-text-muted", children: [
        "Attachment: ",
        message.attachment_original_filename
      ] }),
      /* @__PURE__ */ jsx(MessageEditor, { message, staff, statuses })
    ] }, message.id)) }),
    messages.total > messages.per_page && /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: messages.links.map((link, idx) => /* @__PURE__ */ jsx(Link, { href: link.url || "#", className: `rounded-xl border px-4 py-2 text-sm font-bold ${link.active ? "border-admin-primary bg-admin-primary text-white" : "border-admin-border bg-admin-surface text-admin-text-muted"}`, dangerouslySetInnerHTML: { __html: link.label } }, idx)) })
  ] });
}
export {
  ContactMessagesIndex as default
};
