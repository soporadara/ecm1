import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-ByoJzJm8.js";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import "react-dom";
import "lucide-react";
function MediaIndex({ media }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { data, setData, progress, reset } = useForm({
    files: []
  });
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const filesArray = Array.from(e.target.files);
      setData("files", filesArray);
      setTimeout(() => {
        router.post("/admin/media", { files: filesArray }, {
          forceFormData: true,
          onSuccess: () => toast.success("Files uploaded successfully"),
          onError: () => toast.error("Failed to upload files"),
          onFinish: () => {
            setUploading(false);
            reset();
            if (fileInputRef.current) fileInputRef.current.value = "";
          }
        });
      }, 50);
    }
  };
  const handleDelete = async (id) => {
    if (!await confirmAction("Delete this file permanently?")) return;
    router.delete(`/admin/media/${id}`, {
      onSuccess: () => toast.success("File deleted successfully"),
      onError: () => toast.error("Failed to delete file")
    });
  };
  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };
  return /* @__PURE__ */ jsxs(
    AdminLayout,
    {
      title: "Media Library",
      actions: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            multiple: true,
            className: "hidden",
            ref: fileInputRef,
            onChange: handleFileChange,
            accept: "image/*,video/*"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            disabled: uploading,
            className: "inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" }) }),
              uploading ? "Uploading..." : "Upload Files"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Media Library — Rafel CMS" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Media Library" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-0.5", children: "Manage your product images and other files." })
        ] }),
        uploading && progress && /* @__PURE__ */ jsxs("div", { className: "mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm font-medium mb-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-indigo-700 dark:text-white", children: "Uploading files..." }),
            /* @__PURE__ */ jsxs("span", { className: "text-indigo-700 dark:text-white", children: [
              progress.percentage,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2", children: /* @__PURE__ */ jsx("div", { className: "bg-indigo-600 h-2 rounded-full transition-all duration-300", style: { width: `${progress.percentage}%` } }) })
        ] }),
        media.data.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 border-dashed p-12 text-center shadow-sm", children: [
          /* @__PURE__ */ jsx("svg", { className: "mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "No media files" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Get started by uploading a file." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                var _a;
                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
              },
              className: "mt-4 text-sm font-medium text-indigo-600 dark:text-white hover:text-indigo-500 dark:hover:text-white",
              children: "Upload a file"
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4", children: media.data.map((file) => /* @__PURE__ */ jsxs("div", { className: "group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all", children: [
          /* @__PURE__ */ jsxs("div", { className: "aspect-square bg-gray-100 dark:bg-gray-900 relative overflow-hidden group-hover:opacity-90", children: [
            file.mime_type.startsWith("image/") ? /* @__PURE__ */ jsx("img", { src: file.url, alt: file.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1, d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => copyToClipboard(file.url),
                  className: "p-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-white",
                  title: "Copy URL",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: file.url,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "p-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-white",
                  title: "Open in new tab",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDelete(file.id),
                  className: "p-1.5 bg-white dark:bg-gray-800 text-red-600 dark:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50",
                  title: "Delete",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-gray-700 dark:text-gray-300 truncate", title: file.name, children: file.name }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 dark:text-gray-500 uppercase", children: file.mime_type.split("/")[1] }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-600", children: file.size })
            ] })
          ] })
        ] }, file.id)) }),
        media.last_page > 1 && /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center gap-2" })
      ]
    }
  );
}
export {
  MediaIndex as default
};
