/**
 * Home Page Component
 * Landing page with hero section and portfolio showcase
 */

import { useState } from "react";

// Components
import { PortfolioCard } from "./PortfolioCard";
import { InteractiveCard } from "./InteractiveCard";
import { ProjectDetailDialog } from "./ProjectDetailDialog";
import { FigmaPrototypeDialog } from "./FigmaPrototypeDialog";


// Portfolio Assets
import metalMagazine1 from "../assets/Metal_Magazine_JIC.jpg";
import metalMagazine2 from "../assets/Metal_Magazine_JIC2.jpg";
import metalMagazine3 from "../assets/Metal_Magazine_JIC3.jpg";
import metalMagazine4 from "../assets/Metal_Magazine_JIC4.jpg";
import metalMagazine5 from "../assets/Metal_Magazine_JIC5.jpg";
import metalMagazine6 from "../assets/Metal_Magazine_JIC6.jpg";
import brandingPoster from "../assets/NG.jpg";
import brandingBillboard from "../assets/billboard_neon2.png";
import brandingInsta1 from "../assets/insta-post_neon.png";
import brandingInsta2 from "../assets/insta-post3_neon.png";
import brandingInsta3 from "../assets/insta-postcool_neon.png";
import calendar01 from "../assets/Calender2026-01.jpg";
import calendar02 from "../assets/Calender2026-02.jpg";
import calendar03 from "../assets/Calender2026-03.jpg";
import calendar04 from "../assets/Calender2026-04.jpg";
import calendar05 from "../assets/Calender2026-05.jpg";
import calendar06 from "../assets/Calender2026-06.jpg";
import calendar07 from "../assets/Calender2026-07.jpg";
import calendar08 from "../assets/Calender2026-08.jpg";
import calendar09 from "../assets/Calender2026-09.jpg";
import calendar10 from "../assets/Calender2026-10.jpg";
import calendar11 from "../assets/Calender2026-11.jpg";
import calendar12 from "../assets/Calender2026-12.jpg";
import calendar13 from "../assets/Calender2026-13.jpg";

// Interactive Work Assets
import treadmillThumbnail from "../assets/treadmill_thumbnail.png";
import project8Thumbnail from "../assets/Thumbnails/Project8.png";
import pxlThumbnail from "../assets/Thumbnails/PXL.png";
import zipsKioskThumbnail from "../assets/Thumbnails/Zipz.png";
import mlFoodBankThumbnail from "../assets/Thumbnails/ML Food.png";

// Terrain poster asset
import terrainPoster from "../assets/Terrain_poster_2025.jpg";

// The Great Song assets
import theGreatSong01 from "../assets/theGreatSong01.jpg";
import theGreatSong02 from "../assets/theGreatSong02.jpg";
import theGreatSong03 from "../assets/theGreatSong03.jpg";
import repurposeLamp from "../assets/Repurpose_Lamp_JIC_10-25.jpg";
import portfolioPdf from "../assets/Portfolio_0626_JaedenCrow.pdf";

// Portfolio project data
const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: "Room Magazine",
    description: "ergonomic layout design",
    imageUrl: metalMagazine1,
    images: [metalMagazine1, metalMagazine2, metalMagazine3, metalMagazine4, metalMagazine5, metalMagazine6],
    details: "Editorial spread designed for ROOM Magazine 2025"
  },
  {
    id: 2,
    title: "BRANDING 1",
    description: "Poster & logo design for Neon Groove Dance Studio, 2025.",
    imageUrl: brandingInsta3,
    images: [brandingInsta3, brandingBillboard, brandingInsta1, brandingInsta2, brandingPoster],
    details: "Poster and logo design for \"neon groove dance studio\" 2025"
  },
  {
    id: 3,
    title: "CALENDAR",
    description: "2026 calendar",
    imageUrl: calendar04,
    images: [calendar01, calendar02, calendar03, calendar04, calendar05, calendar06, calendar07, calendar08, calendar09, calendar10, calendar11, calendar12, calendar13],
    details: "2026 calendar",
    imagePosition: "center 15%"
  },
  {
    id: 4,
    title: "Event Poster",
    description: 'Terrain Gallery show poster, "Beasts: The Color of Winter"',
    imageUrl: terrainPoster,
    images: [terrainPoster],
    details: 'Poster for Terrain Gallery show, "Beasts: The Color of Winter"',
    imagePosition: "center 20%"
  },
  {
    id: 5,
    title: "The Great Song",
    description: "Personal Project / Risograph printing file",
    imageUrl: theGreatSong01,
    images: [theGreatSong01, theGreatSong02, theGreatSong03],
    details: "Personal Project / Risograph printing file",
    imagePosition: "center"
  },
  {
    id: 6,
    title: "Repurpose Lamp",
    description: "Lamp design, poster and tutorial for Art Salvage Spokane",
    imageUrl: repurposeLamp,
    images: [repurposeLamp],
    details: "Lamp design, poster and tutorial for Art Salvage Spokane",
    imagePosition: "center"
  }
];

