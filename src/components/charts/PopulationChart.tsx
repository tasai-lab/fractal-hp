"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type PopulationData = {
  year: number;
  total: number;
  elderly: number;
  elderlyRate: number;
};

type Props = {
  data: PopulationData[];
  areaName: string;
};

/**
 * 人口推移グラフコンポーネント
 * 総人口と高齢者人口の推移を折れ線グラフで表示します
 *
 * @param data - 年ごとの人口データ配列
 * @param areaName - 地域名（例: "船橋市"）
 *
 * @example
 * <PopulationChart
 *   data={[
 *     { year: 2020, total: 644, elderly: 189, elderlyRate: 29.3 },
 *     { year: 2025, total: 640, elderly: 198, elderlyRate: 30.9 },
 *   ]}
 *   areaName="船橋市"
 * />
 */
export default function PopulationChart({ data, areaName }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-center heading-gothic text-[var(--color-logo-dark-green)]">
        {areaName}の人口推移
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            stroke="#6b7280"
            style={{ fontSize: '0.875rem' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '0.875rem' }}
            label={{ value: '人口（千人）', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
            formatter={(value: number | undefined) =>
              value !== undefined ? `${value.toLocaleString()}千人` : ''
            }
            labelFormatter={(label) => `${label}年`}
          />
          <Legend
            wrapperStyle={{ fontSize: '0.875rem' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="var(--color-logo-dark-green)"
            strokeWidth={2}
            name="総人口"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="elderly"
            stroke="#fb923c"
            strokeWidth={2}
            name="高齢者人口（65歳以上）"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
