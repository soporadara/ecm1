import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, Underline as Underline$1, Strikethrough, Heading1, Heading2, Heading3, List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, AlignJustify, Link as Link$1, Image as Image$1 } from "lucide-react";
import toast from "react-hot-toast";
function RichTextEditor({ value, onChange }) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4 shadow-sm cursor-move inline-block"
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-brand-primary underline hover:text-brand-dark transition-colors"
        }
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      })
    ],
    content: value,
    onUpdate: ({ editor: editor2 }) => {
      onChange(editor2.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4"
      }
    }
  });
  const addImage = useCallback(() => {
    if (imageUrl.trim()) {
      editor == null ? void 0 : editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
      setIsImageModalOpen(false);
      setImageUrl("");
    }
  }, [editor, imageUrl]);
  const setLink = useCallback(() => {
    const previousUrl = editor == null ? void 0 : editor.getAttributes("link").href;
    const url = window.prompt("URL:", previousUrl);
    if (url === null) {
      return;
    }
    if (url === "") {
      editor == null ? void 0 : editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor == null ? void 0 : editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);
  if (!editor) {
    return null;
  }
  const ToolbarButton = ({ onClick, isActive = false, icon: Icon, title }) => /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      title,
      className: `p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isActive ? "bg-gray-200 dark:bg-gray-600 text-brand-primary" : "text-gray-600 dark:text-gray-300"}`,
      children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" })
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-sm focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all relative", children: [
    isImageModalOpen && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 dark:text-white mb-2", children: "Insert Image" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-4", children: "Enter the URL of the image you want to insert. Once inserted, you can align it using the text alignment tools and drag it around." }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "url",
          className: "w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-brand-primary focus:border-brand-primary",
          placeholder: "https://example.com/image.jpg",
          value: imageUrl,
          onChange: (e) => setImageUrl(e.target.value),
          autoFocus: true,
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addImage();
            }
          }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsImageModalOpen(false), className: "px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: addImage, className: "px-4 py-2 rounded-lg font-medium bg-brand-primary text-white hover:bg-brand-secondary", children: "Insert" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 flex flex-wrap gap-1 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 mr-1", children: [
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive("bold"),
            icon: Bold,
            title: "Bold"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive("italic"),
            icon: Italic,
            title: "Italic"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleUnderline().run(),
            isActive: editor.isActive("underline"),
            icon: Underline$1,
            title: "Underline"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleStrike().run(),
            isActive: editor.isActive("strike"),
            icon: Strikethrough,
            title: "Strikethrough"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 mr-1", children: [
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editor.isActive("heading", { level: 1 }),
            icon: Heading1,
            title: "Heading 1"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive("heading", { level: 2 }),
            icon: Heading2,
            title: "Heading 2"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: editor.isActive("heading", { level: 3 }),
            icon: Heading3,
            title: "Heading 3"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 mr-1", children: [
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive("bulletList"),
            icon: List,
            title: "Bullet List"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive("orderedList"),
            icon: ListOrdered,
            title: "Ordered List"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: editor.isActive("blockquote"),
            icon: Quote,
            title: "Blockquote"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 mr-1", children: [
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            isActive: editor.isActive({ textAlign: "left" }),
            icon: AlignLeft,
            title: "Align Left"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            isActive: editor.isActive({ textAlign: "center" }),
            icon: AlignCenter,
            title: "Align Center"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            isActive: editor.isActive({ textAlign: "right" }),
            icon: AlignRight,
            title: "Align Right"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().setTextAlign("justify").run(),
            isActive: editor.isActive({ textAlign: "justify" }),
            icon: AlignJustify,
            title: "Justify"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: setLink,
            isActive: editor.isActive("link"),
            icon: Link$1,
            title: "Insert Link"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => setIsImageModalOpen(true),
            isActive: isImageModalOpen,
            icon: Image$1,
            title: "Insert Image"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 min-h-[300px] max-h-[600px] overflow-y-auto cursor-text", onClick: () => editor.commands.focus(), children: /* @__PURE__ */ jsx(EditorContent, { editor }) })
  ] });
}
function ImageUploader({ onUploadSuccess }) {
  const [uploads, setUploads] = useState([]);
  const fileInputRef = useRef(null);
  const handleFiles = (files) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        return;
      }
      const id = Math.random().toString(36).substring(7);
      const newUpload = { id, file, progress: 0 };
      setUploads((prev) => [newUpload, ...prev]);
      uploadFile(newUpload);
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const uploadFile = async (uploadInfo) => {
    var _a, _b;
    const formData = new FormData();
    formData.append("image", uploadInfo.file);
    try {
      const response = await window.axios.post("/admin/posts/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
            setUploads((prev) => prev.map((u) => u.id === uploadInfo.id ? { ...u, progress: percentCompleted } : u));
          }
        }
      });
      const url = response.data.url;
      setUploads((prev) => prev.map((u) => u.id === uploadInfo.id ? { ...u, progress: 100, url } : u));
      onUploadSuccess(url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      const errorMessage = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Upload failed";
      setUploads((prev) => prev.map((u) => u.id === uploadInfo.id ? { ...u, error: errorMessage } : u));
      toast.error(errorMessage);
    }
  };
  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };
  const removeUpload = (id) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group",
        onClick: () => {
          var _a;
          return (_a = fileInputRef.current) == null ? void 0 : _a.click();
        },
        onDragOver: (e) => e.preventDefault(),
        onDrop: (e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        },
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              ref: fileInputRef,
              className: "hidden",
              multiple: true,
              accept: "image/*",
              onChange: (e) => handleFiles(e.target.files)
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "p-4 bg-white dark:bg-gray-700 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-brand-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" }) }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[15px] font-bold text-gray-900 dark:text-gray-200", children: "Click or drag images here to upload" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2 font-medium", children: "Images are uploaded instantly. Max size: 5MB" })
        ]
      }
    ),
    uploads.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-4", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider", children: "Upload Progress & Links" }),
      uploads.map((upload) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-3.5 rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "w-14 h-14 shrink-0 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-100 dark:border-gray-700", children: upload.url ? /* @__PURE__ */ jsx("img", { src: upload.url, className: "w-full h-full object-cover", alt: "Preview" }) : /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-gray-300 dark:text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-gray-100 truncate pr-4", children: upload.file.name }),
            !upload.url && !upload.error && /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-brand-primary", children: [
              upload.progress,
              "%"
            ] })
          ] }),
          !upload.url && !upload.error && /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mt-1.5 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "bg-brand-primary h-full rounded-full transition-all duration-300", style: { width: `${upload.progress}%` } }) }),
          upload.error && /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-red-500 mt-1", children: upload.error }),
          upload.url && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
            /* @__PURE__ */ jsx("input", { type: "text", readOnly: true, value: upload.url, className: "text-[13px] w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-primary", onClick: (e) => e.target.select() }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => copyToClipboard(upload.url), className: "shrink-0 text-[13px] font-bold bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary px-4 py-1.5 rounded-lg transition-colors", children: "Copy" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeUpload(upload.id), className: "shrink-0 text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800", title: "Dismiss", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) })
      ] }, upload.id))
    ] })
  ] });
}
export {
  ImageUploader as I,
  RichTextEditor as R
};
