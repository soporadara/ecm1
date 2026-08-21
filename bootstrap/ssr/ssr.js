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
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/AuditLogs/Index.tsx": () => import("./assets/Index-DLBJqXgc.js"), "./Pages/Admin/Banners/Create.tsx": () => import("./assets/Create-0IRPaJSG.js"), "./Pages/Admin/Banners/Edit.tsx": () => import("./assets/Edit-DyEKpc0K.js"), "./Pages/Admin/Banners/Index.tsx": () => import("./assets/Index-CUW6AlI5.js"), "./Pages/Admin/Brands/Index.tsx": () => import("./assets/Index-DCBtq3RC.js"), "./Pages/Admin/Categories/Create.tsx": () => import("./assets/Create-ChCEG_0H.js"), "./Pages/Admin/Categories/Edit.tsx": () => import("./assets/Edit-Bt97I-Pr.js"), "./Pages/Admin/Categories/Index.tsx": () => import("./assets/Index-DY_8Fxi0.js"), "./Pages/Admin/ContactMessages/Index.tsx": () => import("./assets/Index-BijQdLZ4.js"), "./Pages/Admin/ContentSettings/FlyIcons.tsx": () => import("./assets/FlyIcons-BHCcm5h5.js"), "./Pages/Admin/ContentSettings/OrderMessages.tsx": () => import("./assets/OrderMessages-93Xdi0E3.js"), "./Pages/Admin/Coupons/Create.tsx": () => import("./assets/Create-DW9PnJlQ.js"), "./Pages/Admin/Coupons/Index.tsx": () => import("./assets/Index-DwyJRR1B.js"), "./Pages/Admin/CustomerManagement/Index.tsx": () => import("./assets/Index-BbrasY7a.js"), "./Pages/Admin/Customers/Index.tsx": () => import("./assets/Index-DA5otvE0.js"), "./Pages/Admin/Customers/Show.tsx": () => import("./assets/Show-C87dnOQZ.js"), "./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-CbI8Jtpp.js"), "./Pages/Admin/FeatureFlags/Index.tsx": () => import("./assets/Index-3KK5cx4Y.js"), "./Pages/Admin/Logistics/CustomerOrders.tsx": () => import("./assets/CustomerOrders--pfJJpj3.js"), "./Pages/Admin/Logistics/Customers.tsx": () => import("./assets/Customers-sFHRSzxA.js"), "./Pages/Admin/Logistics/Customers/Show.tsx": () => import("./assets/Show-CpKMeWg_.js"), "./Pages/Admin/Logistics/Orders.tsx": () => import("./assets/Orders-_gegXdrV.js"), "./Pages/Admin/Logistics/Orders/Index.tsx": () => import("./assets/Index-BNkhOMk8.js"), "./Pages/Admin/Logistics/Orders/Show.tsx": () => import("./assets/Show-D2buMVBo.js"), "./Pages/Admin/Logistics/ReceiptPayments/Index.tsx": () => import("./assets/Index-9LAod2pz.js"), "./Pages/Admin/Logistics/Receipts/Show.tsx": () => import("./assets/Show-WIQJcs9i.js"), "./Pages/Admin/Logistics/Reports.tsx": () => import("./assets/Reports-0b-Dogka.js"), "./Pages/Admin/Marketplaces/Index.tsx": () => import("./assets/Index-DWWwQoiu.js"), "./Pages/Admin/Media/Index.tsx": () => import("./assets/Index-D6k82tCi.js"), "./Pages/Admin/Menus/Index.tsx": () => import("./assets/Index-BR_UnTp6.js"), "./Pages/Admin/Notes/Index.tsx": () => import("./assets/Index-Ogj4ezYk.js"), "./Pages/Admin/Orders/Index.tsx": () => import("./assets/Index-D4hN-yWz.js"), "./Pages/Admin/Pages/Create.tsx": () => import("./assets/Create-CzbHhu0U.js"), "./Pages/Admin/Pages/Edit.tsx": () => import("./assets/Edit-oB_bcgBY.js"), "./Pages/Admin/Pages/Index.tsx": () => import("./assets/Index-DGTzrOmI.js"), "./Pages/Admin/Popups/Create.tsx": () => import("./assets/Create-CpfRTGuh.js"), "./Pages/Admin/Popups/Edit.tsx": () => import("./assets/Edit-DIRi4ynx.js"), "./Pages/Admin/Popups/Index.tsx": () => import("./assets/Index-Cy0nJXwO.js"), "./Pages/Admin/PostCategories/Index.tsx": () => import("./assets/Index-BGgcG_W4.js"), "./Pages/Admin/Posts/Comments.tsx": () => import("./assets/Comments-Dyz9PQM4.js"), "./Pages/Admin/Posts/Create.tsx": () => import("./assets/Create-B2qnL4wB.js"), "./Pages/Admin/Posts/Edit.tsx": () => import("./assets/Edit-CT2B4_69.js"), "./Pages/Admin/Posts/Index.tsx": () => import("./assets/Index-DK9QajO6.js"), "./Pages/Admin/Products/Create.tsx": () => import("./assets/Create-DC10NawI.js"), "./Pages/Admin/Products/Edit.tsx": () => import("./assets/Edit-D6dyf9Xa.js"), "./Pages/Admin/Products/Index.tsx": () => import("./assets/Index-Dk9aeKUr.js"), "./Pages/Admin/Profile.tsx": () => import("./assets/Profile-BBwuRVqt.js"), "./Pages/Admin/QuoteRequests/Index.tsx": () => import("./assets/Index-Dh3x9PXZ.js"), "./Pages/Admin/Reviews/Index.tsx": () => import("./assets/Index-Sp9q7yA0.js"), "./Pages/Admin/Security/AccessControl.tsx": () => import("./assets/AccessControl-sTQysgtn.js"), "./Pages/Admin/Settings/Index.tsx": () => import("./assets/Index-BZSMBkHN.js"), "./Pages/Admin/Settings/Seo.tsx": () => import("./assets/Seo-BKSAInyl.js"), "./Pages/Admin/Staff/Create.tsx": () => import("./assets/Create-DadHb70O.js"), "./Pages/Admin/Staff/Edit.tsx": () => import("./assets/Edit-DUFhsk-v.js"), "./Pages/Admin/Staff/Index.tsx": () => import("./assets/Index-DAbTHgFh.js"), "./Pages/Admin/TelegramFaqs/Index.tsx": () => import("./assets/Index-BbeMEkSW.js"), "./Pages/Admin/Testimonials/Index.tsx": () => import("./assets/Index-CDtOv7Kh.js"), "./Pages/Admin/Themes/Customize.tsx": () => import("./assets/Customize-DRh33yoJ.js"), "./Pages/Admin/Themes/Index.tsx": () => import("./assets/Index-BQUIZX_3.js"), "./Pages/Admin/Users/Index.tsx": () => import("./assets/Index-DSgtt0_Q.js"), "./Pages/Auth/CmsLogin.tsx": () => import("./assets/CmsLogin-BKUmQfZ2.js"), "./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-DdbwmcV_.js"), "./Pages/Auth/Login.tsx": () => import("./assets/Login-DsUUqgkF.js"), "./Pages/Blog/Index.tsx": () => import("./assets/Index-B3QZjH6Z.js"), "./Pages/Blog/Show.tsx": () => import("./assets/Show-DAlKe_1X.js"), "./Pages/Cart/Index.tsx": () => import("./assets/Index-BwRPgGI6.js"), "./Pages/Checkout/Index.tsx": () => import("./assets/Index-OBFg_96U.js"), "./Pages/Customer/CompleteProfile.tsx": () => import("./assets/CompleteProfile-CGqt0OCX.js"), "./Pages/Customer/Dashboard.tsx": () => import("./assets/Dashboard-CUpEvGsi.js"), "./Pages/Customer/ManualOrderForm.tsx": () => import("./assets/ManualOrderForm-APqQs2b7.js"), "./Pages/Customer/Orders/Index.tsx": () => import("./assets/Index-PfuqsAdX.js"), "./Pages/Customer/Orders/MobileOrdersView.tsx": () => import("./assets/MobileOrdersView-DPEs2slp.js"), "./Pages/Customer/Orders/Show.tsx": () => import("./assets/Show-BW9gZxId.js"), "./Pages/Home.tsx": () => import("./assets/Home-uVBhYbbn.js"), "./Pages/Logistics/Contact.tsx": () => import("./assets/Contact-CSjVcmCn.js"), "./Pages/Logistics/HowItWorks.tsx": () => import("./assets/HowItWorks-7JFq5UwD.js"), "./Pages/Logistics/Product.tsx": () => import("./assets/Product-DqvN06Pm.js"), "./Pages/Logistics/ShippingRates.tsx": () => import("./assets/ShippingRates-CHUYMfBy.js"), "./Pages/Logistics/Track.tsx": () => import("./assets/Track-CbYIGd4n.js"), "./Pages/Logistics/Warehouses.tsx": () => import("./assets/Warehouses-BoDxn8ek.js"), "./Pages/Notifications.tsx": () => import("./assets/Notifications-DriKp1JB.js"), "./Pages/Page/Show.tsx": () => import("./assets/Show-GPtlMyxf.js"), "./Pages/PrivacyPolicy.tsx": () => import("./assets/PrivacyPolicy-CY9BXOIq.js"), "./Pages/Profile.tsx": () => import("./assets/Profile-CtyJvLjQ.js"), "./Pages/ProhibitedItems.tsx": () => import("./assets/ProhibitedItems-CrrpqkbE.js"), "./Pages/Public/Receipt.tsx": () => import("./assets/Receipt-C5NyIS9K.js"), "./Pages/Settings.tsx": () => import("./assets/Settings-DryTAV5U.js"), "./Pages/Shop/Index.tsx": () => import("./assets/Index-DhGk5FJ0.js"), "./Pages/Shop/Show.tsx": () => import("./assets/Show-j6QW53ue.js"), "./Pages/TermsOfService.tsx": () => import("./assets/TermsOfService-DQRiQVDZ.js") })),
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
