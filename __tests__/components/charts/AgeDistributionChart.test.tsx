import React from 'react';
import { render } from '@testing-library/react';
import AgeDistributionChart from '@/components/charts/AgeDistributionChart';

describe('AgeDistributionChart', () => {
  const mockData = {
    young: 11.2,
    working: 59.5,
    elderly: 29.3,
  };

  it('年齢構成グラフが正しくレンダリングされること', () => {
    const { container } = render(<AgeDistributionChart data={mockData} />);

    expect(container).toBeInTheDocument();
  });

  it('ドーナツグラフが表示されること', () => {
    const { container } = render(<AgeDistributionChart data={mockData} />);

    // rechartsのPieコンポーネントが存在すること
    const pieChart = container.querySelector('.recharts-pie');
    expect(pieChart).toBeInTheDocument();
  });

  it('レジェンドが表示されること', () => {
    const { container } = render(<AgeDistributionChart data={mockData} />);

    const legend = container.querySelector('.recharts-legend-wrapper');
    expect(legend).toBeInTheDocument();
  });

  it('3つのセグメントが表示されること', () => {
    const { container } = render(<AgeDistributionChart data={mockData} />);

    // Pieのセクターが3つ存在すること
    const sectors = container.querySelectorAll('.recharts-pie-sector');
    expect(sectors.length).toBeGreaterThanOrEqual(3);
  });

  it('レスポンシブコンテナが使用されていること', () => {
    const { container } = render(<AgeDistributionChart data={mockData} />);

    const responsiveContainer = container.querySelector('.recharts-responsive-container');
    expect(responsiveContainer).toBeInTheDocument();
  });
});
