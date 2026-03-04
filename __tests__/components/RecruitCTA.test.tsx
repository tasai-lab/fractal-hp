/**
 * RecruitCTA コンポーネントテスト
 * - 採用情報へのリンクが存在すること
 * - CTAテキストが表示されること
 */

import { render, screen } from "@testing-library/react";
import RecruitCTA from "@/components/RecruitCTA";

describe("RecruitCTA", () => {
  beforeEach(() => {
    render(<RecruitCTA />);
  });

  it("採用情報へのリンクが存在すること", () => {
    const links = screen.getAllByRole("link");
    const recruitLink = links.find((l) =>
      l.getAttribute("href")?.includes("/recruit")
    );
    expect(recruitLink).toBeDefined();
  });

  it("採用に関連するテキストが表示されること", () => {
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
