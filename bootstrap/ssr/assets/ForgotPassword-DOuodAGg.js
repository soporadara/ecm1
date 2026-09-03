import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Head, Link, router } from "@inertiajs/react";
import axios from "axios";
import { M as MainLayout } from "./MainLayout-C3efSGPT.js";
import { Zap, ShieldCheck, Truck, Loader2 } from "lucide-react";
import "framer-motion";
import "./useTranslation-CqoVm-kK.js";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function ForgotPassword() {
  const [forgotStep, setForgotStep] = useState("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPin, setForgotPin] = useState(["", "", "", "", "", ""]);
  const [forgotPassword, setForgotPassword] = useState("");
  const [forgotPasswordConfirmation, setForgotPasswordConfirmation] = useState("");
  const [forgotMessage, setForgotMessage] = useState(null);
  const [forgotError, setForgotError] = useState(null);
  const [forgotLoading, setForgotLoading] = useState(false);
  const pinRefs = useRef([]);
  const handlePinChange = (index, value) => {
    var _a;
    if (!/^\d?$/.test(value)) return;
    const newPin = [...forgotPin];
    newPin[index] = value;
    setForgotPin(newPin);
    if (value && index < 5) {
      (_a = pinRefs.current[index + 1]) == null ? void 0 : _a.focus();
    }
  };
  const handlePinKeyDown = (index, e) => {
    var _a;
    if (e.key === "Backspace" && !forgotPin[index] && index > 0) {
      (_a = pinRefs.current[index - 1]) == null ? void 0 : _a.focus();
    }
  };
  const submitForgotEmail = async (event) => {
    var _a, _b, _c, _d, _e, _f;
    event.preventDefault();
    setForgotLoading(true);
    setForgotMessage(null);
    setForgotError(null);
    try {
      const response = await axios.post("/forgot-password/send-pin", { email: forgotEmail });
      setForgotStep("pin");
      setForgotMessage(response.data.message || "A 6-digit PIN has been sent to your email.");
    } catch (err) {
      setForgotError(((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || ((_f = (_e = (_d = (_c = err.response) == null ? void 0 : _c.data) == null ? void 0 : _d.errors) == null ? void 0 : _e.email) == null ? void 0 : _f[0]) || "Failed to send PIN.");
    } finally {
      setForgotLoading(false);
    }
  };
  const submitForgotPin = async (event) => {
    var _a, _b, _c, _d, _e, _f, _g;
    event.preventDefault();
    const fullPin = forgotPin.join("");
    if (fullPin.length !== 6) {
      setForgotError("Please enter all 6 digits of the PIN.");
      return;
    }
    setForgotLoading(true);
    setForgotMessage(null);
    setForgotError(null);
    try {
      await axios.post("/forgot-password/verify-pin", { email: forgotEmail, pin: fullPin });
      setForgotStep("password");
      setForgotMessage("PIN verified. Please enter your new password.");
    } catch (err) {
      setForgotError(((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || ((_f = (_e = (_d = (_c = err.response) == null ? void 0 : _c.data) == null ? void 0 : _d.errors) == null ? void 0 : _e.pin) == null ? void 0 : _f[0]) || "Invalid PIN.");
      setForgotPin(["", "", "", "", "", ""]);
      (_g = pinRefs.current[0]) == null ? void 0 : _g.focus();
    } finally {
      setForgotLoading(false);
    }
  };
  const submitForgotPassword = async (event) => {
    var _a, _b, _c, _d, _e, _f;
    event.preventDefault();
    setForgotLoading(true);
    setForgotMessage(null);
    setForgotError(null);
    try {
      await axios.post("/forgot-password/reset", {
        email: forgotEmail,
        pin: forgotPin.join(""),
        password: forgotPassword,
        password_confirmation: forgotPasswordConfirmation
      });
      setForgotMessage("Password reset successfully!");
      setTimeout(() => {
        router.visit("/login");
      }, 2e3);
    } catch (err) {
      setForgotError(((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || ((_f = (_e = (_d = (_c = err.response) == null ? void 0 : _c.data) == null ? void 0 : _d.errors) == null ? void 0 : _e.password) == null ? void 0 : _f[0]) || "Failed to reset password.");
    } finally {
      setForgotLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(MainLayout, { title: "Forgot Password", children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "customer-auth-page -mt-[var(--public-header-offset)] min-h-screen overflow-hidden bg-[#f8fafc] px-4 pb-10 pt-[calc(var(--public-header-offset)+1.5rem)] text-slate-950 antialiased transition-colors dark:bg-[#0f172a] dark:text-white sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid min-h-[calc(100vh-var(--public-header-offset)-3rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "relative hidden h-full min-h-[36rem] flex-col justify-center rounded-3xl bg-white p-10 shadow-[0_2px_40px_rgba(15,23,42,0.04)] ring-1 ring-slate-200/50 dark:bg-[#1e293b] dark:ring-white/10 lg:flex lg:p-14", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-white", children: /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "Logo", className: "h-8 w-8 object-contain" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-[0.3em] text-slate-400", children: "Customer Portal" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "max-w-[20rem] text-4xl font-black leading-[1.15] tracking-tight text-slate-900 dark:text-white xl:text-5xl", children: "Reset Your Password" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-[22rem] text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400", children: "Regain access to manual orders, tracking, and logistics receipts securely." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300", children: [
            /* @__PURE__ */ jsx(Zap, { className: "h-4 w-4 text-blue-500" }),
            " Fast"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-blue-500" }),
            " Secure"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300", children: [
            /* @__PURE__ */ jsx(Truck, { className: "h-4 w-4 text-blue-500" }),
            " Track"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "flex w-full flex-col justify-center py-6 lg:py-8 lg:pl-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full rounded-2xl bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/50 dark:bg-[#1e293b] dark:ring-white/10 sm:p-10 lg:bg-transparent lg:p-0 lg:shadow-none lg:ring-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center gap-3 lg:hidden", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow ring-1 ring-slate-200 dark:bg-white", children: /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "Logo", className: "h-8 w-8 object-contain" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[0.65rem] font-black uppercase tracking-[0.3em] text-[#a3747d]", children: "Customer Portal" }),
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl", children: "Forgot Password" })
          ] })
        ] }),
        forgotError && /* @__PURE__ */ jsx("div", { className: "mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700 shadow-sm dark:border-red-400/30 dark:bg-red-500/12 dark:text-red-100", children: forgotError }),
        forgotMessage && /* @__PURE__ */ jsx("div", { className: "mb-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700 shadow-sm dark:border-green-400/30 dark:bg-green-500/12 dark:text-green-100", children: forgotMessage }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-slate-900 dark:text-white mb-2", children: "Reset Password" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-slate-500 dark:text-slate-400", children: [
            forgotStep === "email" && "Enter your email address to receive a 6-digit verification PIN.",
            forgotStep === "pin" && "We sent a 6-digit PIN to your email. Please enter it below.",
            forgotStep === "password" && "Create a new password for your account."
          ] })
        ] }),
        forgotStep === "email" && /* @__PURE__ */ jsxs("form", { onSubmit: submitForgotEmail, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: "Email Address" }),
            /* @__PURE__ */ jsx("span", { className: "relative block", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: forgotEmail,
                onChange: (e) => setForgotEmail(e.target.value),
                className: "h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500",
                placeholder: "Enter your email",
                required: true
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: forgotLoading,
              className: "inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#a3747d] px-5 text-sm font-black text-white shadow-md shadow-[#a3747d]/25 transition hover:-translate-y-0.5 hover:bg-[#8c626b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60",
              children: forgotLoading ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : "Send PIN"
            }
          )
        ] }),
        forgotStep === "pin" && /* @__PURE__ */ jsxs("form", { onSubmit: submitForgotPin, className: "space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-between gap-2", children: forgotPin.map((digit, index) => /* @__PURE__ */ jsx(
            "input",
            {
              ref: (el) => pinRefs.current[index] = el,
              type: "text",
              maxLength: 1,
              value: digit,
              onChange: (e) => handlePinChange(index, e.target.value),
              onKeyDown: (e) => handlePinKeyDown(index, e),
              className: "w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-200 bg-white shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white"
            },
            index
          )) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: forgotLoading || forgotPin.join("").length !== 6,
              className: "inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#a3747d] px-5 text-sm font-black text-white shadow-md shadow-[#a3747d]/25 transition hover:-translate-y-0.5 hover:bg-[#8c626b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60",
              children: forgotLoading ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : "Verify PIN"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "text-center mt-4", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setForgotStep("email"),
              className: "text-xs font-bold text-slate-500 hover:text-[#a3747d] transition-colors",
              children: "Try a different email"
            }
          ) })
        ] }),
        forgotStep === "password" && /* @__PURE__ */ jsxs("form", { onSubmit: submitForgotPassword, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: "New Password" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                value: forgotPassword,
                onChange: (e) => setForgotPassword(e.target.value),
                className: "h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: "Confirm New Password" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                value: forgotPasswordConfirmation,
                onChange: (e) => setForgotPasswordConfirmation(e.target.value),
                className: "h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: forgotLoading || !forgotPassword || forgotPassword !== forgotPasswordConfirmation,
              className: "inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#a3747d] px-5 text-sm font-black text-white shadow-md shadow-[#a3747d]/25 transition hover:-translate-y-0.5 hover:bg-[#8c626b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60",
              children: forgotLoading ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : "Reset Password"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 text-center border-t border-slate-200 dark:border-slate-800 pt-6", children: /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-slate-500 dark:text-slate-300", children: [
          "Remembered your password?",
          " ",
          /* @__PURE__ */ jsx(Link, { href: "/login", className: "font-black text-[#a3747d] hover:text-[#835d65] hover:underline", children: "Sign In" })
        ] }) })
      ] }) })
    ] }) })
  ] });
}
export {
  ForgotPassword as default
};
