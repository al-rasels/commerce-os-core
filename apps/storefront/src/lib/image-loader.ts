export default function customImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If the image is a generic placeholder or data URI, return it directly
  if (src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  // Determine if it's already an absolute URL
  const isAbsoluteUrl = src.startsWith('http://') || src.startsWith('https://');

  // In a real application, you would parse the source URL
  // and reconstruct it for your specific CDN (e.g., Cloudinary, Imgix)
  // Example for a generic CDN that accepts w and q parameters:
  const url = isAbsoluteUrl ? new URL(src) : new URL(src, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
  
  // Add transformation parameters
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', (quality || 75).toString());
  url.searchParams.set('fmt', 'webp'); // Force modern format

  return url.href;
}