// Interactive Figma prototypes data
const INTERACTIVE_PROJECTS = [
  {
    id: 8,
    title: "Project 8",
    description: "UN sustainability interactive prototype",
    thumbnailUrl: project8Thumbnail,
    figmaUrl: "https://www.figma.com/proto/9YXXgAKfZzPukrSJOJniQA/UX3-Project-2--UN-Sustainability--Copy-?node-id=341-1606&t=SJQXgpRx0fAPrMkZ-0&scaling=scale-down&content-scaling=fixed&page-id=171%3A58&starting-point-node-id=341%3A1606",
    figmaEmbedUrl: "https://embed.figma.com/proto/9YXXgAKfZzPukrSJOJniQA/UX3-Project-2--UN-Sustainability--Copy-?node-id=341-1606&scaling=scale-down&content-scaling=fixed&page-id=171%3A58&starting-point-node-id=341%3A1606&embed-host=share",
  },
  {
    id: 7,
    title: "Design Library App",
    description: "Interactive design library app prototype",
    thumbnailUrl: pxlThumbnail,
    figmaUrl: "https://www.figma.com/proto/QItpaDkIozGTucRAvCC5s2/Design-Library-App?node-id=2439-457&t=GGBrJahxiIvNihrm-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A21&starting-point-node-id=2439%3A457",
    figmaEmbedUrl: "https://embed.figma.com/proto/QItpaDkIozGTucRAvCC5s2/Design-Library-App?node-id=2439-457&scaling=scale-down&content-scaling=fixed&page-id=1%3A21&starting-point-node-id=2439%3A457&embed-host=share",
  },
  {
    id: 1,
    title: "Zip's Ordering Kiosk",
    description: "Fast food ordering kiosk prototype with a multilingual welcome flow",
    thumbnailUrl: zipsKioskThumbnail,
    figmaUrl: "https://www.figma.com/proto/5iPATilzci4nna38SlgXDp/UX-1-Project--3--Zip-s-Order-Kiosk--Spring-2025---Community-?node-id=2350-81&t=hWwhBGY9rsGWHeZz-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A9&starting-point-node-id=106%3A31",
    figmaEmbedUrl: "https://embed.figma.com/proto/5iPATilzci4nna38SlgXDp/UX-1-Project--3--Zip-s-Order-Kiosk--Spring-2025---Community-?node-id=2350-81&scaling=scale-down&content-scaling=fixed&page-id=1%3A9&starting-point-node-id=106%3A31&embed-host=share",
  },
  {
    id: 2,
    title: "Smart Treadmill Interface",
    description: "Interactive prototype for a smart treadmill interface",
    thumbnailUrl: treadmillThumbnail,
    figmaUrl: "https://www.figma.com/proto/opZfpVN4JxgRKEWbzQdufj/UX-1-Project--2--Treadmill-Jaeden-Crow?node-id=2068-924&scaling=scale-down&content-scaling=fixed&page-id=1%3A428&starting-point-node-id=2068%3A914",
    figmaEmbedUrl: "https://embed.figma.com/proto/opZfpVN4JxgRKEWbzQdufj/UX-1-Project--2--Treadmill-Jaeden-Crow?node-id=2068-924&scaling=scale-down&content-scaling=fixed&page-id=1%3A428&starting-point-node-id=2068%3A914&embed-host=share",
  },
  {
    id: 3,
    title: "Moses Lake Food Bank Redesign",
    description: "Website redesign prototype for the Moses Lake Food Bank focused on pantry access, updates, and outreach",
    thumbnailUrl: mlFoodBankThumbnail,
    figmaUrl: "https://www.figma.com/proto/PEBxrKI8xvgE4PLZNY4F0Y/UX-2-Project--3--ML-Food-Bank-Website--Community-?node-id=4301-1108&t=73WcGuNGu7DHGLco-1&scaling=scale-down&content-scaling=fixed&page-id=2001%3A6",
    figmaEmbedUrl: "https://embed.figma.com/proto/PEBxrKI8xvgE4PLZNY4F0Y/UX-2-Project--3--ML-Food-Bank-Website--Community-?node-id=4301-1108&scaling=scale-down&content-scaling=fixed&page-id=2001%3A6&embed-host=share",
  }
];

