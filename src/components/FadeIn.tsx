"use client";

import React, { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeIn({ children, className = "", delay }: FadeInProps) {
  const { ref, isVisible } = useScrollAnimation(0.15);

  const style: React.CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={[
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
