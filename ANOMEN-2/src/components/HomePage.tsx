/**
 * Home Page Component
 * Landing page with hero section and portfolio showcase
 */

import { useState } from "react";

// Components
import { VideoDialog } from "./VideoDialog";
import { LandingBio } from "./LandingBio";
import { WorkCarousel } from "./WorkCarousel";
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
import museumExhibit1 from "../assets/Cold_Millions/1.png";
import museumExhibit2 from "../assets/Cold_Millions/2.png";
import museumExhibit3 from "../assets/Cold_Millions/3.png";
import museumExhibit4 from "../assets/Cold_Millions/4.png";
import museumExhibit5 from "../assets/Cold_Millions/5.png";
import museumExhibit6 from "../assets/Cold_Millions/6.png";
import museumExhibit7 from "../assets/Cold_Millions/7.png";
import museumExhibitPhoto from "../assets/Cold_Millions/cold millions 3.jpg";

// Interactive Work Assets
import treadmillThumbnail from "../assets/treadmill_thumbnail.png";
import project8Thumbnail from "../assets/Thumbnails/Project8.png";
import pxlThumbnail from "../assets/Thumbnails/PXL.png";
import zipsKioskThumbnail from "../assets/Thumbnails/Zipz.png";
import mlFoodBankThumbnail from "../assets/Thumbnails/ML Food.png";
import aiProjectThumbnail from "../assets/AI_Project thumbnail.png";

// Terrain poster asset
import terrainPoster from "../assets/Terrain_poster_2025.jpg";

// The Great Song assets
import theGreatSong01 from "../assets/theGreatSong01.jpg";
import theGreatSong02 from "../assets/theGreatSong02.jpg";
import theGreatSong03 from "../assets/theGreatSong03.jpg";
import repurposeLamp from "../assets/Repurpose_Lamp_JIC_10-25.jpg";


// Portfolio project data
const knrdImages = Object.entries(
  import.meta.glob<string>("../assets/KNRD Graphic Standards/*.jpg", {
    eager: true,
    query: "?url",
    import: "default"
  })
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url);

