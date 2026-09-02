"use client";

import { useState } from "react";
import Image from "next/image";

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
    <div className="group/card relative w-full" style={{ transform: "translateZ(0)" }}>
      <div
        className="relative w-full aspect-square bg-gray-50 overflow-visible"
        style={{ borderRadius: "30px" }}
      >
        {/* Image Wrapper - moves up on hover (title travels with it), extends beyond card */}
        <div className="absolute inset-0 z-10 overflow-visible transition-transform duration-300 ease-out group-hover/card:-translate-y-14">
          <div
            className="relative w-full h-full overflow-hidden"
            style={{ borderRadius: "27px" }}
          >
            <Image
              src={member.img}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 33vw, 400px"
              className="object-cover"
              style={{ objectPosition: member.position || "center" }}
            />

            {/* Title badge - inside the image wrapper, moves together with it */}
            <div className="absolute top-3 left-3 z-24">
              <span className="text-lg font-bold text-brand-dark">
                {member.title}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div
          className="absolute bottom-0 left-0 right-0 z-0 h-0 group-hover/card:h-14 overflow-hidden bg-white transition-all duration-300 ease-out flex items-center justify-center"
          style={{
            borderBottomLeftRadius: "27px",
            borderBottomRightRadius: "27px",
          }}
        >
          <span className="text-sm font-bold text-brand-dark">
            {member.name}
          </span>
        </div>
      </div>
    </div>
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
    <section className="bg-grid-green overflow-x-clip overflow-y-visible py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header: centered heading + arrows on the right */}
        <div className="relative mb-25 -mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark text-center">
            Meet Our Team Members
          </h2>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-4">
            <button
              onClick={prevSlide}
              aria-label="Previous team members"
              className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Image src="/images/team/arrow-left.png" alt="" width={22} height={22} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next team members"
              className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Image src="/images/team/arrow-right.png" alt="" width={22} height={22} />
            </button>
          </div>
        </div>

        {/* Carousel - clip horizontally only, allow vertical overflow for hover */}
        <div className="overflow-x-clip overflow-y-visible">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {TEAM_SLIDES.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="flex-shrink-0 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8"
              >
                {slide.map((member, i) => (
                  <TeamCard key={i} member={member} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}