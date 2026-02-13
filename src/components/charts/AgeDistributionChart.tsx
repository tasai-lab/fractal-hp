"use client";

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

type AgeDistributionData = {
  young: number;    // 0-14歳
  working: number;  // 15-64歳
  elderly: number;  // 65歳以上
};

type Props = {
  data: AgeDistributionData;
};

/**
 * 年齢構成グラフコンポーネント
 * 年少人口、生産年齢人口、高齢者人口の割合をドーナツグラフで表示します
 *
 * @param data - 年齢構成データ（パーセンテージ）
 *
 * @example
 * <AgeDistributionChart
 *   data={{
 *     young: 11.2,
 *     working: 59.5,
 *     elderly: 29.3,
 *   }}
 * />
 */
export default function AgeDistributionChart({ data }: Props) {
  const chartData = [
    { name: '年少人口（0-14歳）', value: data.young, color: 'var(--color-logo-yellow)' },
    { name: '生産年齢人口（15-64歳）', value: data.working, color: 'var(--color-logo-light-green)' },
    { name: '高齢者人口（65歳以上）', value: data.elderly, color: 'var(--color-logo-dark-green)' },
  ];

  // CSS変数から色を取得するヘルパー関数
  const getColor = (cssVar: string) => {
    if (typeof window === 'undefined') return cssVar;
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue(cssVar.replace('var(', '').replace(')', '')).trim() || cssVar;
  };

  const COLORS = chartData.map(item => getColor(item.color));

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-center heading-gothic text-[var(--color-logo-dark-green)]">
        年齢構成（2020年）
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={({ value }) => `${value.toFixed(1)}%`}
            labelLine={{ stroke: '#6b7280' }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
            formatter={(value: number | undefined) =>
              value !== undefined ? `${value.toFixed(1)}%` : ''
            }
          />
          <Legend
            wrapperStyle={{ fontSize: '0.875rem' }}
            verticalAlign="bottom"
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
