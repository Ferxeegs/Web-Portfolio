"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  alt?: string;
}

const ProjectGallery: React.FC<Props> = ({ images, alt = 'Project image' }) => {
  const safeImages = images && images.length ? images : ['/images/project-placeholder.png'];
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  };
  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((i) => (i + 1) % safeImages.length);
  };

  // Mobile Swipe Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      next(); // Swiped left, show next
    } else if (distance < -minSwipeDistance) {
      prev(); // Swiped right, show prev
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div 
        className="relative rounded-2xl overflow-hidden border border-gray-800/80 shadow-2xl bg-gray-950/60 backdrop-blur-md group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={safeImages[index]}
          alt={`${alt} ${index + 1}`}
          className="w-full h-[220px] xs:h-[280px] sm:h-[380px] md:h-[450px] lg:h-[480px] object-cover transition-transform duration-500 hover:scale-[1.01]"
        />

        {/* Navigation Buttons (smaller and semi-transparent on mobile, visible on hover/active) */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 text-white rounded-full hover:bg-violet-600/90 active:scale-95 transition-all z-10 border border-white/10"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={next}
          aria-label="Next"
          className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 text-white rounded-full hover:bg-violet-600/90 active:scale-95 transition-all z-10 border border-white/10"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Counter indicator */}
        <div className="absolute left-4 bottom-4 bg-black/75 backdrop-blur-md text-xs font-semibold text-gray-200 px-3.5 py-1.5 rounded-full border border-white/5">
          {index + 1} / {safeImages.length}
        </div>
      </div>

      {/* Thumbnails Container */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 scrollbar-none max-w-full">
        {safeImages.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-16 h-11 xs:w-20 xs:h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
              i === index 
                ? 'border-violet-500 ring-2 ring-violet-500/30 scale-[1.02] shadow-lg' 
                : 'border-gray-800/80 hover:border-gray-600'
            }`}
          >
            <img 
              src={src} 
              alt={`${alt} thumbnail ${i + 1}`} 
              className="w-full h-full object-cover" 
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
