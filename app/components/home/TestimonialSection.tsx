"use client";

import { FiStar } from "react-icons/fi";

export function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sita Adhikari",
      review: "Ruhi products have completely transformed how I clean my home.",
    },
    {
      id: 2,
      name: "Ram Prasad Gautam",
      review:
        "I've been using Ruhi detergents for over a year now. The quality is consistently excellent.",
    },
    {
      id: 3,
      name: "Gita Shrestha",
      review:
        "Finally, a cleaning product that actually works and doesn't harm the environment!",
    },
    {
      id: 4,
      name: "Hari Bahadur Thapa",
      review:
        "The disinfectant from Ruhi is the best I've ever used. Keeps my home hygienic and safe.",
    },
    {
      id: 5,
      name: "Sunita Poudel",
      review: "I love that Ruhi products are eco-friendly and actually work.",
    },
    {
      id: 6,
      name: "Krishna Dhakal",
      review:
        "The quality and care that goes into every Ruhi product is evident.",
    },
    {
      id: 7,
      name: "Mohammad Ali Ansari",
      review:
        "Ruhi's commitment to quality and natural ingredients is truly commendable.",
    },
    {
      id: 8,
      name: "Abdul Rahman Khan",
      review:
        "The best cleaning products I've ever used. My family feels safer with Ruhi.",
    },
    {
      id: 9,
      name: "Lakshmi Devi Sharma",
      review:
        "Ruhi has made cleaning so much easier and safer. I'm grateful for this amazing brand.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 md:py-24 bg-cream overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-deep/5 text-deep text-xs md:text-sm font-semibold mb-4 md:mb-5">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-lime animate-pulse" />
            TESTIMONIALS
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-deep">
            Trusted by Families Across Nepal
          </h2>

          <p className="max-w-2xl mx-auto text-muted mt-4 md:mt-5 text-sm md:text-base leading-relaxed px-4">
            Thousands of customers rely on Ruhi products every day for cleaner,
            safer homes and brighter laundry.
          </p>
        </div>

        {/* Auto Scrolling Carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

          <div className="testimonial-track">
            {/* Duplicate testimonials for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="testimonial-card"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-3 sm:mb-4 text-orange">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-3 h-3 sm:w-4 sm:h-4 fill-orange"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-muted leading-relaxed mb-5 sm:mb-8 text-sm sm:text-base">
                  "{testimonial.review}"
                </p>

                {/* Author */}
                <div className="pt-3 sm:pt-4 border-t border-line flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-deep to-deep/80 text-white flex items-center justify-center font-semibold text-xs sm:text-sm md:text-base shadow-md">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-semibold text-deep text-sm sm:text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted">
                      Verified Customer
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: scroll 40s linear infinite;
          padding: 12px 0;
        }

        .testimonial-track:hover {
          animation-play-state: paused;
        }

        .testimonial-card {
          width: 280px;
          flex-shrink: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
          border-color: #d1d5db;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .testimonial-card {
            width: 240px;
            padding: 18px;
            border-radius: 16px;
          }

          .testimonial-track {
            gap: 12px;
            animation-duration: 30s;
            padding: 8px 0;
          }
        }

        /* Tablet */
        @media (min-width: 640px) {
          .testimonial-card {
            width: 320px;
            padding: 28px;
          }

          .testimonial-track {
            gap: 20px;
            animation-duration: 35s;
          }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .testimonial-card {
            width: 380px;
            padding: 32px;
            border-radius: 24px;
          }

          .testimonial-track {
            gap: 24px;
            animation-duration: 40s;
          }
        }

        /* Large Desktop */
        @media (min-width: 1280px) {
          .testimonial-card {
            width: 420px;
            padding: 36px;
          }

          .testimonial-track {
            gap: 28px;
            animation-duration: 45s;
          }
        }
      `}</style>
    </section>
  );
}
