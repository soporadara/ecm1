import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-BSaLUdaW.js";
import { Shield } from "lucide-react";
import "react";
import "framer-motion";
import "axios";
import "./useTranslation-_E1z7JpE.js";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function PrivacyPolicy() {
  return /* @__PURE__ */ jsxs(MainLayout, { title: "Privacy Policy", description: "How MVM Logistics protects your data", children: [
    /* @__PURE__ */ jsx(Head, { title: "Privacy Policy - MVM Logistics" }),
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-950 py-16 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(Shield, { className: "w-8 h-8 text-brand-primary" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl font-serif", children: "Privacy Policy" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400", children: "Effective Date: August 2026" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-lg dark:prose-invert prose-brand mx-auto text-gray-600 dark:text-gray-400", children: [
        /* @__PURE__ */ jsx("h2", { children: "1. Introduction" }),
        /* @__PURE__ */ jsx("p", { children: 'Welcome to MVM Logistics ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our cross-border logistics services, or request product purchasing on our platform.' }),
        /* @__PURE__ */ jsx("h2", { children: "2. Information We Collect" }),
        /* @__PURE__ */ jsx("p", { children: "We collect personal information that you voluntarily provide to us when registering for an account, expressing an interest in obtaining information about our services, or participating in activities on our platform. The personal information we collect may include the following:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Personal Details:" }),
            " Name, email address, phone numbers (including WhatsApp/Telegram), and customer ID."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Shipping Information:" }),
            " Delivery addresses, billing addresses, and cross-border destination details."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Order Information:" }),
            " Details regarding the products you request us to purchase on your behalf, receipts, and order statuses."
          ] })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "3. How We Use Your Information" }),
        /* @__PURE__ */ jsx("p", { children: "We use personal information collected via our platform for a variety of business purposes described below:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "To facilitate account creation and logon process through Google Firebase Authentication." }),
          /* @__PURE__ */ jsx("li", { children: "To fulfill and manage your logistics and manual orders, payments, and receipts." }),
          /* @__PURE__ */ jsx("li", { children: "To communicate with you regarding your shipments, delays, customs clearance, or delivery updates." }),
          /* @__PURE__ */ jsx("li", { children: "To provide customer support and respond to your inquiries." })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "4. Sharing Your Information" }),
        /* @__PURE__ */ jsx("p", { children: "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. Specifically, we may need to process your data or share your personal information with third-party delivery partners, customs agencies, and warehousing operators required to complete your cross-border shipments." }),
        /* @__PURE__ */ jsx("h2", { children: "5. Data Security" }),
        /* @__PURE__ */ jsx("p", { children: "We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. Your authentication data is securely managed by Google Firebase Authentication." }),
        /* @__PURE__ */ jsx("h2", { children: "6. Contact Us" }),
        /* @__PURE__ */ jsx("p", { children: "If you have questions or comments about this notice, you may contact our customer support team or reach out to us via Telegram or WhatsApp." })
      ] })
    ] }) })
  ] });
}
export {
  PrivacyPolicy as default
};
