/**
 * ServicesOverview コンポーネントテスト
 * - サービス3種のリンクが存在すること
 * - 関係機関リンクが存在すること
 * - セクションタイトルが存在すること
 */

import { render, screen } from "@testing-library/react";
import ServicesOverview from "@/components/ServicesOverview";

describe("ServicesOverview", () => {
  beforeEach(() => {
    render(<ServicesOverview />);
  });

  it("セクションタイトル「サービス」が表示されること", () => {
    expect(screen.getByText("サービス")).toBeInTheDocument();
  });

  it("精神科訪問看護へのリンクが存在すること", () => {
    const links = screen.getAllByRole("link");
    const psychiatricLink = links.find((l) =>
      l.getAttribute("href")?.includes("/services/psychiatric-nursing")
    );
    expect(psychiatricLink).toBeDefined();
  });

  it("看取り・終末期ケアへのリンクが存在すること", () => {
    const links = screen.getAllByRole("link");
    const endOfLifeLink = links.find((l) =>
      l.getAttribute("href")?.includes("/services/end-of-life-care")
    );
    expect(endOfLifeLink).toBeDefined();
  });

  it("24時間対応体制へのリンクが存在すること", () => {
    const links = screen.getAllByRole("link");
    const support24hLink = links.find((l) =>
      l.getAttribute("href")?.includes("/services/24h-support")
    );
    expect(support24hLink).toBeDefined();
  });

  it("ケアマネジャー向けリンクが存在すること", () => {
    const links = screen.getAllByRole("link");
    const careManagerLink = links.find((l) =>
      l.getAttribute("href")?.includes("/for-care-managers")
    );
    expect(careManagerLink).toBeDefined();
  });

  it("医療機関向けリンクが存在すること", () => {
    const links = screen.getAllByRole("link");
    const medicalLink = links.find((l) =>
      l.getAttribute("href")?.includes("/for-medical-institutions")
    );
    expect(medicalLink).toBeDefined();
  });

  it("ご利用料金へのリンクが存在すること", () => {
    const links = screen.getAllByRole("link");
    const pricingLink = links.find((l) =>
      l.getAttribute("href")?.includes("/pricing")
    );
    expect(pricingLink).toBeDefined();
  });
});
