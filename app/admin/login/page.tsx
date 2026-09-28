"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiLock,
  FiUser,
  FiLogIn,
  FiAlertCircle,
  FiShield,
} from "react-icons/fi";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("adminLoggedIn", "true");
        document.cookie = "admin_session=true; path=/; max-age=86400";
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <SiteHeader cartCount={0} onCartOpen={() => {}} />

      {/* Main Container */}
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-24 bg-gradient-to-br from-cream/30 via-white to-orange/5">
        <div className="w-full max-w-5xl">
          {/* Single Card Container */}
          <div className="bg-white rounded-none shadow-2xl border border-line/30 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Login Form */}
              <div className="flex items-center justify-center px-6 py-8 md:px-8 md:py-12 bg-white">
                <div className="w-full max-w-sm">
                  {/* Brand */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange/10 mb-3">
                      <FiShield className="h-7 w-7 text-orange" />
                    </div>
                    <h1 className="text-3xl font-bold text-deep">
                      Tasifa Ruhi Industries
                    </h1>
                    <p className="text-sm text-muted mt-1 font-medium">
                      Admin Control Panel
                    </p>
                  </div>

                  {/* Login Form */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="rounded-full bg-orange/10 p-2">
                        <FiLock className="h-4 w-4 text-orange" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-deep">
                          Welcome Back
                        </h2>
                        <p className="text-xs text-muted">
                          Sign in to manage your store
                        </p>
                      </div>
                    </div>

                    {error && (
                      <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-600 text-sm border border-red-100">
                        <FiAlertCircle className="h-5 w-5 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep/80">
                          Username
                        </label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted h-4 w-4" />
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-lg border border-line bg-white/50 py-2.5 pl-10 pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/10 hover:border-deep/40"
                            placeholder="Enter username"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-deep/80">
                          Password
                        </label>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted h-4 w-4" />
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-line bg-white/50 py-2.5 pl-10 pr-4 text-sm transition-all focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/10 hover:border-deep/40"
                            placeholder="Enter password"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-orange/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiLogIn className="h-4 w-4" />
                        {isLoading ? "Logging in..." : "Login"}
                      </button>
                    </form>

                    <div className="mt-5 pt-4 border-t border-line/20">
                      <p className="text-center text-xs text-muted">
                        Default credentials:{" "}
                        <span className="font-mono text-deep/60">admin</span> /{" "}
                        <span className="font-mono text-deep/60">ruhi123</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Image Only (Full) */}
              <div className="hidden lg:block relative bg-gradient-to-br from-orange/5 via-orange/10 to-orange/5">
                <Image
                  src="/login-bg.png"
                  alt="Admin Dashboard Preview"
                  fill
                  className="object-cover"
                  priority
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
