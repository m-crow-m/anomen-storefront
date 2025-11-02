import { useState, useEffect } from "react";
import { PortfolioCard } from "./PortfolioCard";
import { ProjectDetailDialog } from "./ProjectDetailDialog";
import { motion } from "framer-motion";
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

const portfolioProjects = [
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
    images: [brandingBillboard, brandingInsta1, brandingInsta2, brandingInsta3, brandingPoster],
    imageUrl: brandingPoster,
    images: [brandingPoster, brandingBillboard, brandingInsta1, brandingInsta2, brandingInsta3],
    details: "Poster and logo design for \"neon groove dance studio\" 2025"
  },
  {
    id: 3,
    title: "CONCRETE MEDITATION",
    description: "Material presence and absence in dialogue with spatial memory.",
    imageUrl: "https://images.unsplash.com/photo-1630950823804-a3df06166896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jcmV0ZSUyMHN0cnVjdHVyZSUyMG1pbmltYWx8ZW58MXx8fHwxNzYxMjYzMzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1630950823804-a3df06166896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jcmV0ZSUyMHN0cnVjdHVyZSUyMG1pbmltYWx8ZW58MXx8fHwxNzYxMjYzMzIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    details: "This installation explores the paradox of concrete as both monument and ruin. By isolating fragments of larger structures, the work invites contemplation on impermanence, weight, and the poetry found in industrial materials.\n\nInstallation view, 2024."
  },
  {
    id: 4,
    title: "PATTERN STUDY",
    description: "Repetition as transformation, texture as information.",
    imageUrl: "https://images.unsplash.com/photo-1547787991-50d8eb41e2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwcGF0dGVybiUyMHRleHR1cmV8ZW58MXx8fHwxNzYxMjYzMzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1547787991-50d8eb41e2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwcGF0dGVybiUyMHRleHR1cmV8ZW58MXx8fHwxNzYxMjYzMzIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    details: "An ongoing exploration of how repetition creates meaning and how pattern degrades into texture. Each iteration slightly shifts the rules, documenting the moment when order becomes ornament.\n\nDigital series, 2023-present."
  },
  {
    id: 5,
    title: "TYPOGRAPHIC ECHO",
    description: "Letters as objects, words as architecture, meaning as form.",
    imageUrl: "https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBvZ3JhcGh5JTIwZGVzaWduJTIwYmxhY2slMjB3aGl0ZXxlbnwxfHx8fDE3NjEyNjMzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBvZ3JhcGh5JTIwZGVzaWduJTIwYmxhY2slMjB3aGl0ZXxlbnwxfHx8fDE3NjEyNjMzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    details: "Typography reimagined as sculptural form. This project treats letterforms as architectural elements, exploring their weight, their negative space, and their capacity to occupy both physical and conceptual territory.\n\nCommissioned work, 2024."
  },
  {
    id: 6,
    title: "MINIMAL SCULPTURE",
    description: "Three-dimensional studies in reduction and spatial tension.",
    imageUrl: "https://images.unsplash.com/photo-1577703025450-4a543d6b4976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwc2N1bHB0dXJlJTIwYmxhY2slMjB3aGl0ZXxlbnwxfHx8fDE3NjEyNjMzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1577703025450-4a543d6b4976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwc2N1bHB0dXJlJTIwYmxhY2slMjB3aGl0ZXxlbnwxfHx8fDE3NjEyNjMzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    details: "A series of minimal sculptures that investigate the relationship between object and void, presence and absence. Each piece is reduced to its essential gesture, hovering at the threshold of recognition.\n\nSteel and concrete series, 2023."
  }
];

