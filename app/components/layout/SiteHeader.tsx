import { FiShoppingBag } from "react-icons/fi";

type SiteHeaderProps = {
  cartCount: number;
  onCartOpen: () => void;
};

export function SiteHeader({ cartCount, onCartOpen }: SiteHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-deep/95 backdrop-blur-md">
      <div className="grid h-16 grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
        {/* Left - Empty spacer */}
        <div className="justify-self-start" />

        {/* Center - Logo - Link to home */}
        <a
          href="/"
          aria-label="Ruhi home"
          className="justify-self-center text-center"
        >
          <h1 className="text-2xl font-bold lowercase tracking-[0.35em] text-white transition-all hover:text-orange/80 md:text-3xl lg:text-4xl">
            ruhi<span className="text-orange">.</span>
          </h1>
        </a>

        {/* Right - Cart */}
        <div className="flex items-center gap-3 justify-self-end">
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
