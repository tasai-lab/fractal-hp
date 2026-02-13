import React from 'react';
import { render, screen } from '@testing-library/react';
import PopulationChart from '@/components/charts/PopulationChart';

describe('PopulationChart', () => {
  const mockData = [
    { year: 2020, total: 644, elderly: 189, elderlyRate: 29.3 },
    { year: 2025, total: 640, elderly: 198, elderlyRate: 30.9 },
    { year: 2030, total: 631, elderly: 204, elderlyRate: 32.3 },
    { year: 2035, total: 619, elderly: 206, elderlyRate: 33.3 },
    { year: 2040, total: 605, elderly: 203, elderlyRate: 33.5 },
  ];

  it('人口推移グラフが正しくレンダリングされること', () => {
    render(<PopulationChart data={mockData} areaName="船橋市" />);

    // タイトルが表示されること
    expect(screen.getByText(/船橋市の人口推移/i)).toBeInTheDocument();
  });

  it('総人口と高齢者人口の2本の線が表示されること', () => {
    const { container } = render(<PopulationChart data={mockData} areaName="船橋市" />);

    // rechartsのLineコンポーネントが2つ存在すること
    const lines = container.querySelectorAll('.recharts-line');
    expect(lines.length).toBe(2);
  });

  it('データが空の場合でもエラーにならないこと', () => {
    const { container } = render(<PopulationChart data={[]} areaName="テスト市" />);

    expect(container).toBeInTheDocument();
  });

  it('レスポンシブコンテナが使用されていること', () => {
    const { container } = render(<PopulationChart data={mockData} areaName="船橋市" />);

    const responsiveContainer = container.querySelector('.recharts-responsive-container');
    expect(responsiveContainer).toBeInTheDocument();
  });
});
