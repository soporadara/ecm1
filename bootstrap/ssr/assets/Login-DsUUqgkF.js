import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import { usePage, Head, Link, router } from "@inertiajs/react";
import axios from "axios";
import { Zap, ShieldCheck, Truck, Loader2, LockKeyhole, ArrowLeft, HelpCircle } from "lucide-react";
import { u as useTranslation } from "./useTranslation-_E1z7JpE.js";
import { M as MainLayout } from "./MainLayout-BSaLUdaW.js";
import { getGoogleRedirectResult, firebaseIsConfigured, signInWithGooglePopupOrRedirect } from "./firebase-BzEe5oE1.js";
import "framer-motion";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "firebase/app";
import "firebase/auth";
function TelegramWidget({ botUsername, onAuth }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current || !botUsername) return;
    window.onTelegramAuth = (user) => {
      onAuth(user);
    };
    containerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "12");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    containerRef.current.appendChild(script);
    return () => {
      delete window.onTelegramAuth;
    };
  }, [botUsername, onAuth]);
  return /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-1", children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: "telegram-widget-wrapper" }) });
}
function GoogleIcon() {
  return /* @__PURE__ */ jsxs("svg", { className: "h-5 w-5 shrink-0", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
    /* @__PURE__ */ jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
    /* @__PURE__ */ jsx("path", { fill: "#FBBC05", d: "M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" }),
    /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z" })
  ] });
}
function Login() {
  const { t, i18n } = useTranslation();
  const pageProps = usePage().props;
  const [mode, setMode] = useState(pageProps.initialMode === "signup" ? "signup" : "signin");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [signinForm, setSigninForm] = useState({ email: "", password: "", remember: true });
  const [signupMethod, setSignupMethod] = useState("email");
  const [countryCode, setCountryCode] = useState("+855");
  const [customCountryCode, setCustomCountryCode] = useState("+");
  const [signupForm, setSignupForm] = useState({ name: "", email: "", phone: "", password: "", passwordConfirmation: "", acceptTerms: false });
  const { telegram_bot_username } = pageProps;
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);
  useEffect(() => {
    let active = true;
    getGoogleRedirectResult().then(async (result) => {
      if (!active || !(result == null ? void 0 : result.user)) return;
      setLoading("google-signin");
      await completeBackendLogin(await result.user.getIdToken(), "signin");
    }).catch((authError) => {
      if (!active) return;
      setError(errorMessage(authError == null ? void 0 : authError.code));
    }).finally(() => active && setLoading(null));
    return () => {
      active = false;
    };
  }, []);
  const completeBackendLogin = async (idToken, intent, name) => {
    var _a;
    const response = await axios.post("/auth/firebase/session", {
      id_token: idToken,
      intent,
      name,
      locale: i18n.language
    }, {
      headers: {
        "X-App-Locale": i18n.language
      }
    });
    window.location.assign(((_a = response.data) == null ? void 0 : _a.next_url) || "/");
  };
  const errorMessage = (code) => {
    switch (code) {
      case "auth/popup-closed-by-user":
      case "auth/cancelled-popup-request":
        return t("login.error_cancelled");
      case "auth/popup-blocked":
        return t("login.error_popup_blocked");
      case "auth/unauthorized-domain":
        return t("login.error_unauthorized_domain");
      case "auth/network-request-failed":
        return t("login.error_network");
      case "auth/email-already-in-use":
        return t("login.error_email_exists");
      case "auth/invalid-email":
        return t("login.error_invalid_email");
      case "auth/invalid-login-credentials":
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return t("login.error_invalid_credentials");
      case "auth/weak-password":
        return t("login.error_weak_password");
      case "auth/not-configured":
        return t("login.error_not_configured");
      default:
        return t("login.error_backend");
    }
  };
  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError(null);
    window.history.replaceState({}, "", nextMode === "signup" ? "/register" : "/login");
  };
  const handleGoogle = async (intent) => {
    var _a, _b, _c, _d, _e, _f;
    setLoading(intent === "signin" ? "google-signin" : "google-signup");
    setError(null);
    try {
      const result = await signInWithGooglePopupOrRedirect();
      if (!(result == null ? void 0 : result.user)) return;
      await completeBackendLogin(await result.user.getIdToken(), intent);
    } catch (authError) {
      setError(((_b = (_a = authError == null ? void 0 : authError.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || ((_f = (_e = (_d = (_c = authError == null ? void 0 : authError.response) == null ? void 0 : _c.data) == null ? void 0 : _d.errors) == null ? void 0 : _e.id_token) == null ? void 0 : _f[0]) || errorMessage(authError == null ? void 0 : authError.code));
      setLoading(null);
    }
  };
  const handleTelegramWidgetAuth = async (user) => {
    var _a, _b;
    setLoading("email-signin");
    setError(null);
    try {
      const response = await axios.post("/api/auth/telegram-widget", user);
      if (response.data.success) {
        window.location.assign("/");
      }
    } catch (err) {
      setError(((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || "Telegram authentication failed.");
    } finally {
      setLoading(null);
    }
  };
  const submitSignIn = (event) => {
    event.preventDefault();
    setLoading("email-signin");
    setError(null);
    router.post("/login", {
      email: signinForm.email,
      password: signinForm.password,
      remember: signinForm.remember
    }, {
      preserveScroll: true,
      onError: (errors) => {
        setError(errors.email || errors.password || t("login.error_invalid_credentials"));
        setLoading(null);
      },
      onSuccess: () => {
        setLoading(null);
      }
    });
  };
  const [forcePhone, setForcePhone] = useState(false);
  const submitSignUp = (event) => {
    event.preventDefault();
    setError(null);
    if (signupMethod === "phone" && !forcePhone) {
      if (signupForm.phone.length > 0 && signupForm.phone.length < 7) {
        const confirmed = window.confirm("Are you sure this phone number is correct? It seems very short.");
        if (!confirmed) {
          return;
        }
        setForcePhone(true);
      }
    }
    if (signupForm.password !== signupForm.passwordConfirmation) {
      setError(t("login.error_password_mismatch"));
      return;
    }
    if (!signupForm.acceptTerms) {
      setError(t("login.error_terms_required"));
      return;
    }
    setLoading("email-signup");
    router.post("/register", {
      name: signupForm.name,
      email: signupMethod === "email" ? signupForm.email : "",
      phone: signupMethod === "phone" ? countryCode === "other" ? `${customCountryCode} ${signupForm.phone}` : `${countryCode} ${signupForm.phone}` : "",
      password: signupForm.password,
      password_confirmation: signupForm.passwordConfirmation
    }, {
      preserveScroll: true,
      onError: (errors) => {
        setError(errors.email || errors.phone || errors.password || errors.name || t("login.error_backend"));
        setLoading(null);
      },
      onSuccess: () => {
        setLoading(null);
      }
    });
  };
  const busy = loading !== null;
  return /* @__PURE__ */ jsxs(MainLayout, { title: mode === "signin" ? t("login.signin_title") : t("login.signup_title"), children: [
    /* @__PURE__ */ jsx(Head, { title: mode === "signin" ? t("login.signin_title") : t("login.signup_title") }),
    /* @__PURE__ */ jsx("div", { className: "customer-auth-page -mt-[var(--public-header-offset)] min-h-screen overflow-hidden bg-[#f8fafc] px-4 pb-10 pt-[calc(var(--public-header-offset)+1.5rem)] text-slate-950 antialiased transition-colors dark:bg-[#0f172a] dark:text-white sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid min-h-[calc(100vh-var(--public-header-offset)-3rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "relative hidden h-full min-h-[36rem] flex-col justify-center rounded-3xl bg-white p-10 shadow-[0_2px_40px_rgba(15,23,42,0.04)] ring-1 ring-slate-200/50 dark:bg-[#1e293b] dark:ring-white/10 lg:flex lg:p-14", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-white", children: /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "Logo", className: "h-8 w-8 object-contain" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-[0.3em] text-slate-400", children: t("login.customer_portal") })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "max-w-[20rem] text-4xl font-black leading-[1.15] tracking-tight text-slate-900 dark:text-white xl:text-5xl", children: t("login.visual_title") }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-[22rem] text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400", children: "Create requests faster and follow your shipment from review to delivery." }),
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
      /* @__PURE__ */ jsxs("section", { className: "flex w-full flex-col justify-center py-6 lg:py-8 lg:pl-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full rounded-2xl bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/50 dark:bg-[#1e293b] dark:ring-white/10 sm:p-10 lg:bg-transparent lg:p-0 lg:shadow-none lg:ring-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center gap-3 lg:hidden", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow ring-1 ring-slate-200 dark:bg-white", children: /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "Logo", className: "h-8 w-8 object-contain" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[0.65rem] font-black uppercase tracking-[0.3em] text-[#a3747d]", children: t("login.customer_portal") }),
              /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl", children: mode === "signin" ? t("login.signin_title") : t("login.signup_heading") })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8 grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => switchMode("signin"),
                className: `min-h-11 rounded-[1.25rem] px-7 text-sm font-black transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#a3747d]/25 ${mode === "signin" ? "bg-[#a3747d] text-white shadow-lg shadow-[#a3747d]/25" : "text-slate-500 hover:bg-[#f7eef0] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"}`,
                children: t("login.signin_tab")
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => switchMode("signup"),
                className: `min-h-[44px] rounded-lg text-sm font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 ${mode === "signup" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 hover:bg-white/60 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/50"}`,
                children: t("login.signup_tab")
              }
            )
          ] }),
          "    "
        ] }),
        error && /* @__PURE__ */ jsx("div", { className: "mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700 shadow-sm dark:border-red-400/30 dark:bg-red-500/12 dark:text-red-100", children: error }),
        !firebaseIsConfigured && /* @__PURE__ */ jsx("div", { className: "mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800 shadow-sm dark:border-amber-300/30 dark:bg-amber-400/12 dark:text-amber-100", children: t("login.error_not_configured") }),
        mode === "signin" ? /* @__PURE__ */ jsxs("form", { onSubmit: submitSignIn, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleGoogle("signin"),
              disabled: busy || !firebaseIsConfigured,
              className: "inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-[#a3747d]/50 hover:bg-[#fffafa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950",
              children: [
                loading === "google-signin" ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(GoogleIcon, {}),
                loading === "google-signin" ? t("login.loading") : t("login.continue_google")
              ]
            }
          ),
          telegram_bot_username && /* @__PURE__ */ jsx("div", { className: "flex justify-center pt-2 min-h-[58px]", children: /* @__PURE__ */ jsx(
            TelegramWidget,
            {
              botUsername: telegram_bot_username,
              onAuth: handleTelegramWidgetAuth
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500", children: [
            /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-slate-200 dark:bg-white/10" }),
            t("login.or_continue_email"),
            /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-slate-200 dark:bg-white/10" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: "Email address or phone number" }),
            /* @__PURE__ */ jsx("span", { className: "relative block", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: signinForm.email,
                onChange: (event) => setSigninForm({ ...signinForm, email: event.target.value }),
                className: "h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500",
                placeholder: "Email address or phone number",
                autoComplete: "username",
                required: true
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: t("login.password") }),
            /* @__PURE__ */ jsxs("span", { className: "relative block", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: signinForm.password,
                  onChange: (event) => setSigninForm({ ...signinForm, password: event.target.value }),
                  className: "h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500",
                  placeholder: t("login.password"),
                  autoComplete: "current-password",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(LockKeyhole, { className: "pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 text-xs", children: [
            /* @__PURE__ */ jsxs("label", { className: "inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 font-bold text-slate-500 dark:text-slate-300", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: signinForm.remember,
                  onChange: (event) => setSigninForm({ ...signinForm, remember: event.target.checked }),
                  className: "rounded border-slate-300 bg-white"
                }
              ),
              t("login.remember_me")
            ] }),
            /* @__PURE__ */ jsx(Link, { href: "/forgot-password", className: "font-black text-[#a3747d] hover:text-[#835d65] hover:underline", children: t("login.forgot_password") })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: busy || !firebaseIsConfigured,
              className: "inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#a3747d] px-5 text-sm font-black text-white shadow-md shadow-[#a3747d]/25 transition hover:-translate-y-0.5 hover:bg-[#8c626b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60",
              children: loading === "email-signin" ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : t("login.signin_button")
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "text-center text-xs font-semibold text-slate-500 dark:text-slate-300", children: [
            t("login.no_account"),
            " ",
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => switchMode("signup"), className: "font-black text-[#a3747d] hover:text-[#835d65] hover:underline", children: t("login.signup_tab") })
          ] })
        ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: submitSignUp, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleGoogle("signup"),
              disabled: busy || !firebaseIsConfigured,
              className: "inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-[#a3747d]/50 hover:bg-[#fffafa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950",
              children: [
                loading === "google-signup" ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(GoogleIcon, {}),
                loading === "google-signup" ? t("login.loading") : t("login.signup_google")
              ]
            }
          ),
          telegram_bot_username && /* @__PURE__ */ jsxs("div", { className: "flex justify-center pt-2 pb-1 min-h-[58px] relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex justify-center items-center pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "w-[220px] h-[40px] bg-slate-200 dark:bg-slate-700 animate-pulse rounded-full" }) }),
            /* @__PURE__ */ jsx("div", { className: "relative z-10 w-full flex justify-center", children: /* @__PURE__ */ jsx(
              TelegramWidget,
              {
                botUsername: telegram_bot_username,
                onAuth: handleTelegramWidgetAuth
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 py-1 text-sm font-bold text-slate-400 dark:text-slate-500", children: [
            /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-slate-200 dark:bg-white/10" }),
            t("login.or_signup_email"),
            /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-slate-200 dark:bg-white/10" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800 mb-2 mt-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setSignupMethod("email"),
                className: `flex-1 rounded-md py-1.5 text-xs font-bold transition-colors ${signupMethod === "email" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`,
                children: "Sign up with Email"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setSignupMethod("phone"),
                className: `flex-1 rounded-md py-1.5 text-xs font-bold transition-colors ${signupMethod === "phone" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`,
                children: "Sign up with Phone"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "block sm:col-span-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: t("login.full_name") }),
              /* @__PURE__ */ jsx("span", { className: "relative block", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: signupForm.name,
                  onChange: (event) => setSignupForm({ ...signupForm, name: event.target.value }),
                  className: "h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500",
                  placeholder: t("login.full_name_placeholder"),
                  autoComplete: "name",
                  required: true
                }
              ) })
            ] }),
            signupMethod === "email" ? /* @__PURE__ */ jsxs("label", { className: "block sm:col-span-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: t("login.email") }),
              /* @__PURE__ */ jsx("span", { className: "relative block", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  value: signupForm.email,
                  onChange: (event) => setSignupForm({ ...signupForm, email: event.target.value }),
                  className: "h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500",
                  placeholder: t("login.email"),
                  autoComplete: "email",
                  required: true
                }
              ) })
            ] }) : /* @__PURE__ */ jsxs("label", { className: "block sm:col-span-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: "Phone Number" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                countryCode === "other" ? /* @__PURE__ */ jsxs("div", { className: "relative h-[52px] w-[120px] shrink-0", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: customCountryCode,
                      onChange: (e) => setCustomCountryCode(e.target.value),
                      className: "h-full w-full rounded-xl border border-slate-200 bg-white pl-3 pr-8 text-sm font-bold text-slate-950 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                      placeholder: "+Code",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setCountryCode("+855"),
                      className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200",
                      children: /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                        /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                        /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                      ] })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: countryCode,
                    onChange: (e) => setCountryCode(e.target.value),
                    className: "h-[52px] w-[120px] shrink-0 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-950 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "+855", children: "🇰🇭 +855" }),
                      /* @__PURE__ */ jsx("option", { value: "+84", children: "🇻🇳 +84" }),
                      /* @__PURE__ */ jsx("option", { value: "+856", children: "🇱🇦 +856" }),
                      /* @__PURE__ */ jsx("option", { value: "+62", children: "🇮🇩 +62" }),
                      /* @__PURE__ */ jsx("option", { value: "other", children: "Other" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    value: signupForm.phone,
                    onChange: (event) => setSignupForm({ ...signupForm, phone: event.target.value }),
                    className: "h-[52px] flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500",
                    placeholder: "e.g. 12 345 678",
                    autoComplete: "tel",
                    required: true
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "block", children: [
              /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: t("login.password") }),
              /* @__PURE__ */ jsx("span", { className: "relative block", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: signupForm.password,
                  onChange: (event) => setSignupForm({ ...signupForm, password: event.target.value }),
                  className: "h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500",
                  placeholder: t("login.password"),
                  autoComplete: "new-password",
                  minLength: 8,
                  required: true
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "block", children: [
              /* @__PURE__ */ jsx("span", { className: "mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300", children: t("login.confirm_password") }),
              /* @__PURE__ */ jsx("span", { className: "relative block", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: signupForm.passwordConfirmation,
                  onChange: (event) => setSignupForm({ ...signupForm, passwordConfirmation: event.target.value }),
                  className: "h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500",
                  placeholder: t("login.confirm_password"),
                  autoComplete: "new-password",
                  minLength: 8,
                  required: true
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex min-h-[44px] cursor-pointer items-start gap-2.5 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-300", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: signupForm.acceptTerms,
                onChange: (event) => setSignupForm({ ...signupForm, acceptTerms: event.target.checked }),
                className: "mt-0.5 rounded border-slate-300 bg-white"
              }
            ),
            /* @__PURE__ */ jsxs("span", { children: [
              t("login.terms_prefix"),
              " ",
              /* @__PURE__ */ jsx(Link, { href: "/terms-of-service", className: "font-black text-[#a3747d] hover:text-[#835d65] hover:underline", children: t("login.terms") }),
              " ",
              t("login.and"),
              " ",
              /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", className: "font-black text-[#a3747d] hover:text-[#835d65] hover:underline", children: t("login.privacy") }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: busy || !firebaseIsConfigured,
              className: "inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#a3747d] px-5 text-sm font-black text-white shadow-md shadow-[#a3747d]/25 transition hover:-translate-y-0.5 hover:bg-[#8c626b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60",
              children: loading === "email-signup" ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : t("login.create_account")
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "text-center text-xs font-semibold text-slate-500 dark:text-slate-300", children: [
            t("login.have_account"),
            " ",
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => switchMode("signin"), className: "font-black text-[#a3747d] hover:text-[#835d65] hover:underline", children: t("login.signin_tab") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs(Link, { href: "/", className: "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 dark:border-white/10 dark:bg-white/10 dark:text-white/80", children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4", "aria-hidden": "true" }),
            t("login.back_home")
          ] }),
          /* @__PURE__ */ jsxs(Link, { href: "/contact", className: "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 dark:border-white/10 dark:bg-white/10 dark:text-white/80", children: [
            /* @__PURE__ */ jsx(HelpCircle, { className: "h-4 w-4", "aria-hidden": "true" }),
            t("login.contact_support")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" }),
          t("login.secure_note")
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Login as default
};
