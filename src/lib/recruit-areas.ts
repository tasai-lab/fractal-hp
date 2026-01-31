export type RecruitArea = {
  slug: string;
  name: string;
  shortCopy: string;
  bullets: [string, string];
  cta: string;
  dayFlow: { title: string; detail: string }[];
  workStyle: { title: string; detail: string }[];
  staffVoice?: { name: string; role: string; comment: string };
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
    dayFlow: [
      { title: "午前：訪問スタート", detail: "駅近エリアの訪問が多く、移動がスムーズです。" },
      { title: "午後：ケアと記録", detail: "訪問合間に記録が進み、残業を抑えられます。" },
      { title: "夕方：直行直帰", detail: "最後の訪問後はそのまま帰宅できます。" },
    ],
    workStyle: [
      { title: "移動効率を最適化", detail: "密度の高いエリアで移動時間を短縮。" },
      { title: "連携のしやすさ", detail: "医療機関が多く、連絡もスムーズ。" },
      { title: "家庭との両立", detail: "直行直帰で生活リズムを守れます。" },
    ],
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
    dayFlow: [
      { title: "午前：住宅街中心", detail: "落ち着いた訪問が多く、丁寧なケアが可能です。" },
      { title: "午後：多職種連携", detail: "情報共有を行いながらケアの質を高めます。" },
      { title: "夕方：ゆとりの帰宅", detail: "移動が落ち着いており無理なく帰れます。" },
    ],
    workStyle: [
      { title: "丁寧な訪問", detail: "利用者さまと向き合う時間を確保。" },
      { title: "無理のない件数", detail: "ペースを整えて働けます。" },
      { title: "安心の同行体制", detail: "不安なケースはすぐ相談できます。" },
    ],
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
    dayFlow: [
      { title: "午前：駅周辺ルート", detail: "アクセスの良いルートで効率訪問。" },
      { title: "午後：ケア集中時間", detail: "訪問と記録のバランスを保てます。" },
      { title: "夕方：移動負担を軽減", detail: "生活圏の近さで移動が短めです。" },
    ],
    workStyle: [
      { title: "短距離移動", detail: "移動を減らしケアの質を高める。" },
      { title: "スピード連携", detail: "連携先への連絡が取りやすい。" },
      { title: "生活リズム重視", detail: "直行直帰で時間を確保。" },
    ],
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
    dayFlow: [
      { title: "午前：近距離訪問", detail: "住宅エリア中心で移動距離が短め。" },
      { title: "午後：安定した訪問", detail: "ニーズが安定し計画的に回れます。" },
      { title: "夕方：ゆとりの記録", detail: "移動が少なく記録時間を確保。" },
    ],
    workStyle: [
      { title: "安定した訪問数", detail: "過不足のないスケジュール設計。" },
      { title: "生活圏に密着", detail: "地域の暮らしに寄り添える。" },
      { title: "ケアの質重視", detail: "移動削減でケアに集中。" },
    ],
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
    dayFlow: [
      { title: "午前：穏やかな訪問", detail: "落ち着いた環境で丁寧に対応。" },
      { title: "午後：連携と記録", detail: "情報共有をしながら記録を整理。" },
      { title: "夕方：生活に合わせて帰宅", detail: "帰宅動線がスムーズです。" },
    ],
    workStyle: [
      { title: "穏やかな地域性", detail: "落ち着いた訪問で安心感を提供。" },
      { title: "丁寧なケア", detail: "一人ひとりに向き合える。" },
      { title: "直行直帰対応", detail: "生活リズムを乱さない働き方。" },
    ],
  },
];
