/**
 * Project Detail Dialog Component
 * Fullscreen modal for portfolio project gallery view
 */

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProjectDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    images: string[];
    details: string;
  } | null;
}

export function ProjectDetailDialog({ isOpen, onClose, project }: ProjectDetailDialogProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project?.title]);

  // Preload all images when dialog opens
  useEffect(() => {
    if (isOpen && project) {
      project.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [isOpen, project]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('dialog-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('dialog-open');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('dialog-open');
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dialog-overlay">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-8 lg:p-16">
        {/* Close Button - More visible */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-50 bg-white text-black p-2 hover:bg-black hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <div className="w-full h-full flex flex-col lg:flex-row gap-4 md:gap-8 lg:gap-16 max-w-[1800px]">
          {/* Image Gallery - Takes majority of space */}
          <div className="flex-1 relative flex flex-col items-center justify-center min-h-0">
            <ImageWithFallback
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain dialog-image"
            />

            {/* Navigation Arrows */}
            {project.images.length > 1 && (
              <div className="mt-4 md:mt-6 w-full max-w-[520px]">
                <div className="flex items-center justify-between gap-6">
                  <button
                    onClick={handlePrevious}
                    className="bg-white border-2 border-white text-black p-2 md:p-3 hover:bg-black hover:text-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-white border-2 border-white text-black p-2 md:p-3 hover:bg-black hover:text-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                  </button>
                </div>
                <div className="mt-2">
                  <span className="font-heading text-white text-xs md:text-sm">
                    {currentImageIndex + 1} / {project.images.length}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Project Info Sidebar - Smaller text, white on dark */}
          <div className="lg:w-80 xl:w-96 overflow-y-auto space-y-4 md:space-y-6 text-white max-h-[40vh] lg:max-h-none">
            <div>
              <h2 className="font-heading uppercase tracking-wider text-base md:text-lg lg:text-xl">
                {project.title}
              </h2>
            </div>

            <div className="border-t border-white/20 pt-4 md:pt-6">
              <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line opacity-90">
                {project.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
