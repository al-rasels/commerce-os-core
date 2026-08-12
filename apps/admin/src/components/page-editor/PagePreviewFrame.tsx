import { useEffect, useRef } from "react";
import type { PageSection } from "@/lib/api/pages";
import { Laptop, Tablet, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PagePreviewFrameProps {
  sections: PageSection[];
  device: "desktop" | "tablet" | "mobile";
  onDeviceChange: (device: "desktop" | "tablet" | "mobile") => void;
}

export function PagePreviewFrame({ sections, device, onDeviceChange }: PagePreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Send sections to the iframe whenever they change
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "UPDATE_SECTIONS", sections },
        "*"
      );
    }
  }, [sections]);

  const deviceWidth = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div className="flex flex-col h-full w-full bg-muted/30 border-x">
      {/* Viewport Toolbar */}
      <div className="flex items-center justify-center gap-2 p-2 border-b bg-background">
        <Button
          variant={device === "desktop" ? "secondary" : "ghost"}
          size="icon-sm"
          onClick={() => onDeviceChange("desktop")}
        >
          <Laptop className="h-4 w-4" />
        </Button>
        <Button
          variant={device === "tablet" ? "secondary" : "ghost"}
          size="icon-sm"
          onClick={() => onDeviceChange("tablet")}
        >
          <Tablet className="h-4 w-4" />
        </Button>
        <Button
          variant={device === "mobile" ? "secondary" : "ghost"}
          size="icon-sm"
          onClick={() => onDeviceChange("mobile")}
        >
          <Smartphone className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Iframe Wrapper */}
      <div className="flex-1 overflow-auto flex justify-center bg-zinc-100 dark:bg-zinc-900 p-4">
        <div 
          className="h-full bg-white transition-all duration-300 shadow-sm border rounded-md overflow-hidden flex flex-col"
          style={{ width: deviceWidth[device] }}
        >
          {/* We point the iframe to the storefront preview route */}
          <iframe
            ref={iframeRef}
            src={`${import.meta.env.VITE_STOREFRONT_URL || 'http://localhost:3001'}/preview`}
            className="w-full h-full border-0 bg-white"
            title="Page Preview"
          />
        </div>
      </div>
    </div>
  );
}
