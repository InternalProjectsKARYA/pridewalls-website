'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react';
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
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;
const DOUBLE_CLICK_DELAY = 300; // ms

export default function ImageLightbox({ image, onOpenChange }: ImageLightboxProps) {
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionStartRef = useRef({ x: 0, y: 0 });

  // Reset zoom and position when image changes
  useEffect(() => {
    setZoom(MIN_ZOOM);
    setPosition({ x: 0, y: 0 });
  }, [image]);

  // Calculate max position based on zoom level
  const getMaxPosition = useCallback(() => {
    if (!imageRef.current || !containerRef.current) return { x: 0, y: 0 };
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const imgWidth = imageRef.current.naturalWidth * zoom;
    const imgHeight = imageRef.current.naturalHeight * zoom;
    
    const maxX = Math.max(0, (imgWidth - containerRect.width) / 2);
    const maxY = Math.max(0, (imgHeight - containerRect.height) / 2);
    
    return { x: maxX, y: maxY };
  }, [zoom]);

  // Clamp position to bounds
  const clampPosition = useCallback((newPos: { x: number; y: number }) => {
    const maxPos = getMaxPosition();
    return {
      x: Math.max(-maxPos.x, Math.min(maxPos.x, newPos.x)),
      y: Math.max(-maxPos.y, Math.min(maxPos.y, newPos.y)),
    };
  }, [getMaxPosition]);

  // Change zoom with position adjustment to zoom towards center
  const changeZoom = useCallback((amount: number, centerX?: number, centerY?: number) => {
    setZoom((currentZoom) => {
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((currentZoom + amount).toFixed(2))));
      
      // If zoom center is provided, adjust position to zoom towards that point
      if (centerX !== undefined && centerY !== undefined && imageRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const zoomRatio = newZoom / currentZoom;
        
        setPosition((prevPos) => {
          const newX = prevPos.x * zoomRatio + centerX * (1 - zoomRatio);
          const newY = prevPos.y * zoomRatio + centerY * (1 - zoomRatio);
          return clampPosition({ x: newX, y: newY });
        });
      }
      
      return newZoom;
    });
  }, [clampPosition]);

  // Reset zoom and position
  const resetZoom = useCallback(() => {
    setZoom(MIN_ZOOM);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Handle double click to zoom in/out
  const handleDoubleClick = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime;
    
    if (timeSinceLastClick < DOUBLE_CLICK_DELAY) {
      // Double click detected
      if (zoom > MIN_ZOOM) {
        resetZoom();
      } else {
        // Zoom in at click position
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = e.clientX - rect.left - rect.width / 2;
        const centerY = e.clientY - rect.top - rect.height / 2;
        changeZoom(ZOOM_STEP * 4, centerX, centerY); // Zoom in more on double click
      }
      setLastClickTime(0); // Reset to prevent triple-click issues
    } else {
      setLastClickTime(now);
    }
  }, [lastClickTime, zoom, changeZoom, resetZoom]);

  // Handle mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (!imageRef.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = e.clientX - containerRect.left - containerRect.width / 2;
    const centerY = e.clientY - containerRect.top - containerRect.height / 2;
    
    const amount = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    changeZoom(amount, centerX, centerY);
  }, [changeZoom]);

  // Handle drag start
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    if (zoom <= MIN_ZOOM) return; // Only allow drag when zoomed in
    
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    positionStartRef.current = position;
    
    // Change cursor to grabbing
    if (imageRef.current) {
      imageRef.current.style.cursor = 'grabbing';
    }
  }, [zoom, position]);

  // Handle drag move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    
    const newPos = clampPosition({
      x: positionStartRef.current.x + dx,
      y: positionStartRef.current.y + dy,
    });
    
    setPosition(newPos);
  }, [isDragging, clampPosition]);

  // Handle drag end
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (imageRef.current) {
      imageRef.current.style.cursor = zoom > MIN_ZOOM ? 'grab' : 'zoom-in';
    }
  }, [zoom]);

  // Handle mouse leave during drag
  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    if (imageRef.current) {
      imageRef.current.style.cursor = zoom > MIN_ZOOM ? 'grab' : 'zoom-in';
    }
  }, [zoom]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!image) return;
      
      switch (e.key) {
        case '+':
        case '=':
          e.preventDefault();
          changeZoom(ZOOM_STEP);
          break;
        case '-':
          e.preventDefault();
          changeZoom(-ZOOM_STEP);
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          break;
        case 'Escape':
          onOpenChange(false);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image, changeZoom, resetZoom, onOpenChange]);

  // Add global mouse move/up listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleMouseLeave]);

  // Transform style for the image
  const transformStyle = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
    transformOrigin: 'center center',
    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
    cursor: zoom > MIN_ZOOM ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
    userSelect: 'none' as const,
  };

  const zoomPercentage = Math.round(zoom * 100);

  return (
    <Dialog open={Boolean(image)} onOpenChange={onOpenChange}>
      <DialogContent
        className="h-[92vh] max-w-6xl overflow-hidden border-white/10 bg-black p-0 text-white sm:max-w-6xl [&>[data-slot=dialog-close]]:right-4 [&>[data-slot=dialog-close]]:top-4 [&>[data-slot=dialog-close]]:z-20 [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:bg-black/55 [&>[data-slot=dialog-close]]:p-2 [&>[data-slot=dialog-close]]:text-white [&>[data-slot=dialog-close]]:opacity-100 [&>[data-slot=dialog-close]]:hover:bg-black/80"
        onWheel={handleWheel}
      >
        <DialogTitle className="sr-only">{image?.alt ?? 'Image preview'}</DialogTitle>

        <div 
          ref={containerRef}
          className="relative flex h-full items-center justify-center overflow-hidden p-4 sm:p-12"
          onMouseDown={(e) => {
            // Prevent drag on container when clicking empty space
            if (e.target === e.currentTarget) {
              e.preventDefault();
            }
          }}
        >
          {image && (
            <Image
              ref={imageRef}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-contain"
              style={transformStyle}
              priority
              onDoubleClick={handleDoubleClick}
              onMouseDown={handleMouseDown}
            />
          )}

          {/* Zoom Controls */}
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
              {zoomPercentage}%
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
              onClick={resetZoom}
              disabled={zoom === MIN_ZOOM && position.x === 0 && position.y === 0}
              className="size-9 text-white hover:bg-white/15 hover:text-white disabled:text-white/35"
              aria-label="Reset zoom and position"
            >
              <RotateCcw className="size-4" />
            </Button>
            {/* Pan indicator when zoomed */}
            {zoom > MIN_ZOOM && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-9 text-white hover:bg-white/15 hover:text-white"
                aria-label="Pan mode active"
                title="Drag to pan"
              >
                <Move className="size-4" />
              </Button>
            )}
          </div>

          {/* Keyboard hints */}
          <div className="absolute top-4 left-1/2 z-10 -translate-x-1/2 flex items-center gap-3 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 backdrop-blur-sm text-xs text-white/70">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10">+/-</kbd> Zoom
            <kbd className="px-1.5 py-0.5 rounded bg-white/10">0</kbd> Reset
            <kbd className="px-1.5 py-0.5 rounded bg-white/10">Esc</kbd> Close
            {zoom > MIN_ZOOM && <span>Drag to pan</span>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
