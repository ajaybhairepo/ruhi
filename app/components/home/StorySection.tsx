export function StorySection() {
  return (
    <section
      className="grid bg-[#e8f0e6] md:grid-cols-2 w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px]"
      id="story"
    >
      {/* Left Side - Content */}
      <div className="flex items-center p-[6%] max-md:p-[30px_6%] md:py-[8%] order-2 md:order-1">
        <div className="w-full">
          <div className="inline-flex items-center gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white/60 text-deep text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 md:mb-4">
            <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-lime animate-pulse"></span>
            Why Ruhi
          </div>

          <h2 className="my-[14px] md:my-[18px] mb-[18px] md:mb-[24px] max-w-[480px] font-display text-[clamp(28px,5vw,56px)] font-extrabold leading-[1.05] md:leading-[0.98] tracking-[-0.05em] md:tracking-[-0.07em] text-deep">
            Clean, with a little more feeling.
          </h2>

          <p className="max-w-[480px] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.7] md:leading-[1.8] text-deep/70">
            We believe the products you use every day should work beautifully
            and feel good to bring home. Ruhi is a growing family of cleaning
            essentials designed around real Nepali homes.
          </p>

          {/* Additional Content */}
          <div className="mt-4 md:mt-5 max-w-[480px]">
            <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-deep/60">
              Every Ruhi product is crafted with plant-based ingredients that
              are safe for your family and gentle on the planet. We're on a
              mission to make sustainable, effective cleaning accessible to
              every home in Nepal.
            </p>
          </div>

          {/* Features */}
          <div className="mt-[30px] md:mt-[40px] flex flex-wrap gap-[20px] md:gap-[35px] border-t border-deep/10 pt-[14px] md:pt-[16px]">
            <div className="grid gap-1">
              <strong className="font-mono text-[12px] md:text-[13px] text-deep">
                01
              </strong>
              <span className="text-[12px] md:text-[13px] text-deep/70">
                Clear ingredients
              </span>
            </div>
            <div className="grid gap-1">
              <strong className="font-mono text-[12px] md:text-[13px] text-deep">
                02
              </strong>
              <span className="text-[12px] md:text-[13px] text-deep/70">
                Honest pricing
              </span>
            </div>
            <div className="grid gap-1">
              <strong className="font-mono text-[12px] md:text-[13px] text-deep">
                03
              </strong>
              <span className="text-[12px] md:text-[13px] text-deep/70">
                Local delivery
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 md:mt-8 flex flex-wrap gap-6 md:gap-8 max-w-[480px]">
            <div>
              <p className="font-display text-xl sm:text-2xl font-bold text-deep">
                10K+
              </p>
              <p className="text-[10px] sm:text-[11px] text-deep/50 uppercase tracking-wider">
                Happy Families
              </p>
            </div>
            <div>
              <p className="font-display text-xl sm:text-2xl font-bold text-deep">
                100%
              </p>
              <p className="text-[10px] sm:text-[11px] text-deep/50 uppercase tracking-wider">
                Plant-Based
              </p>
            </div>
            <div>
              <p className="font-display text-xl sm:text-2xl font-bold text-deep">
                15+
              </p>
              <p className="text-[10px] sm:text-[11px] text-deep/50 uppercase tracking-wider">
                Products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative h-[300px] sm:h-[400px] md:h-auto md:min-h-[500px] lg:min-h-[600px] overflow-hidden order-1 md:order-2">
        <img
          src="/why.png"
          alt="Ruhi products in a calm home"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
