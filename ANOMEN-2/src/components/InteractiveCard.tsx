/**
 * Interactive Card Component
 * Displays interactive/Figma prototype thumbnail for homepage showcase
 */

import { Play } from "lucide-react";

interface InteractiveCardProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  onClick: () => void;
}

export function InteractiveCard({ title, description, thumbnailUrl, onClick }: InteractiveCardProps) {
  return (
    <button
      type="button"
      className="group w-full text-left"
      onClick={onClick}
      aria-label={`Open ${title} prototype`}
    >
      <div className="interactive-card-media overflow-hidden border border-black mb-5 md:mb-6 relative bg-white transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-focus-visible:outline-2 group-focus-visible:outline-offset-4">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border border-black flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            <Play className="w-5 h-5 md:w-6 md:h-6 text-black ml-1" fill="currentColor" />
          </div>
        </div>
        <span className="absolute top-3 right-3 px-3 py-2 bg-white border border-black text-[10px] uppercase tracking-[0.18em]">
          Prototype
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="font-heading tracking-wide text-base md:text-lg">
          {title}
        </h3>
        <p className="leading-relaxed text-sm max-w-lg text-neutral-700">
          {description}
        </p>
      </div>
    </button>
  );
}