export function HomePage() {
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [strobeState, setStrobeState] = useState(0);
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    let currentLoop = 0;
    const baseInterval = 150; // 150ms between strobes
    const pauseDuration = 800; // 800ms pause

    const getSequence = (isOddLoop: boolean) => {
      const base = [
        { fill: "#000000", rotate: 0 },      // black, normal
        { fill: "#ffffff", rotate: 0 },      // white, normal  
        { fill: "#000000", rotate: 0 },      // black, normal
        { fill: "#ffffff", rotate: 0 },      // white, normal
        { fill: "#000000", rotate: 0 },      // black, normal
        { fill: "#ffffff", rotate: 0 },      // white, normal
        { fill: "#000000", rotate: 180 },    // black, upside down
        { fill: "#ffffff", rotate: 180 },    // white, upside down
      ];
      
      // Alternate ending: odd loops end on white, even loops end on black
      if (isOddLoop) {
        return [...base, { fill: "#ffffff", rotate: 0 }]; // end on white
      } else {
        return [...base, { fill: "#000000", rotate: 0 }]; // end on black
      }
    };

    const runSequence = () => {
      const isOddLoop = currentLoop % 2 === 1;
      const sequence = getSequence(isOddLoop);
      setLoopCount(currentLoop);
      
      const interval = setInterval(() => {
        currentIndex++;
        if (currentIndex >= sequence.length) {
          clearInterval(interval);
          setTimeout(() => {
            currentLoop++;
            currentIndex = -1;
            runSequence();
          }, pauseDuration);
        } else {
          setStrobeState(currentIndex);
        }
      }, baseInterval);
    };

    runSequence();
  }, []);

  const getSequence = (isOddLoop: boolean) => {
    const base = [
      { fill: "#000000", rotate: 0 },
      { fill: "#ffffff", rotate: 0 },
      { fill: "#000000", rotate: 0 },
      { fill: "#ffffff", rotate: 0 },
      { fill: "#000000", rotate: 0 },
      { fill: "#ffffff", rotate: 0 },
      { fill: "#000000", rotate: 180 },
      { fill: "#ffffff", rotate: 180 },
    ];
    
    if (isOddLoop) {
      return [...base, { fill: "#ffffff", rotate: 0 }];
    } else {
      return [...base, { fill: "#000000", rotate: 0 }];
    }
  };

  const currentSequence = getSequence(loopCount % 2 === 1);
  const currentStrobe = currentSequence[strobeState] || currentSequence[0];

  const handleProjectClick = (project: typeof portfolioProjects[0]) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  return (
    <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32 bg-white">
      {/* Hero Section - Editorial Layout */}
      <section className="px-4 md:px-8 py-8 md:py-12 lg:py-16 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            className="absolute top-4 left-4 md:top-8 md:left-8 text-xs md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            P. 01
          </motion.div>

          <div className="flex justify-center items-center">
            <h1
              className="font-heading uppercase tracking-[-0.15em] text-[35vw] md:text-[38vw] leading-[0.75] select-none"
              style={{
                WebkitTextStroke: currentStrobe.fill === "#ffffff" ? "2px black" : "4px black",
                textStroke: currentStrobe.fill === "#ffffff" ? "2px black" : "4px black",
                color: currentStrobe.fill,
                WebkitTextFillColor: currentStrobe.fill,
                transform: `rotateX(${currentStrobe.rotate}deg) scaleX(0.75)`,
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
              }}
            >
              NOISE
            </h1>
          </div>

          <div className="mt-12 md:mt-24 lg:mt-32 text-xs md:text-sm max-w-xs">
            A COLLECTION OF WORK<br />
            EXPLORING STRUCTURE,<br />
            MATERIAL, AND FORM
          </div>
        </div>
      </section>

      {/* Portfolio Grid - Editorial Asymmetric Layout */}
      <section className="px-4 md:px-12 lg:px-20 py-12 md:py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto">
          {/* Project 1 - Large */}
          <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-2 flex items-start mb-4 md:mb-0">
              <div className="text-xs md:text-sm space-y-1">
                <div>P. 13</div>
                <div className="mt-4 md:mt-8">01</div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <PortfolioCard
                title={portfolioProjects[0].title}
                description={portfolioProjects[0].description}
                imageUrl={portfolioProjects[0].imageUrl}
                onClick={() => handleProjectClick(portfolioProjects[0])}
              />
            </div>
          </div>

          {/* Projects 2 & 3 - Side by Side */}
          <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-5 md:col-start-3">
              <div className="text-xs md:text-sm mb-4 md:mb-8">
                <div>P. 29</div>
                <div className="mt-2">02</div>
              </div>
              <PortfolioCard
                title={portfolioProjects[1].title}
                description={portfolioProjects[1].description}
                imageUrl={portfolioProjects[1].imageUrl}
                onClick={() => handleProjectClick(portfolioProjects[1])}
              />
            </div>
            <div className="col-span-12 md:col-span-4 mt-12 md:mt-24 lg:mt-48">
              <div className="text-xs md:text-sm mb-4 md:mb-8">
                <div>P. 59</div>
                <div className="mt-2">03</div>
              </div>
              <PortfolioCard
                title={portfolioProjects[2].title}
                description={portfolioProjects[2].description}
                imageUrl={portfolioProjects[2].imageUrl}
                onClick={() => handleProjectClick(portfolioProjects[2])}
              />
            </div>
          </div>

          {/* Project 4 - Large with text overlay concept */}
          <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8 relative">
            <div className="col-span-12 md:col-span-7 md:col-start-4">
              <div className="text-xs md:text-sm mb-4 md:mb-8">
                <div>P. 85</div>
                <div className="mt-2">04</div>
              </div>
              <PortfolioCard
                title={portfolioProjects[3].title}
                description={portfolioProjects[3].description}
                imageUrl={portfolioProjects[3].imageUrl}
                onClick={() => handleProjectClick(portfolioProjects[3])}
              />
            </div>
          </div>

          {/* Projects 5 & 6 - Offset */}
          <div className="grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-4 md:col-start-2">
              <div className="text-xs md:text-sm mb-4 md:mb-8">
                <div>P. 131</div>
                <div className="mt-2">05</div>
              </div>
              <PortfolioCard
                title={portfolioProjects[4].title}
                description={portfolioProjects[4].description}
                imageUrl={portfolioProjects[4].imageUrl}
                onClick={() => handleProjectClick(portfolioProjects[4])}
              />
            </div>
            <div className="col-span-12 md:col-span-5 mt-12 md:mt-32 lg:mt-64">
              <div className="text-xs md:text-sm mb-4 md:mb-8">
                <div>P. 155</div>
                <div className="mt-2">06</div>
              </div>
              <PortfolioCard
                title={portfolioProjects[5].title}
                description={portfolioProjects[5].description}
                imageUrl={portfolioProjects[5].imageUrl}
                onClick={() => handleProjectClick(portfolioProjects[5])}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Dialog */}
      <ProjectDetailDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        project={selectedProject}
      />
    </main>
  );
}
