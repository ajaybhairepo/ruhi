import { FiShoppingBag } from "react-icons/fi";
import Image from "next/image";

type SiteHeaderProps = {
  cartCount: number;
  onCartOpen: () => void;
};

export function SiteHeader({ cartCount, onCartOpen }: SiteHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-deep/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left - Logo - Link to home */}
        <a
          href="/"
          aria-label="Tasifa Ruhi Industries home"
          className="shrink-0"
        >
          <Image
            src="/logo.png"
            alt="Tasifa Ruhi Industries"
            width={128}
            height={128}
            priority
            className="h-14 w-14 rounded-full bg-white object-contain transition-transform hover:scale-105"
          />
        </a>

        {/* Right - Cart */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCartOpen}
            aria-label="Open cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all hover:border-orange/50 hover:bg-white/10"
          >
            <FiShoppingBag className="h-4 w-4 text-white/80" />

            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1.5 text-xs font-semibold text-deep">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
