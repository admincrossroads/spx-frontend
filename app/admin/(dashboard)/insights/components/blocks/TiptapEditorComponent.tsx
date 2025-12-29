'use client';

import { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

interface TiptapEditorComponentProps {
  value: string;
  onChange: (content: string) => void;
  onBlur?: () => void;
}

export default function TiptapEditorComponent({ value, onChange, onBlur }: TiptapEditorComponentProps) {
  const onChangeRef = useRef(onChange);
  const onBlurRef = useRef(onBlur);

  // Keep refs updated
  useEffect(() => {
    onChangeRef.current = onChange;
    onBlurRef.current = onBlur;
  }, [onChange, onBlur]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable heading levels we don't need
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:underline',
        },
      }),
    ],
    content: value || '',
    immediatelyRender: false, // Prevent SSR hydration mismatches
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[150px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChangeRef.current) {
        onChangeRef.current(html);
      }
    },
    onBlur: () => {
      if (onBlurRef.current) {
        onBlurRef.current();
      }
    },
  });

  // Update editor content when value prop changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="min-h-[150px] border rounded-md p-4 bg-muted/20 animate-pulse">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-muted/50 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive('bold')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive('italic')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive('strike')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          <s>S</s>
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          H3
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive('bulletList')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive('orderedList')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive('blockquote')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          "
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Enter URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive('link')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
          className="px-2 py-1 rounded text-sm hover:bg-muted disabled:opacity-50"
        >
          Unlink
        </button>
      </div>
      
      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}

