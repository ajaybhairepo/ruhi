"use client";

import { FiArrowDown, FiCheck, FiStar } from "react-icons/fi";

export function HeroBanner() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Diagonal sliced background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Deep color base - Full background */}
        <div className="absolute inset-0 bg-deep" />

        {/* Orange slice - Desktop: full right side */}
        <div
          className="absolute inset-0 bg-orange hidden lg:block"
          style={{
            clipPath: "polygon(55% 0%, 100% 0%, 100% 100%, 35% 100%)",
          }}
        />

        {/* Orange slice - Mobile: smaller bottom right corner */}
        <div
          className="absolute inset-0 bg-orange lg:hidden"
          style={{
            clipPath: "polygon(60% 100%, 100% 100%, 100% 75%)",
          }}
        />

        {/* Orange overlay for depth - desktop only */}
        <div
          className="absolute inset-0 bg-orange/80 hidden lg:block"
          style={{
            clipPath: "polygon(65% 0%, 100% 0%, 100% 100%, 45% 100%)",
          }}
        />

        {/* Diagonal line accent - desktop only */}
        <div
          className="absolute inset-0 bg-white/10 hidden lg:block"
          style={{
            clipPath: "polygon(58% 0%, 60% 0%, 40% 100%, 38% 100%)",
          }}
        />

        {/* Mobile glow - smaller corner */}
        <div className="absolute -bottom-[20%] -right-[20%] h-[300px] w-[300px] rounded-full bg-orange/15 blur-2xl lg:hidden" />

        {/* Desktop glow - right side */}
        <div className="absolute -right-[20%] -top-[20%] h-[600px] w-[600px] rounded-full bg-orange/30 blur-3xl hidden lg:block" />
        <div className="absolute -left-[10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-6 py-24 md:px-12 lg:flex-row lg:justify-between lg:px-20 lg:py-20">
        <div className="flex w-full max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
          {/* Brand - Nepali */}
          <div className="mb-2">
            <span className="text-lg font-bold text-white/70 sm:text-2xl md:text-3xl lg:text-5xl">
              तसिफा रुही इंडस्ट्रीज
            </span>
          </div>
          {/* Company Name - Top, Large, Bold */}
          <div className="mb-2 w-full">
            <span className="block text-sm font-bold uppercase tracking-[0.25em] text-orange sm:text-base md:text-lg lg:text-xl">
              Tasifa Ruhi Industries
            </span>
          </div>

          {/* Brand - English */}
          <div className="mb-3">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[80px]">
              RUHI
            </h1>
            <div className="mt-2 flex items-center justify-center gap-3 lg:justify-start">
              <div className="h-0.5 w-10 bg-orange" />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-white/60">
                CLEAN • CARE • PROTECT
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              Powerful Cleaning.
              <br />
              <span className="text-orange">Freshness You Can Feel.</span>
            </h2>
          </div>

          {/* Description */}
          <p className="mb-6 max-w-lg text-justify text-sm leading-relaxed text-white/70 lg:text-left md:text-center md:text-base">
            Discover RUHI cleaning solutions — from detergents to disinfectants,
            made for every corner of your home.
          </p>

          {/* CTA Section - Two Buttons */}
          <div className="mb-3 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            {/* Explore Products Button */}
            <a
              href="/products"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-orange px-6 py-3.5 font-bold uppercase tracking-widest text-deep transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(242,141,84,0.6)] active:scale-95 sm:w-auto sm:px-8 sm:py-4"
            >
              <span className="relative z-10 text-xs sm:text-sm">
                Explore Products
              </span>
              <FiArrowDown className="relative z-10 text-xs transition-transform duration-300 group-hover:translate-y-1 sm:text-sm" />
              {/* Desktop only shine effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full hidden lg:block" />
              {/* Desktop only pulse ring */}
              <span className="absolute inset-0 rounded-full border-2 border-orange opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110 hidden lg:block" />
            </a>

            {/* Request Bulk Order Button - Updated route */}
            <a
              href="/bulk-order"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-6 py-3.5 font-bold uppercase tracking-widest text-deep transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 sm:w-auto sm:px-8 sm:py-4"
            >
              <span className="relative z-10 text-xs sm:text-sm">
                Request Bulk Order
              </span>
              <FiArrowDown className="relative z-10 text-xs transition-transform duration-300 group-hover:translate-y-1 sm:text-sm" />
              {/* Desktop only bottom border animation */}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange transition-all duration-500 group-hover:w-full hidden lg:block" />
              {/* Desktop only slide background */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-orange/20 via-orange/40 to-orange/20 transition-transform duration-500 group-hover:translate-x-full hidden lg:block" />
            </a>
          </div>

          {/* Free Delivery Text */}
          <p className="mb-6 text-sm text-white/60">
            🚚 Free delivery on every order
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {[
              { icon: FiCheck, label: "Quality Products" },
              { icon: FiCheck, label: "Made in Nepal" },
              { icon: FiStar, label: "Family Care" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm transition-all duration-300 hover:border-orange/30 hover:bg-white/10"
              >
                <item.icon className="h-2.5 w-2.5 text-orange" />
                <span className="text-[10px] font-medium text-white/70">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Product Image */}
        <div className="relative mt-10 w-full max-w-md lg:mt-0 lg:max-w-lg">
          <div>
            <img
              src="/hero.png"
              alt="RUHI cleaning products"
              className="relative z-10 mx-auto h-[280px] w-auto object-contain drop-shadow-2xl sm:h-[380px] lg:h-[450px] xl:h-[520px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
