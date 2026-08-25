import { FiArrowUpRight } from "react-icons/fi";

export function BulkQuoteSection() {
  return (
    <section
      className="mt-[45px] mb-[60px] grid gap-[35px] bg-[#f7f5f0] px-[8%] py-[55px] text-deep md:mt-[100px] md:mb-[80px] md:grid-cols-2 md:gap-20 md:py-[70px] lg:mb-[100px]"
      id="bulk"
    >
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-deep">
          For businesses & families
        </p>

        <h2 className="my-5 max-w-[440px] font-display text-[clamp(32px,4vw,58px)] font-extrabold leading-[0.98] tracking-[-0.07em] text-deep">
          Need a little more clean?
        </h2>

        <p className="max-w-[430px] leading-[1.7] text-deep/70">
          Tell us what you need for your hotel, school, office or home. We will
          make a simple quote for you.
        </p>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap gap-6 md:mt-10">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-deep"></div>
            <span className="text-xs font-medium text-deep/70">
              Fast response
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-deep"></div>
            <span className="text-xs font-medium text-deep/70">
              Bulk discounts
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-deep"></div>
            <span className="text-xs font-medium text-deep/70">
              Free delivery
            </span>
          </div>
        </div>
      </div>

      <form
        className="grid content-center gap-[10px] md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          alert("Thanks! Our team will contact you shortly.");
        }}
      >
        {/* Name */}
        <input
          className="min-w-0 border border-deep/20 bg-white/80 p-[14px] text-deep placeholder:text-deep/40 transition-all duration-200 focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
          required
          type="text"
          placeholder="Your Name"
        />

        {/* Phone */}
        <input
          className="min-w-0 border border-deep/20 bg-white/80 p-[14px] text-deep placeholder:text-deep/40 transition-all duration-200 focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
          required
          type="tel"
          placeholder="Phone Number"
        />

        {/* Email */}
        <input
          className="min-w-0 border border-deep/20 bg-white/80 p-[14px] text-deep placeholder:text-deep/40 transition-all duration-200 focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
          required
          type="email"
          placeholder="Email Address"
        />

        {/* Product Selection */}
        <select
          className="min-w-0 border border-deep/20 bg-white/80 p-[14px] text-deep transition-all duration-200 focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
          defaultValue=""
          required
        >
          <option value="" disabled className="text-deep/40">
            What do you need?
          </option>
          <option className="text-deep">Detergent</option>
          <option className="text-deep">Soap</option>
          <option className="text-deep">Disinfectant</option>
          <option className="text-deep">Mixed Order</option>
        </select>

        {/* Address */}
        <textarea
          className="col-span-2 min-w-0 border border-deep/20 bg-white/80 p-[14px] text-deep placeholder:text-deep/40 transition-all duration-200 focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
          required
          rows={4}
          placeholder="Full Address"
        />

        {/* Submit Button */}
        <button
          className="group col-span-2 flex items-center justify-center gap-3 bg-deep p-[15px] text-[12px] font-extrabold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:bg-deep/90 hover:shadow-lg hover:shadow-deep/20"
          type="submit"
        >
          Request a Quote
          <FiArrowUpRight
            aria-hidden="true"
            className="text-base transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </button>

        <p className="col-span-2 mt-2 text-center text-[10px] text-deep/40">
          No spam, no commitment. We'll get back to you within 24 hours.
        </p>
      </form>
    </section>
  );
}
