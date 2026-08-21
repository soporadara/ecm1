import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import { Plus, GripVertical, Check, X, Pencil, Trash2 } from "lucide-react";
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";
import toast from "react-hot-toast";
import "react-dom";
function SortableTableRow({ faq, openEdit, handleDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: faq.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "var(--admin-surface-muted)" : void 0,
    zIndex: isDragging ? 1 : 0,
    position: isDragging ? "relative" : void 0
  };
  return /* @__PURE__ */ jsxs("div", { ref: setNodeRef, style, className: "grid grid-cols-12 items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition border-b border-slate-100 dark:border-white/5", children: [
    /* @__PURE__ */ jsx("div", { className: "col-span-1 flex items-center gap-2 text-slate-400", children: /* @__PURE__ */ jsx("div", { ...attributes, ...listeners, className: "cursor-grab hover:text-slate-600", children: /* @__PURE__ */ jsx(GripVertical, { className: "h-5 w-5" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-4", children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white", children: faq.question_en }),
      /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-slate-500 truncate", children: faq.answer_en })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "col-span-3", children: faq.is_active ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700 dark:bg-green-500/20 dark:text-green-400", children: [
      /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }),
      " Active"
    ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-400", children: [
      /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" }),
      " Inactive"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-4 flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => openEdit(faq),
          className: "flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-primary dark:hover:bg-slate-800",
          children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDelete(faq),
          className: "flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10",
          children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
function Index({ faqs: initialFaqs }) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [isEditing, setIsEditing] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
    question_en: "",
    question_km: "",
    question_vi: "",
    answer_en: "",
    answer_km: "",
    answer_vi: "",
    is_active: true,
    sort_order: 0
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setFaqs((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(prev, oldIndex, newIndex);
        const updatedItems = newItems.map((item, index) => ({ ...item, sort_order: index }));
        axios.post("/admin/telegram-faqs/reorder", {
          orders: updatedItems.map((i) => ({ id: i.id, sort_order: i.sort_order }))
        }).then(() => {
          toast.success("FAQs reordered successfully");
        }).catch(() => {
          toast.error("Failed to reorder FAQs");
          setFaqs(prev);
        });
        return updatedItems;
      });
    }
  };
  const openEdit = (faq) => {
    setIsEditing(faq);
    setIsCreating(false);
    setData({
      question_en: faq.question_en || "",
      question_km: faq.question_km || "",
      question_vi: faq.question_vi || "",
      answer_en: faq.answer_en || "",
      answer_km: faq.answer_km || "",
      answer_vi: faq.answer_vi || "",
      is_active: faq.is_active,
      sort_order: faq.sort_order
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openCreate = () => {
    setIsCreating(true);
    setIsEditing(null);
    reset();
  };
  const closeForm = () => {
    setIsCreating(false);
    setIsEditing(null);
    reset();
  };
  const submit = (e) => {
    e.preventDefault();
    if (isEditing) {
      put(`/admin/telegram-faqs/${isEditing.id}`, {
        onSuccess: () => closeForm()
      });
    } else {
      post("/admin/telegram-faqs", {
        onSuccess: () => closeForm()
      });
    }
  };
  const handleDelete = (faq) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      destroy(`/admin/telegram-faqs/${faq.id}`);
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Telegram FAQs" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-slate-900 dark:text-white", children: "Telegram FAQs" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-slate-500 dark:text-slate-400", children: "Manage the Frequently Asked Questions that appear in your Telegram Bot." })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: openCreate,
          className: "inline-flex items-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-primary/90",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
            "Add FAQ"
          ]
        }
      )
    ] }),
    (isCreating || isEditing) && /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-6 text-lg font-bold text-slate-900 dark:text-white", children: isCreating ? "Create New FAQ" : "Edit FAQ" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-slate-800/50", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold flex items-center gap-2 text-slate-900 dark:text-white", children: "🇬🇧 English" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold mb-1 text-slate-900 dark:text-white", children: "Question" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.question_en,
                  onChange: (e) => setData("question_en", e.target.value),
                  className: "w-full rounded-lg border-slate-200 text-sm text-slate-900 dark:text-white dark:border-white/10 dark:bg-slate-900"
                }
              ),
              errors.question_en && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.question_en })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold mb-1 text-slate-900 dark:text-white", children: "Answer" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 8,
                  value: data.answer_en,
                  onChange: (e) => setData("answer_en", e.target.value),
                  className: "w-full rounded-lg border-slate-200 text-sm text-slate-900 dark:text-white dark:border-white/10 dark:bg-slate-900"
                }
              ),
              errors.answer_en && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.answer_en })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-slate-800/50", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold flex items-center gap-2 text-slate-900 dark:text-white", children: "🇰🇭 ខ្មែរ (Khmer)" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold mb-1 text-slate-900 dark:text-white", children: "Question" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.question_km,
                  onChange: (e) => setData("question_km", e.target.value),
                  className: "w-full rounded-lg border-slate-200 text-sm text-slate-900 dark:text-white dark:border-white/10 dark:bg-slate-900"
                }
              ),
              errors.question_km && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.question_km })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold mb-1 text-slate-900 dark:text-white", children: "Answer" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 8,
                  value: data.answer_km,
                  onChange: (e) => setData("answer_km", e.target.value),
                  className: "w-full rounded-lg border-slate-200 text-sm text-slate-900 dark:text-white dark:border-white/10 dark:bg-slate-900"
                }
              ),
              errors.answer_km && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.answer_km })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-slate-800/50", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold flex items-center gap-2 text-slate-900 dark:text-white", children: "🇻🇳 Tiếng Việt" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold mb-1 text-slate-900 dark:text-white", children: "Question" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.question_vi,
                  onChange: (e) => setData("question_vi", e.target.value),
                  className: "w-full rounded-lg border-slate-200 text-sm text-slate-900 dark:text-white dark:border-white/10 dark:bg-slate-900"
                }
              ),
              errors.question_vi && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.question_vi })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold mb-1 text-slate-900 dark:text-white", children: "Answer" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 8,
                  value: data.answer_vi,
                  onChange: (e) => setData("answer_vi", e.target.value),
                  className: "w-full rounded-lg border-slate-200 text-sm text-slate-900 dark:text-white dark:border-white/10 dark:bg-slate-900"
                }
              ),
              errors.answer_vi && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.answer_vi })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm font-semibold cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: data.is_active,
              onChange: (e) => setData("is_active", e.target.checked),
              className: "rounded text-brand-primary focus:ring-brand-primary"
            }
          ),
          "Active (Show in Bot)"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: closeForm,
              className: "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-2 text-sm font-bold text-white transition hover:bg-brand-primary/90 disabled:opacity-50",
              children: processing ? "Saving..." : isEditing ? "Update FAQ" : "Save FAQ"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4 border-b border-slate-100 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:text-slate-400", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-1", children: "Order" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-4", children: "Question (EN)" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-3", children: "Status" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-4 text-right", children: "Actions" })
      ] }),
      /* @__PURE__ */ jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsx(SortableContext, { items: faqs.map((f) => f.id), strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100 dark:divide-white/5", children: faqs.map((faq) => /* @__PURE__ */ jsx(
        SortableTableRow,
        {
          faq,
          openEdit,
          handleDelete
        },
        faq.id
      )) }) }) }),
      faqs.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-12 text-center text-slate-500", children: /* @__PURE__ */ jsx("p", { children: "No FAQs created yet." }) })
    ] })
  ] });
}
export {
  Index as default
};
