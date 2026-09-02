"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full">

      {/* ================= TOP DIV ================= */}
      <div className="sticky top-0 z-50 h-[187px] bg-[#303747] px-[27px] pt-[38px]">

        {/* TOP LEFT LOGO */}
        <Image
          src="/images/footer/technaz-small-logo.png"
          alt="Technaz"
          width={165}
          height={30}
          className="h-auto w-[165px]"
        />

        {/* DOTTED LINE */}
        <div className="mt-[18px] w-full border-t border-dashed border-[#858b96]" />

        {/* BOTTOM CONTENT */}
        <div className="mt-[15px] flex items-end justify-between">

          {/* DESCRIPTION */}
          <div className="text-[12px] leading-[17px] text-white">
            <p>Australia's trusted technology partner</p>
            <p>— we build, support and scale IT for</p>
            <p>growing businesses.</p>
          </div>

          {/* SOCIAL LOGOS */}
          <div className="flex items-center gap-[12px]">

            {/* Instagram */}
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white">
              <Image
                src="/images/footer/instagram.png"
                alt="Instagram"
                width={20}
                height={20}
                className="h-[20px] w-[20px] object-contain"
              />
            </div>

            {/* Facebook */}
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white">
              <Image
                src="/images/footer/facebook.png"
                alt="Facebook"
                width={20}
                height={20}
                className="h-[20px] w-[20px] object-contain"
              />
            </div>

            {/* LinkedIn */}
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white">
              <Image
                src="/images/footer/linkedin.png"
                alt="LinkedIn"
                width={20}
                height={20}
                className="h-[20px] w-[20px] object-contain"
              />
            </div>

          </div>
        </div>
      </div>


      {/* ================= BOTTOM DIV ================= */}
      <div className="relative z-0 h-[167px] w-full overflow-hidden bg-white">

        {/* GRID BACKGROUND */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #edf2ea 1px, transparent 1px),
              linear-gradient(to bottom, #edf2ea 1px, transparent 1px)
            `,
            backgroundSize: "18px 18px",
          }}
        />

        {/* LARGE TECHNAZ LOGO */}
        <div className="relative flex h-full w-full items-center justify-center">

          <Image
            src="/images/footer/technaz-large-logo.png"
            alt="Technaz"
            width={1200}
            height={150}
            className="h-auto w-[1200px] max-w-none object-contain"
          />

        </div>
      </div>

    </footer>
  );
}