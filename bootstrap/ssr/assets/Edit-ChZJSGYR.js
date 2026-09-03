import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-ByoJzJm8.js";
import toast from "react-hot-toast";
import "react";
import "react-dom";
import "lucide-react";
function Edit({ product, categories, brands, collections }) {
  const { data, setData, put, processing, errors } = useForm({
    name: product.name || "",
    slug: product.slug || "",
    short_description: product.short_description || "",
    description: product.description || "",
    price: product.price || "",
    sale_price: product.sale_price || "",
    stock: product.stock || "",
    sku: product.sku || "",
    barcode: product.barcode || "",
    material: product.material || "",
    care_instructions: product.care_instructions || "",
    weight: product.weight || "",
    dimensions: product.dimensions || "",
    shipping_info: product.shipping_info || "",
    return_info: product.return_info || "",
    seo_title: product.seo_title || "",
    seo_description: product.seo_description || "",
    category_id: product.category_id || "",
    brand_id: product.brand_id || "",
    collection_id: product.collection_id || "",
    is_active: product.is_active ?? true,
    gallery: (product.images || []).map((img) => ({ url: img.path, is_hover: img.is_hover_image })),
    variants: product.variants || []
  });
  const addVariant = () => setData("variants", [...data.variants, { size: "", color: "", price: "", stock: "0", sku: "" }]);
  const updateVariant = (index, field, value) => {
    const newVariants = [...data.variants];
    newVariants[index][field] = value;
    setData("variants", newVariants);
  };
  const removeVariant = (index) => setData("variants", data.variants.filter((_, i) => i !== index));
  const addGalleryImage = () => setData("gallery", [...data.gallery, { url: "", is_hover: false }]);
  const updateGalleryImage = (index, field, value) => {
    const newGallery = [...data.gallery];
    newGallery[index][field] = value;
    setData("gallery", newGallery);
  };
  const removeGalleryImage = (index) => setData("gallery", data.gallery.filter((_, i) => i !== index));
  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/admin/products/${product.id}`, {
      onSuccess: () => toast.success("Product updated successfully!")
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Edit Product", children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit ${product.name} - Admin` }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Link, { href: "/admin/products", className: "text-gray-500 hover:text-brand-primary transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Edit Product" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: product.name })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50", children: /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white", children: "Basic Info" }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Name" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: data.name, onChange: (e) => {
              setData("name", e.target.value);
              setData("slug", e.target.value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
            }, className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary", required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Slug" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: data.slug, onChange: (e) => setData("slug", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-400", required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Category" }),
            /* @__PURE__ */ jsxs("select", { value: data.category_id, onChange: (e) => setData("category_id", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary", required: true, children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Category" }),
              categories.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Brand" }),
            /* @__PURE__ */ jsxs("select", { value: data.brand_id, onChange: (e) => setData("brand_id", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary", children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Brand" }),
              brands.map((b) => /* @__PURE__ */ jsx("option", { value: b.id, children: b.name }, b.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Collection" }),
            /* @__PURE__ */ jsxs("select", { value: data.collection_id, onChange: (e) => setData("collection_id", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary", children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Collection" }),
              collections.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "SKU" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: data.sku, onChange: (e) => setData("sku", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50", children: /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white", children: "Pricing & Inventory" }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Price" }),
            /* @__PURE__ */ jsx("input", { type: "number", step: "0.01", value: data.price, onChange: (e) => setData("price", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary", required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Compare-at (Sale) Price" }),
            /* @__PURE__ */ jsx("input", { type: "number", step: "0.01", value: data.sale_price, onChange: (e) => setData("sale_price", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Base Stock" }),
            /* @__PURE__ */ jsx("input", { type: "number", value: data.stock, onChange: (e) => setData("stock", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary", required: true })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50", children: /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white", children: "Product Content" }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Short Description" }),
            /* @__PURE__ */ jsx("textarea", { rows: 2, value: data.short_description, onChange: (e) => setData("short_description", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Full Description" }),
            /* @__PURE__ */ jsx("textarea", { rows: 6, value: data.description, onChange: (e) => setData("description", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100 dark:border-gray-700", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Material" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: data.material, onChange: (e) => setData("material", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Care Instructions" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: data.care_instructions, onChange: (e) => setData("care_instructions", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Shipping Info" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: data.shipping_info, onChange: (e) => setData("shipping_info", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Return Info" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: data.return_info, onChange: (e) => setData("return_info", e.target.value), className: "w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white", children: "Image Gallery" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: addGalleryImage, className: "bg-gray-800 dark:bg-gray-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors", children: "+ Add Image" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          data.gallery.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm italic", children: "No images added yet." }),
          data.gallery.map((img, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-4 items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-lg flex-shrink-0 border border-gray-300 dark:border-gray-600", children: img.url ? /* @__PURE__ */ jsx("img", { src: img.url, className: "w-full h-full object-cover" }) : null }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs text-gray-500 dark:text-gray-400 mb-1", children: "Image URL" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: img.url, onChange: (e) => updateGalleryImage(idx, "url", e.target.value), className: "w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white", required: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:mt-5", children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", checked: img.is_hover, onChange: (e) => updateGalleryImage(idx, "is_hover", e.target.checked), className: "rounded border-gray-300 dark:border-gray-600 text-brand-primary focus:ring-brand-primary dark:bg-gray-800" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: "Hover Image" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeGalleryImage(idx), className: "text-red-500 hover:text-red-700 dark:hover:text-red-400 sm:mt-5 px-2 font-medium text-sm transition-colors", children: "Remove" })
          ] }, idx))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white", children: "Variants" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: addVariant, className: "bg-gray-800 dark:bg-gray-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors", children: "+ Add Variant" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          data.variants.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm italic", children: "No variants added yet." }),
          data.variants.map((variant, idx) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4 items-end p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-1", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs text-gray-500 dark:text-gray-400 mb-1", children: "Size" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: variant.size, onChange: (e) => updateVariant(idx, "size", e.target.value), className: "w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-1", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs text-gray-500 dark:text-gray-400 mb-1", children: "Color" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: variant.color, onChange: (e) => updateVariant(idx, "color", e.target.value), className: "w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-1", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs text-gray-500 dark:text-gray-400 mb-1", children: "Price (+/-)" }),
              /* @__PURE__ */ jsx("input", { type: "number", step: "0.01", value: variant.price, onChange: (e) => updateVariant(idx, "price", e.target.value), className: "w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-1", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs text-gray-500 dark:text-gray-400 mb-1", children: "Stock" }),
              /* @__PURE__ */ jsx("input", { type: "number", value: variant.stock, onChange: (e) => updateVariant(idx, "stock", e.target.value), className: "w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white", required: true })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "sm:col-span-1 flex justify-end", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeVariant(idx), className: "text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 font-medium text-sm transition-colors mb-1", children: "Remove" }) })
          ] }, idx))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pb-8", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/products", className: "px-6 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "px-6 py-2.5 rounded-lg font-medium bg-brand-primary text-white hover:bg-brand-secondary transition-colors shadow-sm disabled:opacity-50", children: processing ? "Saving..." : "Save Product" })
      ] })
    ] })
  ] });
}
export {
  Edit as default
};
