import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import { Plus, GripVertical, Trash2, Image } from "lucide-react";
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "react-dom";
import "react-hot-toast";
const generateId = () => Math.random().toString(36).substring(2, 9);
function SortableLink({ link, index, removeLink, updateLink, previews, errors }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "var(--admin-surface-muted)" : void 0,
    zIndex: isDragging ? 1 : 0,
    position: isDragging ? "relative" : void 0
  };
  return /* @__PURE__ */ jsxs("div", { ref: setNodeRef, style, className: "p-4 bg-admin-surface-muted rounded-xl border border-admin-border flex flex-col md:flex-row gap-4 items-start md:items-center relative", children: [
    /* @__PURE__ */ jsx("button", { type: "button", ...attributes, ...listeners, className: "cursor-grab text-admin-text-muted hover:text-admin-text hidden md:block", children: /* @__PURE__ */ jsx(GripVertical, { className: "w-5 h-5" }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => removeLink(link.id),
        className: "absolute top-4 right-4 md:static p-2 text-admin-danger hover:bg-admin-danger/10 rounded-lg transition",
        title: "Remove Link",
        children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 relative group", children: /* @__PURE__ */ jsxs("div", { className: "w-16 h-16 rounded-full border-2 border-admin-border overflow-hidden bg-white flex items-center justify-center relative", children: [
      previews[link.id] || link.icon_url ? /* @__PURE__ */ jsx("img", { src: previews[link.id] || link.icon_url, alt: "Icon preview", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx(Image, { className: "w-6 h-6 text-admin-text-muted opacity-50" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer", children: /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-bold", children: "Upload" }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          onChange: (e) => {
            var _a;
            return updateLink(index, "icon_file", (_a = e.target.files) == null ? void 0 : _a[0]);
          },
          className: "absolute inset-0 opacity-0 cursor-pointer"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-admin-text-muted mb-1", children: "Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: link.name,
            onChange: (e) => updateLink(index, "name", e.target.value),
            className: "w-full bg-white border border-admin-border rounded-xl px-4 py-2.5 text-admin-text focus:ring-2 focus:ring-admin-primary/50",
            placeholder: "e.g. WhatsApp",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-admin-text-muted mb-1", children: "Type" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: link.type || "custom",
            onChange: (e) => updateLink(index, "type", e.target.value),
            className: "w-full bg-white border border-admin-border rounded-xl px-4 py-2.5 text-admin-text focus:ring-2 focus:ring-admin-primary/50",
            children: [
              /* @__PURE__ */ jsx("option", { value: "custom", children: "Custom URL" }),
              /* @__PURE__ */ jsx("option", { value: "email", children: "Email" }),
              /* @__PURE__ */ jsx("option", { value: "phone", children: "Phone" }),
              /* @__PURE__ */ jsx("option", { value: "telegram", children: "Telegram" }),
              /* @__PURE__ */ jsx("option", { value: "messenger", children: "Messenger" }),
              /* @__PURE__ */ jsx("option", { value: "zalo", children: "Zalo" }),
              /* @__PURE__ */ jsx("option", { value: "whatsapp", children: "WhatsApp" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-admin-text-muted mb-1", children: "Value (Number/Email/URL)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: link.url,
            onChange: (e) => updateLink(index, "url", e.target.value),
            className: "w-full bg-white border border-admin-border rounded-xl px-4 py-2.5 text-admin-text focus:ring-2 focus:ring-admin-primary/50",
            placeholder: link.type === "email" ? "e.g. admin@example.com" : link.type === "phone" ? "e.g. 84123456789" : "e.g. https://...",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-admin-text-muted mb-1", children: "Icon URL (Optional)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: link.icon_url || "",
            onChange: (e) => updateLink(index, "icon_url", e.target.value),
            className: "w-full bg-white border border-admin-border rounded-xl px-4 py-2.5 text-admin-text focus:ring-2 focus:ring-admin-primary/50",
            placeholder: "e.g. https://example.com/icon.png"
          }
        )
      ] })
    ] }),
    errors[`links.${index}.name`] && /* @__PURE__ */ jsx("p", { className: "text-xs text-admin-danger mt-1 absolute bottom-1", children: errors[`links.${index}.name`] }),
    errors[`links.${index}.url`] && /* @__PURE__ */ jsx("p", { className: "text-xs text-admin-danger mt-1 absolute bottom-1", children: errors[`links.${index}.url`] }),
    errors[`links.${index}.icon_file`] && /* @__PURE__ */ jsx("p", { className: "text-xs text-admin-danger mt-1 absolute bottom-1", children: errors[`links.${index}.icon_file`] })
  ] });
}
function FlyIcons({ settings }) {
  let initialLinks = [];
  if (settings.fab_links) {
    try {
      initialLinks = JSON.parse(settings.fab_links);
    } catch (e) {
      initialLinks = [];
    }
  } else {
    if (settings.fab_email) initialLinks.push({ id: generateId(), name: "Email", url: `mailto:${settings.fab_email}`, icon_url: null, icon_file: null });
    if (settings.fab_phone) initialLinks.push({ id: generateId(), name: "Phone", url: `tel:${settings.fab_phone}`, icon_url: null, icon_file: null });
    if (settings.fab_messenger) initialLinks.push({ id: generateId(), name: "Messenger", url: settings.fab_messenger, icon_url: null, icon_file: null });
    if (settings.fab_telegram) initialLinks.push({ id: generateId(), name: "Telegram", url: settings.fab_telegram, icon_url: null, icon_file: null });
  }
  const { data, setData, post, processing, errors } = useForm({
    links: initialLinks
  });
  const [previews, setPreviews] = useState({});
  useEffect(() => {
    const newPreviews = {};
    data.links.forEach((link) => {
      if (link.icon_file instanceof File) {
        newPreviews[link.id] = URL.createObjectURL(link.icon_file);
      }
    });
    setPreviews(newPreviews);
    return () => {
      Object.values(newPreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [data.links]);
  const submit = (e) => {
    e.preventDefault();
    post("/admin/fly-icons", { forceFormData: true });
  };
  const addLink = () => {
    setData("links", [...data.links, { id: generateId(), name: "", url: "", icon_url: null, icon_file: null }]);
  };
  const removeLink = (id) => {
    setData("links", data.links.filter((l) => l.id !== id));
  };
  const updateLink = (index, field, value) => {
    const newLinks = [...data.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setData("links", newLinks);
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = data.links.findIndex((item) => item.id === active.id);
      const newIndex = data.links.findIndex((item) => item.id === over.id);
      setData("links", arrayMove(data.links, oldIndex, newIndex));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Fly Icons", children: [
    /* @__PURE__ */ jsx(Head, { title: "Fly Icons" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "Fly Icons (FAB)" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-admin-text-muted mt-1", children: "Customize the floating contact buttons that appear on the storefront." })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: addLink,
          className: "inline-flex items-center gap-2 px-4 py-2 bg-admin-primary/10 text-admin-primary font-bold rounded-xl hover:bg-admin-primary/20 transition",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            "Add Link"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-admin-surface rounded-2xl border border-admin-border shadow-sm p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
      data.links.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-12 bg-admin-surface-muted rounded-xl border border-dashed border-admin-border", children: /* @__PURE__ */ jsx("p", { className: "text-admin-text-muted font-bold", children: 'No icons added yet. Click "Add Link" to get started.' }) }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsx(SortableContext, { items: data.links.map((l) => l.id), strategy: verticalListSortingStrategy, children: data.links.map((link, index) => /* @__PURE__ */ jsx(
        SortableLink,
        {
          link,
          index,
          removeLink,
          updateLink,
          previews,
          errors
        },
        link.id
      )) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "pt-4 flex justify-end", children: /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "px-6 py-3 bg-admin-primary text-white font-bold rounded-xl shadow-lg hover:bg-admin-primary/90 transition disabled:opacity-50", children: processing ? "Saving..." : "Save Settings" }) })
    ] }) })
  ] });
}
export {
  FlyIcons as default
};
