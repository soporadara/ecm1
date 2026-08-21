import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Sun, Moon } from "lucide-react";
import { usePage, router, Link } from "@inertiajs/react";
import toast from "react-hot-toast";
const confirmAction = (message) => {
  if (typeof window === "undefined") return Promise.resolve(false);
  return new Promise((resolve) => {
    const event = new CustomEvent("show-confirm-modal", {
      detail: {
        message,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      }
    });
    window.dispatchEvent(event);
  });
};
function ConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirmCallback, setOnConfirmCallback] = useState(null);
  const [onCancelCallback, setOnCancelCallback] = useState(null);
  useEffect(() => {
    const handleShow = (e) => {
      setMessage(e.detail.message);
      setOnConfirmCallback(() => e.detail.onConfirm);
      setOnCancelCallback(() => e.detail.onCancel);
      setIsOpen(true);
    };
    window.addEventListener("show-confirm-modal", handleShow);
    return () => window.removeEventListener("show-confirm-modal", handleShow);
  }, []);
  if (!isOpen) return null;
  const handleConfirm = () => {
    if (onConfirmCallback) onConfirmCallback();
    setIsOpen(false);
  };
  const handleCancel = () => {
    if (onCancelCallback) onCancelCallback();
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#1e1e1e] rounded-xl shadow-2xl max-w-sm w-full overflow-hidden border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-6 h-6 text-red-600 dark:text-red-500" }) }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-center text-gray-900 dark:text-gray-100 mb-2", children: "Confirm Action" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-center text-gray-500 dark:text-gray-400", children: message })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-[#181818] px-6 py-4 flex items-center justify-end gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleCancel,
          className: "px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleConfirm,
          className: "px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm",
          children: "Confirm"
        }
      )
    ] })
  ] }) });
}
const Icon = ({ d, className = "w-5 h-5" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.8, d }) });
const PortalTooltip = ({ text, rect }) => {
  if (typeof document === "undefined") return null;
  return createPortal(
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed z-[100] px-3 py-1.5 bg-gray-800 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold rounded-lg shadow-xl pointer-events-none whitespace-nowrap",
        style: {
          top: rect.top + rect.height / 2,
          left: rect.right + 12,
          transform: "translateY(-50%)"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 -translate-y-1/2 -left-1 border-4 border-transparent border-r-gray-800 dark:border-r-white" }),
          text
        ]
      }
    ),
    document.body
  );
};
const NavItemLink = ({ item, collapsed, active }) => {
  const [hovered, setHovered] = useState(false);
  const [rect, setRect] = useState(null);
  const linkRef = useRef(null);
  const handleMouseEnter = () => {
    if (collapsed && linkRef.current) {
      setRect(linkRef.current.getBoundingClientRect());
      setHovered(true);
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: () => setHovered(false),
      children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            ref: linkRef,
            href: item.href,
            prefetch: ["mount", "hover"],
            className: `
                    group flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-bold transition-all duration-300
                    ${collapsed ? "justify-center" : ""}
                    ${active ? "bg-admin-primary text-white shadow-lg shadow-admin-primary/30" : "text-admin-text-muted hover:bg-admin-surface-muted hover:text-admin-text"}
                `,
            children: [
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0", children: item.icon }),
              !collapsed && /* @__PURE__ */ jsx("span", { className: "truncate", children: item.label }),
              !collapsed && item.badge !== void 0 && /* @__PURE__ */ jsx("span", { className: `ml-auto px-2 py-0.5 text-[10.5px] font-black rounded-full ${active ? "bg-white/20 text-white" : "bg-admin-primary/10 text-admin-primary"}`, children: item.badge }),
              !collapsed && active && item.badge === void 0 && /* @__PURE__ */ jsx("span", { className: "ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-80" }),
              !collapsed && !active && item.badge === void 0 && /* @__PURE__ */ jsx(Icon, { d: "M9 5l7 7-7 7", className: "ml-auto w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" })
            ]
          }
        ),
        hovered && collapsed && rect && /* @__PURE__ */ jsx(PortalTooltip, { text: item.label, rect })
      ]
    }
  );
};
const NavGroup = ({
  label,
  items,
  currentPath,
  collapsed
}) => {
  const isActive = (href) => currentPath.startsWith(href) && href !== "/admin";
  const isExactActive = (href) => currentPath === href;
  if (!items || items.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    !collapsed && /* @__PURE__ */ jsx("div", { className: "px-5 mb-2 text-xs font-bold text-admin-text-muted capitalize", children: label }),
    /* @__PURE__ */ jsx("div", { className: "space-y-1.5 px-3", children: items.map((item) => {
      const active = isExactActive(item.href) || isActive(item.href);
      return /* @__PURE__ */ jsx(
        NavItemLink,
        {
          item,
          collapsed,
          active
        },
        item.href
      );
    }) })
  ] });
};
function AdminLayout({ children, title, actions }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F;
  const { auth, ziggy, general_settings, admin_counts } = usePage().props;
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/admin";
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminSidebarCollapsed") === "true";
    }
    return false;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") || localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);
  const initialNotifications = (auth == null ? void 0 : auth.admin_notifications) || [];
  const [liveNotifications, setLiveNotifications] = useState(initialNotifications);
  const [notifPermission, setNotifPermission] = useState(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "default"
  );
  const handleEnableNotifs = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotifPermission(permission);
        if (permission === "granted") {
          toast.success("Browser notifications enabled!");
        }
      });
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined" && window.Echo) {
      window.Echo.channel("admin-notifications").listen(".AdminSystemNotification", (e) => {
        toast.success(e.message, {
          duration: 5e3,
          position: "top-right"
        });
        const newNotif = {
          id: Date.now(),
          message: e.message,
          title: e.type ? e.type.charAt(0).toUpperCase() + e.type.slice(1) : "System",
          url: e.url || "#",
          time: "Just now"
        };
        setLiveNotifications((prev) => [newNotif, ...prev]);
        if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
          const notif = new Notification(newNotif.title, {
            body: e.message,
            icon: storeLogo || "/favicon.ico"
          });
          notif.onclick = () => {
            window.focus();
            if (e.url) {
              router.get(e.url);
            }
          };
        }
      });
      return () => {
        window.Echo.leaveChannel("admin-notifications");
      };
    }
  }, []);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  (general_settings == null ? void 0 : general_settings.store_name) || "Rafel";
  const storeLogo = general_settings == null ? void 0 : general_settings.store_logo;
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adminSidebarCollapsed", String(collapsed));
    }
  }, [collapsed]);
  useEffect(() => {
    const cleanup = router.on("start", () => setMobileOpen(false));
    return () => cleanup();
  }, []);
  const hasPermission = (permission) => {
    var _a2, _b2;
    if (!(auth == null ? void 0 : auth.user)) return false;
    if ((_a2 = auth.user.roles) == null ? void 0 : _a2.includes("Super Administrator")) return true;
    return (_b2 = auth.user.permissions) == null ? void 0 : _b2.includes(permission);
  };
  const storeNavItems = [
    ...hasPermission("dashboard.view") ? [{
      label: "Dashboard",
      href: "/admin",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" })
    }] : [],
    ...hasPermission("orders.view") ? [
      {
        label: "Customers",
        href: "/admin/logistics/customers",
        icon: /* @__PURE__ */ jsx(Icon, { d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" }),
        badge: admin_counts == null ? void 0 : admin_counts.customers
      },
      {
        label: "Orders",
        href: "/admin/logistics/orders",
        icon: /* @__PURE__ */ jsx(Icon, { d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }),
        badge: admin_counts == null ? void 0 : admin_counts.orders
      },
      ...((_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.role) !== "logistics" ? [{
        label: "Quote Requests",
        href: "/admin/quote-requests",
        icon: /* @__PURE__ */ jsx(Icon, { d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" })
      }] : [],
      {
        label: "Reports",
        href: "/admin/logistics/reports",
        icon: /* @__PURE__ */ jsx(Icon, { d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })
      }
    ] : [],
    ...hasPermission("team_notes.view") ? [{
      label: "Team Notes",
      href: "/admin/notes",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })
    }] : []
  ];
  const blogNavItems = [
    ...hasPermission("posts.view") && ((_b = auth == null ? void 0 : auth.user) == null ? void 0 : _b.role) !== "logistics" ? [
      {
        label: "Blog Posts",
        href: "/admin/posts",
        icon: /* @__PURE__ */ jsx(Icon, { d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }),
        badge: admin_counts == null ? void 0 : admin_counts.posts
      },
      {
        label: "Blog Categories",
        href: "/admin/post-categories",
        icon: /* @__PURE__ */ jsx(Icon, { d: "M4 6h16M4 10h16M4 14h16M4 18h16" }),
        badge: admin_counts == null ? void 0 : admin_counts.categories
      }
    ] : []
  ];
  const contentNavItems = [
    ...hasPermission("pages.view") && ((_c = auth == null ? void 0 : auth.user) == null ? void 0 : _c.role) !== "logistics" ? [{
      label: "Pages",
      href: "/admin/pages",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }),
      badge: admin_counts == null ? void 0 : admin_counts.pages
    }] : [],
    ...hasPermission("banners.view") && ((_d = auth == null ? void 0 : auth.user) == null ? void 0 : _d.role) !== "logistics" ? [{
      label: "Banners",
      href: "/admin/banners",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M4 5h16M4 19h16M4 5v14m16-14v14M8 9h8m-8 4h5" })
    }] : [],
    ...hasPermission("testimonials.view") ? [{
      label: "Customer Reviews",
      href: "/admin/testimonials",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" })
    }] : [],
    ...((_e = auth == null ? void 0 : auth.user) == null ? void 0 : _e.role) === "admin" || ((_f = auth == null ? void 0 : auth.user) == null ? void 0 : _f.role) === "super_admin" || ((_g = auth == null ? void 0 : auth.user) == null ? void 0 : _g.role) === "superadmin" || ((_h = auth == null ? void 0 : auth.user) == null ? void 0 : _h.role) === "logistics" ? [{
      label: "Telegram FAQs",
      href: "/admin/telegram-faqs",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" })
    }] : [],
    ...hasPermission("available_sites.view") ? [{
      label: "Available Sites",
      href: "/admin/available-sites",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488A9 9 0 113.512 8.512" })
    }] : [],
    ...hasPermission("popups.view") ? [{
      label: "Pop-up Ads",
      href: "/admin/popups",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M7 8h10M7 12h4m1 8l-4-4H5a3 3 0 01-3-3V6a3 3 0 013-3h14a3 3 0 013 3v7a3 3 0 01-3 3h-3l-4 4z" })
    }] : [],
    ...((_i = auth == null ? void 0 : auth.user) == null ? void 0 : _i.role) === "super_admin" || ((_j = auth == null ? void 0 : auth.user) == null ? void 0 : _j.role) === "superadmin" ? [{
      label: "Fly Icons",
      href: "/admin/fly-icons",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" })
    }] : []
  ];
  const marketingNavItems = [];
  const appearanceNavItems = [];
  const systemNavItems = [
    ...((_k = auth == null ? void 0 : auth.user) == null ? void 0 : _k.role) === "super_admin" || ((_l = auth == null ? void 0 : auth.user) == null ? void 0 : _l.role) === "superadmin" || ((_n = (_m = auth == null ? void 0 : auth.user) == null ? void 0 : _m.roles) == null ? void 0 : _n.includes("Super Administrator")) ? [{
      label: "Customers",
      href: "/admin/customers-management",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" })
    }] : [],
    ...hasPermission("staff.view") && ((_o = auth == null ? void 0 : auth.user) == null ? void 0 : _o.role) !== "logistics" ? [
      {
        label: "Staff & Users",
        href: "/admin/staff",
        icon: /* @__PURE__ */ jsx(Icon, { d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }),
        badge: admin_counts == null ? void 0 : admin_counts.staff
      }
    ] : [],
    ...hasPermission("audit_logs.view") && ((_p = auth == null ? void 0 : auth.user) == null ? void 0 : _p.role) !== "logistics" ? [{
      label: "Audit Logs",
      href: "/admin/audit-logs",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })
    }] : [],
    ...((_q = auth == null ? void 0 : auth.user) == null ? void 0 : _q.role) === "super_admin" || ((_r = auth == null ? void 0 : auth.user) == null ? void 0 : _r.role) === "superadmin" || ((_t = (_s = auth == null ? void 0 : auth.user) == null ? void 0 : _s.roles) == null ? void 0 : _t.includes("Super Administrator")) ? [{
      label: "Access Control",
      href: "/admin/security/access-control",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 0h-1V9a5 5 0 00-10 0v2H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2z" })
    }] : []
  ];
  const logisticsNavItems = [
    ...hasPermission("dashboard.view") ? [{
      label: "Dashboard",
      href: "/admin",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" })
    }] : [],
    ...hasPermission("orders.view") ? [
      {
        label: "Orders",
        href: "/admin/logistics/orders",
        icon: /* @__PURE__ */ jsx(Icon, { d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }),
        badge: admin_counts == null ? void 0 : admin_counts.orders
      },
      {
        label: "Customers",
        href: "/admin/logistics/customers",
        icon: /* @__PURE__ */ jsx(Icon, { d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" }),
        badge: admin_counts == null ? void 0 : admin_counts.customers
      },
      {
        label: "Reports",
        href: "/admin/logistics/reports",
        icon: /* @__PURE__ */ jsx(Icon, { d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })
      }
    ] : [],
    ...hasPermission("team_notes.view") ? [{
      label: "Team Notes",
      href: "/admin/notes",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })
    }] : [],
    ...hasPermission("testimonials.view") ? [{
      label: "Customer Reviews",
      href: "/admin/testimonials",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" })
    }] : [],
    ...((_u = auth == null ? void 0 : auth.user) == null ? void 0 : _u.role) === "logistics" ? [{
      label: "Telegram FAQs",
      href: "/admin/telegram-faqs",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" })
    }] : [],
    ...hasPermission("available_sites.view") ? [{
      label: "Available Sites",
      href: "/admin/available-sites",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488A9 9 0 113.512 8.512" })
    }] : [],
    ...hasPermission("popups.view") ? [{
      label: "Pop-up Ads",
      href: "/admin/popups",
      icon: /* @__PURE__ */ jsx(Icon, { d: "M7 8h10M7 12h4m1 8l-4-4H5a3 3 0 01-3-3V6a3 3 0 013-3h14a3 3 0 013 3v7a3 3 0 01-3 3h-3l-4 4z" })
    }] : []
  ];
  const SidebarContent = ({ mobile = false } = {}) => {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2;
    const sidebarCollapsed = mobile ? false : collapsed;
    const navRef = useRef(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef(null);
    useEffect(() => {
      const handleClickOutsideProfile = (event) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
          setShowProfileMenu(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutsideProfile);
      return () => document.removeEventListener("mousedown", handleClickOutsideProfile);
    }, []);
    useEffect(() => {
      if (navRef.current) {
        const scrollPos = sessionStorage.getItem("admin_sidebar_scroll");
        if (scrollPos) {
          navRef.current.scrollTop = parseInt(scrollPos, 10);
        }
      }
    }, []);
    const handleScroll = (e) => {
      sessionStorage.setItem("admin_sidebar_scroll", e.currentTarget.scrollTop.toString());
    };
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full bg-admin-surface border-r border-admin-border/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: `flex items-center pt-6 pb-5 ${sidebarCollapsed ? "px-4 justify-center" : "px-5 md:px-8"}`, children: [
        /* @__PURE__ */ jsxs(Link, { href: "/admin", prefetch: ["mount", "hover"], className: "flex items-center gap-3 min-w-0", children: [
          storeLogo ? /* @__PURE__ */ jsx("div", { className: "w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm overflow-hidden p-1 border border-admin-border/50", children: /* @__PURE__ */ jsx("img", { src: storeLogo, alt: "MVM Logistic", className: "w-full h-full object-contain" }) }) : /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-admin-secondary rounded-xl flex items-center justify-center flex-shrink-0 font-black text-white text-lg shadow-md shadow-admin-secondary/30 uppercase", children: "MVM" }),
          !sidebarCollapsed && /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex flex-col justify-center mt-0.5", children: [
            /* @__PURE__ */ jsx("p", { className: "font-extrabold text-admin-text text-[1.1rem] tracking-tight truncate", children: "MVM Logistic" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-admin-text-muted uppercase tracking-wider", children: "CMS Dashboard" })
          ] })
        ] }),
        !sidebarCollapsed && !mobile && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCollapsed(true),
            className: "ml-auto p-1.5 text-admin-text-muted hover:text-admin-text hover:bg-admin-surface-muted rounded-xl transition-colors",
            title: "Collapse sidebar",
            children: /* @__PURE__ */ jsx(Icon, { d: "M11 19l-7-7 7-7m8 14l-7-7 7-7", className: "w-4 h-4" })
          }
        ),
        sidebarCollapsed && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCollapsed(false),
            className: "absolute left-full ml-1 p-1 bg-white border border-admin-border shadow-sm text-admin-text-muted hover:text-admin-text rounded-full transition-colors opacity-0 group-hover:opacity-100",
            title: "Expand sidebar"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "nav",
        {
          ref: navRef,
          onScroll: handleScroll,
          className: "flex-1 overflow-y-auto py-4 px-2 space-y-4",
          children: ((_a2 = auth == null ? void 0 : auth.user) == null ? void 0 : _a2.role) === "logistics" ? /* @__PURE__ */ jsx(NavGroup, { label: "Logistics Dashboard", items: logisticsNavItems, currentPath, collapsed: sidebarCollapsed }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(NavGroup, { label: "Store", items: storeNavItems, currentPath, collapsed: sidebarCollapsed }),
            /* @__PURE__ */ jsx(NavGroup, { label: "Content", items: contentNavItems, currentPath, collapsed: sidebarCollapsed }),
            /* @__PURE__ */ jsx(NavGroup, { label: "Blog", items: blogNavItems, currentPath, collapsed: sidebarCollapsed }),
            /* @__PURE__ */ jsx(NavGroup, { label: "Marketing", items: marketingNavItems, currentPath, collapsed: sidebarCollapsed }),
            /* @__PURE__ */ jsx(NavGroup, { label: "Appearance", items: appearanceNavItems, currentPath, collapsed: sidebarCollapsed }),
            /* @__PURE__ */ jsx(NavGroup, { label: "System", items: systemNavItems, currentPath, collapsed: sidebarCollapsed })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: `mt-auto mb-[calc(1.5rem+env(safe-area-inset-bottom))] mx-4 relative`, ref: profileMenuRef, children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowProfileMenu(!showProfileMenu),
            className: `w-full p-3 rounded-2xl border border-admin-border/50 bg-admin-surface-muted/50 hover:bg-admin-surface transition-colors flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3 text-left"}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-admin-primary/10 flex items-center justify-center text-admin-primary font-bold text-sm flex-shrink-0 border border-admin-primary/20 overflow-hidden", children: ((_b2 = auth == null ? void 0 : auth.user) == null ? void 0 : _b2.avatar) ? /* @__PURE__ */ jsx("img", { src: auth.user.avatar, alt: "Avatar", className: "w-full h-full object-cover" }) : (_e2 = (_d2 = (_c2 = auth == null ? void 0 : auth.user) == null ? void 0 : _c2.name) == null ? void 0 : _d2.charAt(0)) == null ? void 0 : _e2.toUpperCase() }),
              !sidebarCollapsed && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-admin-text truncate", children: (_f2 = auth == null ? void 0 : auth.user) == null ? void 0 : _f2.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-admin-text-muted truncate capitalize", children: (_g2 = auth == null ? void 0 : auth.user) == null ? void 0 : _g2.role })
                ] }),
                /* @__PURE__ */ jsx(Icon, { d: "M19 9l-7 7-7-7", className: "w-4 h-4 text-admin-text-muted flex-shrink-0" })
              ] })
            ]
          }
        ),
        showProfileMenu && /* @__PURE__ */ jsxs("div", { className: `absolute bottom-[calc(100%+8px)] bg-white dark:bg-gray-900 rounded-2xl border border-admin-border shadow-xl py-2 z-[100] ${sidebarCollapsed ? "left-0 w-48" : "left-0 right-0"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 border-b border-admin-border/50 mb-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-admin-text truncate", children: (_h2 = auth == null ? void 0 : auth.user) == null ? void 0 : _h2.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-admin-text-muted truncate", children: (_i2 = auth == null ? void 0 : auth.user) == null ? void 0 : _i2.email })
          ] }),
          /* @__PURE__ */ jsxs(Link, { href: "/admin/profile", prefetch: ["mount", "hover"], className: "flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-admin-text hover:bg-admin-surface-muted transition-colors", children: [
            /* @__PURE__ */ jsx(Icon, { d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", className: "w-5 h-5 opacity-70" }),
            "My Profile"
          ] }),
          hasPermission("settings.view") && /* @__PURE__ */ jsxs(Link, { href: "/admin/settings", prefetch: ["mount", "hover"], className: "flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-admin-text hover:bg-admin-surface-muted transition-colors", children: [
            /* @__PURE__ */ jsx(Icon, { d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", className: "w-5 h-5 opacity-70" }),
            "Settings"
          ] }),
          /* @__PURE__ */ jsxs(Link, { href: "/cms/logout", method: "post", as: "button", className: "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-admin-danger hover:bg-admin-danger/10 transition-colors mt-1 border-t border-admin-border/50 pt-3", children: [
            /* @__PURE__ */ jsx(Icon, { d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1", className: "w-5 h-5 opacity-70" }),
            "Sign Out"
          ] })
        ] })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[100dvh] bg-admin-bg flex", children: [
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: `
                    hidden md:flex flex-col fixed left-0 top-0 h-[100dvh] z-40 transition-all duration-300 ease-in-out
                    ${collapsed ? "w-20" : "w-64"}
                `,
        children: [
          /* @__PURE__ */ jsx(SidebarContent, {}),
          collapsed && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setCollapsed(false),
              className: "absolute -right-4 top-24 w-8 h-8 bg-admin-surface border-2 border-admin-bg rounded-full flex items-center justify-center text-admin-text hover:text-admin-primary hover:border-admin-primary transition-all shadow-md z-50 cursor-pointer",
              title: "Expand",
              children: /* @__PURE__ */ jsx(Icon, { d: "M9 5l7 7-7 7", className: "w-4 h-4 ml-0.5" })
            }
          )
        ]
      }
    ),
    mobileOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/55 backdrop-blur-sm z-40 md:hidden",
        onClick: () => setMobileOpen(false)
      }
    ),
    /* @__PURE__ */ jsx(
      "aside",
      {
        className: `
                    fixed left-0 top-0 h-[100dvh] w-[min(90vw,22rem)] z-50 transition-transform duration-300 ease-in-out md:hidden
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                `,
        children: /* @__PURE__ */ jsx(SidebarContent, { mobile: true })
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `flex-1 flex flex-col w-full min-w-0 min-h-[100dvh] transition-all duration-300 ${collapsed ? "md:ml-20" : "md:ml-64"}`,
        children: [
          /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-30 flex items-center justify-between border-b border-admin-border/40 bg-admin-bg/92 px-3 py-3 backdrop-blur-xl sm:px-4 md:static md:border-0 md:bg-transparent md:px-8 md:pb-4 md:pt-8 md:backdrop-blur-none", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "md:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-admin-border bg-admin-surface text-admin-text-muted shadow-sm transition hover:-translate-y-0.5 hover:text-admin-text",
                  onClick: () => setMobileOpen(!mobileOpen),
                  children: /* @__PURE__ */ jsx(Icon, { d: "M4 6h16M4 12h16M4 18h16", className: "w-6 h-6" })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "md:hidden", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-black uppercase tracking-[0.18em] text-admin-text-muted", children: "CMS" }),
                  /* @__PURE__ */ jsx("h1", { className: "truncate text-xl font-black text-admin-text", children: title || "Dashboard" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "hidden md:block", children: [
                  /* @__PURE__ */ jsxs("h1", { className: "text-[26px] font-bold text-admin-text flex items-center gap-2", children: [
                    "Good morning ",
                    (_w = (_v = auth == null ? void 0 : auth.user) == null ? void 0 : _v.name) == null ? void 0 : _w.split(" ")[0],
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "👋" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[13px] text-admin-text-muted mt-1 font-medium", children: "Time to rise up for today's tasks" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 md:gap-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsDarkMode(!isDarkMode),
                  className: "p-2.5 text-admin-text-muted hover:text-admin-text transition-colors bg-admin-surface rounded-full shadow-sm border border-admin-border/40",
                  title: "Toggle Dark Mode",
                  children: isDarkMode ? /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "relative", ref: notificationsRef, children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setShowNotifications(!showNotifications),
                    className: "relative p-2.5 text-admin-text-muted hover:text-admin-text transition-colors bg-admin-surface rounded-full shadow-sm border border-admin-border/40",
                    title: "View order updates",
                    children: [
                      /* @__PURE__ */ jsx(Icon, { d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", className: "w-5 h-5" }),
                      liveNotifications.length > 0 && /* @__PURE__ */ jsxs("span", { className: "absolute top-1 right-1 flex h-2 w-2", children: [
                        /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }),
                        /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-red-500" })
                      ] })
                    ]
                  }
                ),
                showNotifications && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden max-h-[80vh] flex flex-col", children: [
                  /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center", children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white", children: "Notifications" }),
                    notifPermission !== "granted" && /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: (e) => {
                          e.stopPropagation();
                          handleEnableNotifs();
                        },
                        className: "text-xs text-admin-primary hover:underline font-semibold bg-admin-primary/10 px-2 py-1 rounded-md",
                        children: "Enable Browser Popups"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "overflow-y-auto flex-1", children: liveNotifications.length > 0 ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: liveNotifications.map((notif) => {
                    var _a2, _b2;
                    return /* @__PURE__ */ jsxs(
                      Link,
                      {
                        href: notif.url,
                        className: "flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                        children: [
                          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: notif.avatar ? /* @__PURE__ */ jsx("img", { src: notif.avatar, alt: "", className: "w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" }) : /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm", children: (_b2 = (_a2 = notif.name) == null ? void 0 : _a2.charAt(0)) == null ? void 0 : _b2.toUpperCase() }) }),
                          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: notif.title }),
                            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-0.5 break-words", children: notif.message }),
                            /* @__PURE__ */ jsx("p", { className: "text-xs text-brand-primary font-medium mt-1", children: notif.time })
                          ] })
                        ]
                      },
                      notif.id
                    );
                  }) }) : /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-gray-500 dark:text-gray-400 text-sm", children: "No new notifications." }) }),
                  /* @__PURE__ */ jsx("div", { className: "p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-center", children: /* @__PURE__ */ jsx(Link, { href: "/admin/logistics/orders", prefetch: ["mount", "hover"], className: "text-sm font-bold text-brand-primary hover:underline", children: "View all manual orders" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-2", children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/",
                  target: "_blank",
                  rel: "noreferrer",
                  className: "p-2.5 text-admin-text-muted hover:text-admin-text transition-colors bg-admin-surface rounded-full shadow-sm border border-admin-border/40",
                  title: "Storefront",
                  children: /* @__PURE__ */ jsx(Icon, { d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14", className: "w-5 h-5" })
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-3 pl-4 border-l border-admin-border/50 relative group cursor-pointer pb-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-right hidden md:block", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[13px] font-bold text-admin-text leading-none mb-1", children: (_x = auth == null ? void 0 : auth.user) == null ? void 0 : _x.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-admin-text-muted capitalize leading-none", children: (_z = (_y = auth == null ? void 0 : auth.user) == null ? void 0 : _y.role) == null ? void 0 : _z.replace("_", " ") })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-admin-primary/10 flex items-center justify-center text-admin-primary font-bold text-sm border border-admin-primary/20 overflow-hidden shadow-sm transition-all group-hover:ring-2 ring-admin-primary/50", children: ((_A = auth == null ? void 0 : auth.user) == null ? void 0 : _A.avatar) ? /* @__PURE__ */ jsx("img", { src: auth.user.avatar, alt: "Avatar", className: "w-full h-full object-cover" }) : (_D = (_C = (_B = auth == null ? void 0 : auth.user) == null ? void 0 : _B.name) == null ? void 0 : _C.charAt(0)) == null ? void 0 : _D.toUpperCase() }),
                /* @__PURE__ */ jsx("div", { className: "w-4 h-4 text-admin-text-muted ml-1 group-hover:text-admin-text transition-colors", children: /* @__PURE__ */ jsx(Icon, { d: "M19 9l-7 7-7-7" }) }),
                /* @__PURE__ */ jsxs("div", { className: "absolute top-[100%] right-0 mt-1 w-56 bg-white dark:bg-gray-900 rounded-2xl border border-admin-border shadow-xl py-2 hidden group-hover:block z-[100] before:absolute before:top-[-16px] before:right-0 before:w-full before:h-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-admin-border/50 mb-2", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-admin-text truncate", children: (_E = auth == null ? void 0 : auth.user) == null ? void 0 : _E.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-[11px] text-admin-text-muted truncate mt-0.5", children: (_F = auth == null ? void 0 : auth.user) == null ? void 0 : _F.email })
                  ] }),
                  /* @__PURE__ */ jsxs(Link, { href: "/admin/profile", prefetch: ["mount", "hover"], className: "flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold text-admin-text hover:bg-admin-surface-muted transition-colors", children: [
                    /* @__PURE__ */ jsx(Icon, { d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", className: "w-4 h-4 opacity-70" }),
                    "My Profile"
                  ] }),
                  /* @__PURE__ */ jsxs(Link, { href: "/cms/logout", method: "post", as: "button", className: "w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold text-admin-danger hover:bg-admin-danger/10 transition-colors mt-1 border-t border-admin-border/50 pt-3", children: [
                    /* @__PURE__ */ jsx(Icon, { d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1", className: "w-4 h-4 opacity-70" }),
                    "Sign Out"
                  ] })
                ] })
              ] }),
              actions && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 ml-2", children: actions })
            ] })
          ] }),
          searchOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 border-b border-slate-200", children: [
              /* @__PURE__ */ jsx(Icon, { d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", className: "w-5 h-5 text-slate-400" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  autoFocus: true,
                  type: "text",
                  placeholder: "Search products, orders, customers...",
                  className: "flex-1 outline-none text-slate-800 placeholder-slate-400",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setSearchOpen(false),
                  className: "text-slate-400 hover:text-slate-600",
                  children: /* @__PURE__ */ jsx(Icon, { d: "M6 18L18 6M6 6l12 12", className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-slate-500 text-center py-8", children: searchQuery ? "Type to search..." : "Start typing to search across the CMS" })
          ] }) }),
          /* @__PURE__ */ jsx("main", { className: "flex-1 w-full min-w-0 px-4 pb-12 pt-4 sm:px-4 md:p-6 lg:p-8", children }),
          /* @__PURE__ */ jsx(ConfirmModal, {})
        ]
      }
    )
  ] });
}
export {
  AdminLayout as A,
  confirmAction as c
};
