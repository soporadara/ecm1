import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-ByoJzJm8.js";
import { useState, useEffect } from "react";
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";
import "react-dom";
import "lucide-react";
import "react-hot-toast";
const emptySite = {
  name: "",
  name_km: "",
  name_en: "",
  name_vi: "",
  slug: "",
  website_url: "",
  icon_source_url: "",
  icon_path: "",
  alt_text: "",
  brand_color: "#ff4c3b",
  description: "",
  is_enabled: true,
  open_in_new_tab: true,
  import_enabled: false,
  manual_fallback_enabled: true,
  status: "active",
  maintenance_message: "",
  sort_order: 0,
  starts_at: "",
  ends_at: ""
};
const toFormSite = (site) => ({
  name: site.name || "",
  name_km: site.name_km || "",
  name_en: site.name_en || "",
  name_vi: site.name_vi || "",
  slug: site.slug || "",
  website_url: site.website_url || "",
  icon_source_url: site.icon_source_url || "",
  icon_path: site.icon_path || "",
  alt_text: site.alt_text || "",
  brand_color: site.brand_color || "#ff4c3b",
  description: site.description || "",
  is_enabled: Boolean(site.is_enabled),
  open_in_new_tab: site.open_in_new_tab !== false,
  import_enabled: Boolean(site.import_enabled),
  manual_fallback_enabled: site.manual_fallback_enabled !== false,
  status: site.status || "active",
  maintenance_message: site.maintenance_message || "",
  sort_order: site.sort_order || 0,
  starts_at: site.starts_at || "",
  ends_at: site.ends_at || ""
});
function Field({ label, children }) {
  return /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-admin-text-muted", children: [
    /* @__PURE__ */ jsx("span", { className: "mb-1.5 block", children: label }),
    children
  ] });
}
const inputClass = "h-11 w-full rounded-xl border border-admin-border bg-admin-surface px-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20";
function DraggableRow({ site, index, startEdit, deleteSite, editingId, saveEdit, editData, setEditData, inputClass: inputClass2, setEditingId }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: site.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.8 : 1
  };
  return /* @__PURE__ */ jsx("div", { ref: setNodeRef, style, className: `border-b border-admin-border last:border-0 bg-admin-surface ${isDragging ? "shadow-lg relative" : ""}`, children: editingId === site.id ? /* @__PURE__ */ jsxs("form", { onSubmit: (event) => saveEdit(event, site), className: "grid gap-4 px-5 py-5 md:grid-cols-2 xl:grid-cols-4", children: [
    /* @__PURE__ */ jsx(Field, { label: "Name", children: /* @__PURE__ */ jsx("input", { className: inputClass2, value: editData.name, onChange: (event) => setEditData({ ...editData, name: event.target.value }), required: true }) }),
    /* @__PURE__ */ jsx(Field, { label: "Website URL", children: /* @__PURE__ */ jsx("input", { className: inputClass2, value: editData.website_url, onChange: (event) => setEditData({ ...editData, website_url: event.target.value }) }) }),
    /* @__PURE__ */ jsx(Field, { label: "Khmer Name", children: /* @__PURE__ */ jsx("input", { className: inputClass2, value: editData.name_km, onChange: (event) => setEditData({ ...editData, name_km: event.target.value }) }) }),
    /* @__PURE__ */ jsx(Field, { label: "English Name", children: /* @__PURE__ */ jsx("input", { className: inputClass2, value: editData.name_en, onChange: (event) => setEditData({ ...editData, name_en: event.target.value }) }) }),
    /* @__PURE__ */ jsx(Field, { label: "Vietnamese Name", children: /* @__PURE__ */ jsx("input", { className: inputClass2, value: editData.name_vi, onChange: (event) => setEditData({ ...editData, name_vi: event.target.value }) }) }),
    /* @__PURE__ */ jsx(Field, { label: "Icon URL", children: /* @__PURE__ */ jsx("input", { className: inputClass2, value: editData.icon_source_url, onChange: (event) => setEditData({ ...editData, icon_source_url: event.target.value }) }) }),
    /* @__PURE__ */ jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxs("select", { className: inputClass2, value: editData.status, onChange: (event) => setEditData({ ...editData, status: event.target.value }), children: [
      /* @__PURE__ */ jsx("option", { value: "active", children: "Active" }),
      /* @__PURE__ */ jsx("option", { value: "maintenance", children: "Maintenance" }),
      /* @__PURE__ */ jsx("option", { value: "disabled", children: "Disabled" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 xl:col-span-4 mt-2", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setEditingId(null), className: "ml-auto min-h-10 rounded-xl border border-admin-border px-5 text-sm font-black text-admin-text transition hover:bg-admin-surface-muted active:scale-[0.98]", children: "Cancel" }),
      /* @__PURE__ */ jsx("button", { className: "min-h-10 rounded-xl bg-admin-primary px-5 text-sm font-black text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all", children: "Save Changes" })
    ] })
  ] }) : /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[0.35fr_1.4fr_1.8fr_0.9fr] items-center gap-4 px-5 py-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("button", { type: "button", ...attributes, ...listeners, className: "text-admin-text-muted hover:text-admin-text cursor-grab active:cursor-grabbing p-1 -ml-1", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 8h16M4 16h16" }) }) }),
      /* @__PURE__ */ jsx("span", { className: "font-mono text-sm font-black text-admin-text-muted", children: index + 1 })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl overflow-hidden", children: site.logo || site.icon_source_url ? /* @__PURE__ */ jsx("img", { src: site.logo || site.icon_source_url || "", alt: site.name, className: "h-full w-full object-contain" }) : /* @__PURE__ */ jsx("span", { className: "flex h-full w-full items-center justify-center bg-admin-surface-muted text-admin-text-muted font-bold text-lg", children: site.name.charAt(0) }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-black text-admin-text", children: site.name }),
        /* @__PURE__ */ jsx("p", { className: "truncate font-mono text-xs font-semibold text-admin-text-muted", children: site.slug })
      ] })
    ] }),
    /* @__PURE__ */ jsx("a", { href: site.website_url || "#", target: "_blank", rel: "noreferrer", className: "truncate text-sm font-semibold text-admin-primary hover:underline", children: site.website_url || "No URL" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => startEdit(site), className: "rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition", children: "Edit" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => deleteSite(site), className: "rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-red-700 transition", children: "Delete" })
    ] })
  ] }) });
}
function MarketplacesIndex({ marketplaces }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(emptySite);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const createForm = useForm(emptySite);
  const [items, setItems] = useState(marketplaces);
  useEffect(() => {
    setItems(marketplaces);
  }, [marketplaces]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items2) => {
        const oldIndex = items2.findIndex((item) => item.id === active.id);
        const newIndex = items2.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items2, oldIndex, newIndex);
        axios.post("/admin/available-sites/reorder", {
          order: newItems.map((i) => i.id)
        });
        return newItems;
      });
    }
  };
  const startEdit = (site) => {
    setEditingId(site.id);
    setEditData(toFormSite(site));
  };
  const saveEdit = (event, site) => {
    event.preventDefault();
    router.patch(`/admin/available-sites/${site.id}`, editData, {
      preserveScroll: true,
      onSuccess: () => setEditingId(null)
    });
  };
  const createSite = (event) => {
    event.preventDefault();
    createForm.post("/admin/available-sites", {
      preserveScroll: true,
      onSuccess: () => {
        createForm.reset();
        setIsAddModalOpen(false);
      }
    });
  };
  const deleteSite = async (site) => {
    if (!await confirmAction(`Delete ${site.name} from Available Sites?`)) return;
    router.delete(`/admin/available-sites/${site.id}`, { preserveScroll: true });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Available Sites - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-admin-text", children: "Available Sites" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-admin-text-muted", children: "Manage the shopping-site carousel shown on the public homepage. Drag to reorder." })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsAddModalOpen(true),
            className: "rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white hover:opacity-90 transition-opacity whitespace-nowrap",
            children: "+ Add Site"
          }
        )
      ] }),
      isAddModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-admin-surface border border-admin-border rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-admin-border flex justify-between items-center sticky top-0 bg-admin-surface z-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-black text-admin-text", children: "Add New Site" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setIsAddModalOpen(false), className: "text-admin-text-muted hover:text-admin-text p-2 bg-admin-surface-muted rounded-full transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: createSite, className: "p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: [
            /* @__PURE__ */ jsx(Field, { label: "Name", children: /* @__PURE__ */ jsx("input", { className: inputClass, value: createForm.data.name, onChange: (event) => createForm.setData("name", event.target.value), required: true }) }),
            /* @__PURE__ */ jsx(Field, { label: "Website URL", children: /* @__PURE__ */ jsx("input", { className: inputClass, value: createForm.data.website_url, onChange: (event) => createForm.setData("website_url", event.target.value), placeholder: "https://example.com" }) }),
            /* @__PURE__ */ jsx(Field, { label: "Khmer Name", children: /* @__PURE__ */ jsx("input", { className: inputClass, value: createForm.data.name_km, onChange: (event) => createForm.setData("name_km", event.target.value) }) }),
            /* @__PURE__ */ jsx(Field, { label: "English Name", children: /* @__PURE__ */ jsx("input", { className: inputClass, value: createForm.data.name_en, onChange: (event) => createForm.setData("name_en", event.target.value) }) }),
            /* @__PURE__ */ jsx(Field, { label: "Vietnamese Name", children: /* @__PURE__ */ jsx("input", { className: inputClass, value: createForm.data.name_vi, onChange: (event) => createForm.setData("name_vi", event.target.value) }) }),
            /* @__PURE__ */ jsx(Field, { label: "Icon URL", children: /* @__PURE__ */ jsx("input", { className: inputClass, value: createForm.data.icon_source_url, onChange: (event) => createForm.setData("icon_source_url", event.target.value), placeholder: "https://..." }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end gap-3 border-t border-admin-border pt-4", children: [
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsAddModalOpen(false), className: "rounded-xl px-5 py-2.5 text-sm font-black uppercase tracking-wider text-admin-text hover:bg-admin-surface-muted transition-colors", children: "Cancel" }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: createForm.processing, className: "rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white hover:opacity-90 disabled:opacity-50", children: "Create Site" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[0.35fr_1.4fr_1.8fr_0.9fr] gap-4 border-b border-admin-border bg-admin-surface-muted px-5 py-3 text-xs font-black uppercase tracking-wide text-admin-text-muted", children: [
          /* @__PURE__ */ jsx("span", { children: "No." }),
          /* @__PURE__ */ jsx("span", { children: "Site" }),
          /* @__PURE__ */ jsx("span", { children: "URL" }),
          /* @__PURE__ */ jsx("span", { className: "text-right", children: "Actions" })
        ] }),
        /* @__PURE__ */ jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsx(SortableContext, { items, strategy: verticalListSortingStrategy, children: items.map((site, index) => /* @__PURE__ */ jsx(
          DraggableRow,
          {
            site,
            index,
            startEdit,
            deleteSite,
            editingId,
            saveEdit,
            editData,
            setEditData,
            inputClass,
            setEditingId
          },
          site.id
        )) }) })
      ] })
    ] })
  ] });
}
export {
  MarketplacesIndex as default
};
