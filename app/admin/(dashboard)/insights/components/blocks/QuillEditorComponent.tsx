'use client';

import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface QuillEditorComponentProps {
  value: string;
  onChange: (content: string) => void;
  onBlur?: () => void;
}

export default function QuillEditorComponent({ value, onChange, onBlur }: QuillEditorComponentProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);
  const onBlurRef = useRef(onBlur);

  // Keep refs updated
  useEffect(() => {
    onChangeRef.current = onChange;
    onBlurRef.current = onBlur;
  }, [onChange, onBlur]);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) {
      return;
    }

    // Initialize Quill
    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['blockquote'],
          ['link'],
          ['clean']
        ],
      },
      placeholder: 'Start typing your content...',
    });

    // Set initial content
    if (value) {
      quill.root.innerHTML = value;
    }

    // Handle text changes
    quill.on('text-change', () => {
      const content = quill.root.innerHTML;
      if (onChangeRef.current) {
        onChangeRef.current(content);
      }
    });

    // Handle blur
    if (onBlurRef.current) {
      quill.root.addEventListener('blur', () => {
        if (onBlurRef.current) {
          onBlurRef.current();
        }
      });
    }

    quillRef.current = quill;

    // Cleanup
    return () => {
      quill.off('text-change');
    };
  }, []);

  // Update content when value prop changes externally
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      // Temporarily disable text-change event to avoid infinite loop
      const selection = quillRef.current.getSelection();
      quillRef.current.root.innerHTML = value || '<p><br></p>';
      
      // Restore selection if it existed
      if (selection) {
        // Wait a tick for DOM to update
        setTimeout(() => {
          quillRef.current?.setSelection(selection);
        }, 0);
      }
    }
  }, [value]);

  return (
    <div style={{ minHeight: '150px' }}>
      <div ref={editorRef} />
    </div>
  );
}

