import { notFound } from "next/navigation";
import { recruitAreas } from "@/lib/recruit-areas";
import AreaClient from "./AreaClient";

export function generateStaticParams() {
  return recruitAreas.map((area) => ({
    slug: area.slug,
  }));
}

export default function RecruitAreaPage({ params }: { params: { slug: string } }) {
  const area = recruitAreas.find((item) => item.slug === params.slug);

  if (!area) {
    notFound();
  }

  return <AreaClient area={area} />;
}
