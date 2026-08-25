"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Brand Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-deep">
            Natural Cleaning Products Made in Nepal
          </h2>
          <p className="text-deep/70 leading-relaxed text-base md:text-lg">
            Born in the heart of Kapilvastu,{" "}
            <span className="font-medium text-deep">Ruhi</span> is a Nepali
            brand committed to creating safe, plant-based cleaning products that
            protect your family and the environment. Every product we make is a
            promise of quality, sustainability, and genuine care.
          </p>
          <p className="text-deep/70 leading-relaxed text-base md:text-lg mt-4">
            From gentle soaps to powerful eco-friendly detergents, Ruhi combines
            traditional wisdom with modern science to deliver effective,
            non-toxic solutions for every home in Nepal.
          </p>
        </div>

        {/* Founder / Location Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-[400px] w-full bg-gray-200 rounded-none overflow-hidden">
            <Image
              src="/about.jpg"
              alt="Ruhi Brand Facility in Kapilvastu"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-light mb-4 text-deep">
              Made with Love, Rooted in Community
            </h3>
            <p className="text-deep/70 leading-relaxed mb-4">
              Ruhi was born from a simple belief: cleaning should be safe,
              natural, and kind to both people and the planet. Operating from
              Pachehara, Kapilvastu-10, we work closely with local communities
              to source ingredients and create products that truly make a
              difference in everyday life.
            </p>
            <p className="text-deep/70 leading-relaxed">
              Whether it's our plant-based{" "}
              <span className="font-medium text-deep">detergents </span>
              that tackle tough stains or our gentle{" "}
              <span className="font-medium text-deep">disinfectants </span>
              that keep your home hygienic and safe, every Ruhi product reflects
              our commitment to excellence, sustainability, and the well-being
              of Nepali families.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
