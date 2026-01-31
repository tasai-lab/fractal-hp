export type RecruitArea = {
  slug: string;
  name: string;
  shortCopy: string;
  bullets: [string, string];
  cta: string;
};

export const recruitAreas: RecruitArea[] = [
  {
    slug: "funabashi",
    name: "船橋市",
    shortCopy:
      "主要駅からのアクセスが良く、訪問ルートの組み立てがしやすいエリアです。",
    bullets: [
      "駅周辺と住宅街の両方をバランス良く訪問",
      "直行直帰でも移動負担が少ない環境",
    ],
    cta: "船橋市で働く採用情報を見る",
  },
  {
    slug: "yachiyo",
    name: "八千代市",
    shortCopy:
      "落ち着いた住宅地が広がり、利用者さまと丁寧に向き合えるエリアです。",
    bullets: [
      "穏やかな生活リズムの中でケアに集中",
      "訪問件数と時間配分のバランスが取りやすい",
    ],
    cta: "八千代市で働く採用情報を見る",
  },
  {
    slug: "narashino",
    name: "習志野市",
    shortCopy:
      "市街地と住宅地が近く、短い移動で効率よく訪問できます。",
    bullets: [
      "津田沼・新習志野周辺の訪問ルートが組みやすい",
      "生活圏が近く、直行直帰がしやすい",
    ],
    cta: "習志野市で働く採用情報を見る",
  },
  {
    slug: "chiba-hanamigawa",
    name: "千葉市花見川区",
    shortCopy:
      "住宅エリアが広く、訪問看護ニーズが安定している地域です。",
    bullets: [
      "幕張本郷周辺までの移動がスムーズ",
      "訪問先の距離が短く、ケアの質に集中",
    ],
    cta: "花見川区で働く採用情報を見る",
  },
  {
    slug: "chiba-inage",
    name: "千葉市稲毛区",
    shortCopy:
      "文教エリアに近く、落ち着いた住環境での訪問が中心です。",
    bullets: [
      "稲毛・稲毛海岸周辺の訪問がしやすい",
      "穏やかなエリアで丁寧なケアを提供",
    ],
    cta: "稲毛区で働く採用情報を見る",
  },
];
