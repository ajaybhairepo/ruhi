"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FiCheck, FiShoppingBag, FiX } from "react-icons/fi";
import { BulkQuoteSection } from "./components/home/BulkQuoteSection";
import { CategoryStrip } from "./components/home/CategoryStrip";
import { HeroBanner } from "./components/home/HeroBanner";
import { StorySection } from "./components/home/StorySection";
import { AboutSection } from "./components/home/AboutSection";
import { TestimonialSection } from "./components/home/TestimonialSection";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { Checkout } from "./components/checkout/Checkout";
import { CartDrawer } from "./components/shop/CartDrawer";
import { ProductSection } from "./components/shop/ProductSection";
import { categories, type Category } from "./data/store";
import { AdBanner } from "./components/home/AdBannerSection";

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
  selectedVariant?: string;
  quantity?: number;
};

export default function Home() {
  const router = useRouter();
  const [category, setCategory] = useState<Category>("All");
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [cartNotice, setCartNotice] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products in background
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (retryCount = 0) => {
    try {
      const response = await fetch("/api/admin/products");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        // Map Supabase fields to match frontend expectations
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
          selectedVariant: undefined,
          quantity: undefined,
        }));
        setProducts(mappedProducts);
        setIsLoading(false);
      } else {
        setError(data.message || "Failed to fetch products");
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("Error fetching products:", err);

      if (retryCount < 3) {
        setTimeout(() => {
          fetchProducts(retryCount + 1);
        }, 2000);
      } else {
        setError("Failed to load products. Please refresh the page.");
        setIsLoading(false);
      }
    }
  };

  // Memoize visible products to prevent unnecessary recalculations
  const visibleProducts = useMemo(() => {
    return category === "All"
      ? products
      : products.filter((product) => product.category === category);
  }, [category, products]);

  const addToCart = (product: Product, quantity: number, variant: string) => {
    const variantData = product.variants?.find((v) => v.label === variant);

    const cartItem: Product = {
      ...product,
      selectedVariant: variant,
      quantity,
      offer: variantData?.offer || product.offer,
      price: variantData?.price || product.price,
    };

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedVariant === variant,
      );

      if (existingIndex !== -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + quantity,
        };
        return updated;
      }
      return [...prevCart, cartItem];
    });

    setCartNotice(`${product.name} (${variant}) added to your bag`);
    const timer = setTimeout(() => setCartNotice(null), 3200);
    return () => clearTimeout(timer);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory as Category);
  };

  // Admin navigation handler
  const handleAdminNavigation = async () => {
    try {
      const response = await fetch("/api/admin/verify-session", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.isAuthenticated) {
          router.push("/admin/dashboard");
        } else {
          router.push("/admin/login");
        }
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Error checking admin session:", error);
      router.push("/admin/login");
    }
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

  return (
    <div className="overflow-hidden">
      <SiteHeader
        cartCount={cart.length}
        onCartOpen={() => setShowCart(true)}
      />

      {/* Home Section */}
      <section id="home">
        <HeroBanner />
      </section>

      <AdBanner />

      <main className="px-[5%]">
        {/* Products Section - Shows loading state only in the product area */}
        <section id="products">
          <CategoryStrip
            selected={category}
            categories={categories}
            onSelect={setCategory}
          />

          {isLoading ? (
            <div className="py-20 text-center">
              <div className="text-4xl mb-4 animate-spin">🔄</div>
              <p className="text-ink/60">Loading products...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-500">
                Error loading products
              </h3>
              <p className="mt-2 text-ink/60">{error}</p>
              <button
                onClick={() => {
                  setIsLoading(true);
                  fetchProducts();
                }}
                className="mt-4 rounded-full bg-orange px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/30"
              >
                Try Again
              </button>
            </div>
          ) : (
            <ProductSection
              products={visibleProducts}
              category={category}
              onAdd={addToCart}
            />
          )}
        </section>

        {/* About Us Section */}
        <section id="about-us">
          <AboutSection />
        </section>

        {/* Story Section */}
        <section id="story">
          <StorySection />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <TestimonialSection />
        </section>

        {/* Bulk Orders Section */}
        <section id="bulk-orders">
          <BulkQuoteSection />
        </section>
      </main>

      <SiteFooter
        onAdminOpen={handleAdminNavigation}
        onCategorySelect={handleCategorySelect}
      />

      {showCart && (
        <CartDrawer
          cart={cart}
          onClose={() => setShowCart(false)}
          onCheckout={() => setCheckout(true)}
          onRemove={(productId, variant) => {
            setCart((prev) =>
              prev.filter(
                (item) =>
                  !(item.id === productId && item.selectedVariant === variant),
              ),
            );
          }}
        />
      )}

      {cartNotice && (
        <div className="fixed bottom-6 left-1/2 z-[1100] flex w-[calc(100%-32px)] max-w-[420px] -translate-x-1/2 items-center gap-3 rounded-full bg-deep px-4 py-3 text-white shadow-2xl sm:bottom-8">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime text-deep">
            <FiCheck aria-hidden="true" />
          </span>
          <span className="flex-1 text-[12px] font-semibold">{cartNotice}</span>
          <button
            className="flex items-center gap-1 text-[11px] font-extrabold text-lime"
            onClick={() => {
              setShowCart(true);
              setCartNotice(null);
            }}
          >
            <FiShoppingBag aria-hidden="true" /> View bag
          </button>
          <button
            className="text-white/60 hover:text-white"
            onClick={() => setCartNotice(null)}
            aria-label="Dismiss notification"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
