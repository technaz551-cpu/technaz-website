"use client";

import { useState } from "react";

export default function Contact() {
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
    console.log("Contact Form Submitted:", formData);
  };

  const inputClasses =
    "w-full text-sm border border-dashed border-brand-border rounded-lg px-4 py-3 outline-none focus:border-brand-green focus:shadow-lg transition-all";

  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">
            Ready to Discuss How We Can
          </h2>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-gray">
            Help Your Business Grow?
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-brand-dark mb-2"
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
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-brand-dark mb-2"
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
            />
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-semibold text-brand-dark mb-2"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
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
              className="block text-sm font-semibold text-brand-dark mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter Name"
              rows={5}
              className={`${inputClasses} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="mx-auto mt-2 inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white hover:bg-brand-green-dark transition-colors"
          >
            Submit Information
          </button>
        </form>
      </div>
    </section>
  );
}