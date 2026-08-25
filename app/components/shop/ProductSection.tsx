import { useState, useEffect } from "react";
import { FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { useRouter } from "next/navigation";

type Variant = {
  label: string;
  price: number;
  offer: number;
};

type Product = {
  id: string;
  productCode: string;
  name: string;
  category: string;
  description: string;
  image: string;
  imagePublicId?: string;
  isLiquid: boolean;
  variants: Variant[];
  price: number;
  offer: number;
  createdAt: string;
  updatedAt: string;
};

type ProductSectionProps = {
  products?: Product[];
  category: string;
  onAdd: (product: Product, quantity: number, variant: string) => void;
};

export function ProductSection({
  products: initialProducts,
  category,
  onAdd,
}: ProductSectionProps) {
  const router = useRouter();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedVariant, setSelectedVariant] = useState<
    Record<string, string>
  >({});
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [isLoading, setIsLoading] = useState(!initialProducts);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Supabase if not provided
  useEffect(() => {
    if (!initialProducts || initialProducts.length === 0) {
      fetchProducts();
    } else {
      setProducts(initialProducts);
      setIsLoading(false);
    }
  }, [initialProducts]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();
      if (data.success) {
        const mappedProducts = data.data.map((p: any) => ({
          id: p.id,
          productCode: p.product_code || "",
          name: p.name,
          category: p.category,
          description: p.description || "",
          image: p.image,
          imagePublicId: p.image_public_id || "",
          isLiquid: p.is_liquid || false,
          variants: p.variants || [],
          price: p.price || 0,
          offer: p.offer || 0,
          createdAt: p.created_at,
          updatedAt: p.updated_at,
        }));
        setProducts(mappedProducts);
      } else {
        setError(data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getVariants = (product: Product): Variant[] => {
    // Use product's variants if available
    if (product.variants && product.variants.length > 0) {
      return product.variants.map((v) => ({
        label: v.label,
        price: v.price,
        offer: v.offer || v.price,
      }));
    }

    // Fallback: generate variants based on product type
    const isLiquid =
      product.isLiquid ||
      product.name.toLowerCase().includes("liquid") ||
      product.name.toLowerCase().includes("soap") ||
      product.name.toLowerCase().includes("detergent");

    if (isLiquid) {
      return [
        {
          label: "250ml",
          price: Math.round(product.price * 0.6),
          offer: Math.round(product.offer * 0.6),
        },
        {
          label: "500ml",
          price: Math.round(product.price),
          offer: Math.round(product.offer),
        },
        {
          label: "750ml",
          price: Math.round(product.price * 1.4),
          offer: Math.round(product.offer * 1.4),
        },
        {
          label: "1000ml",
          price: Math.round(product.price * 1.8),
          offer: Math.round(product.offer * 1.8),
        },
      ];
    } else {
      return [
        {
          label: "1kg",
          price: Math.round(product.price),
          offer: Math.round(product.offer),
        },
        {
          label: "2kg",
          price: Math.round(product.price * 1.8),
          offer: Math.round(product.offer * 1.8),
        },
        {
          label: "5kg",
          price: Math.round(product.price * 4.2),
          offer: Math.round(product.offer * 4.2),
        },
      ];
    }
  };

  const updateQuantity = (productId: string, change: number) => {
    setQuantities((current) => ({
      ...current,
      [productId]: Math.max(1, (current[productId] ?? 1) + change),
    }));
  };

  const handleVariantChange = (productId: string, variantLabel: string) => {
    setSelectedVariant((current) => ({
      ...current,
      [productId]: variantLabel,
    }));
  };

  const getVariantPrice = (product: Product, variantLabel: string) => {
    const variants = getVariants(product);
    const variant = variants.find((v) => v.label === variantLabel);
    return variant || variants[0];
  };

  const calculateDiscount = (offer: number, price: number): number => {
    if (offer >= price) return 0;
    return Math.round((1 - offer / price) * 100);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  // Filter products by category
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="text-4xl mb-4 animate-spin">🔄</div>
        <p className="text-ink/60">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-red-500">
          Error loading products
        </h3>
        <p className="mt-2 text-ink/60">{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-4 rounded-full bg-orange px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/30"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="text-4xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-deep">No products found</h3>
        <p className="mt-2 text-ink/60">
          {category === "All"
            ? "Check back later for new products"
            : `No products available in ${category} category`}
        </p>
      </div>
    );
  }

  return (
    <section className="py-[75px] pb-[110px]">
      <div className="flex items-end justify-between mb-7">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-orange">
            Our favourites
          </p>
          <h2 className="font-display text-[clamp(32px,4vw,58px)] font-extrabold tracking-[-0.07em] leading-[0.98] mt-[15px]">
            {category === "All"
              ? "Everyday essentials"
              : category + " collection"}
          </h2>
        </div>
        <span className="font-mono text-[11px] text-muted">
          {filteredProducts.length} products
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-[18px]">
        {filteredProducts.map((product) => {
          const variants = getVariants(product);
          const currentVariantLabel =
            selectedVariant[product.id] || variants[0]?.label || "";
          const currentVariant = getVariantPrice(product, currentVariantLabel);
          const quantity = quantities[product.id] ?? 1;
          const discount = calculateDiscount(
            currentVariant?.offer || 0,
            currentVariant?.price || 1,
          );
          const hasDiscount = currentVariant?.offer < currentVariant?.price;
          const productCode = product.productCode || "";

          return (
            <article
              className="group cursor-pointer"
              key={product.id}
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#e8e3d8]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="block w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {hasDiscount && (
                  <span className="absolute top-3 left-3 font-mono text-[10px] bg-lime px-[9px] py-[7px]">
                    Save {discount}%
                  </span>
                )}
                {productCode && (
                  <span className="absolute top-3 right-3 font-mono text-[8px] bg-deep/50 text-white/70 px-2 py-1 rounded">
                    {productCode}
                  </span>
                )}
              </div>

              <div className="px-[2px] py-[15px]">
                <p className="font-mono text-[10px] font-semibold uppercase text-orange">
                  {product.category}
                </p>
                <h3 className="font-display text-xl font-bold mt-[7px] mb-3">
                  {product.name}
                </h3>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {variants.map((variant) => (
                    <button
                      key={variant.label}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                        currentVariantLabel === variant.label
                          ? "bg-deep text-white"
                          : "bg-[#e8e3d8] text-deep/70 hover:bg-deep/20"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVariantChange(product.id, variant.label);
                      }}
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <strong className="text-sm">
                      NPR {currentVariant?.offer || 0}
                    </strong>
                    {hasDiscount && (
                      <del className="text-[11px] text-[#97a097]">
                        NPR {currentVariant?.price || 0}
                      </del>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-[15px]">
                    <div
                      className="flex items-center justify-between h-[38px] w-[112px] px-[6px] bg-paper border border-line rounded-full"
                      aria-label={`Quantity for ${product.name}`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(product.id, -1);
                        }}
                        className="grid w-[26px] h-[26px] place-items-center rounded-full bg-deep text-lime hover:bg-orange hover:text-white transition-colors"
                      >
                        <FiMinus className="text-[13px]" />
                      </button>
                      <span className="font-mono text-xs text-ink">
                        {quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(product.id, 1);
                        }}
                        className="grid w-[26px] h-[26px] place-items-center rounded-full bg-deep text-lime hover:bg-orange hover:text-white transition-colors"
                      >
                        <FiPlus className="text-[13px]" />
                      </button>
                    </div>

                    <button
                      className="flex items-center justify-center w-[42px] h-[38px] rounded-full bg-deep text-lime hover:bg-orange hover:text-white transition-colors border border-line"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdd(product, quantity, currentVariantLabel);
                      }}
                      aria-label={`Add ${product.name} to bag`}
                    >
                      <FiShoppingBag className="text-[17px]" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
