import { FiArrowUpRight, FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { useState } from "react";

type Variant = {
  label: string;
  price: number;
  offer: number;
};

type Product = {
  id: string;
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

type CartDrawerProps = {
  cart: Product[];
  onClose: () => void;
  onCheckout: () => void;
  onRemove?: (productId: string, variant?: string) => void;
  onUpdateQuantity?: (
    productId: string,
    quantity: number,
    variant?: string,
  ) => void;
};

export function CartDrawer({
  cart,
  onClose,
  onCheckout,
  onRemove,
  onUpdateQuantity,
}: CartDrawerProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getCartItemKey = (item: Product) => {
    const variant = item.selectedVariant || "";
    return `${item.id}-${variant}`;
  };

  const getVariantPrice = (item: Product) => {
    const variantLabel = item.selectedVariant || "";
    const variant = item.variants?.find((v) => v.label === variantLabel);
    return variant || { label: "", price: item.price, offer: item.offer };
  };

  const updateQuantity = (item: Product, change: number) => {
    const key = getCartItemKey(item);
    const currentQty = quantities[key] ?? item.quantity ?? 1;
    const newQty = Math.max(1, currentQty + change);
    setQuantities((current) => ({
      ...current,
      [key]: newQty,
    }));
    if (onUpdateQuantity) {
      onUpdateQuantity(item.id, newQty, item.selectedVariant);
    }
  };

  // Calculate total with quantities and variant prices
  const total = cart.reduce((sum, item) => {
    const key = getCartItemKey(item);
    const qty = quantities[key] ?? item.quantity ?? 1;
    const variant = getVariantPrice(item);
    const price = variant.offer || item.offer;
    return sum + price * qty;
  }, 0);

  const itemCount = cart.reduce((sum, item) => {
    const key = getCartItemKey(item);
    const qty = quantities[key] ?? item.quantity ?? 1;
    return sum + qty;
  }, 0);

  const deliveryFee = 0;
  const grandTotal = total + deliveryFee;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-stretch justify-end bg-black/60 backdrop-blur-sm p-0"
      onClick={onClose}
    >
      <aside
        className="relative h-full min-h-dvh w-full overflow-y-auto bg-gradient-to-b from-paper to-cream p-6 shadow-2xl transition-all duration-300 max-sm:max-w-full sm:max-w-[480px] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-orange">
              Your cart
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.07em] text-deep">
              Shopping Bag
              {cart.length > 0 && (
                <span className="ml-2 text-base font-medium text-muted">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <button
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-deep shadow-md transition-all hover:bg-deep hover:text-white hover:shadow-lg"
            onClick={onClose}
            aria-label="Close bag"
          >
            <FiX aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex h-[60vh] flex-col items-center justify-center text-center text-muted">
            <div className="mb-6 rounded-full bg-cream p-8">
              <svg
                className="h-16 w-16 text-deep/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-deep">
              Your bag is empty
            </h3>
            <p className="mt-2 max-w-xs text-sm">
              Looks like you haven't added any items to your bag yet.
            </p>
            <a
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3 text-sm font-bold text-white transition-all hover:bg-deep/80 hover:shadow-lg"
              href="#shop"
              onClick={onClose}
            >
              Start Shopping <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="my-4 space-y-3">
              {cart.map((item) => {
                const key = getCartItemKey(item);
                const qty = quantities[key] ?? item.quantity ?? 1;
                const variant = getVariantPrice(item);
                const unitPrice = variant.offer || item.offer;
                const itemTotal = unitPrice * qty;
                const variantLabel = item.selectedVariant || "";
                const uniqueKey = `${item.id}-${variantLabel || "default"}`;

                return (
                  <div
                    className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
                    key={uniqueKey}
                  >
                    <img
                      className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="flex-1 min-w-0">
                      <strong className="block truncate font-display text-sm text-deep">
                        {item.name}
                      </strong>
                      {variantLabel && (
                        <span className="text-xs text-muted">
                          Size: {variantLabel}
                        </span>
                      )}
                      <p className="mt-1 text-sm font-semibold text-deep">
                        NPR {unitPrice} × {qty}
                      </p>
                      <p className="text-xs text-orange font-medium">
                        Total: NPR {itemTotal}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item, -1)}
                          className="rounded-full border border-line p-1 text-xs transition-all hover:bg-deep hover:text-white"
                        >
                          <FiMinus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item, 1)}
                          className="rounded-full border border-line p-1 text-xs transition-all hover:bg-deep hover:text-white"
                        >
                          <FiPlus className="h-3 w-3" />
                        </button>
                        {onRemove && (
                          <button
                            onClick={() => onRemove(item.id, variantLabel)}
                            className="ml-auto rounded-full p-1.5 text-muted transition-all hover:bg-red-50 hover:text-red-500"
                            aria-label={`Remove ${item.name}`}
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-medium text-deep">NPR {total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Delivery</span>
                  <span
                    className={
                      deliveryFee === 0
                        ? "font-medium text-green-600"
                        : "font-medium text-deep"
                    }
                  >
                    {deliveryFee === 0 ? "Free" : `NPR ${deliveryFee}`}
                  </span>
                </div>
                <div className="border-t border-line pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-deep">Total</span>
                    <strong className="font-display text-xl text-deep">
                      NPR {grandTotal}
                    </strong>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    ✨ Free delivery on every order
                  </p>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-deep px-6 py-4 text-sm font-bold text-white transition-all hover:bg-deep/90 hover:shadow-lg hover:shadow-deep/20"
              onClick={onCheckout}
            >
              Proceed to Checkout
              <FiArrowUpRight aria-hidden="true" className="text-lg" />
            </button>

            {/* Continue Shopping */}
            <button
              className="mt-3 flex w-full items-center justify-center gap-2 text-sm font-medium text-muted transition-colors hover:text-deep"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </>
        )}
      </aside>
    </div>
  );
}
