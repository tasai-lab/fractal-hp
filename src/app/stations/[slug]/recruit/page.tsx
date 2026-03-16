import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { CountUp } from "@/components/CountUp";
import { JobDetails } from "@/components/recruit/JobDetails";
import StationStaff from "@/components/station/StationStaff";
import StationFAQ from "@/components/station/StationFAQ";
import Contact from "@/components/Contact";
import { getStation, getAllStationSlugs } from "@/lib/stations-data";
import { signOnBonus, jobPositions } from "@/lib/recruit-data";
import { recruitFAQs } from "@/lib/faq-data";

export function generateStaticParams() {
  return getAllStationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);

  if (!station) {
    return {
      title: "採用情報｜フラクタル訪問看護",
      description: "フラクタル訪問看護の採用情報ページです。",
    };
  }

  const cityName = station.officeInfo.address.city;

  return {
    title: `【${cityName}】訪問看護師・PT・OT・ST求人｜${station.name}`,
    description: `${station.name}では看護師・理学療法士・作業療法士・言語聴覚士を募集しています。入社祝い金最大30万円、年間休日139日以上。未経験・ブランク歓迎。直行直帰OK・AI活用で記録業務を効率化。`,
    alternates: {
      canonical: `https://fractal-hokan.com/stations/${station.slug}/recruit`,
    },
    openGraph: {
      title: `【${cityName}】訪問看護師・PT・OT・ST求人｜${station.name}`,
      description: `${station.name}では看護師・PT・OT・STを募集中。入社祝い金最大30万円、年間休日139日以上。未経験・ブランク歓迎。`,
      type: "website",
      url: `https://fractal-hokan.com/stations/${station.slug}/recruit`,
      siteName: "フラクタル訪問看護",
      locale: "ja_JP",
    },
  };
}

export default async function StationRecruitPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);

  if (!station) {
    notFound();
  }

  const nurseJob = jobPositions.find((job) => job.id === "nurse") ?? jobPositions[0];
  const therapistJob = jobPositions.find((job) => job.id === "therapist") ?? jobPositions[1];

  return (
    <>
      {/* ヒーロー */}
      <section className="relative z-[2] bg-white">
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[var(--color-logo-light-green)] mb-4">
            RECRUIT
          </span>
          <h1 className="heading-mincho text-3xl md:text-5xl text-[var(--color-ink)] mb-4">
            {station.name}
            <br />
            <span className="text-2xl md:text-4xl">採用情報</span>
          </h1>
          <p className="text-[var(--color-ink-soft)] text-base md:text-lg leading-relaxed max-w-2xl mb-8">
            {station.officeInfo.address.city}を中心に看護師・理学療法士・作業療法士・言語聴覚士を募集しています。
            入社祝い金最大30万円、年間休日139日以上（PT・OT・STは120日以上）。未経験・ブランクのある方も歓迎です。
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-[var(--color-logo-dark-green)] text-white font-bold text-sm md:text-base hover:opacity-90 transition-opacity shadow-md"
            >
              応募する
            </a>
            <a
              href="#positions"
              className="px-6 py-3 rounded-full border-2 border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] font-bold text-sm md:text-base hover:bg-[var(--color-logo-dark-green)]/10 transition-colors"
            >
              募集職種を見る
            </a>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="px-3 py-1 rounded-full bg-[var(--color-logo-dark-green)] text-white text-xs font-semibold">
              祝金 最大30万円
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] text-xs font-semibold">
              年休139日以上（PT・OT・STは120日以上）
            </span>
          </div>
        </div>
      </section>

      {/* 入社祝い金バナー */}
      <section className="section-wrapper bg-white relative">
        <div className="section-inner relative z-10">
          <div className="section-title-area">
            <h2 className="section-title heading-gothic">入社祝い金</h2>
            <div className="section-title-line" />
          </div>
          <div className="section-content">
            <div className="section-card section-card-mint">
              <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
                <div>
                  <p className="text-xs tracking-[0.3em] text-[var(--color-ink-soft)]">SIGN-ON BONUS</p>
                  <h3 className="heading-gothic text-2xl md:text-4xl text-[var(--color-logo-dark-green)] mt-3">
                    入社祝い金 最大<CountUp end={30} suffix="万円" />
                  </h3>
                  <p className="text-[var(--color-ink-soft)] mt-2">全ての職種に適用されます</p>
                  <div className="grid grid-cols-3 gap-3 mt-5">
                    {signOnBonus.milestones.map((milestone) => (
                      <div
                        key={milestone.label}
                        className="bg-white rounded-2xl p-3 text-center shadow-sm"
                      >
                        <p className="text-xs text-[var(--color-ink-soft)]">{milestone.label}</p>
                        <p className="heading-gothic text-lg text-[var(--color-logo-dark-green)]">
                          {(milestone.amount / 10000).toLocaleString()}万円
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[var(--color-ink-soft)] text-xs mt-4">
                    ※ 入社祝い金は、本HPからの応募に限り適用されます。
                    他の求人媒体から応募された場合は対象外となります。
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/recruit/photos/bonus.webp"
                    alt="現場の様子"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 募集職種 */}
      <section id="positions" className="section-wrapper bg-white relative">
        <div className="section-inner relative z-10">
          <div className="section-title-area">
            <h2 className="section-title heading-gothic">募集職種</h2>
            <div className="section-title-line" />
          </div>
          <div className="section-content space-y-8">
            <div>
              <h3 className="heading-gothic text-xl font-bold text-[var(--color-logo-dark-green)] mb-4">
                看護師
              </h3>
              <JobDetails job={nurseJob} />
            </div>
            <div>
              <h3 className="heading-gothic text-xl font-bold text-[var(--color-logo-dark-green)] mb-4">
                理学療法士・作業療法士・言語聴覚士
              </h3>
              <JobDetails job={therapistJob} />
            </div>
          </div>
        </div>
      </section>

      {/* スタッフ紹介 */}
      <StationStaff
        staffMembers={station.staffMembers}
        stationName={station.name}
      />

      {/* よくある質問 */}
      <StationFAQ faqs={recruitFAQs} />

      {/* 応募フォーム */}
      <section id="contact" className="section-wrapper bg-white relative">
        <div className="section-inner relative z-10">
          <div className="section-title-area">
            <h2 className="section-title heading-gothic">応募・お問い合わせ</h2>
            <div className="section-title-line" />
          </div>
          <div className="section-content">
            <Contact embedded hideTitle initialContactType="求人・採用について" />
          </div>
        </div>
      </section>
    </>
  );
}
