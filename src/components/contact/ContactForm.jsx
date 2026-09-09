"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", contact: "", message: "" });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  const inputClasses =
    "w-full text-sm border border-dashed border-brand-border rounded-lg px-4 py-3 outline-none focus:border-brand-green focus:shadow-lg transition-all";

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-brand-dark md:text-3xl">
            Ready to Discuss How We Can
          </h1>
          <p className="text-2xl font-bold text-brand-gray md:text-3xl">
            Help Your Business Grow?
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* ================= LEFT: MAP ================= */}
          <div className="w-full overflow-hidden rounded-lg">
             <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.2682653291945!2d144.96114241176846!3d-37.66640377189628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad64fe1a12e196f%3A0xf684f1bcdf34c460!2s21%20Killara%20Rd%2C%20Campbellfield%20VIC%203061%2C%20Australia!5e0!3m2!1sen!2s!4v1788522360066!5m2!1sen!2s"
              className="h-[450px] w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
             />
          </div>

          {/* ================= RIGHT: FORM ================= */}
          <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-brand-dark"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className={inputClasses}
                  required
                />
              </div>

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
                  placeholder="example@gmail.com"
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-brand-dark"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-brand-dark"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or IT needs"
                  rows={5}
                  className={`${inputClasses} resize-none`}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="mx-auto mt-2 inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
              >
                {status.loading ? "Sending..." : "Submit Information"}
              </button>

              {status.success && (
                <p className="text-center text-sm font-medium text-brand-green">
                  Thanks! Your message has been sent successfully.
                </p>
              )}
              {status.error && (
                <p className="text-center text-sm font-medium text-red-600">
                  {status.error}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}