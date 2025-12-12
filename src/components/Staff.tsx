import { staffMembers } from "@/lib/data";

export default function Staff() {
  return (
    <section id="staff" className="section-wrapper bg-white">
      <div className="section-inner">
        <div className="section-title-area">
          <h2 className="section-title">スタッフ紹介</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          {/* サブタイトル */}
          <div className="mb-12">
            <p className="text-2xl font-bold text-center text-primary">
              フラクタルのメンバーです！
            </p>
          </div>

          {/* スタッフカードグリッド */}
          <div className="grid md:grid-cols-2 gap-8">
            {staffMembers.map((staff, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                {/* プロフィール画像（プレースホルダー） */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-accent-blue-light to-accent-mint-light flex items-center justify-center">
                    {/* フラクタルロゴ */}
                    <svg width="60" height="60" viewBox="0 0 100 100">
                      <polygon
                        points="50,10 90,80 10,80"
                        fill="var(--color-primary)"
                        opacity="0.3"
                      />
                      <polygon
                        points="50,10 70,45 30,45"
                        fill="var(--color-accent-blue)"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                </div>

                {/* スタッフ情報 */}
                <div className="text-center mb-4">
                  <div className="text-sm text-muted mb-2">{staff.role}</div>
                  <h3 className="text-2xl font-bold mb-1">{staff.name}</h3>
                  <p className="text-sm text-muted mb-4">{staff.nameReading}</p>
                </div>

                {/* 詳細情報 */}
                <div className="space-y-2 mb-4 text-sm">
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
                <div className="pt-4 border-t border-border">
                  <p className="text-sm leading-relaxed text-foreground">
                    {staff.introduction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
