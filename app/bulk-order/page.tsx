"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiPackage,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiCheck,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { products } from "@/app/data/store";

export default function BulkOrderPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    product: "",
    quantity: "",
    unit: "kg",
    address: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get unique product names for dropdown
  const productOptions = products.map((p) => p.name);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `Hello Ruhi! I would like to place a bulk order.

Product: ${formData.product}
Quantity: ${formData.quantity} ${formData.unit}

Customer Details:
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email || "Not provided"}
Address: ${formData.address}

Additional Message: ${formData.message || "N/A"}`;

    window.open(
      `https://wa.me/9779768884650?text=${encodeURIComponent(message)}`,
      "_blank",
    );

    setIsSubmitting(false);
  };

  return (
    <div className="overflow-hidden">
      <SiteHeader cartCount={0} onCartOpen={() => {}} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-deep to-deep/90 px-[5%] py-20 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-sm">
            <button
              onClick={() => router.push("/")}
              className="text-white/50 hover:text-white transition-colors"
            >
              Home
            </button>
            <span className="text-white/30">/</span>
            <button
              onClick={() => router.push("/products")}
              className="text-white/50 hover:text-white transition-colors"
            >
              Products
            </button>
            <span className="text-white/30">/</span>
            <span className="text-white/70">Bulk Order</span>
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Bulk Order Request
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-white/60 text-sm md:text-base">
            Get special pricing and discounts on bulk orders. Fill in the form
            below and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <main className="min-h-screen bg-cream px-[2%] py-8 md:px-[4%] md:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="group mb-6 flex items-center gap-2 text-sm text-ink/60 transition-all hover:text-ink"
          >
            <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </button>

          {/* Split Layout: Image Left, Form Right */}
          <div className="grid overflow-hidden bg-white shadow-lg md:grid-cols-2">
            {/* Left Side - Full Image */}
            <div
              className="relative min-h-[300px] md:min-h-[600px] bg-cover bg-center"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80)`,
              }}
            />

            {/* Right Side - Form */}
            <div className="p-6 md:p-8 lg:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full bg-orange/10 p-3">
                  <FiPackage className="h-6 w-6 text-orange" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-deep">
                    Request a Quote
                  </h2>
                  <p className="text-sm text-muted">
                    Fill in the details below to get a custom quote.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                        required
                        placeholder="John Doe"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                        required
                        type="tel"
                        placeholder="98XXXXXXXX"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                      type="email"
                      placeholder="john@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiPackage className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <select
                      className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20 appearance-none"
                      required
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                    >
                      <option value="">Select a product</option>
                      {productOptions.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg
                        className="h-4 w-4 text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-xl border border-line bg-white py-3 px-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                      required
                      type="number"
                      min="1"
                      placeholder="10"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                      Unit <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full rounded-xl border border-line bg-white py-3 px-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                      required
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                    >
                      <option value="kg">Kilogram (kg)</option>
                      <option value="ml">Milliliter (ml)</option>
                      <option value="L">Liter (L)</option>
                      <option value="g">Gram (g)</option>
                      <option value="pcs">Pieces (pcs)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3 text-muted" />
                    <input
                      className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                      required
                      placeholder="House number, street, landmark"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                    Additional Message
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-3 top-3 text-muted" />
                    <textarea
                      className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                      placeholder="Any special requirements..."
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white transition-all hover:bg-[#1da851] hover:shadow-lg hover:shadow-[#25D366]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaWhatsapp className="text-xl" />
                  {isSubmitting ? "Sending..." : "Send Bulk Order via WhatsApp"}
                  <FiArrowUpRight />
                </button>

                <p className="text-center text-xs text-muted">
                  <FiCheck className="inline mr-1 text-green-500" />
                  We'll respond to your bulk order request within 24 hours.
                </p>
              </form>
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-white p-4 text-center shadow-sm">
              <div className="text-2xl mb-2">📦</div>
              <h4 className="text-sm font-semibold text-deep">
                Bulk Discounts
              </h4>
              <p className="text-xs text-muted">
                Special pricing on bulk orders
              </p>
            </div>
            <div className="bg-white p-4 text-center shadow-sm">
              <div className="text-2xl mb-2">🚚</div>
              <h4 className="text-sm font-semibold text-deep">Free Delivery</h4>
              <p className="text-xs text-muted">Free delivery on bulk orders</p>
            </div>
            <div className="bg-white p-4 text-center shadow-sm">
              <div className="text-2xl mb-2">💬</div>
              <h4 className="text-sm font-semibold text-deep">
                Quick Response
              </h4>
              <p className="text-xs text-muted">We reply within 24 hours</p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter onAdminOpen={() => {}} />
    </div>
  );
}
