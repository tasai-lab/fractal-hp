import {
  stationsData,
  getStation,
  getActiveStations,
  getAllStationSlugs,
} from "@/lib/stations-data";

describe("stationsData", () => {
  it("船橋ステーションのopenDateが正しいこと", () => {
    expect(stationsData[0].openDate).toBe("2025-06-01");
  });

  it("船橋ステーションのphone番号が正しいこと", () => {
    expect(stationsData[0].officeInfo.phone).toBe("047-770-1228");
  });
});

describe("getStation", () => {
  it("funabashiスラッグで正しいデータを返すこと", () => {
    const station = getStation("funabashi");
    expect(station).toBeDefined();
    expect(station?.slug).toBe("funabashi");
    expect(station?.name).toBe("フラクタル訪問看護 船橋");
    expect(station?.shortName).toBe("船橋");
  });

  it("存在しないスラッグでundefinedを返すこと", () => {
    const station = getStation("nonexistent");
    expect(station).toBeUndefined();
  });
});

describe("getActiveStations", () => {
  it("アクティブなステーションのみ返すこと", () => {
    const active = getActiveStations();
    expect(active.length).toBeGreaterThan(0);
    active.forEach((s) => {
      expect(s.isActive).toBe(true);
    });
  });

  it("船橋ステーションが含まれること", () => {
    const active = getActiveStations();
    const funabashi = active.find((s) => s.slug === "funabashi");
    expect(funabashi).toBeDefined();
  });
});

describe("getAllStationSlugs", () => {
  it('["funabashi"]を返すこと', () => {
    const slugs = getAllStationSlugs();
    expect(slugs).toEqual(["funabashi"]);
  });
});
