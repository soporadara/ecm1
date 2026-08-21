import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head } from "@inertiajs/react";
import React from "react";
import { A as AdminLayout } from "./AdminLayout-3Zrdf8uE.js";
import toast from "react-hot-toast";
import "react-dom";
import "lucide-react";
function GeneralSettings({ settings }) {
  const { data, setData, post, processing, errors } = useForm({
    store_name: settings.store_name || "Rafel",
    support_email: settings.support_email || "support@rafel.com",
    support_phone: settings.support_phone || "",
    currency: settings.currency === "VND" ? "VND" : "USD",
    store_address: settings.store_address || "",
    about_title: settings.about_title || "About our company",
    about_text: settings.about_text || "",
    social_links: settings.social_links ? JSON.parse(settings.social_links) : [
      { name: settings.social_1_name || "Telegram", url: settings.social_1_url || "", icon: settings.social_1_icon || "MessageCircle" },
      { name: settings.social_2_name || "Facebook", url: settings.social_2_url || "", icon: settings.social_2_icon || "Facebook" },
      { name: settings.social_3_name || "Instagram", url: settings.social_3_url || "", icon: settings.social_3_icon || "Instagram" },
      { name: settings.social_4_name || "TikTok", url: settings.social_4_url || "", icon: settings.social_4_icon || "Music" }
    ].filter((s) => s.name || s.url),
    cambodia_map_open_url: settings.cambodia_map_open_url || "",
    cambodia_map_address: settings.cambodia_map_address || "",
    vietnam_map_open_url: settings.vietnam_map_open_url || "",
    vietnam_map_address: settings.vietnam_map_address || "",
    store_logo: settings.store_logo || "",
    store_favicon: settings.store_favicon || ""
  });
  const [logoPreview, setLogoPreview] = React.useState(settings.store_logo || null);
  const [faviconPreview, setFaviconPreview] = React.useState(settings.store_favicon || null);
  const submit = (e) => {
    e.preventDefault();
    post("/admin/settings", {
      preserveScroll: true,
      onSuccess: () => toast.success("Settings updated successfully!"),
      onError: () => toast.error("Failed to update settings. Check the form for errors.")
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "General Settings", children: [
    /* @__PURE__ */ jsx(Head, { title: "General Settings - Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-admin-text tracking-tight", children: "General Settings" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-admin-text-muted mt-1", children: "Manage your primary store configurations." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 overflow-hidden", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "p-6 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2", children: "Store Name *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.store_name,
                onChange: (e) => setData("store_name", e.target.value),
                className: "w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow",
                required: true
              }
            ),
            errors.store_name && /* @__PURE__ */ jsx("p", { className: "text-red-500 dark:text-red-400 text-xs mt-1", children: errors.store_name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2", children: "Primary Currency *" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.currency,
                onChange: (e) => setData("currency", e.target.value),
                className: "w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow",
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "USD", children: "USD ($)" }),
                  /* @__PURE__ */ jsx("option", { value: "VND", children: "VND (₫)" })
                ]
              }
            ),
            errors.currency && /* @__PURE__ */ jsx("p", { className: "text-red-500 dark:text-red-400 text-xs mt-1", children: errors.currency })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2", children: "Support Email *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: data.support_email,
                onChange: (e) => setData("support_email", e.target.value),
                className: "w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow",
                required: true
              }
            ),
            errors.support_email && /* @__PURE__ */ jsx("p", { className: "text-red-500 dark:text-red-400 text-xs mt-1", children: errors.support_email })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2", children: "Support Phone" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.support_phone,
                onChange: (e) => setData("support_phone", e.target.value),
                className: "w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
              }
            ),
            errors.support_phone && /* @__PURE__ */ jsx("p", { className: "text-red-500 dark:text-red-400 text-xs mt-1", children: errors.support_phone })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2", children: "Store Address" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: data.store_address,
              onChange: (e) => setData("store_address", e.target.value),
              rows: 3,
              className: "w-full py-3 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow resize-y min-h-[100px]"
            }
          ),
          errors.store_address && /* @__PURE__ */ jsx("p", { className: "text-red-500 dark:text-red-400 text-xs mt-1", children: errors.store_address })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-admin-border bg-admin-surface-muted/30 p-6 shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-black text-admin-text", children: "Contact Page About Text" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-admin-text-muted", children: "This appears on the Contact Us page under the contact cards." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-5", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2", children: "About title" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.about_title,
                  onChange: (e) => setData("about_title", e.target.value),
                  className: "w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2", children: "Short company description" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: data.about_text,
                  onChange: (e) => setData("about_text", e.target.value),
                  rows: 4,
                  className: "w-full py-3 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow resize-y min-h-[120px]"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-admin-border bg-admin-surface-muted/30 p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-black text-admin-text", children: "Social Links" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-admin-text-muted", children: "Set the name, link, and icon URL/label for each social channel." })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setData("social_links", [...data.social_links, { name: "", url: "", icon: "" }]),
                className: "px-4 py-2 bg-admin-primary text-white rounded-xl font-bold text-sm hover:bg-admin-primary-hover shadow-sm transition-all duration-200",
                children: "+ Add More"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: data.social_links.map((link, index) => /* @__PURE__ */ jsxs("div", { className: "relative rounded-xl border border-admin-border bg-admin-surface p-5 shadow-sm group", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  const newLinks = [...data.social_links];
                  newLinks.splice(index, 1);
                  setData("social_links", newLinks);
                },
                className: "absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded",
                children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "mb-4 text-sm font-black text-admin-text uppercase tracking-wider", children: [
              "Social Link ",
              index + 1
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Name (e.g. Telegram)",
                  value: link.name,
                  onChange: (e) => {
                    const newLinks = [...data.social_links];
                    newLinks[index].name = e.target.value;
                    setData("social_links", newLinks);
                  },
                  className: "rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "url",
                  placeholder: "Link URL (e.g. https://t.me/...)",
                  value: link.url,
                  onChange: (e) => {
                    const newLinks = [...data.social_links];
                    newLinks[index].url = e.target.value;
                    setData("social_links", newLinks);
                  },
                  className: "rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Subtitle (e.g. +855 12 345 678)",
                  value: link.subtitle || "",
                  onChange: (e) => {
                    const newLinks = [...data.social_links];
                    newLinks[index].subtitle = e.target.value;
                    setData("social_links", newLinks);
                  },
                  className: "rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Icon name or image URL",
                  value: link.icon,
                  onChange: (e) => {
                    const newLinks = [...data.social_links];
                    newLinks[index].icon = e.target.value;
                    setData("social_links", newLinks);
                  },
                  className: "rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                }
              )
            ] })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-admin-border bg-admin-surface-muted/30 p-6 shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-black text-admin-text", children: "Office Locations (Maps)" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-admin-text-muted", children: "Set the link to open Google Maps and the text address for your offices." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-admin-border bg-admin-surface p-5 shadow-sm", children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-4 text-sm font-black text-admin-text uppercase tracking-wider", children: "Cambodia Office" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1", children: "Link to open Google Maps" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "url",
                      placeholder: "https://maps.google.com/...",
                      value: data.cambodia_map_open_url,
                      onChange: (e) => setData("cambodia_map_open_url", e.target.value),
                      className: "w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1", children: "Address Text" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      rows: 3,
                      placeholder: "Phnom Penh, Cambodia...",
                      value: data.cambodia_map_address,
                      onChange: (e) => setData("cambodia_map_address", e.target.value),
                      className: "w-full py-3 rounded-xl border-admin-border bg-admin-surface text-admin-text shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm resize-none"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-admin-border bg-admin-surface p-5 shadow-sm", children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-4 text-sm font-black text-admin-text uppercase tracking-wider", children: "Vietnam Office" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1", children: "Link to open Google Maps" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "url",
                      placeholder: "https://maps.google.com/...",
                      value: data.vietnam_map_open_url,
                      onChange: (e) => setData("vietnam_map_open_url", e.target.value),
                      className: "w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-1", children: "Address Text" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      rows: 3,
                      placeholder: "Ho Chi Minh City, Vietnam...",
                      value: data.vietnam_map_address,
                      onChange: (e) => setData("vietnam_map_address", e.target.value),
                      className: "w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-y"
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2", children: "Store Logo (Header)" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Image URL (e.g., https://...)",
                  value: typeof data.store_logo === "string" ? data.store_logo : "",
                  onChange: (e) => {
                    setData("store_logo", e.target.value);
                    setLogoPreview(e.target.value);
                  },
                  className: "w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-admin-text-muted", children: "OR" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    onChange: (e) => {
                      if (e.target.files && e.target.files[0]) {
                        setData("store_logo", e.target.files[0]);
                        setLogoPreview(URL.createObjectURL(e.target.files[0]));
                      }
                    },
                    className: "w-full text-sm text-admin-text-muted file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-surface file:text-admin-text hover:file:bg-admin-border/50 file:cursor-pointer file:shadow-sm file:transition-all file:border file:border-admin-border cursor-pointer"
                  }
                )
              ] })
            ] }),
            logoPreview && /* @__PURE__ */ jsxs("div", { className: "mt-5 bg-white dark:bg-gray-800 rounded-xl p-5 inline-block shadow-md border border-gray-200 dark:border-gray-700 relative", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setData("store_logo", "");
                    setLogoPreview("");
                  },
                  className: "absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
                }
              ),
              /* @__PURE__ */ jsx("img", { src: logoPreview, alt: "Store Logo", className: "h-20 object-contain rounded-lg" })
            ] }),
            errors.store_logo && /* @__PURE__ */ jsx("p", { className: "text-red-500 dark:text-red-400 text-xs mt-1", children: errors.store_logo })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-admin-text-muted mb-2", children: "Store Favicon" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Image URL (e.g., https://...)",
                  value: typeof data.store_favicon === "string" ? data.store_favicon : "",
                  onChange: (e) => {
                    setData("store_favicon", e.target.value);
                    setFaviconPreview(e.target.value);
                  },
                  className: "w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-admin-text-muted", children: "OR" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/png, image/jpeg, image/x-icon",
                    onChange: (e) => {
                      if (e.target.files && e.target.files[0]) {
                        setData("store_favicon", e.target.files[0]);
                        setFaviconPreview(URL.createObjectURL(e.target.files[0]));
                      }
                    },
                    className: "w-full text-sm text-admin-text-muted file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-surface file:text-admin-text hover:file:bg-admin-border/50 file:cursor-pointer file:shadow-sm file:transition-all file:border file:border-admin-border cursor-pointer"
                  }
                )
              ] })
            ] }),
            faviconPreview && /* @__PURE__ */ jsxs("div", { className: "mt-5 bg-white dark:bg-gray-800 rounded-xl p-5 inline-block shadow-md border border-gray-200 dark:border-gray-700 relative", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setData("store_favicon", "");
                    setFaviconPreview("");
                  },
                  className: "absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
                }
              ),
              /* @__PURE__ */ jsx("img", { src: faviconPreview, alt: "Store Favicon", className: "h-14 object-contain rounded-lg" })
            ] }),
            errors.store_favicon && /* @__PURE__ */ jsx("p", { className: "text-red-500 dark:text-red-400 text-xs mt-1", children: errors.store_favicon })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-admin-border/50 flex items-center justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "px-8 py-3 bg-admin-primary text-white rounded-xl font-bold shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover transition-all disabled:opacity-50 hover:-translate-y-0.5",
            children: processing ? "Saving..." : "Save Settings"
          }
        ) })
      ] }) })
    ] })
  ] });
}
export {
  GeneralSettings as default
};
