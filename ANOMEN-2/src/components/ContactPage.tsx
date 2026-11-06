/**
 * Contact Page Component
 * Contact form with FormSubmit integration for inquiries
 */

// Form submission endpoint
const FORM_ENDPOINT = "https://formsubmit.co/jaedenivescrow@yahoo.com";

export function ContactPage() {
  return (
    <main className="contact-page min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
      <div className="px-4 md:px-12 lg:px-20">
        <section className="max-w-5xl mx-auto">
          <div className="mt-10">
            <form
              method="POST"
              action={FORM_ENDPOINT}
              className="contact-form space-y-8 pt-8"
            >
              <input type="hidden" name="_subject" value="New inquiry from Crow Design" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="space-y-3">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Name"
                  className="w-full border border-black bg-transparent px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-black placeholder:text-neutral-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    className="w-full border border-black bg-transparent px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-black placeholder:text-neutral-400"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone"
                    className="w-full border border-black bg-transparent px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-black placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="subject" className="sr-only">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  className="w-full border border-black bg-transparent px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-black placeholder:text-neutral-400"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="inquiry" className="sr-only">
                  Inquiry
                </label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  required
                  rows={6}
                  placeholder="Inquire"
                  className="w-full border border-black bg-transparent px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-black resize-none placeholder:text-neutral-400"
                />
              </div>

              <button
                type="submit"
                className=" tracking-[0.3em] text-[11px] border border-black px-6 py-3   transition-colors"
              >
                Send inquiry
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
