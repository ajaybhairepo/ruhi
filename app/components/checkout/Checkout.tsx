"use client";

import {
  FiArrowLeft,
  FiArrowUpRight,
  FiMapPin,
  FiPackage,
  FiUser,
  FiPhone,
  FiMail,
  FiNavigation,
  FiPhoneCall,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

type Variant = {
  label: string;
  price: number;
  offer: number;
};

type Product = {
  id: string;
  productCode: string;
  name: string;
  category: string;
  description: string;
  image: string;
  imagePublicId?: string;
  isLiquid: boolean;
  variants: Variant[];
  price: number;
  offer: number;
  createdAt: string;
  updatedAt: string;
  selectedVariant?: string;
  quantity?: number;
};

type Props = {
  cart: Product[];
  onBack: () => void;
  onDone: () => void;
};

export function Checkout({ cart, onBack, onDone }: Props) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    remarks: "",
    latitude: "",
    longitude: "",
  });

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Calculate total with quantities
  const total = cart.reduce((sum, item) => {
    const qty = item.quantity || 1;
    return sum + item.offer * qty;
  }, 0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        }));
        setIsLoadingLocation(false);
      },
      (error) => {
        setLocationError(
          "Unable to get your location. Please enter your address manually.",
        );
        setIsLoadingLocation(false);
        console.error("Location error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const generateOrderNumber = () => {
    const prefix = "RU";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleWhatsAppOrder = (event: React.FormEvent) => {
    event.preventDefault();

    const orderNum = generateOrderNumber();

    const orderSummary = cart
      .map((item) => {
        const qty = item.quantity || 1;
        const variant = item.selectedVariant
          ? ` (${item.selectedVariant})`
          : "";
        return `${item.name}${variant} × ${qty} - NPR ${item.offer * qty}`;
      })
      .join("\n");

    let message = `Hello Ruhi! I would like to place an order.

Order #: ${orderNum}

Order Summary:
${orderSummary}

Total: NPR ${total}

Delivery Details:
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email || "Not provided"}
Address: ${formData.address}`;

    if (formData.latitude && formData.longitude) {
      const googleMapsLink = `https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`;
      message += `
      
📍 Location Coordinates:
Latitude: ${formData.latitude}
Longitude: ${formData.longitude}
Google Maps: ${googleMapsLink}`;
    }

    if (formData.remarks) {
      message += `

Remarks: ${formData.remarks}`;
    }

    window.open(
      `https://wa.me/9779768884650?text=${encodeURIComponent(message)}`,
      "_blank",
    );

    onDone();
  };

  const handleCallOrder = () => {
    window.location.href = "tel:+9779768884650";
    onDone();
  };

  // Generate Google Maps embed URL
  const getGoogleMapsEmbedUrl = () => {
    if (formData.latitude && formData.longitude) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${formData.latitude},${formData.longitude}&zoom=15`;
    }
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Kapilvastu,Nepal&zoom=12`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <button
          className="mb-6 flex items-center gap-2 bg-transparent text-sm font-semibold text-muted transition-colors hover:text-deep"
          onClick={onBack}
        >
          <FiArrowLeft aria-hidden="true" /> Back to bag
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.7fr] lg:gap-12">
          {/* Form */}
          <form className="space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-orange">
                Delivery details
              </p>
              <h1 className="mt-2 font-display text-2xl font-extrabold tracking-[-0.07em] sm:text-3xl lg:text-4xl">
                Where should we send it?
              </h1>
              <p className="mt-1 text-sm text-muted">
                Fill in your delivery information below.
              </p>
            </div>

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

              <div className="sm:col-span-2">
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

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                  Full Address <span className="text-red-500">*</span>
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
            </div>

            {/* Location Picker with Google Maps */}
            <div className="rounded-xl border border-line bg-white p-4">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-deep">
                  <span className="mr-2">📍</span> Pick Your Location
                </label>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                    isLoadingLocation
                      ? "bg-gray-100 text-muted cursor-not-allowed"
                      : "bg-deep text-white hover:bg-deep/80"
                  }`}
                >
                  <FiNavigation
                    className={`${isLoadingLocation ? "animate-spin" : ""}`}
                  />
                  {isLoadingLocation
                    ? "Getting location..."
                    : "Use My Location"}
                </button>
              </div>

              {locationError && (
                <p className="mb-2 text-xs text-red-500">{locationError}</p>
              )}

              {/* Google Maps Embed */}
              <div className="overflow-hidden rounded-lg border border-line">
                <iframe
                  src={getGoogleMapsEmbedUrl()}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                  className="bg-cream"
                />
              </div>

              {formData.latitude && formData.longitude && (
                <div className="mt-2 rounded-lg bg-cream p-3">
                  <p className="text-xs text-muted">📍 Location captured!</p>
                  <div className="mt-1 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted">Latitude:</span>
                      <span className="ml-1 font-mono font-medium text-deep">
                        {formData.latitude}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted">Longitude:</span>
                      <span className="ml-1 font-mono font-medium text-deep">
                        {formData.longitude}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-orange hover:text-deep"
                  >
                    View on Google Maps <FiArrowUpRight className="text-xs" />
                  </a>
                </div>
              )}

              <p className="mt-2 text-[10px] text-muted">
                Use "Use My Location" to share your exact location, or click the
                link below to open Google Maps.
              </p>
              {formData.latitude && formData.longitude && (
                <a
                  href={`https://www.google.com/maps/dir//${formData.latitude},${formData.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-orange hover:text-deep"
                >
                  <FiMapPin className="text-xs" />
                  Open in Google Maps for precise location
                  <FiArrowUpRight className="text-xs" />
                </a>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep">
                Additional Remarks
              </label>
              <textarea
                className="w-full rounded-xl border border-line bg-white p-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                placeholder="Any special instructions for delivery..."
                rows={3}
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
              />
            </div>

            {/* Two Buttons: WhatsApp & Call */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={handleWhatsAppOrder}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white transition-all hover:bg-[#1da851] hover:shadow-lg hover:shadow-[#25D366]/30"
                type="button"
              >
                <FaWhatsapp aria-hidden="true" className="text-xl" />
                Order via WhatsApp
                <FiArrowUpRight aria-hidden="true" />
              </button>

              <button
                onClick={handleCallOrder}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-deep px-6 py-4 text-sm font-bold text-white transition-all hover:bg-deep/80 hover:shadow-lg hover:shadow-deep/30"
                type="button"
              >
                <FiPhoneCall aria-hidden="true" className="text-xl" />
                Call to Order
                <FiArrowUpRight aria-hidden="true" />
              </button>
            </div>

            <p className="text-center text-xs text-muted">
              By placing this order, you agree to our terms and conditions.
            </p>
          </form>

          {/* Order Summary */}
          <aside className="self-start rounded-2xl bg-white p-6 shadow-lg lg:p-8">
            <div className="flex items-center gap-2 border-b border-line pb-4">
              <FiPackage className="text-orange" />
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-orange">
                Your Order
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {cart.map((item) => {
                const qty = item.quantity || 1;
                const itemTotal = item.offer * qty;
                const uniqueKey = `${item.id}-${item.selectedVariant || "default"}`;

                return (
                  <div
                    className="flex items-center justify-between border-b border-line/50 py-3 text-sm"
                    key={uniqueKey}
                  >
                    <div>
                      <span className="font-medium text-deep">{item.name}</span>
                      {item.selectedVariant && (
                        <span className="ml-2 text-xs text-muted">
                          ({item.selectedVariant})
                        </span>
                      )}
                      <div className="mt-0.5 text-xs text-muted">
                        × {qty} = NPR {itemTotal}
                      </div>
                      {item.productCode && (
                        <span className="ml-2 text-[10px] text-muted font-mono">
                          #{item.productCode}
                        </span>
                      )}
                    </div>
                    <strong className="text-sm text-deep">
                      NPR {itemTotal}
                    </strong>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 space-y-2 border-t border-line pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-deep">NPR {total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Delivery</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between border-t border-line pt-3">
                <span className="text-base font-semibold text-deep">Total</span>
                <strong className="font-display text-xl text-deep">
                  NPR {total}
                </strong>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-cream p-4">
              <p className="text-xs text-muted">
                💡 Cash on delivery available. We will confirm your order on
                WhatsApp or call.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                <span className="text-xs text-muted">Secure checkout</span>
              </div>
              <span className="text-muted">•</span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange"></span>
                <span className="text-xs text-muted">Cash on delivery</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
