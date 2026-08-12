'use client';

import { useState, useEffect } from 'react';
import { SectionRenderer } from '@/components/section-renderer';

export default function PreviewPage() {
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'UPDATE_SECTIONS') {
        setSections(event.data.sections || []);
      }
    };

    window.addEventListener('message', handleMessage);
    // Request initial sections from parent window if iframe mounted after parent
    window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {sections.length > 0 ? (
        <SectionRenderer nodes={sections} />
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center text-muted-foreground border-2 border-dashed rounded-xl m-4">
          <p className="text-sm font-medium">Preview Canvas</p>
          <p className="text-xs mt-1">Add or select sections in the editor to preview them live.</p>
        </div>
      )}
    </div>
  );
}
