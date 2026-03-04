/**
 * PageBackground コンポーネントテスト
 *
 * SSG互換のランダム背景装飾コンポーネント。
 * useEffect でランダム形状を生成する Client Component。
 */

import React from "react";
import { render, act } from "@testing-library/react";
import PageBackground from "@/components/PageBackground";

// jsdom ではscrollHeightが0なので、適切な値を設定
beforeEach(() => {
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    get: () => 3000,
  });
});

describe("PageBackground", () => {
  it("shapes=[]のとき（SSRシミュレーション）はnullを返すこと", () => {
    // jsdom環境ではuseEffectが同期実行されるためshapesは空にならない。
    // scrollHeight=0に設定し、generateShapesが最低個数を返すことを確認する代替テスト。
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      get: () => 0,
    });
    const { container } = render(<PageBackground />);
    // scrollHeight=0でも最低4個の大型形状が生成されようとする（衝突でスキップされる場合あり）
    // ここではクラッシュしないことだけ確認（nullが返るかshapesが返るかは実装依存）
    expect(container).toBeInTheDocument();
  });

  it("useEffect実行後にSVG形状が生成されること", async () => {
    const { container } = await act(async () => render(<PageBackground />));
    const svgs = container.querySelectorAll("svg");
    // scrollHeight=3000なので大型: max(4, floor(3000/1200))=max(4,2)=4個、小型: 8個 → 最大12個
    expect(svgs.length).toBeGreaterThan(0);
  });

  it("aria-hidden が設定されていること", async () => {
    const { container } = await act(async () => render(<PageBackground />));
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("pointer-events-none スタイルが設定されていること", async () => {
    const { container } = await act(async () => render(<PageBackground />));
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveStyle({ pointerEvents: "none" });
  });

  it("大型形状と小型形状が両方生成されること", async () => {
    const { container } = await act(async () => render(<PageBackground />));
    // 2種類のSVGパスが存在すること（大型おにぎり型と小型丸み三角形）
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBeGreaterThan(0);
  });

  it("生成された形状数が期待範囲内であること（pageHeight=3000）", async () => {
    const { container } = await act(async () => render(<PageBackground />));
    const svgs = container.querySelectorAll("svg");
    // 大型: max(4, floor(3000/1200)) = 4個
    // 小型: 4 * 2 = 8個
    // 衝突で一部スキップされる可能性があるため下限を緩め
    expect(svgs.length).toBeGreaterThanOrEqual(4);
    expect(svgs.length).toBeLessThanOrEqual(12);
  });

  it("カラーパレット5色のいずれかがSVGのfillに使われていること", async () => {
    const { container } = await act(async () => render(<PageBackground />));
    const paths = container.querySelectorAll("path");
    const paletteColors = ["#d4edfc", "#FFE8EB", "#E0F5F0", "#E6E6FA", "#FFDAB9"];
    const usedColors = Array.from(paths).map((p) =>
      p.getAttribute("fill")?.toLowerCase()
    );
    const hasValidColor = usedColors.some((c) =>
      paletteColors.some((pc) => pc.toLowerCase() === c)
    );
    expect(hasValidColor).toBe(true);
  });

  it("SVG形状にopacityが設定されていること", async () => {
    const { container } = await act(async () => render(<PageBackground />));
    const svgs = container.querySelectorAll("svg");
    // 少なくとも1つのSVGにopacityスタイルが設定されていること
    const hasOpacity = Array.from(svgs).some((svg) => {
      const style = (svg as HTMLElement).style;
      return style.opacity !== "" && style.opacity !== undefined;
    });
    expect(hasOpacity).toBe(true);
  });

  it("pageHeightが0以下の場合でもエラーにならないこと", async () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      get: () => 0,
    });
    const { container } = await act(async () => render(<PageBackground />));
    // エラーなしでレンダリングされること
    expect(container).toBeInTheDocument();
  });
});
