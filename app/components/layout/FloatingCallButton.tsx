"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FiPhone, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const phoneNumber = "+9779815484404";
const whatsappUrl =
  "https://wa.me/9779815484404?text=Hi%2C%20I%27d%20like%20to%20make%20a%20WhatsApp%20call.";

export function FloatingCallButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3">
      {isOpen && (
        <div
          id="floating-contact-options"
          role="group"
          aria-label="Choose how to contact us"
          className="flex min-w-48 flex-col gap-2 rounded-xl border border-line bg-white p-2 shadow-xl"
        >
          <a
            href={`tel:${phoneNumber}`}
            className="flex min-h-11 items-center gap-3 rounded-lg bg-orange px-4 text-sm font-semibold text-white transition-colors hover:bg-orange/90"
          >
            <FiPhone aria-hidden="true" className="h-4 w-4" />
            Call us
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-3 rounded-lg bg-green-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            <FaWhatsapp aria-hidden="true" className="h-4 w-4" />
            WhatsApp call
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
        aria-expanded={isOpen}
        aria-controls={isOpen ? "floating-contact-options" : undefined}
        className="flex h-14 items-center gap-2 rounded-full bg-deep px-5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
      >
        {isOpen ? (
          <FiX aria-hidden="true" className="h-5 w-5" />
        ) : (
          <FiPhone aria-hidden="true" className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
