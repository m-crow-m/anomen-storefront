import { ProductCard } from "./ProductCard";
import { motion } from "motion/react";

const products = [
  {
    id: 1,
    name: "NOISE TEE / WHITE",
    price: "Limited Edition — $85",
    imageUrl: "https://images.unsplash.com/photo-1685968496959-fc795f9bff82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMGJsYWNrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjEyNjMzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    name: "ECHO TEE / BLACK",
    price: "Limited Edition — $85",
    imageUrl: "https://images.unsplash.com/photo-1744551611811-4a1c48b190e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRzaGlydCUyMG1pbmltYWx8ZW58MXx8fHwxNzYxMjU4ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    name: "BRUTALIST OBJECT 01",
    price: "Ceramic Vessel — $120",
    imageUrl: "https://images.unsplash.com/photo-1618037087830-5e746497905b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwb2JqZWN0JTIwYmxhY2slMjB3aGl0ZXxlbnwxfHx8fDE3NjEyNjMzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    name: "STRUCTURE TEE / WHITE",
    price: "Limited Edition — $85",
    imageUrl: "https://images.unsplash.com/photo-1685968496959-fc795f9bff82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMGJsYWNrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjEyNjMzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 5,
    name: "TRANSFORMATION TEE / BLACK",
    price: "Limited Edition — $85",
    imageUrl: "https://images.unsplash.com/photo-1744551611811-4a1c48b190e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRzaGlydCUyMG1pbmltYWx8ZW58MXx8fHwxNzYxMjU4ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 6,
    name: "MINIMAL OBJECT 02",
    price: "Steel Sculpture — $240",
    imageUrl: "https://images.unsplash.com/photo-1618037087830-5e746497905b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwb2JqZWN0JTIwYmxhY2slMjB3aGl0ZXxlbnwxfHx8fDE3NjEyNjMzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 7,
    name: "GRID TEE / WHITE",
    price: "Limited Edition — $85",
    imageUrl: "https://images.unsplash.com/photo-1685968496959-fc795f9bff82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMGJsYWNrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjEyNjMzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 8,
    name: "VOID TEE / BLACK",
    price: "Limited Edition — $85",
    imageUrl: "https://images.unsplash.com/photo-1744551611811-4a1c48b190e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRzaGlydCUyMG1pbmltYWx8ZW58MXx8fHwxNzYxMjU4ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 9,
    name: "CONCRETE OBJECT 03",
    price: "Limited Edition — $180",
    imageUrl: "https://images.unsplash.com/photo-1618037087830-5e746497905b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwb2JqZWN0JTIwYmxhY2slMjB3aGl0ZXxlbnwxfHx8fDE3NjEyNjMzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function StorePage() {
  return (
    <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32 bg-white">
      {/* Header - Editorial Layout */}
      <section className="px-4 md:px-12 lg:px-20 py-16 md:py-32 lg:py-48 relative border-b border-black">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            className="absolute top-8 left-4 md:top-20 md:left-12 lg:left-20 text-xs md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            P. 02
          </motion.div>

          <h1 className="font-heading uppercase tracking-tight text-[12vw] md:text-[8vw] leading-[0.85] mb-8 md:mb-16 lg:mb-24">
            STORE
          </h1>

          <div className="grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-6 md:col-start-7 text-xs md:text-sm leading-relaxed">
              A CURATED SELECTION OF LIMITED EDITION GARMENTS AND OBJECTS. EACH PIECE EMBODIES OUR PHILOSOPHY OF REDUCTION, STRUCTURE, AND TRANSFORMATION.
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid - Editorial Asymmetric Layout */}
      <section className="px-4 md:px-12 lg:px-20 py-12 md:py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto">
          {/* Row 1 */}
          <div className="grid grid-cols-12 gap-4 md:gap-8 mb-16 md:mb-32 lg:mb-48">
            <div className="col-span-12 md:col-span-4 md:col-start-2">
              <div className="text-xs md:text-sm mb-4 md:mb-6">(A+0)</div>
              <ProductCard
                productId={products[0].id}
                name={products[0].name}
                price={products[0].price}
                imageUrl={products[0].imageUrl}
              />
            </div>
            <div className="col-span-12 md:col-span-4 mt-12 md:mt-24 lg:mt-40">
              <div className="text-xs md:text-sm mb-4 md:mb-6">(B+0)</div>
              <ProductCard
                productId={products[1].id}
                name={products[1].name}
                price={products[1].price}
                imageUrl={products[1].imageUrl}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-12 gap-4 md:gap-8 mb-16 md:mb-32 lg:mb-48">
            <div className="col-span-12 md:col-span-3 md:col-start-4 mt-8 md:mt-16">
              <div className="text-xs md:text-sm mb-4 md:mb-6">(C+0)</div>
              <ProductCard
                productId={products[2].id}
                name={products[2].name}
                price={products[2].price}
                imageUrl={products[2].imageUrl}
              />
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="text-xs md:text-sm mb-4 md:mb-6">(D+0)</div>
              <ProductCard
                productId={products[3].id}
                name={products[3].name}
                price={products[3].price}
                imageUrl={products[3].imageUrl}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-12 gap-4 md:gap-8 mb-16 md:mb-32 lg:mb-48">
            <div className="col-span-12 md:col-span-4 md:col-start-3">
              <div className="text-xs md:text-sm mb-4 md:mb-6">(E+0)</div>
              <ProductCard
                productId={products[4].id}
                name={products[4].name}
                price={products[4].price}
                imageUrl={products[4].imageUrl}
              />
            </div>
            <div className="col-span-12 md:col-span-3 mt-12 md:mt-24 lg:mt-56">
              <div className="text-xs md:text-sm mb-4 md:mb-6">(F+0)</div>
              <ProductCard
                productId={products[5].id}
                name={products[5].name}
                price={products[5].price}
                imageUrl={products[5].imageUrl}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-5 md:col-start-2 mt-8 md:mt-16">
              <div className="text-xs md:text-sm mb-4 md:mb-6">(G+0)</div>
              <ProductCard
                productId={products[6].id}
                name={products[6].name}
                price={products[6].price}
                imageUrl={products[6].imageUrl}
              />
            </div>
            <div className="col-span-12 md:col-span-4 mt-12 md:mt-32 lg:mt-48">
              <div className="text-xs md:text-sm mb-4 md:mb-6">(H+0)</div>
              <ProductCard
                productId={products[7].id}
                name={products[7].name}
                price={products[7].price}
                imageUrl={products[7].imageUrl}
              />
            </div>
          </div>

          {/* Last item centered */}
          <div className="grid grid-cols-12 gap-4 md:gap-8 mt-16 md:mt-32 lg:mt-48">
            <div className="col-span-12 md:col-span-4 md:col-start-5">
              <div className="text-xs md:text-sm mb-4 md:mb-6">(I+0)</div>
              <ProductCard
                productId={products[8].id}
                name={products[8].name}
                price={products[8].price}
                imageUrl={products[8].imageUrl}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
