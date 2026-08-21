import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-3Zrdf8uE.js";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-dom";
import "lucide-react";
function MenusIndex({ menus, pages = [] }) {
  var _a, _b;
  const [selectedMenu, setSelectedMenu] = useState(menus[0] || null);
  const [selectedPages, setSelectedPages] = useState([]);
  const menuForm = useForm({
    name: "",
    handle: "",
    location: "header",
    is_active: true
  });
  const itemForm = useForm({
    parent_id: "",
    label: "",
    url: "",
    icon: "",
    order: 0,
    new_tab: false
  });
  const handleCreateMenu = (e) => {
    e.preventDefault();
    menuForm.post("/admin/menus", {
      onSuccess: () => {
        toast.success("Menu created successfully");
        menuForm.reset();
      },
      onError: () => toast.error("Failed to create menu")
    });
  };
  const handleCreateItem = (e) => {
    e.preventDefault();
    if (!selectedMenu) return;
    itemForm.post(`/admin/menus/${selectedMenu.id}/items`, {
      onSuccess: () => {
        toast.success("Menu item added");
        itemForm.reset();
        router.reload({ only: ["menus"] });
      },
      onError: () => toast.error("Failed to add item")
    });
  };
  const deleteMenu = async (id) => {
    if (await confirmAction("Delete this menu completely?")) {
      router.delete(`/admin/menus/${id}`, {
        onSuccess: () => {
          toast.success("Menu deleted");
          if ((selectedMenu == null ? void 0 : selectedMenu.id) === id) setSelectedMenu(null);
        },
        onError: () => toast.error("Failed to delete menu")
      });
    }
  };
  const deleteItem = async (menuId, itemId) => {
    if (await confirmAction("Delete this menu item?")) {
      router.delete(`/admin/menus/${menuId}/items/${itemId}`, {
        onSuccess: () => {
          toast.success("Item deleted");
          router.reload({ only: ["menus"] });
        },
        onError: () => toast.error("Failed to delete item")
      });
    }
  };
  const handleAddSelectedPages = () => {
    if (!selectedMenu || selectedPages.length === 0) return;
    const itemsToAdd = pages.filter((p) => selectedPages.includes(p.id)).map((p) => ({
      label: p.title,
      url: `/pages/${p.slug}`
    }));
    router.post(`/admin/menus/${selectedMenu.id}/items/bulk`, { items: itemsToAdd }, {
      onSuccess: () => {
        toast.success("Pages added to menu");
        setSelectedPages([]);
        router.reload({ only: ["menus"] });
      },
      onError: () => toast.error("Failed to add pages")
    });
  };
  if (selectedMenu) {
    const updated = menus.find((m) => m.id === selectedMenu.id);
    if (updated && JSON.stringify(updated) !== JSON.stringify(selectedMenu)) {
      setSelectedMenu(updated);
    }
  }
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Menus", children: [
    /* @__PURE__ */ jsx(Head, { title: "Menus — Rafel CMS" }),
    /* @__PURE__ */ jsx("div", { className: "mb-6 flex justify-between items-end", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Menu Manager" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-0.5", children: "Control the navigation menus across your storefront." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/3 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 dark:text-gray-200 mb-3", children: "Select Menu" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            menus.map((menu) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setSelectedMenu(menu),
                className: `w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors flex justify-between items-center ${(selectedMenu == null ? void 0 : selectedMenu.id) === menu.id ? "bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-white font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent text-gray-600 dark:text-gray-400"}`,
                children: [
                  /* @__PURE__ */ jsx("span", { children: menu.name }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-700", children: menu.location })
                ]
              },
              menu.id
            )),
            menus.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 italic", children: "No menus exist yet." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 dark:text-gray-200 mb-4", children: "Create New Menu" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleCreateMenu, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: menuForm.data.name,
                  onChange: (e) => menuForm.setData("name", e.target.value),
                  className: "w-full text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500",
                  placeholder: "Main Navigation",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Handle" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: menuForm.data.handle,
                  onChange: (e) => menuForm.setData("handle", e.target.value),
                  className: "w-full text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500",
                  placeholder: "main_nav",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Location" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: menuForm.data.location,
                  onChange: (e) => menuForm.setData("location", e.target.value),
                  className: "w-full text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "header", children: "Header" }),
                    /* @__PURE__ */ jsx("option", { value: "footer_1", children: "Footer Column 1" }),
                    /* @__PURE__ */ jsx("option", { value: "footer_2", children: "Footer Column 2" }),
                    /* @__PURE__ */ jsx("option", { value: "footer_3", children: "Footer Column 3" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: menuForm.processing, className: "w-full py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors disabled:opacity-50", children: "Create Menu" })
          ] })
        ] }),
        selectedMenu && pages.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 dark:text-gray-200 mb-4", children: "Available Pages" }),
          /* @__PURE__ */ jsx("div", { className: "max-h-60 overflow-y-auto space-y-2 mb-4 border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-900/50", children: pages.map((page) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-3 p-2 hover:bg-white dark:hover:bg-gray-800 rounded cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                checked: selectedPages.includes(page.id),
                onChange: (e) => {
                  if (e.target.checked) {
                    setSelectedPages([...selectedPages, page.id]);
                  } else {
                    setSelectedPages(selectedPages.filter((id) => id !== page.id));
                  }
                }
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: page.title })
          ] }, page.id)) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleAddSelectedPages,
              disabled: selectedPages.length === 0,
              className: "w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50",
              children: "Add to Menu"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full md:w-2/3", children: selectedMenu ? /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold text-gray-800 dark:text-white text-lg", children: selectedMenu.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
              "Handle: ",
              /* @__PURE__ */ jsx("code", { className: "bg-gray-200 dark:bg-gray-700 px-1 rounded text-gray-800 dark:text-gray-300", children: selectedMenu.handle })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => deleteMenu(selectedMenu.id), className: "text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium", children: "Delete Menu" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 dark:text-gray-200 mb-4", children: "Menu Items" }),
          ((_a = selectedMenu.items) == null ? void 0 : _a.length) > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-2 mb-8", children: selectedMenu.items.map((item) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 px-4 py-3 flex justify-between items-center group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-800 dark:text-gray-200", children: item.label }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-400 dark:text-gray-500 text-sm ml-2", children: item.url })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx("button", { onClick: () => deleteItem(selectedMenu.id, item.id), className: "text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm", children: "Delete" }) })
            ] }),
            item.children && item.children.length > 0 && /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 py-2 pl-8 pr-4 space-y-1", children: item.children.map((child) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center group hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition-colors", children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }),
                child.label
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx("button", { onClick: () => deleteItem(selectedMenu.id, child.id), className: "text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-xs", children: "Delete" }) })
            ] }, child.id)) })
          ] }, item.id)) }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 italic mb-8", children: "No items in this menu yet." }),
          /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-gray-200 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-800 dark:text-gray-200 mb-4", children: "Add Custom Link" }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleCreateItem, className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Parent Item (Optional)" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: itemForm.data.parent_id,
                    onChange: (e) => itemForm.setData("parent_id", e.target.value),
                    className: "w-full text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "-- None (Top Level) --" }),
                      (_b = selectedMenu.items) == null ? void 0 : _b.filter((i) => !i.parent_id).map((item) => /* @__PURE__ */ jsx("option", { value: item.id, children: item.label }, item.id))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Label" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: itemForm.data.label,
                    onChange: (e) => itemForm.setData("label", e.target.value),
                    className: "w-full text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500",
                    placeholder: "Request Quote",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1", children: "URL / Path" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: itemForm.data.url,
                    onChange: (e) => itemForm.setData("url", e.target.value),
                    className: "w-full text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500",
                    placeholder: "/manual-order",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "col-span-2 flex justify-end", children: /* @__PURE__ */ jsx("button", { type: "submit", disabled: itemForm.processing, className: "px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50", children: "Add Item" }) })
            ] })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 border-dashed p-12 text-center h-full flex flex-col items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Select a menu from the left or create a new one." }) }) })
    ] })
  ] });
}
export {
  MenusIndex as default
};
