"use client";

import { useMemo, useState } from "react";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import {
  CONTACT_MAP_EMBED_SRC,
  CONTACT_ADDRESS,
} from "@/lib/contact.constants";
import { getPrimaryMapOffice } from "@/lib/contact.utils";

export default function ContactMapSection({ content }) {
  const offices = content?.offices?.length ? content.offices : [];

  const initialIndex = useMemo(() => {
    if (!offices.length) return 0;
    const primaryIdx = offices.findIndex(
      (o) => o.isPrimaryMap && o.mapEmbedUrl
    );
    if (primaryIdx >= 0) return primaryIdx;
    const withMap = offices.findIndex((o) => o.mapEmbedUrl);
    return withMap >= 0 ? withMap : 0;
  }, [offices]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const activeOffice = offices[activeIndex] || getPrimaryMapOffice(content);
  const embedSrc =
    activeOffice?.mapEmbedUrl ||
    offices.find((o) => o.mapEmbedUrl)?.mapEmbedUrl ||
    CONTACT_MAP_EMBED_SRC;
  const mapTitle =
    activeOffice?.name && activeOffice?.address
      ? `${activeOffice.name} — ${activeOffice.address}`
      : CONTACT_ADDRESS;

  return (
    <div className="flex flex-col gap-6">
      <div className="relative h-[380px] w-full overflow-hidden rounded-xl border border-brand-border bg-[#e8ece9] sm:h-[420px] lg:h-[450px]">
        <iframe
          key={embedSrc}
          title={`Office location — ${mapTitle}`}
          src={embedSrc}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {offices.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {offices.map((office, index) => (
            <li key={`${office.name}-${index}`}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-full rounded-xl border px-4 py-4 text-left transition-all ${
                  activeIndex === index
                    ? "border-brand-green bg-brand-green-light/50 shadow-sm"
                    : "border-brand-border bg-white hover:border-brand-green/60"
                }`}
              >
                <p className="text-sm font-bold text-brand-dark">
                  {office.name}
                  {office.country ? (
                    <span className="ml-2 text-xs font-medium text-brand-gray">
                      ({office.country})
                    </span>
                  ) : null}
                </p>
                {office.address ? (
                  <p className="mt-2 flex gap-2 text-sm text-brand-dark/80">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-brand-green"
                      aria-hidden="true"
                    />
                    <span>{office.address}</span>
                  </p>
                ) : null}
                {office.openingHours ? (
                  <p className="mt-2 flex gap-2 text-sm text-brand-gray">
                    <Clock size={16} className="shrink-0" aria-hidden="true" />
                    {office.openingHours}
                  </p>
                ) : null}
                {office.phone ? (
                  <p className="mt-1 flex gap-2 text-sm text-brand-gray">
                    <Phone size={16} className="shrink-0" aria-hidden="true" />
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="hover:text-brand-green"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {office.phone}
                    </a>
                  </p>
                ) : null}
                {office.email ? (
                  <p className="mt-1 flex gap-2 text-sm text-brand-gray">
                    <Mail size={16} className="shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${office.email}`}
                      className="hover:text-brand-green"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {office.email}
                    </a>
                  </p>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
