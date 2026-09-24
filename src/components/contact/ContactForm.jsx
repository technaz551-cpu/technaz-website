"use client";

import { useState } from "react";
import { useSubmitContactMutation } from "@/store/api/technazApi";

export default function ContactForm({ emails = [] }) {
  const displayEmails =
    emails?.length > 0
      ? emails
      : [{ label: "Email", value: "hello@technaz.com.au" }];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [submitContact, { isLoading }] = useSubmitContactMutation();
  const [status, setStatus] = useState({
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
    setStatus({ success: null, error: null });

    try {
      await submitContact(formData).unwrap();
      setStatus({ success: true, error: null });
      setFormData({ name: "", email: "", contact: "", message: "" });
    } catch (err) {
      setStatus({
        success: false,
        error: err?.data?.error || err?.message || "Something went wrong",
      });
    }
  };

  const inputClasses =
    "w-full text-sm border border-dashed border-brand-border rounded-lg px-4 py-3 outline-none focus:border-brand-green focus:shadow-lg transition-all";

  return (
    <div className="w-full">
      <div className="mb-6 rounded-xl border border-brand-border bg-brand-green-light/30 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-gray">
          Reach us directly
        </p>
        <ul className="mt-2 space-y-1">
          {displayEmails.map((item, i) => (
            <li key={`${item.value}-${i}`}>
              <a
                href={`mailto:${item.value}`}
                className="text-sm font-semibold text-brand-dark transition-colors hover:text-brand-green"
              >
                {item.label ? `${item.label}: ` : ""}
                {item.value}
              </a>
            </li>
          ))}
        </ul>
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
          disabled={isLoading}
          className="mx-auto mt-2 inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
        >
          {isLoading ? "Sending..." : "Submit Information"}
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
  );
}
