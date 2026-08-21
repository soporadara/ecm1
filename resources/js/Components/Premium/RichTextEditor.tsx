import React, { useCallback, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { 
    Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
    List, ListOrdered, Quote, Heading1, Heading2, Heading3, 
    Image as ImageIcon, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg my-4 shadow-sm cursor-move inline-block',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-brand-primary underline hover:text-brand-dark transition-colors',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
    });

    const addImage = useCallback(() => {
        if (imageUrl.trim()) {
            editor?.chain().focus().setImage({ src: imageUrl.trim() }).run();
            setIsImageModalOpen(false);
            setImageUrl('');
        }
    }, [editor, imageUrl]);

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href;
        const url = window.prompt('URL:', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    const ToolbarButton = ({ onClick, isActive = false, icon: Icon, title }: any) => (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                isActive ? 'bg-gray-200 dark:bg-gray-600 text-brand-primary' : 'text-gray-600 dark:text-gray-300'
            }`}
        >
            <Icon className="w-4 h-4" />
        </button>
    );

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-sm focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all relative">
            
            {/* Image Modal */}
            {isImageModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-700">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Insert Image</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Enter the URL of the image you want to insert. Once inserted, you can align it using the text alignment tools and drag it around.
                            </p>
                            <input
                                type="url"
                                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                                placeholder="https://example.com/image.jpg"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                autoFocus
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addImage();
                                    }
                                }}
                            />
                            <div className="mt-6 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsImageModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    Cancel
                                </button>
                                <button type="button" onClick={addImage} className="px-4 py-2 rounded-lg font-medium bg-brand-primary text-white hover:bg-brand-secondary">
                                    Insert
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toolbar */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 flex flex-wrap gap-1 items-center">
                <div className="flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 mr-1">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        icon={Bold}
                        title="Bold"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        icon={Italic}
                        title="Italic"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive('underline')}
                        icon={UnderlineIcon}
                        title="Underline"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive('strike')}
                        icon={Strikethrough}
                        title="Strikethrough"
                    />
                </div>

                <div className="flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 mr-1">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive('heading', { level: 1 })}
                        icon={Heading1}
                        title="Heading 1"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive('heading', { level: 2 })}
                        icon={Heading2}
                        title="Heading 2"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        isActive={editor.isActive('heading', { level: 3 })}
                        icon={Heading3}
                        title="Heading 3"
                    />
                </div>

                <div className="flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 mr-1">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                        icon={List}
                        title="Bullet List"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                        icon={ListOrdered}
                        title="Ordered List"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                        icon={Quote}
                        title="Blockquote"
                    />
                </div>

                <div className="flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 mr-1">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        isActive={editor.isActive({ textAlign: 'left' })}
                        icon={AlignLeft}
                        title="Align Left"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        isActive={editor.isActive({ textAlign: 'center' })}
                        icon={AlignCenter}
                        title="Align Center"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        isActive={editor.isActive({ textAlign: 'right' })}
                        icon={AlignRight}
                        title="Align Right"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        isActive={editor.isActive({ textAlign: 'justify' })}
                        icon={AlignJustify}
                        title="Justify"
                    />
                </div>

                <div className="flex gap-1">
                    <ToolbarButton
                        onClick={setLink}
                        isActive={editor.isActive('link')}
                        icon={LinkIcon}
                        title="Insert Link"
                    />
                    <ToolbarButton
                        onClick={() => setIsImageModalOpen(true)}
                        isActive={isImageModalOpen}
                        icon={ImageIcon}
                        title="Insert Image"
                    />
                </div>
            </div>

            {/* Editor Area */}
            <div className="bg-white dark:bg-gray-900 min-h-[300px] cursor-text" onClick={() => editor.commands.focus()}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
