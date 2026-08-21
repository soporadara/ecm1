import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-3Zrdf8uE.js";
import toast from "react-hot-toast";
import "react-dom";
import "lucide-react";
function Comments({ post, comments }) {
  const [replyingTo, setReplyingTo] = useState(null);
  const { data, setData, post: submitReply, processing, reset } = useForm({
    admin_reply: ""
  });
  const handleDelete = async (id) => {
    if (await confirmAction("Are you sure you want to delete this comment?")) {
      router.delete(`/admin/comments/${id}`, {
        onSuccess: () => toast.success("Comment deleted successfully")
      });
    }
  };
  const handleReplyClick = (comment) => {
    setReplyingTo(comment);
    setData("admin_reply", comment.admin_reply || "");
  };
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyingTo) return;
    submitReply(`/admin/comments/${replyingTo.id}/reply`, {
      onSuccess: () => {
        setReplyingTo(null);
        reset();
        toast.success("Reply saved successfully!");
      }
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: `Comments - ${post.title}`, children: [
    /* @__PURE__ */ jsx(Head, { title: `Comments for ${post.title}` }),
    /* @__PURE__ */ jsx("div", { className: "mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Link, { href: "/admin/posts", className: "text-gray-500 hover:text-brand-primary transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white line-clamp-1", children: [
          "Comments: ",
          post.title
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Manage customer comments on this blog post." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-800/50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Author" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Review Title" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Comment" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Date" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900", children: comments.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "px-6 py-12 text-center text-gray-500 dark:text-gray-400", children: "No comments found for this post." }) }) : comments.map((comment) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors", children: [
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: comment.name }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: comment.email }),
          comment.website && /* @__PURE__ */ jsx("a", { href: comment.website, target: "_blank", rel: "noopener noreferrer", className: "text-xs text-brand-primary hover:underline", children: comment.website })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-900 dark:text-gray-300 font-medium", children: comment.review_title || /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "None" }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs whitespace-pre-wrap", children: [
          comment.content,
          comment.admin_reply && /* @__PURE__ */ jsxs("div", { className: "mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold text-brand-primary text-xs uppercase block mb-1", children: "Your Reply:" }),
            comment.admin_reply
          ] })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap", children: new Date(comment.created_at).toLocaleDateString() }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-right space-x-3 whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => handleReplyClick(comment), className: "text-brand-primary hover:text-brand-secondary font-medium transition-colors text-sm", children: "Reply" }),
          /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(comment.id), className: "text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-medium transition-colors text-sm", children: "Delete" })
        ] })
      ] }, comment.id)) })
    ] }) }) }),
    replyingTo && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-900 dark:text-white", children: [
          "Reply to ",
          replyingTo.name
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setReplyingTo(null), className: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 overflow-y-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300", children: [
          '"',
          replyingTo.content,
          '"'
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleReplySubmit, children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2", children: "Your Reply" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 5,
                className: "w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-brand-primary",
                placeholder: "Type your reply here...",
                value: data.admin_reply,
                onChange: (e) => setData("admin_reply", e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setReplyingTo(null), className: "px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-colors", children: "Cancel" }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary text-sm font-bold transition-colors disabled:opacity-50", children: processing ? "Saving..." : "Save Reply" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Comments as default
};
