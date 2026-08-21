import { jsxs, jsx } from "react/jsx-runtime";
import { usePage, Link, router } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-BSaLUdaW.js";
import { P as ProductCard } from "./ProductCard-CIooOy7p.js";
import { useState } from "react";
import { u as useCurrency } from "../ssr.js";
import "framer-motion";
import "axios";
import "lucide-react";
import "./useTranslation-_E1z7JpE.js";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
import "@inertiajs/react/server";
import "react-dom/server";
function Index({ products, filters }) {
  filters = filters || {};
  if (Array.isArray(filters)) {
    filters = {};
  }
  products = products || { data: [], total: 0, from: 0, to: 0, per_page: 12, links: [] };
  const { global_nav } = usePage().props;
  const { categories, brands, collections } = global_nav || { categories: [], brands: [], collections: [] };
  const { formatPrice } = useCurrency();
  const [search, setSearch] = useState(filters.search || "");
  const [sort, setSort] = useState(filters.sort || "recommended");
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState({
    category: true,
    brand: true,
    price: true,
    color: true
  });
  const updateFilters = (key, value) => {
    const newFilters = { ...filters };
    if (value === null || value === "") {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    delete newFilters.page;
    router.get("/shop", newFilters, { preserveState: true, preserveScroll: true });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters("search", search || null);
  };
  const clearAllFilters = () => {
    setSearch("");
    setSort("recommended");
    router.get("/shop", {}, { preserveState: true, preserveScroll: true });
  };
  const activeFilterCount = Object.keys(filters).filter((k) => k !== "page" && k !== "sort").length;
  return /* @__PURE__ */ jsxs(MainLayout, { title: "Shop", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-brand-secondary py-16 text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx("svg", { className: "w-full h-full", viewBox: "0 0 100 100", preserveAspectRatio: "none", children: /* @__PURE__ */ jsx("polygon", { points: "0,100 100,0 100,100", fill: "currentColor" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 text-center relative z-10", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl font-bold font-serif mb-4", children: "The Collection" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center space-x-2 text-sm text-gray-300", children: [
          /* @__PURE__ */ jsx(Link, { href: "/", className: "hover:text-white transition-colors", children: "Home" }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "Shop" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 py-12", children: [
      activeFilterCount > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-gray-100", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 mr-2", children: "Active Filters:" }),
        Object.entries(filters).map(([key, value]) => {
          if (key === "page" || key === "sort") return null;
          return /* @__PURE__ */ jsxs("span", { className: "bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 capitalize", children: [
            key,
            ": ",
            String(value),
            /* @__PURE__ */ jsx("button", { onClick: () => updateFilters(key, null), className: "hover:text-red-600 focus:outline-none", children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M6 18L18 6M6 6l12 12" }) }) })
          ] }, key);
        }),
        /* @__PURE__ */ jsx("button", { onClick: clearAllFilters, className: "text-sm text-gray-500 hover:text-brand-primary underline ml-2", children: "Clear All" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:hidden flex justify-between items-center mb-6", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsMobileFilterOpen(true),
            className: "flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded font-medium text-brand-dark",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" }) }),
              "Filters ",
              activeFilterCount > 0 && `(${activeFilterCount})`
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("aside", { className: `fixed inset-0 z-[120] lg:static lg:z-0 lg:block lg:w-1/4 transform ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out`, children: /* @__PURE__ */ jsxs("div", { className: "h-full bg-white lg:bg-transparent flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex items-center justify-between p-6 border-b border-gray-100", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold font-serif text-brand-secondary", children: "Filters" }),
            /* @__PURE__ */ jsx("button", { onClick: () => setIsMobileFilterOpen(false), className: "p-2 text-gray-400 hover:text-brand-primary rounded-full bg-gray-50", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-6 lg:p-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0a1b2a] font-serif mb-2", children: "Search" }),
              /* @__PURE__ */ jsx("div", { className: "w-8 h-0.5 bg-[#f75b5b] mb-6" }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "relative flex", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Search",
                    className: "w-full px-4 py-3 bg-[#fdf2f2] border-none focus:ring-0 text-sm outline-none text-gray-700",
                    value: search,
                    onChange: (e) => setSearch(e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx("button", { type: "submit", className: "px-5 bg-[#f75b5b] text-white hover:bg-red-600 transition-colors flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0a1b2a] font-serif mb-2", children: "Price" }),
              /* @__PURE__ */ jsx("div", { className: "w-8 h-0.5 bg-[#f75b5b] mb-6" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { className: "flex justify-between items-center cursor-pointer group", children: [
                  /* @__PURE__ */ jsx("span", { className: `text-[15px] ${!filters.min_price && !filters.max_price ? "text-[#0a1b2a] font-medium" : "text-gray-500 hover:text-[#0a1b2a]"}`, children: "All prices" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "price_range",
                      checked: !filters.min_price && !filters.max_price,
                      onChange: () => {
                        updateFilters("min_price", null);
                        updateFilters("max_price", null);
                      },
                      className: "w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { className: "flex justify-between items-center cursor-pointer group", children: [
                  /* @__PURE__ */ jsxs("span", { className: `text-[15px] ${filters.min_price === "50" && filters.max_price === "100" ? "text-[#0a1b2a] font-medium" : "text-gray-500 hover:text-[#0a1b2a]"}`, children: [
                    formatPrice(50),
                    " - ",
                    formatPrice(100)
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "price_range",
                      checked: filters.min_price === "50" && filters.max_price === "100",
                      onChange: () => {
                        updateFilters("min_price", "50");
                        updateFilters("max_price", "100");
                      },
                      className: "w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { className: "flex justify-between items-center cursor-pointer group", children: [
                  /* @__PURE__ */ jsxs("span", { className: `text-[15px] ${filters.min_price === "100" && filters.max_price === "200" ? "text-[#0a1b2a] font-medium" : "text-gray-500 hover:text-[#0a1b2a]"}`, children: [
                    formatPrice(100),
                    " - ",
                    formatPrice(200)
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "price_range",
                      checked: filters.min_price === "100" && filters.max_price === "200",
                      onChange: () => {
                        updateFilters("min_price", "100");
                        updateFilters("max_price", "200");
                      },
                      className: "w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { className: "flex justify-between items-center cursor-pointer group", children: [
                  /* @__PURE__ */ jsxs("span", { className: `text-[15px] ${filters.min_price === "200" && filters.max_price === "300" ? "text-[#0a1b2a] font-medium" : "text-gray-500 hover:text-[#0a1b2a]"}`, children: [
                    formatPrice(200),
                    " - ",
                    formatPrice(300)
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "price_range",
                      checked: filters.min_price === "200" && filters.max_price === "300",
                      onChange: () => {
                        updateFilters("min_price", "200");
                        updateFilters("max_price", "300");
                      },
                      className: "w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { className: "flex justify-between items-center cursor-pointer group", children: [
                  /* @__PURE__ */ jsxs("span", { className: `text-[15px] ${filters.min_price === "300" && filters.max_price === "400" ? "text-[#0a1b2a] font-medium" : "text-gray-500 hover:text-[#0a1b2a]"}`, children: [
                    formatPrice(300),
                    " - ",
                    formatPrice(400)
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "price_range",
                      checked: filters.min_price === "300" && filters.max_price === "400",
                      onChange: () => {
                        updateFilters("min_price", "300");
                        updateFilters("max_price", "400");
                      },
                      className: "w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { className: "flex justify-between items-center cursor-pointer group", children: [
                  /* @__PURE__ */ jsxs("span", { className: `text-[15px] ${filters.min_price === "400" && !filters.max_price ? "text-[#0a1b2a] font-medium" : "text-gray-500 hover:text-[#0a1b2a]"}`, children: [
                    formatPrice(400),
                    " and more"
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "price_range",
                      checked: filters.min_price === "400" && !filters.max_price,
                      onChange: () => {
                        updateFilters("min_price", "400");
                        updateFilters("max_price", null);
                      },
                      className: "w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                    }
                  )
                ] }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0a1b2a] font-serif mb-2", children: "Size" }),
              /* @__PURE__ */ jsx("div", { className: "w-8 h-0.5 bg-[#f75b5b] mb-6" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { className: "flex justify-between items-center cursor-pointer group", children: [
                  /* @__PURE__ */ jsx("span", { className: `text-[15px] ${filters.size === "small" ? "text-[#0a1b2a] font-medium" : "text-gray-500 hover:text-[#0a1b2a]"}`, children: "Small Size" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "size_filter",
                      checked: filters.size === "small",
                      onChange: () => updateFilters("size", filters.size === "small" ? null : "small"),
                      className: "w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { className: "flex justify-between items-center cursor-pointer group", children: [
                  /* @__PURE__ */ jsx("span", { className: `text-[15px] ${filters.size === "medium" ? "text-[#0a1b2a] font-medium" : "text-gray-500 hover:text-[#0a1b2a]"}`, children: "Medium Size" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "size_filter",
                      checked: filters.size === "medium",
                      onChange: () => updateFilters("size", filters.size === "medium" ? null : "medium"),
                      className: "w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { className: "flex justify-between items-center cursor-pointer group", children: [
                  /* @__PURE__ */ jsx("span", { className: `text-[15px] ${filters.size === "large" ? "text-[#0a1b2a] font-medium" : "text-gray-500 hover:text-[#0a1b2a]"}`, children: "Large Size" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "size_filter",
                      checked: filters.size === "large",
                      onChange: () => updateFilters("size", filters.size === "large" ? null : "large"),
                      className: "w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                    }
                  )
                ] }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "lg:hidden p-6 border-t border-gray-100 bg-gray-50", children: /* @__PURE__ */ jsxs("button", { onClick: () => setIsMobileFilterOpen(false), className: "w-full py-3 bg-brand-primary text-white font-bold rounded", children: [
            "Show ",
            products.total,
            " Results"
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-3/4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-100 gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setViewMode("grid"),
                  className: `p-2 transition-colors ${viewMode === "grid" ? "bg-[#f75b5b] text-white" : "bg-[#fdf2f2] text-gray-500 hover:bg-[#f75b5b] hover:text-white"}`,
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setViewMode("list"),
                  className: `p-2 transition-colors ${viewMode === "list" ? "bg-[#f75b5b] text-white" : "bg-[#fdf2f2] text-gray-500 hover:bg-[#f75b5b] hover:text-white"}`,
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-[#596672] text-[15px] font-medium text-center flex-1", children: [
              "Showing Products ",
              products.from || 0,
              " - ",
              products.to || 0,
              " Of ",
              products.total,
              " Result"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#596672] text-[15px] hidden sm:inline", children: "Short By :" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "border-none bg-[#fdf2f2] text-[#596672] rounded-none px-4 py-2 text-[14px] focus:outline-none focus:ring-0 cursor-pointer",
                  value: sort,
                  onChange: (e) => {
                    setSort(e.target.value);
                    updateFilters("sort", e.target.value);
                  },
                  children: [
                    /* @__PURE__ */ jsxs("option", { value: "recommended", children: [
                      "Show ",
                      products.per_page,
                      " Items"
                    ] }),
                    /* @__PURE__ */ jsx("option", { value: "newest", children: "Newest" }),
                    /* @__PURE__ */ jsx("option", { value: "price_low", children: "Price Low" }),
                    /* @__PURE__ */ jsx("option", { value: "price_high", children: "Price High" })
                  ]
                }
              )
            ] })
          ] }) }),
          products.data.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-24 text-gray-500 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 text-gray-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1, d: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-serif font-bold text-brand-secondary mb-2", children: "No products found" }),
            /* @__PURE__ */ jsx("p", { className: "mb-6 max-w-md mx-auto", children: "We couldn't find any products matching your current filters. Try adjusting your search criteria." }),
            /* @__PURE__ */ jsx("button", { onClick: clearAllFilters, className: "px-6 py-2 bg-brand-secondary text-white font-bold rounded hover:bg-brand-primary transition-colors", children: "Clear All Filters" })
          ] }) : /* @__PURE__ */ jsx("div", { className: viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12" : "flex flex-col gap-8", children: products.data.map((product) => {
            var _a;
            return /* @__PURE__ */ jsxs("div", { className: viewMode === "list" ? "flex flex-col sm:flex-row gap-6 items-start bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow" : "", children: [
              /* @__PURE__ */ jsx("div", { className: viewMode === "list" ? "w-full sm:w-1/3 flex-shrink-0" : "w-full", children: /* @__PURE__ */ jsx(ProductCard, { product }) }),
              viewMode === "list" && /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col pt-4 sm:pt-0", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold font-serif text-brand-secondary mb-2 hover:text-brand-primary transition-colors", children: /* @__PURE__ */ jsx(Link, { href: `/shop/${product.slug}`, children: product.name }) }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6 text-sm leading-relaxed", children: product.short_description || ((_a = product.description) == null ? void 0 : _a.substring(0, 150)) + "..." }),
                /* @__PURE__ */ jsx("div", { className: "mt-auto flex items-center gap-4", children: /* @__PURE__ */ jsx(Link, { href: `/shop/${product.slug}`, className: "px-6 py-2.5 bg-brand-secondary text-white text-sm font-bold rounded hover:bg-brand-primary transition-colors", children: "View Details" }) })
              ] })
            ] }, product.id);
          }) }),
          products.links && products.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center mt-16 gap-2", children: products.links.map((link, index) => {
            if (!link.url) return /* @__PURE__ */ jsx("span", { className: "px-4 py-2 text-gray-300", dangerouslySetInnerHTML: { __html: link.label } }, index);
            return /* @__PURE__ */ jsx(
              Link,
              {
                href: link.url,
                preserveScroll: true,
                preserveState: true,
                className: `w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${link.active ? "bg-brand-secondary text-white" : "bg-gray-50 text-gray-600 hover:bg-brand-primary hover:text-white"}`,
                dangerouslySetInnerHTML: { __html: link.label }
              },
              index
            );
          }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Index as default
};
