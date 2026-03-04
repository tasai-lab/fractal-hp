/**
 * StationsOverview コンポーネントテスト
 * - アクティブなステーションが表示されること
 * - 各ステーションのリンクが存在すること
 */

import { render, screen } from "@testing-library/react";
import StationsOverview from "@/components/StationsOverview";

describe("StationsOverview", () => {
  beforeEach(() => {
    render(<StationsOverview />);
  });

  it("セクションタイトル「ステーション」が表示されること", () => {
    expect(screen.getByText("ステーション")).toBeInTheDocument();
  });

  it("船橋ステーション名が表示されること", () => {
    expect(screen.getByText("フラクタル訪問看護 船橋")).toBeInTheDocument();
  });

  it("船橋ステーションの電話番号が表示されること", () => {
    expect(screen.getByText(/047-770-1228/)).toBeInTheDocument();
  });

  it("船橋ステーションへの詳細リンクが存在すること", () => {
    const links = screen.getAllByRole("link");
    const stationLink = links.find((l) =>
      l.getAttribute("href")?.includes("/stations/funabashi")
    );
    expect(stationLink).toBeDefined();
  });
});
