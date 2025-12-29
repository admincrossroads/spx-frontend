'use client';

import { useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { TextBlockData } from '@/types/insights';
import dynamic from 'next/dynamic';

// Dynamically import Tiptap to avoid SSR issues
const TiptapEditor = dynamic(
  () => import('./TiptapEditorComponent'),
  { 
    ssr: false,
    loading: () => <div className="min-h-[150px] border rounded-md p-4 bg-muted/20 animate-pulse">Loading editor...</div>
  }
);

interface TextBlockProps {
  data: TextBlockData;
  onChange: (data: TextBlockData) => void;
}

/**
 * Splits text longer than 500 characters into 2 paragraphs
 * Break occurs at the nearest full stop (period) before 500 chars
 */
function splitLongText(html: string): string {
  if (typeof window === 'undefined') {
    return html; // Server-side, skip processing
  }
  
  // Remove HTML tags to get plain text length
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const plainText = tempDiv.textContent || tempDiv.innerText || '';
  
  if (plainText.length <= 500) {
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
      if (paraText.length > 500) {
        needsSplitting = true;
        break;
      }
    }
    
    if (!needsSplitting) {
      return html; // Already properly split
    }
  }
  
  // Find the best break point (nearest full stop before 500 chars)
  let breakIndex = -1;
  for (let i = 499; i >= 250; i--) {
    if (plainText[i] === '.' && (i === plainText.length - 1 || plainText[i + 1] === ' ' || plainText[i + 1] === '\n')) {
      breakIndex = i + 1; // Include the period, break after it
      break;
    }
  }
  
  // If no period found, try to find a space near 500
  if (breakIndex === -1) {
    for (let i = 500; i >= 375; i--) {
      if (plainText[i] === ' ') {
        breakIndex = i + 1;
        break;
      }
    }
    // Last resort: use 500
    if (breakIndex === -1) {
      breakIndex = 500;
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
  // Initialize with data.html, defaulting to empty string if undefined/null
  const [value, setValue] = useState(data?.html || '');

  // Update local state when data.html changes externally
  useEffect(() => {
    const newHtml = data?.html || '';
    if (newHtml !== value) {
      setValue(newHtml);
    }
  }, [data?.html]);

  const handleChange = (content: string) => {
    setValue(content);
    // Update parent immediately during editing - always pass html property
    // Pass the content as-is - the API should handle it
    onChange({ html: content });
  };

  const handleBlur = () => {
    // Apply auto-paragraph splitting when editor loses focus
    // Only process if there's actual content (not just empty paragraphs)
    const hasContent = value && 
      value.trim() !== '' && 
      value.trim() !== '<p><br></p>' && 
      value.trim() !== '<p></p>' &&
      value.replace(/<[^>]*>/g, '').trim() !== ''; // Check if there's actual text content
    
    if (hasContent) {
      const processedHtml = splitLongText(value);
      
      if (processedHtml !== value) {
        setValue(processedHtml);
        onChange({ html: processedHtml });
      } else {
        // Ensure we save the current value even if no processing is needed
        onChange({ html: value });
      }
    } else {
      // Even if empty, ensure we save the structure
      onChange({ html: value || '' });
    }
  };

  return (
    <div className="space-y-3">
      <Label>Text Content</Label>
      <TiptapEditor
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="text-xs text-muted-foreground">
        Rich text editor. Text longer than 500 characters will automatically split into paragraphs at the nearest full stop.
      </div>
    </div>
  );
}
