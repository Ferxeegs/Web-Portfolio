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

  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-lg bg-gray-900">
        <img
          src={safeImages[index]}
          alt={`${alt} ${index + 1}`}
          className="w-full h-[420px] object-cover transition-transform duration-500"
        />

        <button
          onClick={prev}
          aria-label="Previous"
          className="hidden md:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full hover:bg-black/60"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={next}
          aria-label="Next"
          className="hidden md:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full hover:bg-black/60"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute left-4 bottom-4 bg-black/50 text-xs text-gray-200 px-3 py-1 rounded-full">{index + 1} / {safeImages.length}</div>
      </div>

      <div className="flex items-center gap-3">
        {safeImages.slice(0, 6).map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-20 h-12 rounded-md overflow-hidden border ${i === index ? 'border-violet-400' : 'border-gray-800'} transition-all`}
          >
            <img src={src} alt={`${alt} thumb ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
