export type RecruitArea = {
  slug: string;
  name: string;
  shortCopy: string;
  bullets: [string, string];
  cta: string;
  dayFlow: { time: string; title: string; detail: string }[];
  workStyle: { title: string; detail: string }[];
  staffVoice?: { name: string; role: string; comment: string };
};

const defaultDayFlow = [
  {
    time: "9:00",
    title: "ジョニーが情報共有",
    detail:
      "AIキャラのジョニーが利用者さまの情報や最近の出来事を整理して教えてくれます。",
  },
  {
    time: "9:30",
    title: "午前の訪問（2〜3件）",
    detail:
      "訪問ごとの申し送りを確認しながらケアを実施。移動中の音声入力はAIが文章化します。",
  },
  {
    time: "12:00",
    title: "休憩",
    detail: "事業所または移動先でしっかり休憩します。",
  },
  {
    time: "13:00",
    title: "午後の訪問（合計6〜7件）",
    detail:
      "午前と同様に申し送りを確認しながら訪問。記録は移動中の音声入力で完結します。",
  },
  {
    time: "18:00",
    title: "連携・確認",
    detail:
      "必要な連携を行い、各訪問の申し送りを確認します。帰社してまとめて記録は作成しません。",
  },
  {
    time: "19:00",
    title: "退勤",
    detail: "1日の業務を終え、退勤します。",
  },
];

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
    dayFlow: defaultDayFlow,
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
    dayFlow: defaultDayFlow,
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
    dayFlow: defaultDayFlow,
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
    dayFlow: defaultDayFlow,
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
    dayFlow: defaultDayFlow,
    workStyle: [
      { title: "穏やかな地域性", detail: "落ち着いた訪問で安心感を提供。" },
      { title: "丁寧なケア", detail: "一人ひとりに向き合える。" },
      { title: "直行直帰対応", detail: "生活リズムを乱さない働き方。" },
    ],
  },
];
