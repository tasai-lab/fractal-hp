"use client";

import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * カウントアップアニメーションコンポーネント
 * 画面内に入ったときに数値をアニメーションで表示します
 *
 * @param end - 最終的な数値
 * @param duration - アニメーションの長さ（ミリ秒）
 * @param suffix - 数値の後に付ける文字列（例: "万円", "%"）
 *
 * @example
 * <CountUp end={300000} duration={2000} />
 * // 0から300,000まで2秒かけてカウントアップ
 *
 * @example
 * <p>入社祝い金 最大<CountUp end={30} suffix="万円" />
 */
export function CountUp({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const increment = end / (duration / 16); // 60fps想定
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
