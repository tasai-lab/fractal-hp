import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getStation, getAllStationSlugs } from "@/lib/stations-data";
import { BreadcrumbStructuredData, JobPostingStructuredData } from "@/components/StructuredData";

export function generateStaticParams() {
  return getAllStationSlugs().map((slug) => ({ slug }));
}

export default async function StationRecruitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);

  if (!station) {
    notFound();
  }

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          {
            name: station.name,
            url: `https://fractal-hokan.com/stations/${station.slug}`,
          },
          {
            name: "採用情報",
            url: `https://fractal-hokan.com/stations/${station.slug}/recruit`,
          },
        ]}
      />
      <JobPostingStructuredData jobId="nurse" />
      <JobPostingStructuredData jobId="therapist" />
      <Header variant="paper" />
      {children}
      <Footer />
    </>
  );
}
