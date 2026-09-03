import { jsx } from "react/jsx-runtime";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import { createContext, useState, useEffect, useContext } from "react";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const defaultCurrencies = {
  USD: { code: "USD", symbol: "$", label: "United States Dollar" },
  VND: { code: "VND", symbol: "₫", label: "Vietnamese Dong" }
};
const normalizeCurrency = (value) => value === "VND" ? "VND" : "USD";
const CurrencyContext = createContext({
  currentCurrency: "USD",
  currencies: defaultCurrencies,
  setCurrentCurrency: () => {
  },
  formatAmount: (amount) => `$${Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  formatPrice: (amount) => `$${Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  isLoadingRates: false
});
const useCurrency = () => useContext(CurrencyContext);
const CurrencyProvider = ({ children, defaultCurrency }) => {
  const detectedDefault = normalizeCurrency(defaultCurrency);
  const [currentCurrency, setCurrentCurrencyState] = useState(detectedDefault);
  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    setCurrentCurrencyState(normalizeCurrency(savedCurrency || detectedDefault));
  }, [detectedDefault]);
  const setCurrentCurrency = (code) => {
    const next = normalizeCurrency(code);
    setCurrentCurrencyState(next);
    localStorage.setItem("currency", next);
  };
  const formatAmount = (amount, code = currentCurrency) => {
    if (amount === null || amount === void 0 || amount === "") {
      return "Pending confirmation";
    }
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount)) {
      return "Pending confirmation";
    }
    if (code === "VND") {
      return `₫${Math.round(numericAmount).toLocaleString("en-US")}`;
    }
    return `$${numericAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  return /* @__PURE__ */ jsx(CurrencyContext.Provider, { value: {
    currentCurrency,
    currencies: defaultCurrencies,
    setCurrentCurrency,
    formatAmount,
    formatPrice: formatAmount,
    isLoadingRates: false
  }, children });
};
const appName = "MVM Logistic";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/AuditLogs/Index.tsx": () => import("./assets/Index-BH1_aMG8.js"), "./Pages/Admin/Banners/Create.tsx": () => import("./assets/Create-DuMfjkD0.js"), "./Pages/Admin/Banners/Edit.tsx": () => import("./assets/Edit-BYbxNRBg.js"), "./Pages/Admin/Banners/Index.tsx": () => import("./assets/Index-C-KQnAoo.js"), "./Pages/Admin/Brands/Index.tsx": () => import("./assets/Index-m6BHNJ-r.js"), "./Pages/Admin/Categories/Create.tsx": () => import("./assets/Create-Cur7-BgV.js"), "./Pages/Admin/Categories/Edit.tsx": () => import("./assets/Edit-kZyG0gxM.js"), "./Pages/Admin/Categories/Index.tsx": () => import("./assets/Index-F24-_jdr.js"), "./Pages/Admin/ContactMessages/Index.tsx": () => import("./assets/Index-BriUS5TT.js"), "./Pages/Admin/ContentSettings/FlyIcons.tsx": () => import("./assets/FlyIcons-lNHyUJhM.js"), "./Pages/Admin/ContentSettings/OrderMessages.tsx": () => import("./assets/OrderMessages-BpeF-TFB.js"), "./Pages/Admin/Coupons/Create.tsx": () => import("./assets/Create-BJGmqoCW.js"), "./Pages/Admin/Coupons/Index.tsx": () => import("./assets/Index-DSRiI5V0.js"), "./Pages/Admin/CustomerManagement/Index.tsx": () => import("./assets/Index-Bx1SXNpv.js"), "./Pages/Admin/Customers/Index.tsx": () => import("./assets/Index-BPDZxKlF.js"), "./Pages/Admin/Customers/Show.tsx": () => import("./assets/Show-XiFWwDD2.js"), "./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-DVS9mJBs.js"), "./Pages/Admin/FeatureFlags/Index.tsx": () => import("./assets/Index-vuYInLGE.js"), "./Pages/Admin/Logistics/CustomerOrders.tsx": () => import("./assets/CustomerOrders-Dxn8QK3G.js"), "./Pages/Admin/Logistics/Customers.tsx": () => import("./assets/Customers-D4EvsEz7.js"), "./Pages/Admin/Logistics/Customers/Show.tsx": () => import("./assets/Show-BL3gaVGl.js"), "./Pages/Admin/Logistics/Orders.tsx": () => import("./assets/Orders-D7DtM6nX.js"), "./Pages/Admin/Logistics/Orders/Index.tsx": () => import("./assets/Index-DCpAUdtX.js"), "./Pages/Admin/Logistics/Orders/Show.tsx": () => import("./assets/Show-xGIjPtA8.js"), "./Pages/Admin/Logistics/ReceiptPayments/Index.tsx": () => import("./assets/Index-t05Dh2Dr.js"), "./Pages/Admin/Logistics/Receipts/Show.tsx": () => import("./assets/Show-WIQJcs9i.js"), "./Pages/Admin/Logistics/Reports.tsx": () => import("./assets/Reports-DozEbpAX.js"), "./Pages/Admin/Marketplaces/Index.tsx": () => import("./assets/Index-hvN33737.js"), "./Pages/Admin/Media/Index.tsx": () => import("./assets/Index-D7k1gvxc.js"), "./Pages/Admin/Menus/Index.tsx": () => import("./assets/Index-BILRTAZ2.js"), "./Pages/Admin/Notes/Index.tsx": () => import("./assets/Index-DMKI0LrA.js"), "./Pages/Admin/Orders/Index.tsx": () => import("./assets/Index-B4ehaW95.js"), "./Pages/Admin/Pages/Create.tsx": () => import("./assets/Create-D2bhodc5.js"), "./Pages/Admin/Pages/Edit.tsx": () => import("./assets/Edit-B3N6UjoY.js"), "./Pages/Admin/Pages/Index.tsx": () => import("./assets/Index-B6XQRjeq.js"), "./Pages/Admin/Popups/Create.tsx": () => import("./assets/Create-BId03b59.js"), "./Pages/Admin/Popups/Edit.tsx": () => import("./assets/Edit-DwbOOEJP.js"), "./Pages/Admin/Popups/Index.tsx": () => import("./assets/Index-DjV3yniA.js"), "./Pages/Admin/PostCategories/Index.tsx": () => import("./assets/Index-CDyEUUYY.js"), "./Pages/Admin/Posts/Comments.tsx": () => import("./assets/Comments-Do2MfVPO.js"), "./Pages/Admin/Posts/Create.tsx": () => import("./assets/Create-Dcc7qqmn.js"), "./Pages/Admin/Posts/Edit.tsx": () => import("./assets/Edit-C7TcR9rH.js"), "./Pages/Admin/Posts/Index.tsx": () => import("./assets/Index-C6NzN4tP.js"), "./Pages/Admin/Products/Create.tsx": () => import("./assets/Create-Bg2rd38_.js"), "./Pages/Admin/Products/Edit.tsx": () => import("./assets/Edit-ChZJSGYR.js"), "./Pages/Admin/Products/Index.tsx": () => import("./assets/Index-BGamO6Jb.js"), "./Pages/Admin/Profile.tsx": () => import("./assets/Profile-8yI-7ZLp.js"), "./Pages/Admin/QuoteRequests/Index.tsx": () => import("./assets/Index-CaW6WHwy.js"), "./Pages/Admin/Reviews/Index.tsx": () => import("./assets/Index-DraeNfMo.js"), "./Pages/Admin/Security/AccessControl.tsx": () => import("./assets/AccessControl-qNyNyb9L.js"), "./Pages/Admin/Settings/Index.tsx": () => import("./assets/Index-YKQ-u5Y6.js"), "./Pages/Admin/Settings/Seo.tsx": () => import("./assets/Seo-BdL7nWxX.js"), "./Pages/Admin/Staff/Create.tsx": () => import("./assets/Create-DCCr-eP7.js"), "./Pages/Admin/Staff/Edit.tsx": () => import("./assets/Edit-Cqs1oPgd.js"), "./Pages/Admin/Staff/Index.tsx": () => import("./assets/Index-aCo_AGDT.js"), "./Pages/Admin/TelegramFaqs/Index.tsx": () => import("./assets/Index-D28scGxK.js"), "./Pages/Admin/Testimonials/Index.tsx": () => import("./assets/Index-WD3wwXJP.js"), "./Pages/Admin/Themes/Customize.tsx": () => import("./assets/Customize-DOu-RfKu.js"), "./Pages/Admin/Themes/Index.tsx": () => import("./assets/Index-DCPFaBWl.js"), "./Pages/Admin/Users/Index.tsx": () => import("./assets/Index-ytyxFxO8.js"), "./Pages/Auth/CmsLogin.tsx": () => import("./assets/CmsLogin-CHYInoVi.js"), "./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-DOuodAGg.js"), "./Pages/Auth/Login.tsx": () => import("./assets/Login-CykYlmUA.js"), "./Pages/Blog/Index.tsx": () => import("./assets/Index-BwE-xSDq.js"), "./Pages/Blog/Show.tsx": () => import("./assets/Show-D9cxPM49.js"), "./Pages/Cart/Index.tsx": () => import("./assets/Index-D9F7wTG1.js"), "./Pages/Checkout/Index.tsx": () => import("./assets/Index-Br0iL9sg.js"), "./Pages/Customer/CompleteProfile.tsx": () => import("./assets/CompleteProfile-CJboQ5AM.js"), "./Pages/Customer/Dashboard.tsx": () => import("./assets/Dashboard-Dm85aobg.js"), "./Pages/Customer/ManualOrderForm.tsx": () => import("./assets/ManualOrderForm-BUCV6q97.js"), "./Pages/Customer/Orders/Index.tsx": () => import("./assets/Index-BwBdGDa0.js"), "./Pages/Customer/Orders/MobileOrdersView.tsx": () => import("./assets/MobileOrdersView-C4XMQ7tF.js"), "./Pages/Customer/Orders/Show.tsx": () => import("./assets/Show-GHq0XjIB.js"), "./Pages/Home.tsx": () => import("./assets/Home-CQm497r-.js"), "./Pages/Logistics/Contact.tsx": () => import("./assets/Contact-BcYKkWYu.js"), "./Pages/Logistics/HowItWorks.tsx": () => import("./assets/HowItWorks-7JFq5UwD.js"), "./Pages/Logistics/Product.tsx": () => import("./assets/Product-CcOz_Nln.js"), "./Pages/Logistics/ShippingRates.tsx": () => import("./assets/ShippingRates-CHUYMfBy.js"), "./Pages/Logistics/Track.tsx": () => import("./assets/Track-CbYIGd4n.js"), "./Pages/Logistics/Warehouses.tsx": () => import("./assets/Warehouses-BoDxn8ek.js"), "./Pages/Notifications.tsx": () => import("./assets/Notifications-AsyN6WUn.js"), "./Pages/Page/Show.tsx": () => import("./assets/Show-Bju3w63x.js"), "./Pages/PrivacyPolicy.tsx": () => import("./assets/PrivacyPolicy-Cpljg6L-.js"), "./Pages/Profile.tsx": () => import("./assets/Profile-0jjKJ82z.js"), "./Pages/ProhibitedItems.tsx": () => import("./assets/ProhibitedItems-CjsqS-wW.js"), "./Pages/Public/Receipt.tsx": () => import("./assets/Receipt-C5NyIS9K.js"), "./Pages/Settings.tsx": () => import("./assets/Settings-BoI8aXsA.js"), "./Pages/Shop/Index.tsx": () => import("./assets/Index-CBKNs1gx.js"), "./Pages/Shop/Show.tsx": () => import("./assets/Show-BTUSESWT.js"), "./Pages/TermsOfService.tsx": () => import("./assets/TermsOfService-6Gh7Xc7w.js") })),
    setup: ({ App, props }) => {
      var _a, _b, _c, _d;
      const initialPageProps = props.initialPage.props;
      const defaultCurrency = ((_b = (_a = initialPageProps == null ? void 0 : initialPageProps.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.preferred_currency) || ((_c = initialPageProps == null ? void 0 : initialPageProps.general_settings) == null ? void 0 : _c.default_currency) || ((_d = initialPageProps == null ? void 0 : initialPageProps.general_settings) == null ? void 0 : _d.currency) || "USD";
      return /* @__PURE__ */ jsx(CurrencyProvider, { defaultCurrency, children: /* @__PURE__ */ jsx(App, { ...props }) });
    }
  })
);
export {
  useCurrency as u
};