const PORTFOLIO_PROJECTS = [
  {
    id: 7,
    title: "Museum Exhibit",
    description: "Exhibition graphics connecting The Cold Millions to Spokane's labor history.",
    imageUrl: museumExhibit1,
    images: [museumExhibit1, museumExhibit2, museumExhibit3, museumExhibit4, museumExhibit5, museumExhibit6, museumExhibit7, museumExhibitPhoto],
    imageCaptions: [
      "15' x 10' vinyl wall sticker",
      "Retractable banner",
      "Foam core wall panel",
      "Foam core wall panel",
      "Foam core wall panel",
      "Foam core wall panel",
      "Foam core wall panel"
    ],
    details: "The Cold Millions\nRole: Exhibition graphic designer\nClient: Spokane Public Library and EWU History Department\nExhibited: February 11 - March 31, 2026, Spokane Public Library\n\nCreated a historical exhibition system exploring labor history, class conflict, and the Industrial Workers of the World in early-1900s Spokane, using Jess Walter's novel as a cultural reference. The challenge was to make dense historical content approachable in a public space.\n\nEarly Spokane newspapers and archival typography informed the visual direction. Red represented labor organizing and collective action; blue represented police authority. A flashlight, ladder, and prison bars became symbols of surveillance, precarious opportunity, and the criminalization of protest. Client meetings and iteration moved the work from traditional newspaper references toward a darker, more symbolic system with clear hierarchy.\n\nDeliverables included a 15-foot vinyl wall graphic, a retractable banner, five foam core panels, and 23 object cards. The banner and panels were later shown at the EWU Research Symposium.",
    imagePosition: "center"
  },
  {
    id: 8,
    title: "KNRD Graphic Standards",
    description: "Complete brand identity and guidelines, including logo variations, colors, typography, templates and merchandise mockups.",
    imageUrl: knrdImages[0],
    images: knrdImages,
    details: "Designed the complete KNRD visual identity—from logo variations, color palette and typography to templates and merchandise mockups—and created the graphic standards document.",
    imagePosition: "center"
  },
  {
    id: 1,
    title: "Room Magazine",
    description: "ergonomic layout design",
    imageUrl: metalMagazine1,
    images: [metalMagazine1, metalMagazine2, metalMagazine3, metalMagazine4, metalMagazine5, metalMagazine6],
    details: "Editorial spread designed for Room Magazine 2025"
  },
  {
    id: 2,
    title: "Branding 1",
    description: "Poster & logo design for Neon Groove Dance Studio, 2025.",
    imageUrl: brandingInsta3,
    images: [brandingInsta3, brandingBillboard, brandingInsta1, brandingInsta2, brandingPoster],
    details: "Poster and logo design for \"neon groove dance studio\" 2025"
  },
  {
    id: 3,
    title: "Calendar",
    description: "",
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
    description: "A risograph study of identity, family, and self-discovery.",
    imageUrl: theGreatSong01,
    images: [theGreatSong01, theGreatSong02, theGreatSong03],
    details: "An Identity Crisis\nA risograph study turned self-discovery\n\nCreated for a collaborative exhibition of risograph-printed work at Eastern Washington University, with the theme of the designers themselves. What began as an uncomfortable self-portrait assignment became an exploration of identity, family, and parenthood.\n\nReading Herman Hesse's Siddhartha, particularly its depiction of the river, prompted a more intuitive drawing process. Rather than planning every mark, I let the pencil make unexpected decisions. The drawing led to thoughts about parenthood, and I incorporated family photographs of my mother with her mother into the final image.",
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

type FigmaProject = {
  details?: string;
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  figmaUrl: string;
  figmaEmbedUrl: string;
};

type ExternalProject = {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  externalUrl: string;
};

type InteractiveProject = FigmaProject | ExternalProject;

const AI_MOTION_PROJECT: ExternalProject = {
    id: 9,
    title: "AI Research Project",
    description: "Short film exploring AI research and human connection",
    thumbnailUrl: aiProjectThumbnail,
    externalUrl: "https://m-crow-m.github.io/notalone/",
  };

// Interactive prototypes and external projects data
const INTERACTIVE_PROJECTS: InteractiveProject[] = [
  {
    id: 8,
    title: "Project 8",
    details: "Role: Visual identity, brand direction, and high-fidelity prototype\nTools: Figma, Illustrator, Photoshop\nMethods: Research, comparative assessment, persona development, flow mapping\n\nA safety-focused mobile concept supporting UN Sustainable Development Goal 5.2: eliminating violence against women and girls. The group explored how people in rural communities could recognize intimate partner violence, respond safely, and find support despite barriers involving distance, privacy, transportation, and limited services.\n\nResearch and comparison with existing resources informed three core content areas: Recognize Signs, Respond Safely, and Get Help. The concept also explored private documentation and location-based resources. Group flow mapping considered both people experiencing violence and people trying to help someone else.\n\nI developed a discreet visual identity and a calm, welcoming high-fidelity prototype. Purple references domestic violence awareness, survival, and solidarity; orange draws on UN Women's Orange the World campaign. The name and eight-part identity aimed to support sensitive needs without making the resource's purpose immediately visible.",
    description: "A discreet mobile support concept for people affected by intimate partner violence.",
    thumbnailUrl: project8Thumbnail,
    figmaUrl: "https://www.figma.com/proto/9YXXgAKfZzPukrSJOJniQA/UX3-Project-2--UN-Sustainability--Copy-?node-id=341-1606&t=SJQXgpRx0fAPrMkZ-0&scaling=scale-down&content-scaling=fixed&page-id=171%3A58&starting-point-node-id=341%3A1606",
    figmaEmbedUrl: "https://embed.figma.com/proto/9YXXgAKfZzPukrSJOJniQA/UX3-Project-2--UN-Sustainability--Copy-?node-id=341-1606&scaling=scale-down&content-scaling=fixed&page-id=171%3A58&starting-point-node-id=341%3A1606&embed-host=share",
  },
  {
    id: 7,
    title: "Design Library App",
    details: "PXL - Design Library App\nRole: UX designer\nTools: Figma, Illustrator, Photoshop\nMethods: Kano model, collage interviews, sketching, user testing\n\nAn app concept for discovering, saving, organizing, and sharing visual inspiration while learning design tools and theory. I defined the core features, mapped user flows, and developed the visual and brand identity.\n\nCollage interviews showed a preference for calm, self-paced learning, short visual lessons, useful exercises, and feedback that felt different from traditional social media. A Kano analysis prioritized saved collections, structured critique, and learning resources over follower counts, direct messages, and other social features.\n\nTesting the low-fidelity prototype revealed a need for clearer instructions, stronger contrast, readable type, labeled controls, and more obvious entry points. The final design brings guided learning modules together with a personal inspiration library and organized collections.",
    description: "A calm place for designers to learn, collect inspiration, and exchange feedback.",
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
    details: "Community Services of Moses Lake - Website Redesign\nRole: UX designer\nTools: Figma, Illustrator, Photoshop\nMethods: Listening tour, content inventory and audit, card sorting, testing and critique\n\nA redesign focused on making food, resources, donations, and community support easier to find. Discovery with users and staff identified hours, location, food access, donations, and volunteering requirements as priorities. Research found that 98% of site visits came from mobile devices, making a mobile-first structure central to the work.\n\nA content audit evaluated what should stay, move, combine, or be removed. Card sorting clarified scattered information and reduced overlap between sections such as About, Team, Services, and History. Staff needs also informed simple update areas for announcements, events, and pantry availability.\n\nThe final design uses warmer visuals, clearer navigation, and stronger information hierarchy to help visitors find practical support without feeling overwhelmed.",
    description: "A mobile-first redesign making food access, services, and community support easier to find.",
    thumbnailUrl: mlFoodBankThumbnail,
    figmaUrl: "https://www.figma.com/proto/PEBxrKI8xvgE4PLZNY4F0Y/UX-2-Project--3--ML-Food-Bank-Website--Community-?node-id=4301-1108&t=73WcGuNGu7DHGLco-1&scaling=scale-down&content-scaling=fixed&page-id=2001%3A6",
    figmaEmbedUrl: "https://embed.figma.com/proto/PEBxrKI8xvgE4PLZNY4F0Y/UX-2-Project--3--ML-Food-Bank-Website--Community-?node-id=4301-1108&scaling=scale-down&content-scaling=fixed&page-id=2001%3A6&embed-host=share",
  }
];

interface HomePageProps {
  workType: "print" | "interactive" | "motion";
  setWorkType: (value: "print" | "interactive" | "motion") => void;
}

export function HomePage({ workType, setWorkType }: HomePageProps) {
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_PROJECTS[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInteractive, setSelectedInteractive] = useState<FigmaProject | null>(null);
  const [isFigmaDialogOpen, setIsFigmaDialogOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleProjectClick = (project: typeof PORTFOLIO_PROJECTS[0]) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleInteractiveClick = (project: InteractiveProject) => {
    if ("externalUrl" in project && project.externalUrl) {
      window.open(project.externalUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setSelectedInteractive(project);
    setIsFigmaDialogOpen(true);
  };

  return (
    <main className="portfolio-home min-h-screen">
      <h1 className="sr-only">Jaeden Ives-Crow Vaughankraska design portfolio</h1>

      <LandingBio />
      <WorkCarousel workType={workType} maxCardCount={PORTFOLIO_PROJECTS.length + INTERACTIVE_PROJECTS.length + 2} motionStartIndex={PORTFOLIO_PROJECTS.length + INTERACTIVE_PROJECTS.length} printCardCount={PORTFOLIO_PROJECTS.length} onCategoryChange={setWorkType} heading={
          <div className="portfolio-work-heading flex gap-8 mb-12 md:mb-16">
            <div className="portfolio-work-filter inline-flex border border-black bg-white" data-work-type={workType} aria-label="Filter portfolio work">
              {(["print", "interactive", "motion"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  data-category={type}
                  onClick={() => setWorkType(type)}
                  className={`portfolio-filter-button font-heading  tracking-[0.14em] text-[10px] md:text-xs px-4 md:px-5 py-3 transition-colors ${
                    workType === type
                      ? "bg-black text-white"
                      : "bg-transparent "
                  }`}
                  aria-pressed={workType === type}
                >
                  {type === "print" ? "Print / brand" : type === "interactive" ? "UX / UI" : "Motion"}
                </button>
              ))}
            </div>
          </div>

          }>
          <div className="portfolio-carousel-track">
              {PORTFOLIO_PROJECTS.map((project) => (
                <PortfolioCard
                  key={`print-${project.id}`}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  images={project.images}
                  imagePosition={project.imagePosition}
                  onClick={() => handleProjectClick(project)}
                />
              ))}

              {INTERACTIVE_PROJECTS.map((project) => (
                <InteractiveCard
                  key={`ux-${project.id}`}
                  title={project.title}
                  description={project.description}
                  thumbnailUrl={project.thumbnailUrl}
                  badgeLabel={"externalUrl" in project ? "Film" : "Prototype"}
                  onClick={() => handleInteractiveClick(project)}
                />
              ))}
              <InteractiveCard
                title={AI_MOTION_PROJECT.title}
                description={AI_MOTION_PROJECT.description}
                thumbnailUrl={AI_MOTION_PROJECT.thumbnailUrl}
                badgeLabel="Motion"
                onClick={() => handleInteractiveClick(AI_MOTION_PROJECT)}
              />
              <InteractiveCard
                title="calgare en sole."
                description="Motion project"
                thumbnailUrl="https://i.ytimg.com/vi/7EjkYXYm2G0/hqdefault.jpg"
                badgeLabel="Motion"
                onClick={() => setIsVideoOpen(true)}
              />
          </div>
      </WorkCarousel>

      <VideoDialog isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)}
        title="calgare en sole." videoId="7EjkYXYm2G0" />

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
