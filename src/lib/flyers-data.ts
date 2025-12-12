// チラシの種類
export const flyerTypes = [
  { id: "newspaper", label: "地域新聞" },
  { id: "area", label: "エリアチラシ" },
];

// チラシデータ
export interface Flyer {
  id: string;
  type: "newspaper" | "area";
  title: string;
  date: string; // YYYY年MM月
  frontImage: string;
  backImage: string;
  orientation?: "portrait" | "landscape"; // 縦向き or 横向き（デフォルト: portrait）
}

// チラシ一覧（新しい順）
// 画像は /public/images/flyers/ に配置
// ファイル名規則: {年月}_{種類}_front.png / {年月}_{種類}_back.png
// 例: 202412_newspaper_front.png, 202412_newspaper_back.png
export const flyers: Flyer[] = [
  // 2025年（新しい順）
  {
    id: "202512-newspaper",
    type: "newspaper",
    title: "地域新聞 2025年12月号",
    date: "2025年12月",
    frontImage: "/images/flyers/202512_newspaper_front.png",
    backImage: "/images/flyers/202512_newspaper_back.png",
    orientation: "landscape",
  },
  {
    id: "202511-newspaper",
    type: "newspaper",
    title: "地域新聞 2025年11月号",
    date: "2025年11月",
    frontImage: "/images/flyers/202511_newspaper_front.png",
    backImage: "/images/flyers/202511_newspaper_back.png",
  },
  {
    id: "202510-newspaper",
    type: "newspaper",
    title: "地域新聞 2025年10月号",
    date: "2025年10月",
    frontImage: "/images/flyers/202510_newspaper_front.png",
    backImage: "/images/flyers/202510_newspaper_back.png",
  },
];
