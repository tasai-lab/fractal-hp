import Link from "next/link";
import { getActiveStations } from "@/lib/stations-data";
import BackgroundTriangles from "./BackgroundTriangles";

export default function StationsOverview() {
  const stations = getActiveStations();

  return (
    <section
      id="stations"
      className="section-wrapper bg-white relative overflow-hidden"
    >
      <BackgroundTriangles pattern="office" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title heading-gothic">事業所</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {stations.map((station) => (
              <div
                key={station.slug}
                className="section-card section-card-blue flex flex-col"
              >
                <h3 className="text-xl font-bold heading-gothic text-[var(--color-logo-dark-green)] mb-4">
                  {station.name}
                </h3>

                <dl className="space-y-3 flex-1">
                  {/* 住所 */}
                  <div className="flex gap-3">
                    <dt className="shrink-0">
                      <div className="w-1 h-5 bg-[var(--color-logo-dark-green)] rounded-full mt-0.5" />
                    </dt>
                    <dd className="text-sm text-[var(--color-ink)] leading-relaxed">
                      {station.officeInfo.address.full}
                    </dd>
                  </div>

                  {/* 電話番号 */}
                  <div className="flex gap-3 items-center">
                    <dt className="shrink-0">
                      <div className="w-1 h-5 bg-[var(--color-logo-dark-green)] rounded-full" />
                    </dt>
                    <dd>
                      <a
                        href={`tel:${station.officeInfo.phone}`}
                        className="text-sm font-bold text-[var(--color-logo-dark-green)] hover:underline"
                      >
                        {station.officeInfo.phone}
                      </a>
                    </dd>
                  </div>

                  {/* 営業時間 */}
                  <div className="flex gap-3">
                    <dt className="shrink-0">
                      <div className="w-1 h-5 bg-[var(--color-logo-dark-green)] rounded-full mt-0.5" />
                    </dt>
                    <dd className="text-sm text-[var(--color-ink-soft)]">
                      {station.officeInfo.hours}
                    </dd>
                  </div>
                </dl>

                <Link
                  href={`/stations/${station.slug}/`}
                  className="mt-6 inline-flex items-center justify-center px-6 py-2 rounded-full bg-[var(--color-logo-dark-green)] text-white text-sm font-bold hover:opacity-90 transition-opacity self-start"
                >
                  詳しく見る
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* 事業所一覧ボタン */}
          <div className="flex justify-center">
            <Link
              href="/stations/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-bold text-base hover:opacity-90 transition-opacity shadow-md"
            >
              事業所一覧を見る
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
