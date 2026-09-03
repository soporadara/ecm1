import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-C3efSGPT.js";
import { ArrowLeft, FileText } from "lucide-react";
import "react";
import "framer-motion";
import "axios";
import "./useTranslation-CqoVm-kK.js";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function TermsOfService() {
  return /* @__PURE__ */ jsxs(MainLayout, { title: "Terms of Service", description: "Terms and conditions for using MVM Logistics", children: [
    /* @__PURE__ */ jsx(Head, { title: "Terms of Service - MVM Logistics" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-950 min-h-screen", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 px-5 pt-8 pb-4 shadow-sm sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => window.history.back(), className: "w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-brand-primary transition-colors", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-gray-950 dark:text-white", children: "Back" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "py-16 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center mb-16", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(FileText, { className: "w-8 h-8 text-brand-primary" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl font-serif", children: "Terms of Service" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400", children: "Effective Date: August 2026" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "prose prose-lg dark:prose-invert prose-brand mx-auto text-gray-600 dark:text-gray-400", children: [
          /* @__PURE__ */ jsx("h2", { children: "1. Agreement to Terms" }),
          /* @__PURE__ */ jsx("p", { children: "These Terms of Service constitute a legally binding agreement made between you and MVM Logistics concerning your access to and use of our website and cross-border logistics applications. By accessing our services, you agree that you have read, understood, and agreed to be bound by all of these Terms of Service." }),
          /* @__PURE__ */ jsx("h2", { children: "2. Logistics & Manual Order Services" }),
          /* @__PURE__ */ jsx("p", { children: 'MVM Logistics provides product purchasing and cross-border delivery services. When you create a "Manual Order," you are requesting us to purchase goods on your behalf and/or arrange for their transportation.' }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Estimates:" }),
              " Pricing and logistics fees shown during the manual order creation are estimates. Final costs are verified by our team and provided via receipts before final processing."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Prohibited Items:" }),
              " You agree not to use our services to transport illegal, hazardous, or restricted goods in accordance with Cambodian and international customs laws."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Customs & Duties:" }),
              " You are responsible for ensuring that the items you import comply with local regulations. MVM Logistics will assist in customs clearance where applicable, but any unforeseen duties or taxes remain your responsibility."
            ] })
          ] }),
          /* @__PURE__ */ jsx("h2", { children: "3. User Registration" }),
          /* @__PURE__ */ jsx("p", { children: "You may be required to register with the site. You agree to keep your password and Google Authentication credentials confidential. We reserve the right to remove, reclaim, or change a username you select if we determine that such username is inappropriate." }),
          /* @__PURE__ */ jsx("h2", { children: "4. Payment and Billing" }),
          /* @__PURE__ */ jsx("p", { children: "Payments for manual orders and logistics fees are currently handled offline. Our team will verify your request and provide payment instructions. Orders will not be fully processed or shipped until payment is confirmed." }),
          /* @__PURE__ */ jsx("h2", { children: "5. Modifications and Interruptions" }),
          /* @__PURE__ */ jsx("p", { children: "We reserve the right to change, modify, or remove the contents of our services at any time or for any reason at our sole discretion without notice. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the platform." }),
          /* @__PURE__ */ jsx("h2", { children: "6. Contact Information" }),
          /* @__PURE__ */ jsx("p", { children: "In order to resolve a complaint regarding the service or to receive further information regarding the use of the services, please contact us directly." })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  TermsOfService as default
};
