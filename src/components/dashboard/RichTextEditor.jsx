"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading2,
  Heading3,
  RemoveFormatting,
} from "lucide-react";

const TOOLBAR = [
  { cmd: "bold", icon: Bold, label: "Bold" },
  { cmd: "italic", icon: Italic, label: "Italic" },
  { cmd: "formatBlock", arg: "h2", icon: Heading2, label: "Heading 2" },
  { cmd: "formatBlock", arg: "h3", icon: Heading3, label: "Heading 3" },
  { cmd: "insertUnorderedList", icon: List, label: "Bullet list" },
  { cmd: "insertOrderedList", icon: ListOrdered, label: "Numbered list" },
  { cmd: "createLink", icon: LinkIcon, label: "Link", special: "link" },
  { cmd: "removeFormat", icon: RemoveFormatting, label: "Clear formatting" },
];

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);
  const lastHtmlRef = useRef(value || "");

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const next = value || "";
    if (next !== lastHtmlRef.current && el.innerHTML !== next) {
      el.innerHTML = next;
      lastHtmlRef.current = next;
    }
  }, [value]);

  const emitChange = useCallback(() => {
    const html = editorRef.current?.innerHTML ?? "";
    lastHtmlRef.current = html;
    onChange(html === "<br>" ? "" : html);
  }, [onChange]);

  const runCommand = (cmd, arg, special) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();

    if (special === "link") {
      const url = window.prompt("Enter URL", "https://");
      if (url) {
        document.execCommand("createLink", false, url);
      }
      emitChange();
      return;
    }

    if (cmd === "formatBlock" && arg) {
      document.execCommand(cmd, false, arg);
    } else {
      document.execCommand(cmd, false, arg ?? null);
    }
    emitChange();
  };

  return (
    <div className="overflow-hidden rounded-lg border border-dashed border-brand-border bg-white">
      <div className="flex flex-wrap gap-1 border-b border-brand-border/80 bg-gray-50/80 p-2">
        {TOOLBAR.map(({ cmd, arg, icon: Icon, label, special }) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => runCommand(cmd, arg, special)}
            className="rounded-md p-2 text-brand-dark transition-colors hover:bg-white hover:text-brand-green"
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        data-placeholder={placeholder}
        onInput={emitChange}
        onBlur={emitChange}
        className="rich-text-editor min-h-[220px] max-h-[480px] overflow-y-auto px-4 py-3 text-sm leading-relaxed text-brand-dark outline-none md:min-h-[280px]"
      />
    </div>
  );
}
