/**
 * About Page Component
 */

export function AboutPage() {
  return (
    <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
      <section className="px-4 md:px-12 lg:px-20">
        <div className="w-full mx-auto text-left about-text">
          <h1
            className="font-heading text-3xl md:text-5xl tracking-wider uppercase"
            style={{ marginTop: "3rem" }}
          >
            ABOUT ME
          </h1>
          <div className="text-sm md:text-base leading-relaxed text-neutral-700" style={{ marginTop: "3rem" }}>
            <p className="mt-0">
              Hi! I&apos;m Jaeden Crow. I’m a multidisciplinary designer specializing in UX/UI and graphic design,
              with a strong focus on branding and print. I’m a senior graduating in June with a Bachelor of Design
              and a minor in UX Design. I bring a typography-forward, systems-minded approach to everything I make,
              whether it’s an interface, a brand identity, or a print layout, and I care about creating work that feels
              clear, intentional, and human.
            </p>
            <p className="mt-8">
              I’m proficient in Adobe Creative Suite and Figma, and I’m comfortable working in GitHub and VS Code.
              I also have working knowledge of front end languages (HTML/CSS/JavaScript), which helps me design with
              real constraints in mind and collaborate smoothly with developers.
            </p>
            <p className="mt-8">
              I’m excited to begin my career in graphic design and UX design, and I’m always open to freelance projects
              that let me build strong visuals, solve real problems, and collaborate with good people.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
