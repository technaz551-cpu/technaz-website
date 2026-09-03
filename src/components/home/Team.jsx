"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TEAM_SLIDES = [
  [
    {
      name: "Team Member",
      title: "Co-Founder & CTO",
      img: "/images/team/member-1.jpg",
      position: "center top",
    },
    {
      name: "Malik Hamza Riaz",
      title: "Founder & CEO",
      img: "/images/team/member-2.jpg",
      position: "center top",
    },
    {
      name: "Team Member",
      title: "Graphic & UI UX Designer",
      img: "/images/team/member-3.jpg",
      position: "70% top",
    },
  ],
  [
    {
      name: "Team Member",
      title: "Team Member",
      img: "/images/team/member-4.jpg",
      position: "center top",
    },
    {
      name: "Team Member",
      title: "Team Member",
      img: "/images/team/member-5.jpg",
      position: "center top",
    },
    {
      name: "Team Member",
      title: "Team Member",
      img: "/images/team/member-6.jpg",
      position: "center top",
    },
  ],
];

function TeamCard({ member }) {
  return (
    <article className="group/card relative w-full">
      <div
        className="relative aspect-square w-full overflow-visible bg-gray-50"
        style={{ borderRadius: "30px" }}
      >
        <div className="absolute inset-0 z-10 overflow-visible transition-transform duration-300 ease-out group-hover/card:-translate-y-14">
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: "27px" }}
          >
            <Image
              src={member.img}
              alt={`${member.name} — ${member.title} at Technaz`}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              style={{ objectPosition: member.position || "center" }}
            />

            <div className="absolute left-3 top-3 z-20">
              <span className="text-base font-bold text-brand-dark sm:text-lg">
                {member.title}
              </span>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-0 flex h-0 items-center justify-center overflow-hidden bg-white transition-all duration-300 ease-out group-hover/card:h-14"
          style={{
            borderBottomLeftRadius: "27px",
            borderBottomRightRadius: "27px",
          }}
        >
          <span className="text-sm font-bold text-brand-dark">{member.name}</span>
        </div>
      </div>
    </article>
  );
}

export default function Team() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? TEAM_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === TEAM_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="about"
      aria-labelledby="team-heading"
      className="team-section overflow-x-clip overflow-y-visible bg-grid-green px-6 pb-6 pt-10 lg:px-10 lg:pb-8 lg:pt-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-5 flex items-center justify-between gap-4 md:mb-6">
          <div className="flex-1" aria-hidden="true" />

          <h2
            id="team-heading"
            className="text-center text-xl font-bold tracking-tight text-brand-dark sm:text-2xl md:text-3xl"
          >
            Meet Our Team Members
          </h2>

          <div className="flex flex-1 justify-end gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous team members"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-dark shadow-sm transition-colors hover:border-brand-green/40 hover:bg-brand-green-light sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next team members"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-dark shadow-sm transition-colors hover:border-brand-green/40 hover:bg-brand-green-light sm:h-10 sm:w-10"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="overflow-x-clip overflow-y-visible pb-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {TEAM_SLIDES.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="grid w-full flex-shrink-0 grid-cols-1 gap-5 overflow-visible sm:grid-cols-3 sm:gap-6 md:gap-8"
              >
                {slide.map((member, i) => (
                  <TeamCard key={i} member={member} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {TEAM_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to team slide ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-6 bg-brand-green"
                  : "w-1.5 bg-brand-dark/20 hover:bg-brand-dark/35"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
