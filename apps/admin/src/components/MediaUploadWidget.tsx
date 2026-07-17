import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface MediaUploadWidgetProps {
  onUpload: (file: File) => void;
  accept?: string;
}

export function MediaUploadWidget({ onUpload, accept = 'image/*' }: MediaUploadWidgetProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onUpload(file);
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/30 transition-colors cursor-pointer relative" onClick={() => inputRef.current?.click()}>
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="preview" className="max-h-32 rounded" />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setPreview(null); }}
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <Upload className="w-6 h-6" />
          <span className="text-xs">Click to upload</span>
        </div>
      )}
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleChange} />
    </div>
  );
}
