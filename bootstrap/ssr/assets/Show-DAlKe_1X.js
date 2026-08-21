import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { M as MainLayout } from "./MainLayout-BSaLUdaW.js";
import toast from "react-hot-toast";
import "react";
import "framer-motion";
import "axios";
import "lucide-react";
import "./useTranslation-_E1z7JpE.js";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "./firebase-BzEe5oE1.js";
import "firebase/app";
import "firebase/auth";
function Show({ post, relatedPosts, categories = [] }) {
  const { data, setData, post: submitForm, processing, reset, errors } = useForm({
    name: "",
    email: "",
    website: "",
    review_title: "",
    content: ""
  });
  const submitComment = (e) => {
    e.preventDefault();
    submitForm(`/blog/${post.id}/comments`, {
      onSuccess: () => {
        reset();
        toast.success("Your comment has been posted successfully!");
      }
    });
  };
  return /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: post.seo_title || post.title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: post.seo_description || "" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-[#f9fafb] dark:bg-gray-950 min-h-screen py-16 transition-colors", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:w-[68%]", children: [
        /* @__PURE__ */ jsx("article", { className: "bg-white dark:bg-gray-900 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-800 mb-10 transition-colors clearfix", children: /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-12", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 text-[#ef5a3d] text-sm font-medium mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
            new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
          ] }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-[#1e293b] dark:text-white leading-tight mb-8", children: post.title }),
          /* @__PURE__ */ jsx("div", { className: "prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-light clear-left", children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: post.content } }) })
        ] }) }),
        post.comments && post.comments.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-[24px] font-bold text-[#0B152A] dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4", children: [
            post.comments.length,
            " ",
            post.comments.length === 1 ? "Comment" : "Comments"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: post.comments.map((comment) => /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-gray-500 dark:text-gray-400", children: comment.name.charAt(0).toUpperCase() }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start mb-2", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-[#1e293b] dark:text-white", children: comment.name }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: new Date(comment.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) })
              ] }) }),
              comment.review_title && /* @__PURE__ */ jsx("h5", { className: "text-md font-bold text-[#1e293b] dark:text-gray-300 mt-2 mb-1", children: comment.review_title }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap leading-relaxed", children: comment.content }),
              comment.admin_reply && /* @__PURE__ */ jsx("div", { className: "mt-6 p-5 bg-[#f8fafc] dark:bg-gray-950 rounded-xl border-l-4 border-[#ef5a3d]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-[#ef5a3d]", children: "Response from Admin" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap leading-relaxed", children: comment.admin_reply })
              ] }) })
            ] })
          ] }) }, comment.id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12 transition-colors", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-[28px] font-bold text-[#0B152A] dark:text-white mb-8", children: "Leave A Comment" }),
          /* @__PURE__ */ jsxs("form", { className: "space-y-6", onSubmit: submitComment, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Review Title (Optional)",
                  value: data.review_title,
                  onChange: (e) => setData("review_title", e.target.value),
                  className: "w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-md px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                }
              ),
              errors.review_title && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.review_title })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  placeholder: "Write Your Comment....",
                  rows: 10,
                  required: true,
                  value: data.content,
                  onChange: (e) => setData("content", e.target.value),
                  className: "w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-md px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white resize-y"
                }
              ),
              errors.content && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.content })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Name",
                    required: true,
                    value: data.name,
                    onChange: (e) => setData("name", e.target.value),
                    className: "w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-md px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    placeholder: "Email",
                    required: true,
                    value: data.email,
                    onChange: (e) => setData("email", e.target.value),
                    className: "w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-md px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                  }
                ),
                errors.email && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Website (optional)",
                    value: data.website,
                    onChange: (e) => setData("website", e.target.value),
                    className: "w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-md px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                  }
                ),
                errors.website && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.website })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mt-4 mb-2", children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", id: "save-info", className: "mt-1 w-4 h-4 text-[#ef5a3d] border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded focus:ring-[#ef5a3d]" }),
              /* @__PURE__ */ jsx("label", { htmlFor: "save-info", className: "text-[15px] text-gray-600 dark:text-gray-400 leading-snug", children: "Save my name, email, and website in this browser for the next time I comment." })
            ] }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", { disabled: processing, type: "submit", className: "bg-[#ef5a3d] hover:bg-[#d94b2f] text-white font-medium px-8 py-3.5 rounded-md transition-colors text-lg disabled:opacity-50", children: processing ? "Posting..." : "Post Comment" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "lg:w-[32%] flex flex-col gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[18px] font-bold text-[#1e293b] dark:text-white mb-5", children: "Categories" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: categories.map((cat) => /* @__PURE__ */ jsxs(Link, { href: `/blog?category=${cat.slug}`, className: "flex items-center justify-between group", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#64748b] dark:text-gray-400 group-hover:text-[#ef5a3d] dark:group-hover:text-[#ef5a3d] transition-colors", children: cat.name }),
            /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#f8fafc] dark:bg-gray-800 text-[#64748b] dark:text-gray-400 px-2.5 py-1 rounded-md", children: cat.posts_count })
          ] }, cat.id)) })
        ] }),
        relatedPosts && relatedPosts.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[18px] font-bold text-[#1e293b] dark:text-white mb-6", children: "Related Posts" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-5", children: relatedPosts.map((related) => /* @__PURE__ */ jsxs(Link, { href: `/blog/${related.slug}`, className: "flex gap-4 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[85px] h-[85px] shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800", children: related.image && /* @__PURE__ */ jsx("img", { src: related.image, alt: related.title, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center flex-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-[#ef5a3d] mb-1", children: new Date(related.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }),
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#1e293b] dark:text-gray-200 text-sm leading-snug line-clamp-2 group-hover:text-[#ef5a3d] transition-colors", children: related.title })
            ] })
          ] }, related.id)) })
        ] }),
        post.tags && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[18px] font-bold text-[#1e293b] dark:text-white mb-5", children: "Tags" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: post.tags.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag, i) => /* @__PURE__ */ jsx("span", { className: "inline-block border border-gray-200 dark:border-gray-700 text-[#64748b] dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs font-medium px-3.5 py-1.5 rounded-md", children: tag }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[18px] font-bold text-[#1e293b] dark:text-white mb-5", children: "Follow Us" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsx("a", { href: "https://www.facebook.com/MVMLogistics", target: "_blank", rel: "noreferrer", title: "Facebook", className: "w-11 h-11 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) }) }),
            /* @__PURE__ */ jsx("a", { href: "https://m.me/MVMLogistics", target: "_blank", rel: "noreferrer", title: "Messenger", className: "w-11 h-11 rounded-full bg-[#00B2FF] text-white flex items-center justify-center hover:opacity-90 transition-opacity", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.477 2 2 6.14 2 11.246c0 2.9 1.455 5.485 3.738 7.152v3.655l3.414-1.87c.895.253 1.85.39 2.848.39 5.523 0 10-4.14 10-9.246S17.523 2 12 2zm1.096 12.433l-2.825-3.02-5.503 3.02 6.044-6.425 2.89 3.02 5.438-3.02-6.044 6.425z" }) }) }),
            /* @__PURE__ */ jsx("a", { href: "https://t.me/mvmlogistic", target: "_blank", rel: "noreferrer", title: "Telegram", className: "w-11 h-11 rounded-full bg-[#26A5E4] text-white flex items-center justify-center hover:opacity-90 transition-opacity", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" }) }) }),
            /* @__PURE__ */ jsx("a", { href: "https://zalo.me/0813308055", target: "_blank", rel: "noreferrer", title: "Zalo", className: "w-11 h-11 rounded-full bg-[#0068FF] text-white flex items-center justify-center hover:opacity-90 transition-opacity", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M21.547 5.767a9.208 9.208 0 0 0-3.328-3.342C16.32 1.347 14.184.75 12 .75c-2.185 0-4.321.597-5.918 1.675a9.208 9.208 0 0 0-3.328 3.342c-1.373 2.378-1.884 5.253-1.442 8.125a10.038 10.038 0 0 0 2.457 5.378l-1.391 3.51a.63.63 0 0 0 .809.805l3.585-1.343a10.024 10.024 0 0 0 5.228 1.458c2.185 0 4.321-.597 5.918-1.675a9.208 9.208 0 0 0 3.328-3.342c1.373-2.378 1.884-5.253 1.442-8.125a10.038 10.038 0 0 0-1.14-4.791zm-4.707 9.475a.916.916 0 0 1-.926.918H8.084a.916.916 0 0 1-.926-.918v-1.12c0-.507.414-.918.926-.918h1.86v-1.285H8.084a.916.916 0 0 1-.926-.918V9.882c0-.508.414-.918.926-.918h7.83a.916.916 0 0 1 .926.918v1.12a.916.916 0 0 1-.926.918h-1.86v1.285h1.86a.916.916 0 0 1 .926.918v1.12z" }) }) })
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  Show as default
};
