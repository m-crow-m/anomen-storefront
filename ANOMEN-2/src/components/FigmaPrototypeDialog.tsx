/**
 * Figma Prototype Dialog Component
 * Fullscreen dialog for viewing interactive Figma prototypes
 */

import { X, ExternalLink } from "lucide-react";
import { useEffect } from "react";

interface FigmaPrototypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    figmaEmbedUrl: string;
  } | null;
}

export function FigmaPrototypeDialog({ isOpen, onClose, project }: FigmaPrototypeDialogProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleOpenInFigma = () => {
    window.open(project.figmaEmbedUrl, '_blank');
  };

  return (
    <div 
      className="fixed z-50 flex items-center justify-center"
      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute bg-black/50"
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white border-2 border-black flex flex-col overflow-hidden z-10"
        style={{ 
          width: 'calc(100vw - 40px)', 
          height: 'calc(100vh - 40px)',
          maxWidth: '1400px',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-black bg-white" style={{ flexShrink: 0 }}>
          <div className="flex items-center gap-4">
            <div>
              <h2 className="font-heading uppercase tracking-wider text-sm md:text-base">
                {project.title}
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                {project.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={handleOpenInFigma}
              className="flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider border border-black hover:bg-black hover:text-white transition-colors"
              title="Open in Figma"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Open in Figma</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-black hover:bg-black hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Figma Embed */}
        <div className="bg-neutral-100" style={{ flex: 1, width: '100%', minHeight: 0 }}>
          <iframe
            src={project.figmaEmbedUrl}
            style={{ border: 'none', width: '100%', height: '100%' }}
            allowFullScreen
            allow="clipboard-write"
            title={`${project.title} - Interactive Prototype`}
          />
        </div>
      </div>
    </div>
  );
}
