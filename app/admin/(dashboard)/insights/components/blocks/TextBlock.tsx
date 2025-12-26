'use client';

import { useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo
} from 'lucide-react';
import { TextBlockData } from '@/types/insights';

interface TextBlockProps {
  data: TextBlockData;
  onChange: (data: TextBlockData) => void;
}

/**
 * Splits text longer than 200 characters into 2 paragraphs
 * Break occurs at the nearest full stop (period) before 200 chars
 */
function splitLongText(html: string): string {
  if (typeof window === 'undefined') {
    return html; // Server-side, skip processing
  }
  
  // Remove HTML tags to get plain text length
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const plainText = tempDiv.textContent || tempDiv.innerText || '';
  
  if (plainText.length <= 200) {
    return html; // No need to split
  }
  
  // Check if content already has multiple paragraphs
  const paragraphCount = (html.match(/<p[^>]*>/g) || []).length;
  if (paragraphCount > 1) {
    // Already has multiple paragraphs, check if any single paragraph is too long
    const paragraphs = html.split(/<\/p>\s*<p[^>]*>/);
    let needsSplitting = false;
    
    for (const para of paragraphs) {
      const paraDiv = document.createElement('div');
      paraDiv.innerHTML = para.replace(/^<p[^>]*>|<\/p>$/g, '');
      const paraText = paraDiv.textContent || '';
      if (paraText.length > 200) {
        needsSplitting = true;
        break;
      }
    }
    
    if (!needsSplitting) {
      return html; // Already properly split
    }
  }
  
  // Find the best break point (nearest full stop before 200 chars)
  let breakIndex = -1;
  for (let i = 199; i >= 100; i--) {
    if (plainText[i] === '.' && (i === plainText.length - 1 || plainText[i + 1] === ' ' || plainText[i + 1] === '\n')) {
      breakIndex = i + 1; // Include the period, break after it
      break;
    }
  }
  
  // If no period found, try to find a space near 200
  if (breakIndex === -1) {
    for (let i = 200; i >= 150; i--) {
      if (plainText[i] === ' ') {
        breakIndex = i + 1;
        break;
      }
    }
    // Last resort: use 200
    if (breakIndex === -1) {
      breakIndex = 200;
    }
  }
  
  // Now we need to split the HTML at the equivalent position
  // Strategy: Walk through HTML, counting text characters, split at breakIndex
  let textCharCount = 0;
  let htmlSplitPos = 0;
  let inTag = false;
  
  for (let i = 0; i < html.length; i++) {
    if (html[i] === '<') {
      inTag = true;
    } else if (html[i] === '>') {
      inTag = false;
    } else if (!inTag) {
      textCharCount++;
      if (textCharCount >= breakIndex) {
        htmlSplitPos = i + 1;
        break;
      }
    }
  }
  
  if (htmlSplitPos === 0 || htmlSplitPos >= html.length) {
    return html; // Couldn't find split point
  }
  
  // Split the HTML
  let firstPart = html.substring(0, htmlSplitPos).trim();
  let secondPart = html.substring(htmlSplitPos).trim();
  
  // Clean up any incomplete tags at the end of first part
  const lastOpenTag = firstPart.lastIndexOf('<');
  const lastCloseTag = firstPart.lastIndexOf('>');
  if (lastOpenTag > lastCloseTag) {
    firstPart = firstPart.substring(0, lastOpenTag);
  }
  
  // Clean up any incomplete tags at the start of second part  
  // Remove any orphaned closing tags or incomplete opening tags
  while (secondPart && (secondPart[0] === '>' || secondPart.match(/^<\/[^>]+>/))) {
    if (secondPart[0] === '>') {
      secondPart = secondPart.substring(1).trim();
    } else {
      const closingTag = secondPart.match(/^<\/[^>]+>/);
      if (closingTag) {
        secondPart = secondPart.substring(closingTag[0].length).trim();
      } else {
        break;
      }
    }
  }
  
  // Ensure both parts are wrapped in paragraph tags
  // Remove existing paragraph wrapper if present to avoid double wrapping
  firstPart = firstPart.replace(/^<p[^>]*>|<\/p>$/g, '').trim();
  secondPart = secondPart.replace(/^<p[^>]*>|<\/p>$/g, '').trim();
  
  // Wrap in paragraph tags
  firstPart = firstPart ? `<p>${firstPart}</p>` : '';
  secondPart = secondPart ? `<p>${secondPart}</p>` : '';
  
  return secondPart ? `${firstPart}${secondPart}` : firstPart || '<p></p>';
}

export default function TextBlock({ data, onChange }: TextBlockProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: data.html || '',
    immediatelyRender: false, // Required for SSR/hydration in Next.js
    onUpdate: ({ editor }) => {
      // Just update parent with current HTML during editing
      onChange({ html: editor.getHTML() });
    },
    onBlur: ({ editor }) => {
      // Apply auto-paragraph splitting when editor loses focus
      const currentHtml = editor.getHTML();
      const processedHtml = splitLongText(currentHtml);
      
      if (processedHtml !== currentHtml) {
        // Update editor and parent with split content
        // Use emitUpdate: false to avoid triggering onUpdate again
        editor.commands.setContent(processedHtml, { emitUpdate: false });
        onChange({ html: processedHtml });
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[150px] px-3 py-2',
      },
    },
  });
  

  // Update editor content when data.html changes externally
  useEffect(() => {
    if (editor && data.html !== editor.getHTML()) {
      editor.commands.setContent(data.html || '', { emitUpdate: false });
    }
  }, [data.html, editor]);

  const setHeading = useCallback((level: 2 | 3) => {
    editor?.chain().focus().toggleHeading({ level }).run();
  }, [editor]);

  const toggleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor?.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleBulletList = useCallback(() => {
    editor?.chain().focus().toggleBulletList().run();
  }, [editor]);

  const toggleOrderedList = useCallback(() => {
    editor?.chain().focus().toggleOrderedList().run();
  }, [editor]);

  const toggleBlockquote = useCallback(() => {
    editor?.chain().focus().toggleBlockquote().run();
  }, [editor]);

  const undo = useCallback(() => {
    editor?.chain().focus().undo().run();
  }, [editor]);

  const redo = useCallback(() => {
    editor?.chain().focus().redo().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Text Content</Label>
        <div className="flex gap-1 border rounded-md p-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleBold}
            className={editor.isActive('bold') ? 'bg-muted' : ''}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleItalic}
            className={editor.isActive('italic') ? 'bg-muted' : ''}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <div className="w-px bg-border mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setHeading(2)}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setHeading(3)}
            className={editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <div className="w-px bg-border mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleBulletList}
            className={editor.isActive('bulletList') ? 'bg-muted' : ''}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleOrderedList}
            className={editor.isActive('orderedList') ? 'bg-muted' : ''}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleBlockquote}
            className={editor.isActive('blockquote') ? 'bg-muted' : ''}
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <div className="w-px bg-border mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={undo}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={redo}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="border rounded-md">
        <EditorContent editor={editor} />
      </div>
      <div className="text-xs text-muted-foreground">
        Rich text editor. Text longer than 200 characters will automatically split into paragraphs at the nearest full stop.
      </div>
    </div>
  );
}