interface HomePageProps {
  workType: "print" | "interactive";
  setWorkType: (value: "print" | "interactive") => void;
}

export function HomePage({ workType, setWorkType }: HomePageProps) {
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_PROJECTS[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInteractive, setSelectedInteractive] = useState<typeof INTERACTIVE_PROJECTS[0] | null>(null);
  const [isFigmaDialogOpen, setIsFigmaDialogOpen] = useState(false);

  const handleProjectClick = (project: typeof PORTFOLIO_PROJECTS[0]) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleInteractiveClick = (project: typeof INTERACTIVE_PROJECTS[0]) => {
    setSelectedInteractive(project);
    setIsFigmaDialogOpen(true);
  };

  return (
    <main className="min-h-screen pt-20 md:pt-28 pb-16 md:pb-24">
      <section className="portfolio-name-hero px-4 md:px-12 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="portfolio-hero-title font-heading">
            <span>Jaeden Ives-Crow</span>
            <span>Vaughankraska</span>
          </h1>
          <a
            href={portfolioPdf}
            download="Jaeden-Ives-Crow-Vaughankraska-Portfolio.pdf"
            className="portfolio-download-button font-heading"
          >
            Download portfolio
          </a>
        </div>
      </section>

      <section id="selected-work" className="px-4 md:px-12 lg:px-20 py-16 md:py-24 border-t border-black">
        <div className="max-w-[1440px] mx-auto">
          <div className="portfolio-work-heading flex gap-8 mb-12 md:mb-16">
            <p className="portfolio-work-kicker uppercase tracking-[0.24em] text-[10px] md:text-xs">
              Selected work
            </p>
            <h2 className="portfolio-work-title font-heading text-3xl md:text-5xl tracking-[-0.03em]">
              {workType === "print" ? "Print & identity" : "UX & interactive"}
            </h2>
            <div className="portfolio-work-filter inline-flex border border-black bg-white" aria-label="Filter portfolio work">
              {(["print", "interactive"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setWorkType(type)}
                  className={`portfolio-filter-button font-heading uppercase tracking-[0.14em] text-[10px] md:text-xs px-4 md:px-5 py-3 transition-colors ${
                    workType === type
                      ? "bg-black text-white"
                      : "bg-transparent hover:text-red-600"
                  }`}
                  aria-pressed={workType === type}
                >
                  {type === "print" ? "Print / brand" : "UX / UI"}
                </button>
              ))}
            </div>
          </div>

          {workType === "print" ? (
            <div className="portfolio-project-grid grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-24">
              {PORTFOLIO_PROJECTS.map((project) => (
                <PortfolioCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  images={project.images}
                  imagePosition={project.imagePosition}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          ) : (
            <div className="portfolio-project-grid grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-24">
              {INTERACTIVE_PROJECTS.map((project) => (
                <InteractiveCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  thumbnailUrl={project.thumbnailUrl}
                  onClick={() => handleInteractiveClick(project)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Dialog */}
      <ProjectDetailDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        project={selectedProject}
      />

      {/* Figma Prototype Dialog */}
      <FigmaPrototypeDialog
        isOpen={isFigmaDialogOpen}
        onClose={() => setIsFigmaDialogOpen(false)}
        project={selectedInteractive}
      />
    </main>
  );
}
