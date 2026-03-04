import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import Contact from "@/components/Contact";
import PerformanceSection from "@/components/PerformanceSection";
import { getStation, getAllStationSlugs } from "@/lib/stations-data";

export function generateStaticParams() {
  return getAllStationSlugs().map((slug) => ({ slug }));
}

export default async function StationPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);

  if (!station) {
    notFound();
  }

  const { officeInfo, staffMembers } = station;

  return (
    <div className="overflow-x-hidden">
      <PageHero
        label="STATION"
        title={station.name}
        description={`${officeInfo.address.city}を中心に24時間365日の訪問看護サービスを提供しています`}
      />

      {/* ===== 事業所情報セクション ===== */}
      <section id="office" className="relative overflow-hidden">
        <BackgroundTriangles pattern="office" />
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14 relative z-10 space-y-8">
            {/* 事業所情報カード */}
            <div className="section-card section-card-blue">
              <h3 className="text-xl md:text-2xl font-bold text-left text-primary mb-6 md:mb-8">
                {officeInfo.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* 左側：テキスト情報 */}
                <div className="space-y-8">
                  <div className="space-y-6 text-foreground">
                    {/* 事業所番号 */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-6 bg-primary rounded-full" />
                        <span className="font-bold text-lg">事業所番号</span>
                      </div>
                      <p className="pl-3 text-2xl md:text-3xl font-bold text-primary tracking-wider">
                        {officeInfo.businessNumber}
                      </p>
                    </div>

                    {/* 営業時間 */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-6 bg-primary rounded-full" />
                        <span className="font-bold text-lg">営業時間</span>
                      </div>
                      <p className="pl-3 text-lg">{officeInfo.hours}</p>
                    </div>

                    {/* 所在地 */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-6 bg-primary rounded-full" />
                        <span className="font-bold text-lg">所在地</span>
                      </div>
                      <p className="pl-3 leading-relaxed">
                        〒{officeInfo.address.postalCode}
                        <br />
                        {officeInfo.address.prefecture}
                        {officeInfo.address.city}
                        {officeInfo.address.street} {officeInfo.address.building}
                      </p>
                    </div>

                    {/* お問い合わせ先 */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-6 bg-primary rounded-full" />
                        <span className="font-bold text-lg">お問い合わせ先</span>
                      </div>
                      <div className="pl-3 mt-2 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-muted bg-white px-2 py-1 rounded text-sm min-w-[3.5rem] text-center">
                            TEL
                          </span>
                          <a
                            href={`tel:${officeInfo.phone.replace(/-/g, "")}`}
                            className="hover:underline font-bold text-xl md:text-2xl text-primary"
                          >
                            {officeInfo.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-muted bg-white px-2 py-1 rounded text-sm min-w-[3.5rem] text-center">
                            FAX
                          </span>
                          <span className="text-lg">{officeInfo.fax}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-muted bg-white px-2 py-1 rounded text-sm min-w-[3.5rem] text-center mt-1">
                            Email
                          </span>
                          <a
                            href={`mailto:${officeInfo.email}`}
                            className="hover:underline break-all text-base md:text-lg mt-0.5"
                          >
                            {officeInfo.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 右側：Google Maps */}
                {officeInfo.googleMapsUrl && (
                  <div className="h-[250px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                      src={officeInfo.googleMapsUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${officeInfo.name}の所在地`}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 訪問エリアリンク */}
            <div className="text-center">
              <Link
                href={`/stations/${station.slug}/areas`}
                className="inline-flex items-center gap-2 bg-[var(--color-logo-light-green)]/20 text-[var(--color-logo-dark-green)] px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all hover:bg-[var(--color-logo-light-green)]/40"
              >
                訪問エリアを確認する
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
        </div>
      </section>

      {/* ===== 実績セクション ===== */}
      <PerformanceSection />

      {/* ===== スタッフ紹介セクション ===== */}
      <section id="staff" className="section-wrapper bg-white relative overflow-hidden">
        <BackgroundTriangles pattern="staff" />
        <div className="section-inner relative z-10">
          <div className="section-title-area">
            <h2 className="section-title">スタッフ紹介</h2>
            <div className="section-title-line" />
          </div>

          <div className="section-content">
            <div className="section-card section-card-blue">
              <div className="mb-8 md:mb-12">
                <p className="text-xl md:text-2xl font-bold text-center text-primary">
                  {station.name}のスタッフ
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-8">
                {staffMembers.map((staff, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-sm p-3 md:p-8 hover-lift"
                  >
                    {/* プロフィール画像 */}
                    <div className="flex justify-center mb-2 md:mb-6">
                      <div className="relative w-16 h-16 md:w-32 md:h-32 rounded-full overflow-hidden bg-[var(--color-accent-blue-light)] ring-2 md:ring-4 ring-white shadow-md">
                        <Image
                          src={staff.image}
                          alt={staff.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 64px, 128px"
                        />
                      </div>
                    </div>

                    {/* スタッフ情報 */}
                    <div className="text-center mb-2 md:mb-4">
                      <div className="text-xs md:text-base text-muted mb-0.5 md:mb-2">{staff.role}</div>
                      <h3 className="text-lg md:text-2xl font-bold mb-0.5 md:mb-1">{staff.name}</h3>
                      <p className="text-xs md:text-base text-muted mb-2 md:mb-4">{staff.nameReading}</p>
                    </div>

                    {/* 詳細情報 */}
                    <div className="hidden md:block space-y-2 mb-4 text-base">
                      <div className="flex justify-center gap-2">
                        <span className="font-medium text-muted">出身地:</span>
                        <span>{staff.birthplace}</span>
                      </div>
                      <div className="flex justify-center gap-2">
                        <span className="font-medium text-muted">趣味:</span>
                        <span>{staff.hobbies}</span>
                      </div>
                    </div>

                    {/* 自己紹介 */}
                    <div className="pt-2 md:pt-4 border-t border-border">
                      <p className="text-xs md:text-base leading-relaxed text-foreground line-clamp-3 md:line-clamp-none">
                        {staff.introduction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== お問い合わせセクション ===== */}
      <section id="contact" className="section-wrapper bg-white relative overflow-hidden">
        <BackgroundTriangles pattern="contact" />
        <div className="section-inner relative z-10">
          <div className="section-title-area">
            <h2 className="section-title">お問い合わせ</h2>
            <div className="section-title-line" />
          </div>
          <div className="section-content">
            <Contact embedded hideTitle />
          </div>
        </div>
      </section>
    </div>
  );
}
