import { staffMembers } from "@/lib/data";
import BackgroundTriangles from "./BackgroundTriangles";
import Image from "next/image";

const bgColors = [
  "bg-accent-blue-light",
  "bg-accent-pink-light",
  "bg-accent-yellow",
  "bg-accent-mint-light",
];

export default function Staff() {
  return (
    <section id="staff" className="section-wrapper bg-white relative overflow-hidden">
      <BackgroundTriangles pattern="staff" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title">スタッフ紹介</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          {/* 丸みを帯びた四角形で囲む */}
          <div className="section-card section-card-blue">
            {/* サブタイトル */}
            <div className="mb-8 md:mb-12">
              <p className="text-xl md:text-2xl font-bold text-center text-primary">
                フラクタルの仲間たち
              </p>
            </div>

            {/* スタッフカードグリッド */}
            <div className="grid grid-cols-2 gap-3 md:gap-8">
              {staffMembers.map((staff, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl md:rounded-2xl shadow-sm p-3 md:p-8 hover-lift group"
                >
                  {/* プロフィール画像 */}
                  <div className="flex justify-center mb-2 md:mb-6">
                    <div className={`relative w-16 h-16 md:w-32 md:h-32 rounded-full overflow-hidden ${bgColors[index % bgColors.length]} ring-2 md:ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <Image
                        src={staff.image}
                        alt={staff.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* スタッフ情報 */}
                  <div className="text-center mb-2 md:mb-4">
                    <div className="text-[10px] md:text-sm text-muted mb-0.5 md:mb-2">{staff.role}</div>
                    <h3 className="text-sm md:text-2xl font-bold mb-0.5 md:mb-1">{staff.name}</h3>
                    <p className="text-[10px] md:text-sm text-muted mb-2 md:mb-4">{staff.nameReading}</p>
                  </div>

                  {/* 詳細情報 - モバイルでは非表示 */}
                  <div className="hidden md:block space-y-2 mb-4 text-sm">
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
                    <p className="text-[10px] md:text-sm leading-relaxed text-foreground line-clamp-3 md:line-clamp-none">
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
  );
}
