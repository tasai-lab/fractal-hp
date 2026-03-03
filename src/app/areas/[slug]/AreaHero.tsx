import Image from "next/image";
import type { RegionalData } from "@/lib/regional-data";

type Props = {
  area: RegionalData;
};

export default function AreaHero({ area }: Props) {
  const { primary } = area.theme;

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero/hero-bg.webp"
        alt={`${area.name}の訪問看護スタッフ`}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-white/40" />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `${primary}15` }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-40 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />

      <h1
        className="absolute top-4 md:top-6 left-0 right-0 z-10 text-center text-sm md:text-base font-medium tracking-wide"
        style={{ color: primary, opacity: 0.8 }}
      >
        {area.h1}
      </h1>

      <div
        className="relative z-10 text-center px-4 py-8 flex flex-col items-center justify-center h-full"
        style={{ perspective: "1000px" }}
      >
        <div className="flex justify-center animate-emerge-from-back">
          <h2
            className="font-bold drop-shadow-lg"
            style={{
              fontSize: "var(--font-size-fluid-4xl)",
              writingMode: "vertical-rl",
              textOrientation: "upright",
              letterSpacing: "0.15em",
              color: primary,
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            {area.theme.tagline}
          </h2>
        </div>
      </div>
    </section>
  );
}
