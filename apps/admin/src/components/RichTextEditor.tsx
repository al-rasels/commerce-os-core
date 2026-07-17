import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder })],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex gap-1 border-b p-1.5 bg-muted/30">
        {[
          { label: 'B', action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), style: { fontWeight: 700 } },
          { label: 'I', action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), style: { fontStyle: 'italic' } },
          { label: 'H1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }) },
          { label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
          { label: '•', action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
          { label: '1.', action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') },
        ].map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={btn.action}
            className={`px-2 py-0.5 text-sm rounded transition-colors ${
              btn.active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
            style={btn.style}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <EditorContent editor={editor} className="prose prose-sm max-w-none p-3 min-h-[120px]" />
    </div>
  );
}
