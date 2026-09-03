import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link, useForm, Head } from "@inertiajs/react";
import { u as useTranslation } from "./useTranslation-CqoVm-kK.js";
import { M as MainLayout, S as SupportFAB } from "./MainLayout-C3efSGPT.js";
import { useState, useEffect, useRef } from "react";
import { g as getPopupCreativeSize } from "./popupCreativeSizes-rWMv4qZD.js";
import { Globe2, Truck, PackageCheck, CheckCircle2, ClipboardList, ShoppingCart, ShoppingBag, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import "framer-motion";
import "axios";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function PromoPopup({ popup }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => {
    if (!popup) return;
    setImageFailed(false);
    const hasSeenPopup = sessionStorage.getItem(`has_seen_popup_${popup.id}`);
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [popup]);
  const handleClose = () => {
    setIsOpen(false);
    if (popup) {
      sessionStorage.setItem(`has_seen_popup_${popup.id}`, "true");
    }
  };
  if (!isOpen || !popup) return null;
  const creativeSize = getPopupCreativeSize(popup.creative_size);
  const modalMaxWidth = creativeSize.value === "portrait_1080x1920" ? "max-w-md" : creativeSize.value === "square_1280x1280" ? "max-w-2xl" : "max-w-5xl";
  const creativeStyle = { aspectRatio: `${creativeSize.width} / ${creativeSize.height}` };
  const hasImage = Boolean(popup.image_path && !imageFailed);
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/40 transition-opacity duration-300",
        onClick: handleClose
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: `relative z-[101] w-full ${modalMaxWidth} transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 opacity-100 dark:bg-gray-900`, children: [
      /* @__PURE__ */ jsxs("div", { className: "relative max-h-[88vh] w-full overflow-hidden bg-transparent", style: creativeStyle, children: [
        hasImage ? /* @__PURE__ */ jsx("img", { src: popup.image_path || "", alt: popup.title, className: "absolute inset-0 h-full w-full object-cover", onError: () => setImageFailed(true) }) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: `linear-gradient(135deg, ${popup.accent_color || "#ff4c3b"}, #021d35)` } }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 p-3 sm:p-10 text-center text-white drop-shadow-md pointer-events-none", children: [
          popup.badge_text && /* @__PURE__ */ jsx("span", { className: "mx-auto mb-2 sm:mb-5 inline-flex w-fit rounded-full px-3 py-1 sm:px-4 sm:py-2 text-[0.6rem] sm:text-xs font-black uppercase tracking-[0.22em] text-white", style: { backgroundColor: popup.accent_color || "#ff4c3b" }, children: popup.badge_text }),
          popup.heading && /* @__PURE__ */ jsx("h2", { className: "text-lg sm:text-4xl font-black leading-tight text-white font-serif drop-shadow-lg", children: popup.heading }),
          popup.description && /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 sm:mt-5 max-w-md text-xs sm:text-base font-semibold leading-snug sm:leading-7 text-white/90 drop-shadow-lg", children: popup.description }),
          popup.link_url && /* @__PURE__ */ jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: popup.link_url,
              onClick: handleClose,
              className: "mt-3 sm:mt-8 inline-flex min-h-[2.25rem] sm:min-h-12 w-full items-center justify-center rounded-xl px-4 sm:px-8 text-[0.65rem] sm:text-sm font-black uppercase tracking-widest text-white shadow-lg transition hover:brightness-95 sm:mx-auto sm:w-auto",
              style: { backgroundColor: popup.accent_color || "#ff4c3b" },
              children: popup.button_label || "Shop Now"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
          },
          className: "absolute right-3 top-3 sm:right-4 sm:top-4 z-[999] flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 active:scale-95 dark:bg-black/50 dark:text-white dark:hover:bg-black/70 cursor-pointer pointer-events-auto",
          "aria-label": "Close promotion",
          children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
        }
      )
    ] })
  ] });
}
function Home({ banners, bannerMode = "slideshow", page, marketplaces = [], popup = null, testimonials = [], recentBlogs = [], telegramFaqs = [] }) {
  const { t, i18n } = useTranslation();
  const manualOrderHref = "/manual-order";
  const sitesScrollerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const faqCategoriesOrder = ["Ordering", "Shipping", "Warehouse", "Tracking", "Payment", "Problems", "General"];
  const groupedFaqs = (telegramFaqs == null ? void 0 : telegramFaqs.reduce((acc, faq) => {
    const category = faq.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(faq);
    return acc;
  }, {})) || {};
  const availableCategories = Object.keys(groupedFaqs).sort((a, b) => {
    const indexA = faqCategoriesOrder.indexOf(a);
    const indexB = faqCategoriesOrder.indexOf(b);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });
  const [lightboxImage, setLightboxImage] = useState(null);
  const hasBanners = banners && banners.length > 0;
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    phone: "",
    email: "",
    description: ""
  });
  useEffect(() => {
    if (bannerMode !== "slideshow" || !hasBanners || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5e3);
    return () => clearInterval(interval);
  }, [bannerMode, banners, hasBanners]);
  const changeSlide = (direction) => {
    if (!hasBanners || banners.length <= 1) return;
    setCurrentSlide((prev) => {
      if (direction === "previous") return (prev - 1 + banners.length) % banners.length;
      return (prev + 1) % banners.length;
    });
  };
  const detailedServices = [
    { title: t("services.china_cam"), desc: t("services.china_cam_desc"), icon: Globe2 },
    { title: t("services.vn_cam"), desc: t("services.vn_cam_desc"), icon: Truck },
    { title: t("services.cam_vn"), desc: t("services.cam_vn_desc"), icon: PackageCheck },
    { title: t("services.warehouse"), desc: t("services.warehouse_desc"), icon: PackageCheck },
    { title: t("services.transportation"), desc: t("services.transportation_desc"), icon: Truck },
    { title: t("services.tracking"), desc: t("services.tracking_desc"), icon: CheckCircle2 },
    { title: t("services.payment"), desc: t("services.payment_desc"), icon: ClipboardList },
    { title: t("services.order_help"), desc: t("services.order_help_desc"), icon: ShoppingCart }
  ];
  const whyChooseCards = [
    { title: t("why.expertise"), desc: t("why.expertise_desc"), icon: Globe2 },
    { title: t("why.cost"), desc: t("why.cost_desc"), icon: ShoppingBag },
    { title: t("why.tracking"), desc: t("why.tracking_desc"), icon: Truck },
    { title: t("why.payment"), desc: t("why.payment_desc"), icon: ClipboardList },
    { title: t("why.warehouse"), desc: t("why.warehouse_desc"), icon: PackageCheck },
    { title: t("why.network"), desc: t("why.network_desc"), icon: CheckCircle2 }
  ];
  const workflowSteps = [
    {
      title: t("how_it_works.step1_title", "Submit Your Order"),
      description: t("how_it_works.step1_desc", "Send us the product/order information. (Status: Pending Review, Quote Provided)"),
      icon: ClipboardList
    },
    {
      title: t("how_it_works.step2_title", "We Purchase / Collect"),
      description: t("how_it_works.step2_desc", "MVM coordinates purchasing and warehouse handling. (Status: Approved, Purchased)"),
      icon: ShoppingBag
    },
    {
      title: t("how_it_works.step3_title", "Cross-Border Shipping"),
      description: t("how_it_works.step3_desc", "Your goods are transported from China/Vietnam to Cambodia, or Cambodia to Vietnam. (Status: Warehouse Received, Shipped)"),
      icon: Globe2
    },
    {
      title: t("how_it_works.step4_title", "Track Your Shipment"),
      description: t("how_it_works.step4_desc", "Monitor warehouse arrival, shipping status, and destination delivery. (Status: Arrived)"),
      icon: PackageCheck
    }
  ];
  const siteName = (site) => {
    const key = `name_${i18n.language}`;
    return (site == null ? void 0 : site[key]) || (site == null ? void 0 : site.name_km) || (site == null ? void 0 : site.name_en) || (site == null ? void 0 : site.name) || "Shopping site";
  };
  const scrollSites = (direction) => {
    var _a;
    (_a = sitesScrollerRef.current) == null ? void 0 : _a.scrollBy({
      left: direction === "next" ? 360 : -360,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  };
  return /* @__PURE__ */ jsxs(MainLayout, { title: "Home", description: "Logistics and Manual-Order Platform", children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "MVM Logistic — Cross-Border Logistics" }) }),
    /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800", children: hasBanners ? /* @__PURE__ */ jsxs("div", { className: "relative aspect-video md:aspect-auto md:h-[100svh] md:min-h-[620px]", children: [
      banners.map((banner, index) => {
        const fallbackImg = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80";
        const dImg = banner.desktop_image_url || fallbackImg;
        const mImg = banner.mobile_image_url || dImg;
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: `absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`,
            style: { backgroundColor: banner.fallback_color },
            children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
              banner.video_file_path || banner.video_url ? /* @__PURE__ */ jsx(
                "video",
                {
                  src: banner.video_file_path ? `/storage/${banner.video_file_path}` : banner.video_url,
                  autoPlay: true,
                  muted: true,
                  loop: true,
                  playsInline: true,
                  className: "h-full w-full object-cover object-center"
                }
              ) : /* @__PURE__ */ jsxs("picture", { children: [
                /* @__PURE__ */ jsx("source", { media: "(max-width: 767px)", srcSet: mImg }),
                /* @__PURE__ */ jsx("source", { media: "(min-width: 768px)", srcSet: dImg }),
                /* @__PURE__ */ jsx("img", { src: dImg, className: "h-full w-full object-cover object-center", alt: banner.title_en || "Hero Banner" })
              ] }),
              banner.theme_variant === "light" && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/10" })
            ] })
          },
          banner.id
        );
      }),
      banners.length > 1 && /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20", children: banners.map((_, index) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentSlide(index),
          className: `w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-brand-primary w-8" : "bg-white/50 hover:bg-white"}`,
          "aria-label": `Go to slide ${index + 1}`
        },
        index
      )) }),
      bannerMode === "normal" && banners.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => changeSlide("previous"),
            className: "absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-950 shadow-xl transition hover:-translate-y-[calc(50%+2px)] hover:bg-brand-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 dark:bg-gray-950/90 dark:text-white",
            "aria-label": "Previous banner",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-7 w-7", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => changeSlide("next"),
            className: "absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-950 shadow-xl transition hover:-translate-y-[calc(50%+2px)] hover:bg-brand-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 dark:bg-gray-950/90 dark:text-white",
            "aria-label": "Next banner",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-7 w-7", "aria-hidden": "true" })
          }
        )
      ] })
    ] }) : (
      // Default Fallback Banner
      /* @__PURE__ */ jsx("div", { className: "relative aspect-video md:aspect-auto md:h-[100svh] md:min-h-[620px]", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx("img", { src: (page == null ? void 0 : page.banner_image) || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80", className: "w-full h-full object-cover object-center", alt: "Logistics warehouse and shipping boxes" }) }) })
    ) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-30 border-y border-gray-100 bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-950", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-[0.28em] text-brand-primary dark:text-white", children: t("services.title") }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-black text-gray-950 dark:text-white lg:text-5xl font-serif", children: t("services.subtitle") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: detailedServices.map((service) => /* @__PURE__ */ jsxs(
        "div",
        {
          "data-service-card": "true",
          className: "ui-card group flex flex-col p-6",
          children: [
            /* @__PURE__ */ jsx("span", { className: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition group-hover:scale-105 dark:bg-white/10 dark:text-white", children: /* @__PURE__ */ jsx(service.icon, { className: "h-6 w-6", "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mt-6 text-xl font-black leading-tight text-gray-950 dark:text-white", children: service.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300", children: service.desc })
          ]
        },
        service.title
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 text-center flex flex-col items-center justify-center gap-6", children: [
        /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-base font-semibold leading-7 text-gray-600 dark:text-gray-300", children: t("services.manual_order_support") }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-6", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: manualOrderHref,
              className: "inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-primary px-10 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-red-500/20 transition hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 w-full sm:w-auto",
              children: t("services.create_manual_order")
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center w-full sm:w-auto", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5", children: "Telegram Bot" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://t.me/mvmlogisticskhbot",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#24A1DE] px-10 text-sm font-black tracking-wider text-white shadow-lg shadow-[#24A1DE]/20 transition hover:bg-[#1d82b3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A1DE]/60 w-full sm:w-auto",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" }) }),
                  "mvmlogisticskhbot"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-16 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-gray-900 dark:text-white sm:text-4xl", children: t("why.title", "Why Choose MVM?") }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: whyChooseCards.map((card) => /* @__PURE__ */ jsxs("div", { className: "ui-card p-6 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1c55c0]/10 text-[#1c55c0] dark:bg-blue-900/30 dark:text-blue-400 mb-4", children: /* @__PURE__ */ jsx(card.icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 dark:text-white mb-2", children: card.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: card.desc })
      ] }, card.title)) })
    ] }) }),
    marketplaces.length > 0 && /* @__PURE__ */ jsx("section", { className: "relative z-30 border-b border-gray-100 bg-gray-100 py-14 dark:border-gray-800 dark:bg-gray-900", "aria-labelledby": "available-sites-title", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { id: "available-sites-title", className: "text-3xl font-black text-gray-700 dark:text-white", children: t("available_sites.title") }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto mt-3 h-1 w-20 rounded-full bg-brand-primary" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => scrollSites("previous"),
            className: "absolute left-0 top-[48px] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-1 ring-gray-200 transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 md:flex dark:bg-gray-950 dark:text-gray-100 dark:ring-gray-800",
            "aria-label": t("available_sites.previous"),
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-6 w-6", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: sitesScrollerRef,
            className: "flex mx-auto w-fit max-w-full gap-7 overflow-x-auto scroll-smooth px-1 pb-4 md:px-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            children: marketplaces.map((site) => /* @__PURE__ */ jsxs(
              "a",
              {
                href: site.website_url || "#",
                target: site.open_in_new_tab === false ? void 0 : "_blank",
                rel: site.open_in_new_tab === false ? void 0 : "noopener noreferrer",
                className: "group flex w-28 shrink-0 flex-col items-center gap-3 rounded-2xl p-2 text-center transition hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100 transition group-hover:shadow-xl dark:bg-gray-950 dark:ring-gray-800", children: site.logo ? /* @__PURE__ */ jsx("img", { src: site.logo, alt: site.alt_text || siteName(site), loading: "lazy", className: "h-12 w-12 rounded-xl object-contain" }) : /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-xl text-white", style: { backgroundColor: site.brand_color || "#ff4c3b" }, children: /* @__PURE__ */ jsx(Globe2, { className: "h-6 w-6", "aria-hidden": "true" }) }) }),
                  /* @__PURE__ */ jsx("span", { className: "line-clamp-2 text-sm font-bold text-gray-600 dark:text-gray-300", children: siteName(site) })
                ]
              },
              site.id
            ))
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => scrollSites("next"),
            className: "absolute right-0 top-[48px] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-1 ring-gray-200 transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 md:flex dark:bg-gray-950 dark:text-gray-100 dark:ring-gray-800",
            "aria-label": t("available_sites.next"),
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-6 w-6", "aria-hidden": "true" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-brand-secondary dark:text-white mb-12 font-serif", children: t("how_it_works.title") }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4", children: workflowSteps.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-gray-100 bg-white p-7 text-left shadow-sm transition hover:-translate-y-px hover:shadow-xl dark:border-gray-800 dark:bg-gray-950", children: [
        /* @__PURE__ */ jsx("span", { className: "mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary dark:bg-white/10 dark:text-white", children: /* @__PURE__ */ jsx(step.icon, { className: "h-7 w-7", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxs("p", { className: "mb-2 text-xs font-black uppercase tracking-[0.22em] text-brand-primary dark:text-white", children: [
          "0",
          index + 1
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-brand-secondary dark:text-white", children: step.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm font-semibold leading-6 text-gray-500 dark:text-gray-400", children: step.description })
      ] }, step.title)) })
    ] }) }),
    testimonials && testimonials.length > 0 && /* @__PURE__ */ jsxs("section", { className: "py-20 bg-white dark:bg-gray-950 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-[0.28em] text-brand-primary dark:text-white", children: t("testimonials.title", "Customer Reviews") }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl lg:text-4xl font-black text-gray-950 dark:text-white mb-12 font-serif", children: t("testimonials.subtitle", "What Our Customers Say") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full relative", children: /* @__PURE__ */ jsx("div", { className: "flex w-max animate-marquee hover:[animation-play-state:paused] gap-8 items-stretch py-4 px-4 lg:px-8", children: [...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => /* @__PURE__ */ jsxs("div", { className: "w-[350px] md:w-[400px] shrink-0 bg-gray-50 dark:bg-gray-900 rounded-[20px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between text-left", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-1 mb-4 text-[#ef5a3d]", children: [
            "★".repeat(testimonial.rating),
            "☆".repeat(5 - testimonial.rating)
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-8 italic", children: [
            '"',
            testimonial.content.startsWith("home.testimonial") ? t(testimonial.content) : testimonial.content,
            '"'
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0", children: testimonial.image_path ? /* @__PURE__ */ jsx("img", { src: `/storage/${testimonial.image_path}`, alt: testimonial.customer_name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-gray-400 font-bold text-lg", children: testimonial.customer_name.charAt(0) }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-950 dark:text-white text-sm", children: testimonial.customer_name }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-green-500" }),
              "Verified Customer"
            ] })
          ] })
        ] }),
        (testimonial.product_image_1 || testimonial.product_image_2) && /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-5 border-t border-gray-100 dark:border-gray-800 flex gap-3", children: [
          testimonial.product_image_1 && /* @__PURE__ */ jsx(
            "img",
            {
              src: `/storage/${testimonial.product_image_1}`,
              alt: "Product",
              className: "w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity border border-gray-200 dark:border-gray-700"
            }
          ),
          testimonial.product_image_2 && /* @__PURE__ */ jsx(
            "img",
            {
              src: `/storage/${testimonial.product_image_2}`,
              alt: "Product",
              className: "w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity border border-gray-200 dark:border-gray-700"
            }
          )
        ] })
      ] }, `${testimonial.id}-${index}`)) }) })
    ] }),
    recentBlogs && recentBlogs.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-[0.28em] text-brand-primary dark:text-white", children: "Latest Updates" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl lg:text-4xl font-black text-gray-950 dark:text-white font-serif", children: "Recent Articles" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: "/blog", className: "shrink-0 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 hover:border-brand-primary hover:text-brand-primary transition-colors inline-flex items-center gap-2", children: [
          "View All Posts",
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: recentBlogs.map((post2) => /* @__PURE__ */ jsxs("article", { className: "group bg-white dark:bg-gray-950 rounded-[20px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-xl hover:-translate-y-1", children: [
        /* @__PURE__ */ jsxs(Link, { href: `/blog/${post2.slug}`, className: "block relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800", children: [
          post2.image ? /* @__PURE__ */ jsx("img", { src: post2.image, alt: post2.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-gray-300", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
          post2.category && /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] font-bold text-brand-primary dark:text-black tracking-wide uppercase shadow-sm", children: post2.category.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider", children: [
            /* @__PURE__ */ jsx("time", { children: new Date(post2.published_at || post2.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
              " 10 Min"
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white leading-tight mb-4 group-hover:text-brand-primary transition-colors line-clamp-2", children: /* @__PURE__ */ jsx(Link, { href: `/blog/${post2.slug}`, children: post2.title }) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 font-light line-clamp-2 text-sm", children: post2.seo_description || "Read more about this topic in our latest article." })
        ] })
      ] }, post2.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary dark:text-white dark:bg-white/10 text-xs font-black uppercase tracking-wider rounded-full mb-3", children: t("home.about.eyebrow", "Official Application Purpose") }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-gray-900 dark:text-white sm:text-4xl mb-6", children: t("home.about.title", "About MVM Logistics") }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 font-medium", children: t("home.about.description", '<strong class="text-gray-900 dark:text-white font-bold">MVM Logistics</strong> is a premier cross-border logistics and manual order management application. Our platform empowers users to request product purchasing from international suppliers, calculate shipping costs, track real-time delivery statuses from warehouse arrival to destination, and manage payment receipts securely.') && /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: t("home.about.description", '<strong class="text-gray-900 dark:text-white font-bold">MVM Logistics</strong> is a premier cross-border logistics and manual order management application. Our platform empowers users to request product purchasing from international suppliers, calculate shipping costs, track real-time delivery statuses from warehouse arrival to destination, and manage payment receipts securely.') } }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/50", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white mb-2", children: t("home.about.feature1.title", "Cross-Border Logistics") }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: t("home.about.feature1.desc", "Streamlined freight forwarding and customs clearing for imported goods.") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/50", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white mb-2", children: t("home.about.feature2.title", "Manual Product Sourcing") }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: t("home.about.feature2.desc", "Submit manual buy requests and let our team handle purchasing and payment confirmation.") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/50", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white mb-2", children: t("home.about.feature3.title", "Secure Account Access") }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: t("home.about.feature3.desc", "Sign in securely via Google Authentication or Phone PIN to track your personal orders.") })
        ] })
      ] })
    ] }) }),
    telegramFaqs && telegramFaqs.length > 0 && /* @__PURE__ */ jsx("section", { className: "bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 py-16 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary dark:text-white dark:bg-white/10 text-xs font-black uppercase tracking-wider rounded-full mb-3", children: t("faq.support_badge", "Support & Knowledge Base") }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-gray-900 dark:text-white sm:text-4xl uppercase", children: t("faq.title", "FREQUENTLY ASKED QUESTIONS") }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600 dark:text-gray-400", children: t("faq.subtitle", "Find answers to common questions about our cross-border logistics services.") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-12", children: availableCategories.map((category) => /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-brand-primary dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-800 pb-2 mb-6", children: t(`faq.categories.${category.toLowerCase()}`, category) }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: groupedFaqs[category].map((faq) => {
          const isOpen = openFaq === faq.id;
          const question = i18n.language === "km" ? faq.question_km || faq.question : i18n.language === "vi" ? faq.question_vi || faq.question : faq.question_en || faq.question || faq.question_km || faq.question_vi;
          const answer = i18n.language === "km" ? faq.answer_km || faq.answer : i18n.language === "vi" ? faq.answer_vi || faq.answer : faq.answer_en || faq.answer || faq.answer_km || faq.answer_vi;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: `border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-[#1c55c0] shadow-md dark:border-blue-600" : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"}`,
              children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "w-full flex items-center justify-between p-5 md:p-6 text-left bg-white dark:bg-gray-900 focus:outline-none",
                    onClick: () => setOpenFaq(isOpen ? null : faq.id),
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-gray-900 dark:text-white pr-4", children: question }),
                      /* @__PURE__ */ jsx("span", { className: `flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? "bg-[#1c55c0] text-white" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`, children: isOpen ? /* @__PURE__ */ jsx(Minus, { size: 18 }) : /* @__PURE__ */ jsx(Plus, { size: 18 }) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`,
                    children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "p-5 md:p-6 pt-0 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 text-sm md:text-base leading-relaxed whitespace-pre-line border-t border-gray-100 dark:border-gray-800/50 mt-2 [&>a]:text-brand-primary [&>a]:font-medium hover:[&>a]:underline",
                        dangerouslySetInnerHTML: { __html: answer }
                      }
                    )
                  }
                )
              ]
            },
            faq.id
          );
        }) })
      ] }, category)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto ui-card p-8 md:p-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-gray-900 dark:text-white font-serif", children: t("quote.title", "Request a Shipping Quote") }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600 dark:text-gray-400", children: t("quote.subtitle", "Fill out the details below to get an estimated shipping cost.") })
      ] }),
      /* @__PURE__ */ jsxs("form", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", onSubmit: (e) => {
        e.preventDefault();
        post(route("quote-requests.store"), {
          onSuccess: () => {
            alert(t("quote.success_alert", "Quote Request Submitted! We will contact you soon."));
            reset();
          }
        });
      }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2", children: t("quote.name", "Name") }),
          /* @__PURE__ */ jsx("input", { type: "text", value: data.name, onChange: (e) => setData("name", e.target.value), className: "w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-brand-primary/50", placeholder: t("quote.name_placeholder", "Your Name"), required: true }),
          errors.name && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2", children: t("quote.email", "Email") }),
          /* @__PURE__ */ jsx("input", { type: "email", value: data.email, onChange: (e) => setData("email", e.target.value), className: "w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-brand-primary/50", placeholder: t("quote.email_placeholder", "Your Email Address") }),
          errors.email && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2", children: t("quote.phone", "Phone / Telegram") }),
          /* @__PURE__ */ jsx("input", { type: "text", value: data.phone, onChange: (e) => setData("phone", e.target.value), className: "w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-brand-primary/50", placeholder: t("quote.phone_placeholder", "Your Phone Number"), required: true }),
          errors.phone && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.phone })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2", children: t("quote.description", "Quote Description") }),
          /* @__PURE__ */ jsx("textarea", { value: data.description, onChange: (e) => setData("description", e.target.value), rows: 4, className: "w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-brand-primary/50", placeholder: t("quote.description_placeholder", "Please describe what you need to ship..."), required: true }),
          errors.description && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-2 mt-4 text-center", children: /* @__PURE__ */ jsx("button", { disabled: processing, type: "submit", className: "inline-flex min-h-14 items-center justify-center rounded-xl bg-brand-primary px-10 text-base font-black uppercase tracking-wider text-white shadow-lg shadow-brand-primary/20 transition hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 disabled:opacity-50", children: processing ? "..." : t("quote.submit_btn", "Get Quote") }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(SupportFAB, {}),
    /* @__PURE__ */ jsx(PromoPopup, { popup }),
    lightboxImage && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm",
        onClick: () => setLightboxImage(null),
        children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-5xl w-full flex justify-center items-center h-full", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center transition",
              onClick: () => setLightboxImage(null),
              children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: lightboxImage,
              alt: "Preview",
              className: "max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl",
              onClick: (e) => e.stopPropagation()
            }
          )
        ] })
      }
    )
  ] });
}
export {
  Home as default
};
