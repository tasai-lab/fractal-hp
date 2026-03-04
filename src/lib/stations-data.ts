export type StationOfficeInfo = {
  name: string;
  businessNumber: string;
  address: {
    postalCode: string;
    prefecture: string;
    city: string;
    street: string;
    building: string;
    full: string;
  };
  phone: string;
  fax: string;
  email: string;
  hours: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl?: string;
  geo?: { lat: number; lng: number };
};

export type StaffMember = {
  name: string;
  nameReading: string;
  role: string;
  birthplace: string;
  hobbies: string;
  introduction: string;
  image: string;
};

export type StationData = {
  slug: string;
  name: string;
  shortName: string;
  isActive: boolean;
  openDate: string;
  officeInfo: StationOfficeInfo;
  staffMembers: StaffMember[];
  serviceAreaSlugs: string[];
};

export const stationsData: StationData[] = [
  {
    slug: "funabashi",
    name: "フラクタル訪問看護 船橋",
    shortName: "船橋",
    isActive: true,
    openDate: "2025-06-01",
    officeInfo: {
      name: "フラクタル訪問看護 船橋",
      businessNumber: "1262891190",
      address: {
        postalCode: "274-0072",
        prefecture: "千葉県",
        city: "船橋市",
        street: "三山6丁目22-2",
        building: "パレドール小川201",
        full: "〒274-0072 千葉県船橋市三山6丁目22-2 パレドール小川201",
      },
      phone: "047-770-1228",
      fax: "047-413-0502",
      email: "hokan-f@fractal-group.co.jp",
      hours: "9:00 〜 19:00（土日祝・年末年始も毎日営業）",
      googleMapsUrl:
        "https://www.google.com/maps?q=%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%83%95%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%AB+%E3%83%95%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%AB%E8%A8%AA%E5%95%8F%E7%9C%8B%E8%AD%B7+%E8%88%B9%E6%A9%8B&output=embed",
    },
    staffMembers: [
      {
        name: "古谷 一真",
        nameReading: "ふるや かずま",
        role: "所長",
        birthplace: "我孫子市",
        hobbies: "筋トレ・散歩、読書",
        introduction:
          "千葉市の訪問看護ステーションで管理者・訪問業務は6年目となります。美味しいもの探しも趣味で、最近はタコス作りにハマっています！ハローワールド！ハロータコチューズデイ！",
        image: "/images/staff/furuya.webp",
      },
      {
        name: "髙山 里美",
        nameReading: "たかやま さとみ",
        role: "看護師",
        birthplace: "南房総市",
        hobbies: "LIVE遠征",
        introduction:
          "前職は手術室に勤務していたこともあり刺激的なことが大好き！好きな手術はTKA(人工膝関節置換術)です。",
        image: "/images/staff/takayama.webp",
      },
      {
        name: "浅井 拓哉",
        nameReading: "あさい たくや",
        role: "看護師",
        birthplace: "館山市",
        hobbies: "美味しいご飯を作る、食べる。",
        introduction:
          "新しいものが好きで、常に何かを考えています。雨と不便が嫌いで、何事も工夫してブラッシュアップしていく人生なんだと思います。永遠と終わりなき道を彷徨ってますね、ええ。",
        image: "/images/staff/asai.webp",
      },
      {
        name: "祝迫 萌々",
        nameReading: "いわいざこ もも",
        role: "総務",
        birthplace: "市原市",
        hobbies: "映画・アニメ鑑賞、猫を眺める",
        introduction:
          "フラクタルのなんでも屋です。直近まで人事労務のアドバイザーとして勤務しておりました。労務関係のご相談があればお気軽に聞いてください。",
        image: "/images/staff/iwaizako.webp",
      },
    ],
    serviceAreaSlugs: [
      "funabashi",
      "yachiyo",
      "narashino",
      "chiba-hanamigawa",
      "chiba-inage",
      "chiba-mihama",
    ],
  },
];

export function getStation(slug: string): StationData | undefined {
  return stationsData.find((s) => s.slug === slug);
}

export function getActiveStations(): StationData[] {
  return stationsData.filter((s) => s.isActive);
}

export function getAllStationSlugs(): string[] {
  return stationsData.filter((s) => s.isActive).map((s) => s.slug);
}
