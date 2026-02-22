import React from 'react';
import { render } from '@testing-library/react';
import ElderlyRateTrendChart from '@/components/charts/ElderlyRateTrendChart';

describe('ElderlyRateTrendChart', () => {
  const mockData = [
    { year: 2020, elderlyRate: 29.3 },
    { year: 2025, elderlyRate: 30.9 },
    { year: 2030, elderlyRate: 32.3 },
    { year: 2035, elderlyRate: 33.3 },
    { year: 2040, elderlyRate: 33.5 },
  ];

  it('高齢化率推移グラフが正しくレンダリングされること', () => {
    const { container } = render(<ElderlyRateTrendChart data={mockData} />);

    expect(container).toBeInTheDocument();
  });

  it('面グラフが表示されること', () => {
    const { container } = render(<ElderlyRateTrendChart data={mockData} />);

    // rechartsのAreaコンポーネントが存在すること
    const areaChart = container.querySelector('.recharts-area');
    expect(areaChart).toBeInTheDocument();
  });

  it('参照線が表示されること', () => {
    const { container } = render(<ElderlyRateTrendChart data={mockData} />);

    // rechartsのReferenceLineコンポーネントが存在すること
    const referenceLine = container.querySelector('.recharts-reference-line');
    expect(referenceLine).toBeInTheDocument();
  });

  it('データが空の場合でもエラーにならないこと', () => {
    const { container } = render(<ElderlyRateTrendChart data={[]} />);

    expect(container).toBeInTheDocument();
  });

  it('レスポンシブコンテナが使用されていること', () => {
    const { container } = render(<ElderlyRateTrendChart data={mockData} />);

    const responsiveContainer = container.querySelector('.recharts-responsive-container');
    expect(responsiveContainer).toBeInTheDocument();
  });
});
