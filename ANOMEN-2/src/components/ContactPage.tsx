/**
 * Contact Page Component
 * Contact form with FormSubmit integration for inquiries
 */

// Form submission endpoint
const FORM_ENDPOINT = "https://formsubmit.co/jaedenivescrow@yahoo.com";

export function ContactPage() {
  return (
    <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
      <div className="px-4 md:px-12 lg:px-20">
        <section className="max-w-5xl mx-auto">
          <div className="mt-10">
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
          </div>
        </section>
      </div>
    </main>
  );
}
