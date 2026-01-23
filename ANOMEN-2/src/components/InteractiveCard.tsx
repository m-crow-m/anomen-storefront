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
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="aspect-[4/3] overflow-hidden border border-black mb-4 md:mb-8 relative bg-neutral-900 transition-shadow duration-300 group-hover:shadow-[0_0_0_4px_rgba(0,0,0,1)] md:group-hover:shadow-[0_0_0_8px_rgba(0,0,0,1)]">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Play className="w-6 h-6 md:w-8 md:h-8 text-black ml-1" fill="currentColor" />
          </div>
        </div>
        {/* Interactive badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black text-white text-xs uppercase tracking-wider">
          Interactive
        </div>
      </div>

      <div className="space-y-2 md:space-y-4">
        <h3 className="font-heading uppercase tracking-wider text-sm md:text-base flex items-center gap-2">
          {title}
          <span className="text-xs font-normal normal-case tracking-normal text-neutral-500">
            — Click to interact
          </span>
        </h3>
        <p className="leading-relaxed text-xs md:text-sm max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
}
