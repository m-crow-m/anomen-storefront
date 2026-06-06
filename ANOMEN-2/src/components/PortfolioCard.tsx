/**
 * Portfolio Card Component
 * Displays portfolio project thumbnail for homepage showcase
 */

import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PortfolioCardProps {
  title: string;
  description: string;
  imageUrl: string;
  images?: string[]; // All images for preloading on hover
  imagePosition?: string; // CSS object-position value
  onClick: () => void;
}

export function PortfolioCard({ title, description, imageUrl, images, imagePosition, onClick }: PortfolioCardProps) {
  // Preload all project images on hover
  const handleMouseEnter = () => {
    if (images) {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  };

  return (
    <button
      type="button"
      className="group w-full text-left"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      aria-label={`View ${title} project`}
    >
      <div className="aspect-[4/3] overflow-hidden border border-black mb-5 md:mb-6 relative bg-white transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-focus-visible:outline-2 group-focus-visible:outline-offset-4">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
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
