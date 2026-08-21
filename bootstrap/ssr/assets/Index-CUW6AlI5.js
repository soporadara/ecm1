import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-3Zrdf8uE.js";
import toast from "react-hot-toast";
import axios from "axios";
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import "react-dom";
function SortableTableRow({ banner, handleDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: banner.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "var(--admin-surface-muted)" : void 0,
    zIndex: isDragging ? 1 : 0,
    position: isDragging ? "relative" : void 0
  };
  return /* @__PURE__ */ jsxs("tr", { ref: setNodeRef, style, className: "hover:bg-admin-surface-muted/30 transition-colors", children: [
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("button", { ...attributes, ...listeners, className: "cursor-grab text-admin-text-muted hover:text-admin-text", children: /* @__PURE__ */ jsx(GripVertical, { className: "h-5 w-5" }) }),
      banner.desktop_image_url ? /* @__PURE__ */ jsx("img", { src: banner.desktop_image_url, alt: "Preview", className: "w-24 h-12 object-cover rounded shadow-sm border border-admin-border" }) : /* @__PURE__ */ jsx("div", { className: "w-24 h-12 bg-admin-surface-muted rounded border border-admin-border flex items-center justify-center text-xs text-admin-text-muted", children: "No Image" })
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-admin-text", children: banner.internal_name }) }),
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-admin-text-muted", children: banner.title_en || "-" }),
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-admin-text-muted", children: banner.sort_order }),
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${banner.is_active ? "bg-admin-success/10 text-admin-success border border-admin-success/20" : "bg-admin-text-muted/10 text-admin-text-muted border border-admin-text-muted/20"}`, children: banner.is_active ? "Active" : "Disabled" }) }),
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsx(Link, { href: `/admin/banners/${banner.id}/edit`, className: "p-2 text-admin-text-muted hover:text-admin-primary bg-admin-surface-muted hover:bg-admin-primary/10 rounded-lg transition-colors", children: "Edit" }),
      /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(banner.id), className: "p-2 text-admin-danger/70 hover:text-admin-danger bg-admin-surface-muted hover:bg-admin-danger/10 rounded-lg transition-colors", children: "Delete" })
    ] }) })
  ] });
}
function Index({ banners: initialBanners, bannerMode = "slideshow" }) {
  const [mode, setMode] = useState(bannerMode);
  const [items, setItems] = useState(initialBanners);
  useEffect(() => {
    setItems(initialBanners);
  }, [initialBanners]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items2) => {
        const oldIndex = items2.findIndex((item) => item.id === active.id);
        const newIndex = items2.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items2, oldIndex, newIndex);
        const updatedItems = newItems.map((item, index) => ({ ...item, sort_order: index }));
        axios.post("/admin/banners/reorder", {
          order: updatedItems.map((i) => i.id)
        }).then(() => {
          toast.success("Banners reordered");
        }).catch(() => {
          toast.error("Failed to reorder banners");
          setItems(items2);
        });
        return updatedItems;
      });
    }
  };
  const handleDelete = async (id) => {
    if (await confirmAction("Are you sure you want to delete this banner?")) {
      router.delete(`/admin/banners/${id}`, {
        onSuccess: () => toast.success("Banner deleted successfully.")
      });
    }
  };
  const saveMode = (event) => {
    event.preventDefault();
    router.patch("/admin/banners/mode", { home_banner_mode: mode }, {
      preserveScroll: true,
      onSuccess: () => toast.success("Homepage banner mode updated.")
    });
  };
  return /* @__PURE__ */ jsxs(
    AdminLayout,
    {
      title: "Hero Banners",
      actions: /* @__PURE__ */ jsx(Link, { href: "/admin/banners/create", className: "px-4 py-2 bg-admin-primary text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-admin-primary-hover shadow-sm transition-all duration-200", children: "+ Create" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Hero Banners - Admin" }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:flex sm:items-center sm:justify-between gap-4 mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Hero Banners" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Manage the four storefront homepage hero banners." })
        ] }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: saveMode, className: "mb-6 flex flex-col gap-4 rounded-2xl border border-admin-border/50 bg-admin-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base font-black text-admin-text", children: "Homepage banner behavior" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-admin-text-muted", children: "Slideshow auto-plays. Normal keeps the image still and lets customers click previous or next." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsxs("select", { value: mode, onChange: (event) => setMode(event.target.value), className: "min-h-11 rounded-xl border border-admin-border bg-admin-surface px-4 text-sm font-bold text-admin-text", children: [
              /* @__PURE__ */ jsx("option", { value: "slideshow", children: "Slideshow" }),
              /* @__PURE__ */ jsx("option", { value: "normal", children: "Normal with arrows" })
            ] }),
            /* @__PURE__ */ jsx("button", { className: "min-h-11 rounded-xl bg-admin-primary px-5 text-sm font-black text-white shadow-sm shadow-admin-primary/20 transition hover:-translate-y-0.5 hover:bg-admin-primary-hover", children: "Save Mode" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-admin-border bg-admin-surface-muted/50", children: [
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Preview" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Internal Name" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Title (EN)" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Order" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsx(SortableContext, { items: items.map((i) => i.id), strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-admin-border", children: [
            items.map((banner) => /* @__PURE__ */ jsx(SortableTableRow, { banner, handleDelete }, banner.id)),
            items.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "px-6 py-12 text-center text-admin-text-muted font-medium", children: "No banners found. Create one to get started." }) })
          ] }) }) })
        ] }) }) })
      ]
    }
  );
}
export {
  Index as default
};
