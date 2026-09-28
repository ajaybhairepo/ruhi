import {
  FiArrowUpRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiHeart,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

type SiteFooterProps = {
  onAdminOpen: () => void;
  onCategorySelect?: (category: string) => void;
};

export function SiteFooter({ onAdminOpen, onCategorySelect }: SiteFooterProps) {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
    // Navigate to products page with category filter
    router.push(`/products?category=${category}`);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <footer className="relative bg-deep/95 px-[6%] pt-16 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange/5 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-orange/5 blur-3xl" />

      {/* Top Border Accent */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-transparent via-orange to-transparent" />

      {/* Main Content */}
      <div className="relative grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Tasifa Ruhi Industries"
              width={128}
              height={128}
              className="h-16 w-16 rounded-full bg-white object-contain"
            />
            <div>
              <div className="font-display text-2xl font-bold text-white">
                Tasifa Ruhi Industries
              </div>
              <p className="text-sm text-white/60">
                Cleaning products made in Nepal
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Everyday care, made a little better. Quality cleaning products for
            every corner of your home.
          </p>

          {/* Social Icons */}
          <div className="mt-5 flex gap-2 text-white">
            {[
              { icon: FaFacebook, href: "https://facebook.com", label: "FB" },
              { icon: FaInstagram, href: "https://instagram.com", label: "IG" },
              { icon: FaYoutube, href: "https://youtube.com", label: "YT" },
              { icon: FaTiktok, href: "https://tiktok.com", label: "TT" },
              {
                icon: FaWhatsapp,
                href: "https://wa.me/9779815484404",
                label: "WA",
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-all hover:bg-orange hover:text-white hover:scale-105"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links & Products - Two columns on mobile */}
        <div className="grid grid-cols-2 gap-6 md:col-span-1 lg:col-span-2">
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-orange">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-white">
              <li>
                <button
                  onClick={() => handleNavigation("/#about-us")}
                  className="group flex items-center gap-2 text-sm text-white transition-all hover:text-orange hover:pl-1 cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/products")}
                  className="group flex items-center gap-2 text-sm text-white transition-all hover:text-orange hover:pl-1 cursor-pointer"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/bulk-order")}
                  className="group flex items-center gap-2 text-sm text-white transition-all hover:text-orange hover:pl-1 cursor-pointer"
                >
                  Bulk Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="group flex items-center gap-2 text-sm text-white transition-all hover:text-orange hover:pl-1 cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Products - Category Links with navigation */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-orange">
              Products
            </h3>
            <ul className="space-y-2.5 text-white">
              {[
                "Detergent",
                "Soap",
                "Disinfectant",
                "Dishwasher",
                "Cleaner",
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleCategoryClick(item)}
                    className="group flex items-center gap-2 text-sm text-white transition-all hover:text-orange hover:pl-1 cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Location */}
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-orange">
            Contact
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-center gap-3 text-sm text-white transition-all hover:text-orange">
              <FiPhone className="h-4 w-4 text-white transition-all group-hover:text-orange" />
              <a href="tel:+9779815484404">+977 9815484404</a>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <a
                href="mailto:tashifaruhi@gmail.com"
                className="flex items-center gap-3 text-white transition-all hover:text-orange"
              >
                <FiMail className="h-4 w-4 text-white transition-all group-hover:text-orange" />
                tashifaruhi@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <a
                href="https://wa.me/9779815484404"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-white transition-all hover:text-orange"
              >
                <FaWhatsapp className="h-4 w-4 text-white transition-all group-hover:text-orange" />
                WhatsApp Us
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-white transition-all hover:text-orange">
              <FiMapPin className="mt-0.5 h-4 w-4 text-white transition-all group-hover:text-orange" />
              <span>Kapilvastu-10, Pachehara</span>
            </li>
            <li className="pl-7 text-xs text-white/60">
              PAN: 622799285 · Regd. No: 15991/081
            </li>
            <li className="flex items-start gap-3 text-sm text-white">
              <FiClock className="mt-0.5 h-4 w-4 text-white" />
              <div>
                <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
                <br />
                <span className="text-white/40">Sunday: Closed</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/50 md:flex-row">
        <div className="flex items-center gap-2">
          <FiHeart className="h-3 w-3 text-orange" />
          <span>© 2026 Tasifa Ruhi Industries</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-white/50">
          <span>Delivery across Nepal</span>
          <span className="text-white/20">•</span>
          <span>Cash on delivery</span>
          <span className="text-white/20">•</span>
          <button
            onClick={onAdminOpen}
            className="text-white/50 transition-all hover:text-orange"
          >
            Admin Login
          </button>
        </div>
      </div>
    </footer>
  );
}
