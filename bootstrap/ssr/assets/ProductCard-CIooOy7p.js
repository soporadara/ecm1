import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useForm, Link } from "@inertiajs/react";
import { u as useCurrency } from "../ssr.js";
function ProductCard({ product }) {
  var _a, _b, _c, _d, _e, _f;
  const { formatPrice } = useCurrency();
  const { post, processing } = useForm({
    product_id: product.id,
    quantity: 1
  });
  const mainImage = ((_b = (_a = product.images) == null ? void 0 : _a.find((img) => !img.is_hover_image)) == null ? void 0 : _b.path) || ((_d = (_c = product.images) == null ? void 0 : _c[0]) == null ? void 0 : _d.path) || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
  const hoverImage = ((_f = (_e = product.images) == null ? void 0 : _e.find((img) => img.is_hover_image)) == null ? void 0 : _f.path) || mainImage;
  product.sale_price ? Math.round((parseFloat(product.price) - parseFloat(product.sale_price)) / parseFloat(product.price) * 100) : 0;
  return /* @__PURE__ */ jsxs("div", { className: "group flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative w-full overflow-hidden aspect-[4/5] mb-5", children: [
      /* @__PURE__ */ jsxs(Link, { href: `/shop/${product.slug}`, className: "block w-full h-full relative", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: mainImage,
            alt: product.name,
            className: "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          }
        ),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: hoverImage,
            alt: product.name + " Alternate",
            className: "absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-105"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("button", { className: "absolute top-4 right-4 p-2 text-gray-400 hover:text-brand-primary transition-colors focus:outline-none", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center w-full px-2", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-[20px] font-bold text-[#0a1b2a] dark:text-white mb-2 font-serif tracking-tight truncate", children: /* @__PURE__ */ jsx(Link, { href: `/shop/${product.slug}`, className: "hover:text-brand-primary transition-colors", children: product.name }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center gap-3", children: product.sale_price ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("del", { className: "text-gray-500 dark:text-gray-400 text-[16px]", children: formatPrice(product.price) }),
        /* @__PURE__ */ jsx("span", { className: "text-[#f75b5b] font-medium text-[16px]", children: formatPrice(product.sale_price) })
      ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-600 dark:text-gray-300 font-medium text-[16px]", children: formatPrice(product.price) }) })
    ] })
  ] });
}
export {
  ProductCard as P
};
