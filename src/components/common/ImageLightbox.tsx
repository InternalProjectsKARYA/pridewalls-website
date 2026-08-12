'use client';

import { useEffect, useState } from 'react';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export type LightboxImage = {
  src: string;
  alt: string;
};

interface ImageLightboxProps {
  image: LightboxImage | null;
  onOpenChange: (open: boolean) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.25;

export default function ImageLightbox({ image, onOpenChange }: ImageLightboxProps) {
  const [zoom, setZoom] = useState(MIN_ZOOM);

  useEffect(() => {
    setZoom(MIN_ZOOM);
  }, [image]);

  const changeZoom = (amount: number) => {
    setZoom((currentZoom) =>
      Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((currentZoom + amount).toFixed(2))))
    );
  };

  return (
    <Dialog open={Boolean(image)} onOpenChange={onOpenChange}>
      <DialogContent
        className="h-[92vh] max-w-6xl overflow-hidden border-white/10 bg-black p-0 text-white sm:max-w-6xl [&>[data-slot=dialog-close]]:right-4 [&>[data-slot=dialog-close]]:top-4 [&>[data-slot=dialog-close]]:z-20 [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:bg-black/55 [&>[data-slot=dialog-close]]:p-2 [&>[data-slot=dialog-close]]:text-white [&>[data-slot=dialog-close]]:opacity-100 [&>[data-slot=dialog-close]]:hover:bg-black/80"
      >
        <DialogTitle className="sr-only">{image?.alt ?? 'Image preview'}</DialogTitle>

        <div className="relative flex h-full items-center justify-center overflow-hidden p-4 sm:p-12">
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
              priority
            />
          )}

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-black/65 p-1.5 backdrop-blur-sm">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => changeZoom(-ZOOM_STEP)}
              disabled={zoom <= MIN_ZOOM}
              className="size-9 text-white hover:bg-white/15 hover:text-white disabled:text-white/35"
              aria-label="Zoom out"
            >
              <ZoomOut className="size-4" />
            </Button>
            <span className="min-w-12 text-center text-xs font-semibold tabular-nums text-white">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => changeZoom(ZOOM_STEP)}
              disabled={zoom >= MAX_ZOOM}
              className="size-9 text-white hover:bg-white/15 hover:text-white disabled:text-white/35"
              aria-label="Zoom in"
            >
              <ZoomIn className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setZoom(MIN_ZOOM)}
              disabled={zoom === MIN_ZOOM}
              className="size-9 text-white hover:bg-white/15 hover:text-white disabled:text-white/35"
              aria-label="Reset zoom"
            >
              <RotateCcw className="size-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
