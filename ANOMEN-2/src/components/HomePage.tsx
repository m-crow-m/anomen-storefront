const featuredProducts = [
  {
    id: "a",
    label: "(A+0)",
    name: "NEVER TEE, UNISEX",
    price: "$40",
    imageUrl:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "b",
    label: "(B+0)",
    name: "DOSTOEVSKY TEE",
    price: "$40",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  },
];

export function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-6 md:px-12 lg:px-20 pt-24 pb-20 md:pt-32 md:pb-24 border-b border-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-6">P. 01</div>
          <h1 className="font-heading uppercase text-[26vw] md:text-[20vw] leading-[0.85] tracking-[-0.12em]">NOISE</h1>
          <p className="mt-12 text-xs md:text-sm leading-relaxed max-w-xs uppercase">
            A COLLECTION OF WORK
            <br />
            EXPLORING STRUCTURE,
            <br />
            MATERIAL, AND FORM
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid gap-16 md:gap-12 md:grid-cols-[1fr_1fr]">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="relative border border-black p-6 md:p-10 flex flex-col gap-6 md:gap-8"
            >
              <span className="absolute -top-5 left-0 text-xs uppercase tracking-[0.2em]">
                {product.label}
              </span>
              <div className="border border-black bg-white">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full object-contain bg-white aspect-[4/5]"
                />
              </div>
              <div className="flex justify-between items-end text-xs md:text-sm uppercase tracking-widest">
                <div>
                  <p className="font-heading">{product.name}</p>
                </div>
                <p>{product.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
