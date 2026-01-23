/**
 * About Page Component
 */

export function AboutPage() {
  return (
    <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
      <section className="px-4 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 mb-4 mt-8">
            About
          </p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-wider uppercase">
            ABOUT ME
          </h1>
          <div className="mt-6 space-y-5 text-sm md:text-base leading-relaxed text-neutral-700">
            <p>
              Hi! I&apos;m Jaeden Crow. I’m a multidisciplinary designer specializing in UX/UI and graphic design,
              with a strong focus on branding and print. I’m a senior graduating in June with a Bachelor of Design
              and a minor in UX Design. I bring a typography-forward, systems-minded approach to everything I make,
              whether it’s an interface, a brand identity, or a print layout, and I care about creating work that feels
              clear, intentional, and human.
            </p>
            <p>
              I’m proficient in Adobe Creative Suite and Figma, and I’m comfortable working in GitHub and VS Code.
              I also have working knowledge of front end languages (HTML/CSS/JavaScript), which helps me design with
              real constraints in mind and collaborate smoothly with developers.
            </p>
            <p>
              I’m excited to begin my career in graphic design and UX design, and I’m always open to freelance projects
              that let me build strong visuals, solve real problems, and collaborate with good people.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
