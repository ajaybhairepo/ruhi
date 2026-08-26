"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FiShoppingBag,
  FiCheck,
  FiX,
  FiPlus,
  FiMinus,
  FiPackage,
  FiArrowUpRight,
} from "react-icons/fi";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { CartDrawer } from "@/app/components/shop/CartDrawer";
import { Checkout } from "@/app/components/checkout/Checkout";
import { categories, type Category } from "@/app/data/store";

type Variant = {
  label: string;
  price: number;
  offer: number;
};

type Product = {
  _id: string;
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

type CartItem = Product & {
  selectedVariant: string;
  quantity: number;
};

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [category, setCategory] = useState<Category>(
    (categoryParam as Category) || "All",
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cartNotice, setCartNotice] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update category when URL param changes
  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam as Category);
    }
  }, [categoryParam]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();
      if (data.success) {
        const mappedProducts = data.data.map((p: any) => ({
          _id: p.id,
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

  const visibleProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  const updateQuantity = (productId: string, change: number) => {
    setQuantities((current) => ({
      ...current,
      [productId]: Math.max(1, (current[productId] ?? 1) + change),
    }));
  };

  const handleVariantChange = (productId: string, variantLabel: string) => {
    setSelectedVariants((current) => ({
      ...current,
      [productId]: variantLabel,
    }));
  };

  const getVariantPrice = (product: Product, variantLabel: string) => {
    const variants = product.variants || [];
    const variant = variants.find((v) => v.label === variantLabel);
    return (
      variant ||
      variants[0] || { label: "", price: product.price, offer: product.offer }
    );
  };

  const addToCart = (product: Product, variant: string, quantity: number) => {
    const variantData = getVariantPrice(product, variant);
    const cartItem: CartItem = {
      ...product,
      selectedVariant: variant,
      quantity: quantity,
      offer: variantData.offer || product.offer,
      price: variantData.price || product.price,
    };

    setCart((items) =>
      items.some(
        (item) => item._id === product._id && item.selectedVariant === variant,
      )
        ? items
        : [...items, cartItem],
    );

    setCartNotice(`${product.name} (${variant}) added to your bag`);
    window.setTimeout(() => setCartNotice(null), 3200);
  };

  const categoryImages = {
    All: "/all-product.png",
    Soap: "/soap.png",
    Detergent: "/detergent.png",
    Disinfectant: "/disinfictant.png",
    Dishwasher: "/dishwasher.png",
    Cleaner: "/cleaner.png",
  };

  const categoryLabels = {
    All: "All",
    Detergent: "Detergent",
    Soap: "Soap",
    Disinfectant: "Disinfectant",
    Dishwasher: "Dishwasher",
    Cleaner: "Cleaner",
  };

  if (checkout) {
    return (
      <Checkout
        cart={cart}
        onBack={() => setCheckout(false)}
        onDone={() => {
          setCart([]);
          setCheckout(false);
          setShowCart(false);
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="overflow-hidden">
        <SiteHeader
          cartCount={cart.length}
          onCartOpen={() => setShowCart(true)}
        />
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4 animate-spin">🔄</div>
            <p className="text-ink/60">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden">
        <SiteHeader
          cartCount={cart.length}
          onCartOpen={() => setShowCart(true)}
        />
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
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
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <SiteHeader
        cartCount={cart.length}
        onCartOpen={() => setShowCart(true)}
      />

      <section className="relative bg-gradient-to-r from-deep to-deep/90 px-[5%] py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-sm">
            <button
              onClick={() => router.push("/")}
              className="text-white/50 hover:text-white transition-colors"
            >
              Home
            </button>
            <span className="text-white/30">/</span>
            <span className="text-white/70">
              {category === "All" ? "Products" : category}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            {category === "All" ? "Our Products" : `${category} Collection`}
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-white/60 text-sm md:text-base">
            {category === "All"
              ? "Explore our range of premium cleaning products made with care for your home and family."
              : `Browse our ${category.toLowerCase()} collection for effective cleaning solutions.`}
          </p>
        </div>
      </section>

      <main className="min-h-screen bg-cream px-[5%] py-6 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
            {categories.map((item) => {
              const isSelected = category === item;
              return (
                <button
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    if (item === "All") {
                      router.push("/products");
                    } else {
                      router.push(`/products?category=${item}`);
                    }
                  }}
                  className={`group flex flex-col items-center gap-2 rounded-xl bg-white p-3 text-center transition-all duration-300 ${
                    isSelected
                      ? "ring-2 ring-orange ring-offset-2 shadow-lg shadow-orange/20"
                      : "hover:shadow-md hover:shadow-deep/5"
                  }`}
                >
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-cream/50">
                    <img
                      src={categoryImages[item]}
                      alt={item}
                      className="h-full w-full object-cover transition-transform duration-300 
                      scale-115 group-hover:scale-130"
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide transition-colors md:text-sm ${
                      isSelected
                        ? "text-orange"
                        : "text-deep/80 group-hover:text-deep"
                    }`}
                  >
                    {categoryLabels[item]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mb-4 text-center">
            <span className="text-xs text-ink/60 md:text-sm">
              Showing {visibleProducts.length} products
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {visibleProducts.map((product) => {
              const variants = product.variants || [];
              const defaultVariant = variants[0] || {
                label: "",
                price: product.price,
                offer: product.offer,
              };

              const currentVariantLabel =
                selectedVariants[product._id] || defaultVariant.label;
              const currentVariant = getVariantPrice(
                product,
                currentVariantLabel,
              );

              const discount =
                currentVariant.offer < currentVariant.price
                  ? Math.round(
                      (1 - currentVariant.offer / currentVariant.price) * 100,
                    )
                  : 0;
              const quantity = quantities[product._id] ?? 1;

              return (
                <div
                  key={product._id}
                  className="group overflow-hidden rounded-lg bg-white transition-all hover:shadow-md"
                >
                  <div
                    className="relative overflow-hidden bg-[#e8e3d8] cursor-pointer"
                    onClick={() => router.push(`/product/${product._id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {discount > 0 && (
                      <span className="absolute left-1.5 top-1.5 rounded-full bg-orange px-1.5 py-0.5 text-[8px] font-bold text-white md:px-2 md:py-0.5 md:text-[10px]">
                        Save {discount}%
                      </span>
                    )}
                    {product.productCode && (
                      <span className="absolute right-1.5 top-1.5 rounded bg-deep/50 px-1.5 py-0.5 text-[7px] text-white/70 font-mono md:text-[8px]">
                        {product.productCode}
                      </span>
                    )}
                  </div>

                  <div className="p-2 md:p-3">
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0 flex-1">
                        <p className="text-[8px] font-medium uppercase text-orange md:text-[10px]">
                          {product.category}
                        </p>
                        <h3
                          className="mt-0.5 truncate text-xs font-semibold text-deep md:text-sm cursor-pointer hover:text-orange transition-colors"
                          onClick={() => router.push(`/product/${product._id}`)}
                        >
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    {/* Variant Selector */}
                    {variants.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-0.5">
                        {variants.map((variant) => (
                          <button
                            key={variant.label}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVariantChange(product._id, variant.label);
                            }}
                            className={`rounded-full px-1.5 py-0.5 text-[7px] font-medium transition-all md:px-2 md:py-0.5 md:text-[8px] ${
                              currentVariantLabel === variant.label
                                ? "bg-orange text-white"
                                : "bg-deep/5 text-deep/60 hover:bg-deep/20"
                            }`}
                          >
                            {variant.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-1.5 flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-deep md:text-sm">
                          NPR {currentVariant.offer}
                        </span>
                        {currentVariant.price > currentVariant.offer && (
                          <span className="text-[8px] text-ink/40 line-through md:text-[10px]">
                            NPR {currentVariant.price}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-0.5">
                        <div className="flex items-center gap-0.5 rounded-full border border-deep/10 bg-cream/50 p-0.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(product._id, -1);
                            }}
                            className="flex h-5 w-5 items-center justify-center rounded-full text-deep/60 transition-all hover:bg-deep hover:text-white md:h-6 md:w-6"
                          >
                            <FiMinus className="h-2 w-2 md:h-2.5 md:w-2.5" />
                          </button>
                          <span className="w-4 text-center text-[10px] font-medium text-deep md:w-5 md:text-xs">
                            {quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(product._id, 1);
                            }}
                            className="flex h-5 w-5 items-center justify-center rounded-full text-deep/60 transition-all hover:bg-deep hover:text-white md:h-6 md:w-6"
                          >
                            <FiPlus className="h-2 w-2 md:h-2.5 md:w-2.5" />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            addToCart(product, currentVariantLabel, quantity)
                          }
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-orange text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/30 md:h-7 md:w-7"
                          aria-label="Add to cart"
                        >
                          <FiShoppingBag className="h-3 w-3 md:h-3.5 md:w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {visibleProducts.length === 0 && (
            <div className="py-20 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-deep">
                No products found
              </h3>
              <p className="mt-2 text-ink/60">
                Try selecting a different category
              </p>
              <button
                onClick={() => {
                  setCategory("All");
                  router.push("/products");
                }}
                className="mt-4 rounded-full bg-orange px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/30"
              >
                View All Products
              </button>
            </div>
          )}

          {/* Bulk Order Section */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-deep to-deep/90 p-5 md:p-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <h3 className="text-base font-bold text-white md:text-xl">
                  Need a Bulk Order?
                </h3>
                <p className="text-xs text-white/70 md:text-sm">
                  Get special pricing and discounts on bulk orders.
                </p>
              </div>
              <button
                onClick={() => router.push("/bulk-order")}
                className="flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-deep transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/30 md:px-6 md:py-3"
              >
                <FiPackage className="h-3.5 w-3.5 md:h-4 md:w-4" />
                Request Bulk Quote
                <FiArrowUpRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter onAdminOpen={() => setAdmin(true)} />

      {showCart && (
        <CartDrawer
          cart={cart}
          onClose={() => setShowCart(false)}
          onCheckout={() => setCheckout(true)}
          onRemove={(productId) => {
            setCart(cart.filter((item) => item._id !== productId));
          }}
        />
      )}

      {cartNotice && (
        <div className="fixed bottom-6 left-1/2 z-[1100] flex w-[calc(100%-32px)] max-w-[420px] -translate-x-1/2 items-center gap-3 rounded-full bg-deep px-4 py-3 text-white shadow-2xl sm:bottom-8">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime text-deep">
            <FiCheck className="h-4 w-4" />
          </span>
          <span className="flex-1 text-[12px] font-semibold">{cartNotice}</span>
          <button
            className="flex items-center gap-1 text-[11px] font-extrabold text-lime"
            onClick={() => {
              setShowCart(true);
              setCartNotice(null);
            }}
          >
            <FiShoppingBag className="h-4 w-4" /> View bag
          </button>
          <button
            className="text-white/60 hover:text-white"
            onClick={() => setCartNotice(null)}
            aria-label="Dismiss notification"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4 animate-spin">🔄</div>
            <p className="text-ink/60">Loading...</p>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
