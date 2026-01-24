import { useEffect, useRef, useState } from 'react';

/**
 * スクロールアニメーション用のカスタムフック
 * 要素が画面内に入ったときにアニメーションをトリガーします
 *
 * @param threshold - 要素の何%が見えたらトリガーするか (0.0 ~ 1.0)
 * @returns ref - アニメーション対象の要素に設定するref
 * @returns isVisible - 要素が画面内に入っているかどうか
 *
 * @example
 * const { ref, isVisible } = useScrollAnimation(0.1);
 *
 * <div
 *   ref={ref}
 *   className={`transition-all duration-500 ${
 *     isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
 *   }`}
 * >
 *   コンテンツ
 * </div>
 */
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
