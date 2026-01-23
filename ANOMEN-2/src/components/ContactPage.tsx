/**
 * Contact Page Component
 * Contact form with FormSubmit integration for inquiries
 */

import { useMemo } from "react";

// Form submission endpoint
const FORM_ENDPOINT = "https://formsubmit.co/jaedenivescrow@yahoo.com";

export function ContactPage() {
  const contactDetails = useMemo(
    () => [
      {
        label: "Email",
        value: "jaedenivescrow@yahoo.com",
        href: "mailto:jaedenivescrow@yahoo.com"
      }
    ],
    []
  );

  return (
    <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
      <div className="px-4 md:px-12 lg:px-20">
        <section className="max-w-5xl mx-auto">
          <header className="mb-8 md:mb-12 lg:mb-14">
            <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 mb-4 mt-8">
              Contact / Inquiries
            </p>
            <h1 className="font-heading text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.06em] uppercase leading-[0.85]">
              CONTACT
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-8 lg:gap-12 items-start">
            <form
              method="POST"
              action={FORM_ENDPOINT}
              className="space-y-8 pt-8"
            >
              <input type="hidden" name="_subject" value="New inquiry from ANOMEN" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="space-y-3">
                <label htmlFor="name" className="uppercase text-[10px] tracking-[0.3em] text-neutral-500">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full border border-black bg-transparent px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-black placeholder:text-neutral-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="email" className="uppercase text-[10px] tracking-[0.3em] text-neutral-500">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full border border-black bg-transparent px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-black placeholder:text-neutral-400"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="phone" className="uppercase text-[10px] tracking-[0.3em] text-neutral-500">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Optional"
                    className="w-full border border-black bg-transparent px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-black placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="subject" className="uppercase text-[10px] tracking-[0.3em] text-neutral-500">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project or opportunity"
                  className="w-full border border-black bg-transparent px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-black placeholder:text-neutral-400"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="inquiry" className="uppercase text-[10px] tracking-[0.3em] text-neutral-500">
                  Inquiry
                </label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  required
                  rows={6}
                  placeholder="Tell me about your project, timeline, and goals."
                  className="w-full border border-black bg-transparent px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-black resize-none placeholder:text-neutral-400"
                />
              </div>

              <button
                type="submit"
                className="uppercase tracking-[0.3em] text-[11px] border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors"
              >
                Send Inquiry
              </button>
            </form>

            <aside className="space-y-10 pt-8">
              <div className="space-y-4">
                <h2 className="uppercase text-[10px] tracking-[0.3em] text-neutral-500">
                  Direct Contact
                </h2>
                <div className="space-y-3">
                  {contactDetails.map((item) => (
                    <div key={item.label} className="pb-3">
                      <span className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                        {item.label}
                      </span>
                      <a
                        href={item.href}
                        className="text-sm md:text-base tracking-wide hover:text-red-600 transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="uppercase text-[10px] tracking-[0.3em] text-neutral-500">
                  Send
                </h2>
                <div className="space-y-3 text-sm md:text-base tracking-wide text-neutral-700">
                  <p>Project goals + deliverables.</p>
                  <p>Ideal timeline and launch dates.</p>
                  <p>Budget guidance if available.</p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
