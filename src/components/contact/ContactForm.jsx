"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputClasses =
    "w-full text-sm border border-dashed border-brand-border rounded-lg px-4 py-3 outline-none focus:border-brand-green focus:shadow-lg transition-all";

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:px-10">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-brand-dark md:text-3xl">
            Ready to Discuss How We Can
          </h1>
          <p className="text-2xl font-bold text-brand-gray md:text-3xl">
            Help Your Business Grow?
          </p>
        </div>

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
            className="mx-auto mt-2 inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
          >
            Submit Information
          </button>
        </form>
      </div>
    </section>
  );
}
