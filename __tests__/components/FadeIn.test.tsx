/**
 * FadeIn コンポーネントテスト
 *
 * スクロールアニメーション共通ラッパーコンポーネント。
 * useScrollAnimation フックを使用し、delay prop に対応する。
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import FadeIn from "@/components/FadeIn";

describe("FadeIn", () => {
  it("コンポーネントがレンダリングされること", () => {
    const { container } = render(
      <FadeIn>
        <p>テストコンテンツ</p>
      </FadeIn>
    );
    expect(container.firstChild).not.toBeNull();
  });

  it("childrenが表示されること", () => {
    render(
      <FadeIn>
        <p>テストコンテンツ</p>
      </FadeIn>
    );
    expect(screen.getByText("テストコンテンツ")).toBeInTheDocument();
  });

  it("className propがラッパー要素に適用されること", () => {
    const { container } = render(
      <FadeIn className="custom-class">
        <p>コンテンツ</p>
      </FadeIn>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("delay propがtransition-delayスタイルとして適用されること", () => {
    const { container } = render(
      <FadeIn delay={200}>
        <p>コンテンツ</p>
      </FadeIn>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveStyle({ transitionDelay: "200ms" });
  });

  it("delay propが未指定のときtransition-delayが0msであること", () => {
    const { container } = render(
      <FadeIn>
        <p>コンテンツ</p>
      </FadeIn>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    // delay未指定時はstyle属性にtransitionDelayが設定されないか0msであること
    const style = wrapper.style.transitionDelay;
    expect(style === "" || style === "0ms").toBe(true);
  });

  it("アニメーションクラスが付与されていること", () => {
    const { container } = render(
      <FadeIn>
        <p>コンテンツ</p>
      </FadeIn>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("transition-all");
    expect(wrapper).toHaveClass("duration-700");
    expect(wrapper).toHaveClass("ease-out");
  });
});
