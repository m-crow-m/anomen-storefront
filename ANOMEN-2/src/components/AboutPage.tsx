/**
 * About Page Component
 */

import jaedenPortrait from "../assets/JaedenCrow.jpeg";

export function AboutPage() {
  return (
    <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
      <section className="px-4 md:px-12 lg:px-20">
        <div className="about-layout mx-auto">
          <h1
            className="about-heading font-heading text-3xl md:text-5xl tracking-wider uppercase"
          >
            ABOUT ME
          </h1>
          <div className="about-portrait">
            <img
              src={jaedenPortrait}
              alt="Jaeden Ives-Crow Vaughankraska"
              className="w-full h-auto"
            />
          </div>
          <div className="about-copy text-sm md:text-base leading-relaxed text-neutral-700">
            <p className="mt-0">
              Passionate about people. Curating experiences that remind us of
              our humanity; creating problems to solve out of spite; tending to
              my two adorable felines.
            </p>
            <p className="mt-8">
              I am Jaeden, and I often think too hard about nothing. I balance
              this out with an overflowing store of empathy that can sometimes
              get me into trouble. I think my work reflects that. I create with
              the hope that my humanhood will be apparent. I try to find out
              what choice I can make that is so wrong it actually becomes the
              only right one. The most absolutely rightest choice there ever
              was.
            </p>
            <p className="mt-8">
              This can all be attributed to my Type 4 personality. I want to be
              part of a community, but I want to stand out, to be unique. I want
              so desperately to be understood, though no one will ever
              understand me. This is my superpower.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
