"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { CartDrawer } from "@/app/components/shop/CartDrawer";
import { Checkout } from "@/app/components/checkout/Checkout";

type Variant = {
  label: string;
  price: number;
  offer: number;
};

type Product = {
  _id: string;
  id: string; // Changed to string to match CartDrawer expectation
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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cartNotice, setCartNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Fetch product from API
  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/products?id=${params.id}`);
      const data = await response.json();
      if (data.success) {
        // Map product data to match frontend expectations
        const mappedProduct: Product = {
          _id: data.data.id,
          id: data.data.id, // Use the same string ID
          productCode: data.data.product_code || "",
          name: data.data.name,
          category: data.data.category,
          description: data.data.description || "",
          image: data.data.image,
          imagePublicId: data.data.image_public_id || "",
          isLiquid: data.data.is_liquid || false,
          variants: data.data.variants || [],
          price: data.data.price || 0,
          offer: data.data.offer || 0,
          createdAt: data.data.created_at,
          updatedAt: data.data.updated_at,
        };
        setProduct(mappedProduct);
        if (mappedProduct.variants && mappedProduct.variants.length > 0) {
          setSelectedVariant(mappedProduct.variants[0].label);
        }
        // Fetch related products
        fetchRelatedProducts(mappedProduct.category, mappedProduct._id);
      } else {
        setError(data.message || "Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedProducts = async (category: string, productId: string) => {
    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();
      if (data.success) {
        const related = data.data
          .filter((p: any) => p.category === category && p.id !== productId)
          .slice(0, 4)
          .map((p: any) => ({
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
        setRelatedProducts(related);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const getCurrentVariant = (): Variant | null => {
    if (!product?.variants || product.variants.length === 0) return null;
    return (
      product.variants.find((v) => v.label === selectedVariant) ||
      product.variants[0]
    );
  };

  const currentVariant = getCurrentVariant();
  const discount = currentVariant
    ? Math.round((1 - currentVariant.offer / currentVariant.price) * 100)
    : 0;

  const addToCart = (product: Product) => {
    const qty = quantity;
    const cartItem: CartItem = {
      ...product,
      selectedVariant: selectedVariant || product.variants?.[0]?.label || "",
      quantity: qty,
    };

    setCart((items) =>
      items.some(
        (item) =>
          item._id === product._id && item.selectedVariant === selectedVariant,
      )
        ? items
        : [...items, cartItem],
    );

    setCartNotice(`${product.name} (${selectedVariant}) added to your bag`);
    window.setTimeout(() => setCartNotice(null), 3200);
  };

  if (isLoading) {
    return (
      <>
        <SiteHeader
          cartCount={cart.length}
          onCartOpen={() => setShowCart(true)}
        />
        <div className="flex min-h-screen items-center justify-center bg-cream">
          <div className="text-center">
            <div className="text-4xl mb-4 animate-spin">🔄</div>
            <p className="text-ink/60">Loading product...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <SiteHeader
          cartCount={cart.length}
          onCartOpen={() => setShowCart(true)}
        />
        <div className="flex min-h-screen items-center justify-center bg-cream">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-red-500">
              {error || "Product not found"}
            </h3>
            <p className="mt-2 text-ink/60">
              The product you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push("/products")}
              className="mt-4 rounded-full bg-orange px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/30"
            >
              Back to Products
            </button>
          </div>
        </div>
      </>
    );
  }

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
    <>
      <SiteHeader
        cartCount={cart.length}
        onCartOpen={() => setShowCart(true)}
      />

      <main className="min-h-screen bg-cream px-[5%] py-24 md:py-20">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={() => router.back()}
            className="group mb-8 flex items-center gap-2 text-sm text-ink/60 transition-all hover:text-ink"
          >
            <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Products
          </button>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl bg-white/50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
              {discount > 0 && (
                <span className="absolute left-4 top-4 rounded-full bg-orange px-4 py-2 text-sm font-bold text-white shadow-lg">
                  Save {discount}%
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <div className="mb-2">
                <span className="text-sm font-medium uppercase tracking-wider text-orange">
                  {product.category}
                </span>
              </div>

              <h1 className="font-display text-3xl font-bold text-deep md:text-4xl">
                {product.name}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-ink/70">
                {product.description}
              </p>

              {product.variants && product.variants.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink/60">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => {
                      const isSelected = selectedVariant === variant.label;
                      return (
                        <button
                          key={variant.label}
                          onClick={() => setSelectedVariant(variant.label)}
                          className={`rounded-full border-2 px-5 py-2.5 text-sm font-medium transition-all ${
                            isSelected
                              ? "border-orange bg-orange text-white shadow-lg shadow-orange/30"
                              : "border-deep/20 bg-white text-deep hover:border-deep/40 hover:bg-deep/5"
                          }`}
                        >
                          {variant.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center gap-3">
                {currentVariant && (
                  <>
                    <span className="text-3xl font-bold text-deep">
                      NPR {currentVariant.offer}
                    </span>
                    {currentVariant.price > currentVariant.offer && (
                      <span className="text-lg text-ink/40 line-through">
                        NPR {currentVariant.price}
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-medium text-ink/60">
                  Quantity
                </span>
                <div className="flex items-center gap-1 rounded-full border border-deep/20 bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:bg-deep/5"
                  >
                    <FiMinus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:bg-deep/5"
                  >
                    <FiPlus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full rounded-full bg-orange px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/30"
                >
                  Add to Cart
                </button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-deep/10 pt-8">
                <div className="flex items-center gap-2 text-sm text-ink/60">
                  <span className="text-orange">✓</span>
                  Quality Guaranteed
                </div>
                <div className="flex items-center gap-2 text-sm text-ink/60">
                  <span className="text-orange">✓</span>
                  Made in Nepal
                </div>
                <div className="flex items-center gap-2 text-sm text-ink/60">
                  <span className="text-orange">✓</span>
                  Eco Friendly
                </div>
                <div className="flex items-center gap-2 text-sm text-ink/60">
                  <span className="text-orange">✓</span>
                  Family Care
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 border-t border-deep/10 pt-16">
              <h2 className="mb-8 text-2xl font-bold text-deep">
                Related Products
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {relatedProducts.map((related) => (
                  <div
                    key={related._id}
                    onClick={() => router.push(`/product/${related._id}`)}
                    className="group cursor-pointer overflow-hidden rounded-xl bg-white transition-all hover:shadow-lg"
                  >
                    <img
                      src={related.image}
                      alt={related.name}
                      className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <p className="text-xs font-medium uppercase text-orange">
                        {related.category}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-deep">
                        {related.name}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-deep">
                        NPR {related.offer}
                      </p>
                      {related.productCode && (
                        <p className="mt-1 text-[10px] text-muted font-mono">
                          {related.productCode}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
    </>
  );
}
