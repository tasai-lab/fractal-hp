import Link from "next/link";
const services = [
  {
    title: "精神科訪問看護",
    description: "精神疾患をお持ちの方の自宅療養を、専門的な知識を持つ看護師が支援します。",
    href: "/services/psychiatric-nursing/",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: "看取り・終末期ケア",
    description: "住み慣れた自宅での最期を、本人・ご家族とともに寄り添いながら支えます。",
    href: "/services/end-of-life-care/",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: "24時間対応体制",
    description: "夜間・休日も電話相談を受け付け、緊急時には訪問対応します。",
    href: "/services/24h-support/",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v6l4 2"
        />
      </svg>
    ),
  },
];

const relatedLinks = [
  { label: "ケアマネジャー様へ", href: "/services/for-care-managers/" },
  { label: "医療機関様へ", href: "/services/for-medical-institutions/" },
  { label: "ご利用料金", href: "/pricing/" },
];

export default function ServicesOverview() {
  return (
    <section
      id="services"
      className="section-wrapper bg-white relative"
    >
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title heading-gothic">サービス案内</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          <div className="section-card section-card-mint">
            {/* サービスカード群 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex flex-col rounded-2xl bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="mb-4 text-[var(--color-logo-dark-green)]"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold heading-gothic text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-logo-dark-green)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-[var(--color-ink-soft)] leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-bold text-[var(--color-logo-dark-green)]">
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
                  </span>
                </Link>
              ))}
            </div>

            {/* 関係機関リンク */}
            <div className="pt-6 border-t border-[var(--color-accent-mint)]">
              <p className="text-sm font-bold text-[var(--color-ink-soft)] mb-4">
                関係機関の方へ
              </p>
              <div className="flex flex-wrap gap-3">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center px-5 py-2 rounded-full bg-white text-[var(--color-logo-dark-green)] text-sm font-bold hover:bg-[var(--color-logo-dark-green)] hover:text-white transition-colors shadow-sm"
                  >
                    {link.label}
                    <svg
                      className="ml-1 w-3 h-3"
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
