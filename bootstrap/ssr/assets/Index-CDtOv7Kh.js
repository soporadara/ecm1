import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm, Head, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-3Zrdf8uE.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import "react-dom";
function SortableTableRow({ t, openModal, handleDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: t.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "var(--admin-surface-muted)" : void 0,
    zIndex: isDragging ? 1 : 0,
    position: isDragging ? "relative" : void 0
  };
  return /* @__PURE__ */ jsxs("tr", { ref: setNodeRef, style, className: "hover:bg-admin-surface/30 transition-colors", children: [
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("button", { ...attributes, ...listeners, className: "cursor-grab text-admin-text-muted hover:text-admin-text", children: /* @__PURE__ */ jsx(GripVertical, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full overflow-hidden bg-admin-surface-muted shrink-0 border border-admin-border/50", children: t.image_path ? /* @__PURE__ */ jsx("img", { src: `/storage/${t.image_path}`, alt: "", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-admin-text-muted font-bold text-lg", children: t.customer_name.charAt(0) }) }),
      /* @__PURE__ */ jsx("div", { className: "font-bold text-admin-text", children: t.customer_name })
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "line-clamp-2 max-w-md", title: t.content, children: t.content }) }),
    /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-center text-yellow-400 font-bold", children: [
      "★".repeat(t.rating),
      "☆".repeat(5 - t.rating)
    ] }),
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 rounded-md text-xs font-bold ${t.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: t.is_active ? "Active" : "Inactive" }) }),
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => openModal(t), className: "inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-600 dark:text-white hover:opacity-80 transition-opacity", children: "Edit" }),
      /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(t.id), className: "inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-700 dark:bg-red-600 dark:text-white hover:opacity-80 transition-opacity", children: "Delete" })
    ] }) })
  ] });
}
function Index({ testimonials: initialTestimonials }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [items, setItems] = useState(initialTestimonials);
  useEffect(() => {
    setItems(initialTestimonials);
  }, [initialTestimonials]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(prev, oldIndex, newIndex);
        const updatedItems = newItems.map((item, index) => ({ ...item, sort_order: index }));
        axios.post("/admin/testimonials/reorder", {
          items: updatedItems.map((i) => ({ id: i.id, sort_order: i.sort_order }))
        }).then(() => {
          toast.success("Customer Reviews reordered");
        }).catch(() => {
          toast.error("Failed to reorder customer reviews");
          setItems(prev);
        });
        return updatedItems;
      });
    }
  };
  const { data, setData, post, clearErrors, reset, errors, processing } = useForm({
    customer_name: "",
    content: "",
    rating: 5,
    is_active: true,
    sort_order: 0,
    image: null,
    remove_image: false,
    product_image_1: null,
    remove_product_image_1: false,
    product_image_2: null,
    remove_product_image_2: false,
    _method: "post"
  });
  const openModal = (testimonial = null) => {
    clearErrors();
    setEditingTestimonial(testimonial);
    if (testimonial) {
      setEditingId(testimonial.id);
      setData({
        customer_name: testimonial.customer_name,
        content: testimonial.content,
        rating: testimonial.rating,
        is_active: testimonial.is_active,
        sort_order: testimonial.sort_order,
        image: null,
        remove_image: false,
        product_image_1: null,
        remove_product_image_1: false,
        product_image_2: null,
        remove_product_image_2: false,
        _method: "put"
      });
    } else {
      setEditingId(null);
      reset();
      setData("_method", "post");
    }
    setIsModalOpen(true);
  };
  const submit = (e) => {
    e.preventDefault();
    const url = editingId ? `/admin/testimonials/${editingId}` : "/admin/testimonials";
    post(url, {
      preserveScroll: true,
      onSuccess: () => setIsModalOpen(false)
    });
  };
  const handleDelete = async (id) => {
    if (await confirmAction("Are you sure you want to delete this review?")) {
      router.delete(`/admin/testimonials/${id}`);
    }
  };
  const renderPreview = (file, existingPath, onRemove) => {
    if (file || existingPath) {
      return /* @__PURE__ */ jsxs("div", { className: "w-12 h-12 rounded-full overflow-hidden shrink-0 border border-admin-border/50 bg-admin-surface-muted relative group", children: [
        /* @__PURE__ */ jsx("img", { src: file ? URL.createObjectURL(file) : `/storage/${existingPath}`, alt: "Preview", className: "w-full h-full object-cover" }),
        onRemove && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            className: "absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white",
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
          }
        )
      ] });
    }
    return /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full overflow-hidden shrink-0 border border-admin-border/50 bg-admin-surface-muted flex items-center justify-center text-admin-text-muted/30 text-xs", children: "None" });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Customer Reviews - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Customer Reviews" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Manage what customers are saying on your homepage." })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => openModal(), className: "px-4 py-2 bg-admin-primary text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-admin-primary-hover transition-colors", children: "+ Add Review" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-admin-surface rounded-2xl shadow-sm border border-admin-border/40 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm text-admin-text-muted", children: [
        /* @__PURE__ */ jsx("thead", { className: "text-xs uppercase bg-admin-surface/50 text-admin-text/70 border-b border-admin-border/40", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold tracking-wider", children: "Customer" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold tracking-wider", children: "Review" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold tracking-wider text-center", children: "Rating" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold tracking-wider text-center", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-bold tracking-wider text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsx(SortableContext, { items: items.map((t) => t.id), strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-admin-border/40", children: [
          items.map((t) => /* @__PURE__ */ jsx(SortableTableRow, { t, openModal, handleDelete }, t.id)),
          items.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "px-6 py-12 text-center text-admin-text-muted", children: 'No reviews found. Click "Add Review" to get started.' }) })
        ] }) }) })
      ] }) }) })
    ] }),
    isModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-admin-surface rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "p-6 sm:p-8 bg-white dark:bg-admin-surface text-admin-text", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6", children: editingId ? "Edit Review" : "Add Review" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Customer Name *" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: data.customer_name, onChange: (e) => setData("customer_name", e.target.value), required: true, className: "w-full border-admin-border/50 rounded-xl focus:ring-admin-primary focus:border-admin-primary" }),
          errors.customer_name && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.customer_name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Review Content *" }),
          /* @__PURE__ */ jsx("textarea", { value: data.content, onChange: (e) => setData("content", e.target.value), required: true, rows: 4, className: "w-full border-admin-border/50 rounded-xl focus:ring-admin-primary focus:border-admin-primary" }),
          errors.content && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.content })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Rating (1-5)" }),
            /* @__PURE__ */ jsx("select", { value: data.rating, onChange: (e) => setData("rating", parseInt(e.target.value)), className: "w-full border-admin-border/50 rounded-xl focus:ring-admin-primary focus:border-admin-primary", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxs("option", { value: n, children: [
              n,
              " Stars"
            ] }, n)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Sort Order" }),
            /* @__PURE__ */ jsx("input", { type: "number", value: data.sort_order, onChange: (e) => setData("sort_order", parseInt(e.target.value)), className: "w-full border-admin-border/50 rounded-xl focus:ring-admin-primary focus:border-admin-primary" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Upload Profile Picture" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
            renderPreview(
              data.image,
              data.remove_image ? void 0 : editingTestimonial == null ? void 0 : editingTestimonial.image_path,
              () => setData((d) => ({ ...d, image: null, remove_image: true }))
            ),
            /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: (e) => {
              setData((d) => ({ ...d, image: e.target.files ? e.target.files[0] : null, remove_image: false }));
            }, className: "w-full rounded-xl border border-admin-border/50 text-admin-text text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors cursor-pointer bg-admin-surface-muted" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-admin-border/50", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Product Image 1 (Optional)" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
              renderPreview(
                data.product_image_1,
                data.remove_product_image_1 ? void 0 : editingTestimonial == null ? void 0 : editingTestimonial.product_image_1,
                () => setData((d) => ({ ...d, product_image_1: null, remove_product_image_1: true }))
              ),
              /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: (e) => {
                setData((d) => ({ ...d, product_image_1: e.target.files ? e.target.files[0] : null, remove_product_image_1: false }));
              }, className: "w-full rounded-xl border border-admin-border/50 text-admin-text text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors cursor-pointer bg-admin-surface-muted" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1", children: "Product Image 2 (Optional)" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
              renderPreview(
                data.product_image_2,
                data.remove_product_image_2 ? void 0 : editingTestimonial == null ? void 0 : editingTestimonial.product_image_2,
                () => setData((d) => ({ ...d, product_image_2: null, remove_product_image_2: true }))
              ),
              /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: (e) => {
                setData((d) => ({ ...d, product_image_2: e.target.files ? e.target.files[0] : null, remove_product_image_2: false }));
              }, className: "w-full rounded-xl border border-admin-border/50 text-admin-text text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors cursor-pointer bg-admin-surface-muted" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.is_active, onChange: (e) => setData("is_active", e.target.checked), className: "rounded border-admin-border text-admin-primary focus:ring-admin-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-bold", children: "Active (Visible on Homepage)" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-end gap-3", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsModalOpen(false), className: "px-5 py-2.5 rounded-xl font-bold text-admin-text-muted hover:bg-admin-surface transition-colors", children: "Cancel" }),
        /* @__PURE__ */ jsxs("button", { type: "submit", disabled: processing, className: "px-5 py-2.5 bg-admin-primary text-white rounded-xl font-bold hover:bg-admin-primary-hover disabled:opacity-50 transition-colors", children: [
          editingId ? "Update" : "Save",
          " Review"
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  Index as default
};
