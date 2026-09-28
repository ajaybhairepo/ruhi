"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageSquare,
  FiSend,
  FiCheck,
  FiArrowUpRight,
  FiPhoneCall,
  FiUser,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/9779815484404", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+9779815484404";
  };

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
    { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok" },
  ];

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
            <span className="text-white/70">Contact</span>
          </div>
          <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Get in Touch
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-white/60 text-sm">
            Have questions, feedback, or need assistance? We're here to help.
            Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      <main className="min-h-screen bg-cream px-[4%] py-6 md:px-[6%] md:py-10">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="group mb-4 flex items-center gap-2 text-sm text-ink/60 transition-all hover:text-ink"
          >
            <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </button>

          <div className="grid overflow-hidden bg-white shadow-lg md:grid-cols-2">
            {/* Left Side - Image & Contact Info */}
            <div
              className="relative min-h-[200px] md:min-h-[500px] bg-cover bg-center order-1 md:order-none"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=800&q=80)`,
              }}
            >
              <div className="absolute inset-0 bg-deep/70" />

              {/* Content - Hidden on mobile, visible on desktop */}
              <div className="absolute inset-0 hidden md:flex flex-col justify-between p-8">
                <div className="relative z-10">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange/20 px-4 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-orange">
                      Contact Us
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    We'd Love to Hear From You
                  </h2>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Whether you have a question about our products, need
                    support, or want to give feedback, we're here to help.
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/20 shrink-0">
                        <FiPhone className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Phone</p>
                        <p className="text-sm text-white">+977 9815484404</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/20 shrink-0">
                        <FiMail className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Email</p>
                        <p className="text-sm text-white">
                          tashifaruhi@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/20 shrink-0">
                        <FiMapPin className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Address</p>
                        <p className="text-sm text-white">
                          Kapilvastu-10, Pachehara
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/20 shrink-0">
                        <FiClock className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Business Hours</p>
                        <p className="text-sm text-white">
                          Mon-Sat: 9:00 AM - 6:00 PM
                        </p>
                        <p className="text-xs text-white/40">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 pl-13 text-xs text-white/60">
                    PAN: 622799285 · Regd. No: 15991/081
                  </p>
                </div>

                <div className="relative z-10">
                  <p className="mb-2 text-xs font-medium text-white/50">
                    Follow us on
                  </p>
                  <div className="flex gap-2 text-white">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-all hover:bg-orange hover:scale-105"
                        aria-label={social.label}
                      >
                        <social.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-4 md:p-6 lg:p-8 order-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-orange/10 p-2 md:p-3 shrink-0">
                  <FiMessageSquare className="h-5 w-5 md:h-6 md:w-6 text-orange" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-deep">
                    Send us a Message
                  </h2>
                  <p className="text-xs md:text-sm text-muted">
                    Fill in the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </div>
              </div>

              {isSuccess && (
                <div className="mb-4 flex items-center gap-3 rounded-xl bg-green-50 p-3 md:p-4 text-green-700">
                  <FiCheck className="h-5 w-5" />
                  <span className="text-xs md:text-sm font-medium">
                    Your message has been sent successfully!
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[10px] md:text-xs font-semibold uppercase tracking-wide text-deep">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted h-3.5 w-3.5 md:h-4 md:w-4" />
                      <input
                        className="w-full rounded-xl border border-line bg-white py-2.5 md:py-3 pl-9 md:pl-10 pr-3 md:pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                        required
                        placeholder="John Doe"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-[10px] md:text-xs font-semibold uppercase tracking-wide text-deep">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted h-3.5 w-3.5 md:h-4 md:w-4" />
                      <input
                        className="w-full rounded-xl border border-line bg-white py-2.5 md:py-3 pl-9 md:pl-10 pr-3 md:pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                        required
                        type="email"
                        placeholder="john@example.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[10px] md:text-xs font-semibold uppercase tracking-wide text-deep">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted h-3.5 w-3.5 md:h-4 md:w-4" />
                    <input
                      className="w-full rounded-xl border border-line bg-white py-2.5 md:py-3 pl-9 md:pl-10 pr-3 md:pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                      type="tel"
                      placeholder="98XXXXXXXX"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[10px] md:text-xs font-semibold uppercase tracking-wide text-deep">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full rounded-xl border border-line bg-white px-3 md:px-4 py-2.5 md:py-3 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Product Information">
                      Product Information
                    </option>
                    <option value="Bulk Order">Bulk Order</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-[10px] md:text-xs font-semibold uppercase tracking-wide text-deep">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-3 top-3 text-muted h-3.5 w-3.5 md:h-4 md:w-4" />
                    <textarea
                      className="w-full rounded-xl border border-line bg-white py-2.5 md:py-3 pl-9 md:pl-10 pr-3 md:pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
                      required
                      placeholder="Write your message here..."
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 md:gap-3 rounded-xl bg-orange px-4 md:px-6 py-3 md:py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend className="text-base md:text-lg" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <FiArrowUpRight />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Contact Cards */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              onClick={handleCall}
              className="bg-white p-3 md:p-4 text-center shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <div className="text-2xl md:text-3xl mb-1 md:mb-2">📞</div>
              <h4 className="text-xs md:text-sm font-semibold text-deep">
                Call Us
              </h4>
              <p className="text-[10px] md:text-xs text-muted">
                +977 9815484404
              </p>
            </button>
            <button
              onClick={handleWhatsApp}
              className="bg-white p-3 md:p-4 text-center shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <div className="text-2xl md:text-3xl mb-1 md:mb-2">💬</div>
              <h4 className="text-xs md:text-sm font-semibold text-deep">
                WhatsApp
              </h4>
              <p className="text-[10px] md:text-xs text-muted">
                +977 9815484404
              </p>
            </button>
            <a
              href="mailto:tashifaruhi@gmail.com"
              className="bg-white p-3 md:p-4 text-center shadow-sm transition-all hover:shadow-md hover:scale-[1.02] block"
            >
              <div className="text-2xl md:text-3xl mb-1 md:mb-2">✉️</div>
              <h4 className="text-xs md:text-sm font-semibold text-deep">
                Email Us
              </h4>
              <p className="text-[10px] md:text-xs text-muted">
                tashifaruhi@gmail.com
              </p>
            </a>
          </div>

          {/* Map Section */}
          <div className="mt-6 md:mt-8 overflow-hidden bg-white shadow-lg">
            <div className="grid gap-4 md:gap-6 md:grid-cols-3 p-4 md:p-6">
              <div className="md:col-span-1">
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-orange">
                  Find Us
                </h3>
                <p className="mt-1 md:mt-2 text-xs md:text-sm text-muted">
                  Visit our store in Kapilvastu-10, Pachehara, Nepal.
                </p>
                <div className="mt-2 md:mt-4 flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <FiClock className="h-3 w-3 md:h-3.5 md:w-3.5 text-orange" />
                    Mon-Sat 9AM-6PM
                  </span>
                  <span className="text-muted/30">•</span>
                  <span className="text-muted/50">Sunday Closed</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.6433247739474!2d83.13053229999998!3d27.604585600000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996f100491440f5%3A0x8990fe5089e99003!2sTashifa%20ruhi%20industries!5e0!3m2!1sen!2snp!4v1790606931235!5m2!1sen!2snp"
                  width="100%"
                  height="120"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tasifa Ruhi Industries location map"
                  className="bg-white/5"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter onAdminOpen={() => {}} />
    </div>
  );
}
