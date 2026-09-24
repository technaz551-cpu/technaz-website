"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  useGetContactContentQuery,
  useUpdateContactContentMutation,
} from "@/store/api/technazApi";

const SOCIAL_PRESETS = [
  {
    label: "Instagram",
    icon: "/images/footer/instagram.png",
  },
  {
    label: "Facebook",
    icon: "/images/footer/facebook.png",
  },
  {
    label: "LinkedIn",
    icon: "/images/footer/linkedin.png",
  },
];

const EMPTY_OFFICE = {
  name: "",
  country: "",
  address: "",
  phone: "",
  email: "",
  mapEmbedUrl: "",
  openingHours: "",
  isPrimaryMap: false,
};

const EMPTY_EMAIL = { label: "", value: "" };
const EMPTY_SOCIAL = {
  label: "LinkedIn",
  href: "",
  icon: "/images/footer/linkedin.png",
};

export default function EditContactPage() {
  const [hero, setHero] = useState({ titleLine1: "", titleLine2: "" });
  const [emails, setEmails] = useState([]);
  const [offices, setOffices] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [footerBlurb, setFooterBlurb] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const { data, isLoading, isError } = useGetContactContentQuery();
  const [updateContact] = useUpdateContactContentMutation();

  useEffect(() => {
    if (isError) {
      setMessage({ type: "error", text: "Failed to load contact settings." });
      return;
    }
    if (data?.content) {
      const c = data.content;
      setHero(c.hero || { titleLine1: "", titleLine2: "" });
      setEmails(c.emails || []);
      setOffices(c.offices || []);
      setSocialLinks(c.socialLinks || []);
      setFooterBlurb(c.footerBlurb || "");
    }
  }, [data, isError]);

  const inputClasses =
    "w-full text-sm border border-dashed border-brand-border rounded-lg px-4 py-3 outline-none focus:border-brand-green focus:shadow-lg transition-all bg-white";

  const setPrimaryMap = (index) => {
    setOffices((prev) =>
      prev.map((office, i) => ({
        ...office,
        isPrimaryMap: i === index,
      }))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await updateContact({
        hero,
        emails,
        offices,
        socialLinks,
        footerBlurb,
      }).unwrap();
      setMessage({ type: "success", text: "Contact information updated." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.error || err.message || "Save failed.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-brand-green" size={28} />
      </section>
    );
  }

  return (
    <section className="relative px-6 py-10 lg:px-10">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-2xl font-bold text-brand-dark md:text-3xl">
          <span className="text-brand-green">Contact</span> page &amp; info
        </h1>
        <p className="mt-3 text-sm text-brand-gray">
          Manage emails, office locations (Australia, Pakistan, and more),
          opening hours, social links, and footer contact details.
        </p>
      </div>

      <div className="max-w-3xl space-y-8">
        <fieldset className="space-y-4 rounded-2xl border border-brand-border bg-white p-6">
          <legend className="px-1 text-sm font-bold text-brand-dark">
            Contact page heading
          </legend>
          <input
            type="text"
            value={hero.titleLine1}
            onChange={(e) =>
              setHero((p) => ({ ...p, titleLine1: e.target.value }))
            }
            placeholder="Title line 1"
            className={inputClasses}
          />
          <input
            type="text"
            value={hero.titleLine2}
            onChange={(e) =>
              setHero((p) => ({ ...p, titleLine2: e.target.value }))
            }
            placeholder="Title line 2"
            className={inputClasses}
          />
        </fieldset>

        <fieldset className="space-y-4 rounded-2xl border border-brand-border bg-white p-6">
          <legend className="px-1 text-sm font-bold text-brand-dark">
            Email addresses
          </legend>
          {emails.map((item, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-lg border border-gray-100 p-3 sm:grid-cols-[1fr_1fr_auto]"
            >
              <input
                type="text"
                value={item.label}
                onChange={(e) =>
                  setEmails((prev) =>
                    prev.map((row, i) =>
                      i === index ? { ...row, label: e.target.value } : row
                    )
                  )
                }
                placeholder="Label (e.g. Sales)"
                className={inputClasses}
              />
              <input
                type="email"
                value={item.value}
                onChange={(e) =>
                  setEmails((prev) =>
                    prev.map((row, i) =>
                      i === index ? { ...row, value: e.target.value } : row
                    )
                  )
                }
                placeholder="email@technaz.com.au"
                className={inputClasses}
              />
              <button
                type="button"
                onClick={() =>
                  setEmails((prev) => prev.filter((_, i) => i !== index))
                }
                className="flex items-center justify-center rounded-md border border-red-200 px-3 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setEmails((prev) => [...prev, { ...EMPTY_EMAIL }])}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green"
          >
            <Plus size={16} /> Add email
          </button>
        </fieldset>

        <fieldset className="space-y-4 rounded-2xl border border-brand-border bg-white p-6">
          <legend className="px-1 text-sm font-bold text-brand-dark">
            Offices (multiple locations)
          </legend>
          {offices.map((office, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl border border-brand-border p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase text-brand-gray">
                  Office {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setOffices((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={office.name}
                  onChange={(e) =>
                    setOffices((prev) =>
                      prev.map((row, i) =>
                        i === index ? { ...row, name: e.target.value } : row
                      )
                    )
                  }
                  placeholder="Office name"
                  className={inputClasses}
                />
                <input
                  type="text"
                  value={office.country}
                  onChange={(e) =>
                    setOffices((prev) =>
                      prev.map((row, i) =>
                        i === index ? { ...row, country: e.target.value } : row
                      )
                    )
                  }
                  placeholder="Country"
                  className={inputClasses}
                />
              </div>
              <textarea
                value={office.address}
                onChange={(e) =>
                  setOffices((prev) =>
                    prev.map((row, i) =>
                      i === index ? { ...row, address: e.target.value } : row
                    )
                  )
                }
                placeholder="Full address"
                rows={2}
                className={inputClasses}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={office.phone}
                  onChange={(e) =>
                    setOffices((prev) =>
                      prev.map((row, i) =>
                        i === index ? { ...row, phone: e.target.value } : row
                      )
                    )
                  }
                  placeholder="Phone"
                  className={inputClasses}
                />
                <input
                  type="email"
                  value={office.email}
                  onChange={(e) =>
                    setOffices((prev) =>
                      prev.map((row, i) =>
                        i === index ? { ...row, email: e.target.value } : row
                      )
                    )
                  }
                  placeholder="Office email"
                  className={inputClasses}
                />
              </div>
              <input
                type="text"
                value={office.openingHours}
                onChange={(e) =>
                  setOffices((prev) =>
                    prev.map((row, i) =>
                      i === index
                        ? { ...row, openingHours: e.target.value }
                        : row
                    )
                  )
                }
                placeholder="Opening hours (e.g. Mon – Fri, 9:00am – 6:00pm PKT)"
                className={inputClasses}
              />
              <textarea
                value={office.mapEmbedUrl}
                onChange={(e) =>
                  setOffices((prev) =>
                    prev.map((row, i) =>
                      i === index
                        ? { ...row, mapEmbedUrl: e.target.value }
                        : row
                    )
                  )
                }
                placeholder="Google Maps embed URL (iframe src)"
                rows={2}
                className={`${inputClasses} font-mono text-xs`}
              />
              <label className="flex items-center gap-2 text-sm text-brand-dark">
                <input
                  type="radio"
                  name="primaryMap"
                  checked={Boolean(office.isPrimaryMap)}
                  onChange={() => setPrimaryMap(index)}
                  className="text-brand-green focus:ring-brand-green"
                />
                Default map on contact page (when selected in list)
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setOffices((prev) => [...prev, { ...EMPTY_OFFICE }])
            }
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green"
          >
            <Plus size={16} /> Add office
          </button>
        </fieldset>

        <fieldset className="space-y-4 rounded-2xl border border-brand-border bg-white p-6">
          <legend className="px-1 text-sm font-bold text-brand-dark">
            Social media
          </legend>
          {socialLinks.map((item, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-lg border border-gray-100 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
            >
              <select
                value={item.label}
                onChange={(e) => {
                  const preset = SOCIAL_PRESETS.find(
                    (p) => p.label === e.target.value
                  );
                  setSocialLinks((prev) =>
                    prev.map((row, i) =>
                      i === index
                        ? {
                            ...row,
                            label: e.target.value,
                            icon: preset?.icon || row.icon,
                          }
                        : row
                    )
                  );
                }}
                className={inputClasses}
              >
                {SOCIAL_PRESETS.map((p) => (
                  <option key={p.label} value={p.label}>
                    {p.label}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
              <input
                type="url"
                value={item.href}
                onChange={(e) =>
                  setSocialLinks((prev) =>
                    prev.map((row, i) =>
                      i === index ? { ...row, href: e.target.value } : row
                    )
                  )
                }
                placeholder="https://"
                className={inputClasses}
              />
              <input
                type="text"
                value={item.icon}
                onChange={(e) =>
                  setSocialLinks((prev) =>
                    prev.map((row, i) =>
                      i === index ? { ...row, icon: e.target.value } : row
                    )
                  )
                }
                placeholder="Icon path"
                className={inputClasses}
              />
              <button
                type="button"
                onClick={() =>
                  setSocialLinks((prev) => prev.filter((_, i) => i !== index))
                }
                className="flex items-center justify-center rounded-md border border-red-200 px-3 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setSocialLinks((prev) => [...prev, { ...EMPTY_SOCIAL }])
            }
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green"
          >
            <Plus size={16} /> Add social link
          </button>
        </fieldset>

        <fieldset className="space-y-4 rounded-2xl border border-brand-border bg-white p-6">
          <legend className="px-1 text-sm font-bold text-brand-dark">
            Footer blurb
          </legend>
          <textarea
            value={footerBlurb}
            onChange={(e) => setFooterBlurb(e.target.value)}
            rows={3}
            className={inputClasses}
          />
        </fieldset>

        {message && (
          <p
            className={`text-sm font-medium ${
              message.type === "error" ? "text-red-600" : "text-brand-green"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:opacity-60"
        >
          {saving && <Loader2 className="animate-spin" size={16} />}
          {saving ? "Saving..." : "Save contact settings"}
        </button>
      </div>
    </section>
  );
}
