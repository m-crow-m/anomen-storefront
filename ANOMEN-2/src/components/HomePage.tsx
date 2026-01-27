/**
 * Home Page Component
 * Landing page with hero section and portfolio showcase
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Components
import { PortfolioCard } from "./PortfolioCard";
import { InteractiveCard } from "./InteractiveCard";
import { ProjectDetailDialog } from "./ProjectDetailDialog";
import { FigmaPrototypeDialog } from "./FigmaPrototypeDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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

// Terrain poster asset
import terrainPoster from "../assets/Terrain_poster_2025.jpg";

// The Great Song assets
import theGreatSong01 from "../assets/theGreatSong01.jpg";
import theGreatSong02 from "../assets/theGreatSong02.jpg";
import theGreatSong03 from "../assets/theGreatSong03.jpg";
import repurposeLamp from "../assets/Repurpose_Lamp_JIC_10-25.jpg";
import heroAnimationMov from "../assets/heroAnimation.mov";
import heroAnimationWebm from "../assets/HeroAnimation.webm";

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
    id: 1,
    title: "Mobile App Prototype",
    description: "Interactive mobile app design concept",
    thumbnailUrl: "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Mobile+App",
    figmaEmbedUrl: "https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_URL_1",
  },
  {
    id: 2,
    title: "Dashboard UI",
    description: "Data visualization dashboard prototype",
    thumbnailUrl: "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Dashboard+UI",
    figmaEmbedUrl: "https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_URL_2",
  },
  {
    id: 3,
    title: "Smart Treadmill Interface",
    description: "Interactive prototype for a smart treadmill interface",
    thumbnailUrl: treadmillThumbnail,
    figmaEmbedUrl: "https://embed.figma.com/proto/opZfpVN4JxgRKEWbzQdufj/UX-1-Project--2--Treadmill-Jaeden-Crow?node-id=2068-924&scaling=scale-down&content-scaling=fixed&page-id=1%3A428&starting-point-node-id=2068%3A914&embed-host=share",
  }
];

export function HomePage() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_PROJECTS[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workType, setWorkType] = useState<"print" | "interactive">("print");
  const [selectedInteractive, setSelectedInteractive] = useState<typeof INTERACTIVE_PROJECTS[0] | null>(null);
  const [isFigmaDialogOpen, setIsFigmaDialogOpen] = useState(false);
  const [useCanvas] = useState(() => {
    if (typeof window === "undefined") return false;
    const ua = window.navigator.userAgent.toLowerCase();
    const hasMediaCapabilities = !!(
      window.navigator.mediaCapabilities &&
      window.navigator.mediaCapabilities.decodingInfo
    );
    const isSafari =
      ua.includes("safari") && !ua.includes("chrome") && ua.includes("version/");
    return !(isSafari && hasMediaCapabilities);
  });

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const canvas = heroCanvasRef.current;
    const shouldUseMov = !useCanvas;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.src = shouldUseMov ? heroAnimationMov : heroAnimationWebm;
    video.load();

    let rafId = 0;
    let onReady: (() => void) | null = null;

    if (!shouldUseMov && canvas) {
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const renderFrame = () => {
        if (video.readyState >= 2) {
          if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
          }
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        rafId = requestAnimationFrame(renderFrame);
      };

      onReady = () => {
        if (rafId === 0) {
          renderFrame();
        }
      };

      video.addEventListener("loadeddata", onReady);
      onReady();
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => undefined);
    }

    return () => {
      if (onReady) {
        video.removeEventListener("loadeddata", onReady);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [useCanvas]);

  const handleProjectClick = (project: typeof PORTFOLIO_PROJECTS[0]) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleInteractiveClick = (project: typeof INTERACTIVE_PROJECTS[0]) => {
    setSelectedInteractive(project);
    setIsFigmaDialogOpen(true);
  };

  return (
    <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
      {/* Hero Section - Editorial Layout */}
      <section className="px-0 pt-2 pb-8 md:pt-4 md:pb-12 lg:pt-6 lg:pb-16 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <motion.div
            className="absolute top-4 left-4 md:top-8 md:left-8 text-xs md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            P. 01
          </motion.div>

        </div>

        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 -mt-4 md:-mt-6">
            <div className="relative w-full aspect-video">
              {useCanvas ? (
                <canvas
                  ref={heroCanvasRef}
                  className="w-full h-full object-contain pointer-events-none"
                />
              ) : null}
              <video
                ref={heroVideoRef}
                className={`hero-video w-full h-full object-contain${useCanvas ? " hero-video-source" : ""}`}
                autoPlay
                loop
                muted
                controls={false}
                controlsList="nodownload noplaybackrate noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
                playsInline
                preload="auto"
              />
            </div>
          </div>

        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="mt-3 md:mt-4 text-xs md:text-sm max-w-xs">
            A COLLECTION OF WORK<br />
            EMPHASIZING HUMANITY,<br />
            STRUCTURE, AND SPACE
          </div>
        </div>
      </section>

      {/* Portfolio Grid - Editorial Asymmetric Layout */}
      <section className="px-4 md:px-12 lg:px-20 py-12 md:py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto">
          {/* Work Type Selector */}
          <div className="mb-12 md:mb-16 flex items-center gap-4">
            <span className="text-xs md:text-sm uppercase tracking-wider" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Viewing:</span>
            <Select value={workType} onValueChange={(value: "print" | "interactive") => setWorkType(value)}>
              <SelectTrigger className="w-[180px] md:w-[220px] border-black bg-transparent text-xs md:text-sm uppercase tracking-wider px-4 py-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                <SelectItem value="print" className="text-xs md:text-sm uppercase tracking-wider cursor-pointer px-4 py-3 hover:bg-black hover:text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>print</SelectItem>
                <SelectItem value="interactive" className="text-xs md:text-sm uppercase tracking-wider cursor-pointer px-4 py-3 hover:bg-black hover:text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>ux / ui</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {workType === "print" ? (
            <>
              {/* Project 1 - Large */}
              <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-2 flex items-start mb-4 md:mb-0">
                  <div className="text-xs md:text-sm space-y-1">
                    <div>P. 13</div>
                    <div className="mt-4 md:mt-8">01</div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-4 lg:col-start-5">
                  <PortfolioCard
                    title={PORTFOLIO_PROJECTS[0].title}
                    description={PORTFOLIO_PROJECTS[0].description}
                    imageUrl={PORTFOLIO_PROJECTS[0].imageUrl}
                    images={PORTFOLIO_PROJECTS[0].images}
                    onClick={() => handleProjectClick(PORTFOLIO_PROJECTS[0])}
                  />
                </div>
              </div>

              {/* Project 2 */}
              <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-6 md:col-start-3 lg:col-start-2">
                  <div className="text-xs md:text-sm mb-4 md:mb-8">
                    <div>P. 29</div>
                    <div className="mt-2">02</div>
                  </div>
                  <PortfolioCard
                    title={PORTFOLIO_PROJECTS[1].title}
                    description={PORTFOLIO_PROJECTS[1].description}
                    imageUrl={PORTFOLIO_PROJECTS[1].imageUrl}
                    images={PORTFOLIO_PROJECTS[1].images}
                    onClick={() => handleProjectClick(PORTFOLIO_PROJECTS[1])}
                  />
                </div>
              </div>

          {/* Project 3 - Calendar */}
          <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-2 flex items-start mb-4 md:mb-0">
              <div className="text-xs md:text-sm space-y-1">
                <div>P. 45</div>
                <div className="mt-4 md:mt-8">03</div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-3 lg:col-start-4">
              <PortfolioCard
                title={PORTFOLIO_PROJECTS[2].title}
                description={PORTFOLIO_PROJECTS[2].description}
                imageUrl={PORTFOLIO_PROJECTS[2].imageUrl}
                images={PORTFOLIO_PROJECTS[2].images}
                imagePosition={PORTFOLIO_PROJECTS[2].imagePosition}
                onClick={() => handleProjectClick(PORTFOLIO_PROJECTS[2])}
              />
            </div>
          </div>

          {/* Project 4 - Terrain Poster */}
          <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-2 flex items-start mb-4 md:mb-0">
              <div className="text-xs md:text-sm space-y-1">
                <div>P. 57</div>
                <div className="mt-4 md:mt-8">04</div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-2 lg:col-start-1">
              <PortfolioCard
                title={PORTFOLIO_PROJECTS[3].title}
                description={PORTFOLIO_PROJECTS[3].description}
                imageUrl={PORTFOLIO_PROJECTS[3].imageUrl}
                images={PORTFOLIO_PROJECTS[3].images}
                imagePosition={PORTFOLIO_PROJECTS[3].imagePosition}
                onClick={() => handleProjectClick(PORTFOLIO_PROJECTS[3])}
              />
            </div>
          </div>

          {/* Project 5 - The Great Song */}
          <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-2 flex items-start mb-4 md:mb-0">
              <div className="text-xs md:text-sm space-y-1">
                <div>P. 63</div>
                <div className="mt-4 md:mt-8">05</div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-5 lg:col-start-6">
              <PortfolioCard
                title={PORTFOLIO_PROJECTS[4].title}
                description={PORTFOLIO_PROJECTS[4].description}
                imageUrl={PORTFOLIO_PROJECTS[4].imageUrl}
                images={PORTFOLIO_PROJECTS[4].images}
                imagePosition={PORTFOLIO_PROJECTS[4].imagePosition}
                onClick={() => handleProjectClick(PORTFOLIO_PROJECTS[4])}
              />
            </div>
          </div>

          {/* Project 6 - Repurpose Lamp */}
          <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-2 flex items-start mb-4 md:mb-0">
              <div className="text-xs md:text-sm space-y-1">
                <div>P. 71</div>
                <div className="mt-4 md:mt-8">06</div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-3 lg:col-start-2">
              <PortfolioCard
                title={PORTFOLIO_PROJECTS[5].title}
                description={PORTFOLIO_PROJECTS[5].description}
                imageUrl={PORTFOLIO_PROJECTS[5].imageUrl}
                images={PORTFOLIO_PROJECTS[5].images}
                imagePosition={PORTFOLIO_PROJECTS[5].imagePosition}
                onClick={() => handleProjectClick(PORTFOLIO_PROJECTS[5])}
              />
            </div>
          </div>
            </>
          ) : (
            /* Interactive Work Grid */
            <>
              <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-2 flex items-start mb-4 md:mb-0">
                  <div className="text-xs md:text-sm space-y-1">
                    <div>INT. 03</div>
                    <div className="mt-4 md:mt-8">03</div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <InteractiveCard
                    title={INTERACTIVE_PROJECTS[2].title}
                    description={INTERACTIVE_PROJECTS[2].description}
                    thumbnailUrl={INTERACTIVE_PROJECTS[2].thumbnailUrl}
                    onClick={() => handleInteractiveClick(INTERACTIVE_PROJECTS[2])}
                  />
                </div>
              </div>
            </>
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
