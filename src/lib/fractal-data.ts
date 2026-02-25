// フラクタルページ用データ

export interface NatureExample {
  title: string;
  description: string;
  imageSrc: string;
}

export const natureExamples: NatureExample[] = [
  {
    title: "雪の結晶",
    description:
      "どこまで近づいて見ても、美しい六角形のパターンが繰り返されています",
    imageSrc: "/images/fractal/snowflake.webp",
  },
  {
    title: "木の枝",
    description:
      "幹から太い枝へ、そして細い小枝へと、同じパターンで分かれていきます",
    imageSrc: "/images/fractal/tree-branch.webp",
  },
  {
    title: "シダの葉",
    description: "一枚の葉の形が、小さな葉脈の形と相似しています",
    imageSrc: "/images/fractal/fern-leaf.webp",
  },
  {
    title: "血管",
    description:
      "太い血管から細い毛細血管まで、同じ分岐パターンが続きます",
    imageSrc: "/images/fractal/blood-vessel.webp",
  },
];

export interface FractalObject {
  imageSrc: string;
  alt: string;
}

export const fractalObject: FractalObject = {
  imageSrc: "/images/fractal/fractal-object.webp",
  alt: "自然界のフラクタル構造 - 自己相似性を持つ幾何学的パターン",
};
