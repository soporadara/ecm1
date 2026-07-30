import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
    Heading1, Heading2, Heading3, Heading4, Heading5, List, ListOrdered, 
    Quote, AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Link as LinkIcon, Image as ImageIcon, Undo, Redo, Type 
} from 'lucide-react';
import { Extension } from '@tiptap/core';
import { TextStyle } from '@tiptap/extension-text-style';

const FontSize = Extension.create({
    name: 'fontSize',
    addOptions() {
        return {
            types: ['textStyle'],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
                        renderHTML: attributes => {
                            if (!attributes.fontSize) {
                                return {};
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize: (fontSize: string) => ({ chain }: any) => {
                return chain().setMark('textStyle', { fontSize }).run();
            },
            unsetFontSize: () => ({ chain }: any) => {
                return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
            },
        };
    },
});

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-brand-primary underline' } }),
            Image.configure({ inline: true }),
            TextStyle,
            FontSize,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4 bg-admin-bg text-admin-text',
            },
        },
    });

    if (!editor) {
        return <div className="min-h-[400px] bg-gray-50 dark:bg-gray-900 animate-pulse rounded-xl border border-gray-200 dark:border-gray-700"></div>;
    }

    const toggleLink = () => {
        if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run();
            return;
        }
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const MenuButton = ({ isActive, onClick, children }: any) => (
        <button
            type="button"
            onClick={onClick}
            className={`p-2 rounded-lg transition-colors ${
                isActive ? 'bg-admin-primary/10 text-admin-primary' : 'text-admin-text-muted hover:bg-admin-surface-muted hover:text-admin-text'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-admin-border rounded-xl overflow-hidden flex flex-col bg-admin-bg shadow-sm focus-within:ring-2 focus-within:ring-admin-primary/20 focus-within:border-admin-primary transition-all duration-200">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 bg-admin-surface border-b border-admin-border sticky top-0 z-10">
                <MenuButton isActive={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
                    <Bold size={18} />
                </MenuButton>
                <MenuButton isActive={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <Italic size={18} />
                </MenuButton>
                <MenuButton isActive={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
                    <UnderlineIcon size={18} />
                </MenuButton>
                <MenuButton isActive={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
                    <Strikethrough size={18} />
                </MenuButton>
                
                <div className="w-px h-6 bg-admin-border mx-1 my-auto"></div>
                
                <MenuButton isActive={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                    <Heading1 size={18} />
                </MenuButton>
                <MenuButton isActive={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    <Heading2 size={18} />
                </MenuButton>
                <MenuButton isActive={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                    <Heading3 size={18} />
                </MenuButton>
                <MenuButton isActive={editor.isActive('heading', { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
                    <Heading4 size={18} />
                </MenuButton>
                <MenuButton isActive={editor.isActive('heading', { level: 5 })} onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
                    <Heading5 size={18} />
                </MenuButton>
                
                <div className="w-px h-6 bg-admin-border mx-1 my-auto"></div>
                
                <select 
                    className="p-1.5 rounded-lg border-admin-border text-sm text-admin-text-muted bg-admin-surface hover:bg-admin-surface-muted transition-colors focus:ring-1 focus:ring-admin-primary"
                    onChange={(e) => {
                        if (e.target.value) {
                            (editor.chain().focus() as any).setFontSize(e.target.value).run();
                        } else {
                            (editor.chain().focus() as any).unsetFontSize().run();
                        }
                    }}
                    value={editor.getAttributes('textStyle').fontSize || ''}
                >
                    <option value="">Size</option>
                    <option value="12px">12</option>
                    <option value="14px">14</option>
                    <option value="16px">16</option>
                    <option value="18px">18</option>
                    <option value="20px">20</option>
                    <option value="24px">24</option>
                    <option value="30px">30</option>
                    <option value="36px">36</option>
                </select>
                
                <div className="w-px h-6 bg-admin-border mx-1 my-auto"></div>
                
                <MenuButton isActive={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <List size={18} />
                </MenuButton>
                <MenuButton isActive={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    <ListOrdered size={18} />
                </MenuButton>
                <MenuButton isActive={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                    <Quote size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-admin-border mx-1 my-auto"></div>

                <MenuButton isActive={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                    <AlignLeft size={18} />
                </MenuButton>
                <MenuButton isActive={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                    <AlignCenter size={18} />
                </MenuButton>
                <MenuButton isActive={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                    <AlignRight size={18} />
                </MenuButton>
                <MenuButton isActive={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
                    <AlignJustify size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-admin-border mx-1 my-auto"></div>

                <MenuButton isActive={editor.isActive('link')} onClick={toggleLink}>
                    <LinkIcon size={18} />
                </MenuButton>
                <MenuButton onClick={addImage}>
                    <ImageIcon size={18} />
                </MenuButton>

                <div className="flex-1"></div>

                <MenuButton onClick={() => editor.chain().focus().undo().run()}>
                    <Undo size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().redo().run()}>
                    <Redo size={18} />
                </MenuButton>
            </div>

            {/* Editor Area */}
            <div className="flex-1 overflow-y-auto max-h-[600px] bg-admin-bg">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
