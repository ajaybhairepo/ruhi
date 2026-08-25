import type { Category } from "../../data/store";

type CategoryStripProps = {
  selected: Category;
  categories: Category[];
  onSelect: (category: Category) => void;
};

export function CategoryStrip({
  selected,
  categories,
  onSelect,
}: CategoryStripProps) {
  // Category images
  const categoryImages: Record<Category, string> = {
    All: "/all-product.png",
    Detergent: "/detergent.png",
    Soap: "/soap.png",
    Disinfectant: "/disinfictant.png",
    Dishwasher: "/dishwasher.png",
    Cleaner: "/cleaner.png",
  };

  return (
    <section className="py-8 md:py-12 lg:py-16" id="shop">
      {/* Section Header */}
      <div className="mb-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
          Browse Categories
        </span>
        <h2 className="mt-1.5 text-xl font-bold text-deep md:text-2xl">
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-6 md:gap-4 lg:gap-5">
        {categories.map((item) => {
          const isSelected = selected === item;

          return (
            <button
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 bg-white ${
                isSelected
                  ? "ring-2 ring-orange ring-offset-2 shadow-xl shadow-orange/20"
                  : "hover:shadow-lg hover:shadow-deep/10"
              }`}
              key={item}
              onClick={() => onSelect(item)}
              aria-label={`Filter by ${item}`}
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden">
                <img
                  src={categoryImages[item]}
                  alt={item}
                  className="h-full w-full object-cover transition-transform duration-500
                  scale-115 group-hover:scale-120"
                />

                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
