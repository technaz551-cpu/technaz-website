"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/store/api/technazApi";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData).unwrap();
      router.push("/dashboard");
      router.refresh();
    } catch {
      // Error surfaced via RTK Query `error` state
    }
  };

  const inputClasses =
    "w-full text-sm border border-dashed border-brand-border rounded-lg px-4 py-3 outline-none focus:border-brand-green focus:shadow-lg transition-all bg-white";

  const errorMessage =
    error?.data?.error || error?.error || (error ? "Invalid email or password." : null);

  return (
    <main className="bg-grid-green flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-brand-border bg-white p-8 shadow-sm md:p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="mb-6 inline-block">
            <Image
              src="/images/footer/technaz-large-logo.png"
              alt="Technaz"
              width={140}
              height={40}
              className="h-6 w-auto"
              priority
            />
          </Link>
          <h1 className="text-xl font-bold text-brand-dark md:text-2xl">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-brand-gray">
            Sign in to access the Technaz dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-brand-dark"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@technaz.com.au"
              className={inputClasses}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-brand-dark"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`${inputClasses} pr-11`}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray transition-colors hover:text-brand-dark"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {errorMessage && (
            <p className="text-center text-sm font-medium text-red-600">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
