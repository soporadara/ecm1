import { jsx, jsxs } from "react/jsx-runtime";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Bold, Italic, Underline as Underline$1, Strikethrough, Heading1, Heading2, Heading3, Heading4, Heading5, List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, AlignJustify, Link as Link$1, Image as Image$1, Undo, Redo } from "lucide-react";
import { Extension } from "@tiptap/core";
import { TextStyle } from "@tiptap/extension-text-style";
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontSize: (fontSize) => ({ chain }) => {
        return chain().setMark("textStyle", { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-brand-primary underline" } }),
      Image.configure({ inline: true }),
      TextStyle,
      FontSize
    ],
    content: value,
    onUpdate: ({ editor: editor2 }) => {
      onChange(editor2.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4 bg-admin-bg text-admin-text"
      }
    }
  });
  if (!editor) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-[400px] bg-gray-50 dark:bg-gray-900 animate-pulse rounded-xl border border-gray-200 dark:border-gray-700" });
  }
  const toggleLink = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };
  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
  const MenuButton = ({ isActive, onClick, children }) => /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      className: `p-2 rounded-lg transition-colors ${isActive ? "bg-admin-primary/10 text-admin-primary" : "text-admin-text-muted hover:bg-admin-surface-muted hover:text-admin-text"}`,
      children
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: "border border-admin-border rounded-xl overflow-hidden flex flex-col bg-admin-bg shadow-sm focus-within:ring-2 focus-within:ring-admin-primary/20 focus-within:border-admin-primary transition-all duration-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 p-2 bg-admin-surface border-b border-admin-border sticky top-0 z-10", children: [
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("bold"), onClick: () => editor.chain().focus().toggleBold().run(), children: /* @__PURE__ */ jsx(Bold, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("italic"), onClick: () => editor.chain().focus().toggleItalic().run(), children: /* @__PURE__ */ jsx(Italic, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("underline"), onClick: () => editor.chain().focus().toggleUnderline().run(), children: /* @__PURE__ */ jsx(Underline$1, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("strike"), onClick: () => editor.chain().focus().toggleStrike().run(), children: /* @__PURE__ */ jsx(Strikethrough, { size: 18 }) }),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-admin-border mx-1 my-auto" }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("heading", { level: 1 }), onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), children: /* @__PURE__ */ jsx(Heading1, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("heading", { level: 2 }), onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), children: /* @__PURE__ */ jsx(Heading2, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("heading", { level: 3 }), onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), children: /* @__PURE__ */ jsx(Heading3, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("heading", { level: 4 }), onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(), children: /* @__PURE__ */ jsx(Heading4, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("heading", { level: 5 }), onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(), children: /* @__PURE__ */ jsx(Heading5, { size: 18 }) }),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-admin-border mx-1 my-auto" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          className: "p-1.5 rounded-lg border-admin-border text-sm text-admin-text-muted bg-admin-surface hover:bg-admin-surface-muted transition-colors focus:ring-1 focus:ring-admin-primary",
          onChange: (e) => {
            if (e.target.value) {
              editor.chain().focus().setFontSize(e.target.value).run();
            } else {
              editor.chain().focus().unsetFontSize().run();
            }
          },
          value: editor.getAttributes("textStyle").fontSize || "",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Size" }),
            /* @__PURE__ */ jsx("option", { value: "12px", children: "12" }),
            /* @__PURE__ */ jsx("option", { value: "14px", children: "14" }),
            /* @__PURE__ */ jsx("option", { value: "16px", children: "16" }),
            /* @__PURE__ */ jsx("option", { value: "18px", children: "18" }),
            /* @__PURE__ */ jsx("option", { value: "20px", children: "20" }),
            /* @__PURE__ */ jsx("option", { value: "24px", children: "24" }),
            /* @__PURE__ */ jsx("option", { value: "30px", children: "30" }),
            /* @__PURE__ */ jsx("option", { value: "36px", children: "36" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-admin-border mx-1 my-auto" }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("bulletList"), onClick: () => editor.chain().focus().toggleBulletList().run(), children: /* @__PURE__ */ jsx(List, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("orderedList"), onClick: () => editor.chain().focus().toggleOrderedList().run(), children: /* @__PURE__ */ jsx(ListOrdered, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("blockquote"), onClick: () => editor.chain().focus().toggleBlockquote().run(), children: /* @__PURE__ */ jsx(Quote, { size: 18 }) }),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-admin-border mx-1 my-auto" }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive({ textAlign: "left" }), onClick: () => editor.chain().focus().setTextAlign("left").run(), children: /* @__PURE__ */ jsx(AlignLeft, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive({ textAlign: "center" }), onClick: () => editor.chain().focus().setTextAlign("center").run(), children: /* @__PURE__ */ jsx(AlignCenter, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive({ textAlign: "right" }), onClick: () => editor.chain().focus().setTextAlign("right").run(), children: /* @__PURE__ */ jsx(AlignRight, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive({ textAlign: "justify" }), onClick: () => editor.chain().focus().setTextAlign("justify").run(), children: /* @__PURE__ */ jsx(AlignJustify, { size: 18 }) }),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-admin-border mx-1 my-auto" }),
      /* @__PURE__ */ jsx(MenuButton, { isActive: editor.isActive("link"), onClick: toggleLink, children: /* @__PURE__ */ jsx(Link$1, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { onClick: addImage, children: /* @__PURE__ */ jsx(Image$1, { size: 18 }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1" }),
      /* @__PURE__ */ jsx(MenuButton, { onClick: () => editor.chain().focus().undo().run(), children: /* @__PURE__ */ jsx(Undo, { size: 18 }) }),
      /* @__PURE__ */ jsx(MenuButton, { onClick: () => editor.chain().focus().redo().run(), children: /* @__PURE__ */ jsx(Redo, { size: 18 }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 min-h-[300px] max-h-[600px] overflow-y-auto cursor-text", onClick: () => editor.commands.focus(), children: /* @__PURE__ */ jsx(EditorContent, { editor }) })
  ] });
}
export {
  RichTextEditor as R
};
