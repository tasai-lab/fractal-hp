import BackgroundTriangles from "@/components/BackgroundTriangles";

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
  isH1?: boolean;
}

export default function PageHero({
  label,
  title,
  description,
  isH1 = true,
}: PageHeroProps) {
  const TitleTag = isH1 ? "h1" : "h2";

  return (
    <section className="relative bg-white">
      <BackgroundTriangles pattern="about" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20 text-center">
        <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[var(--color-logo-light-green)] mb-4">
          {label}
        </span>
        <TitleTag
          className="heading-gothic font-bold text-[var(--color-logo-dark-green)] mb-4"
          style={{ fontSize: "var(--font-size-fluid-3xl)" }}
        >
          {title}
        </TitleTag>
        {description && (
          <p className="text-sm md:text-base text-[var(--color-ink-soft)] max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-0.5 bg-[var(--color-logo-light-green)]" />
        </div>
      </div>
    </section>
  );
}
