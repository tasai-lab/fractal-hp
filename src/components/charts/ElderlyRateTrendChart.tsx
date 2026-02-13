"use client";

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

type ElderlyRateTrendData = {
  year: number;
  elderlyRate: number;
};

type Props = {
  data: ElderlyRateTrendData[];
};

/**
 * 高齢化率推移グラフコンポーネント
 * 高齢化率の推移を面グラフで表示し、全国平均との比較を行います
 *
 * @param data - 年ごとの高齢化率データ配列
 *
 * @example
 * <ElderlyRateTrendChart
 *   data={[
 *     { year: 2020, elderlyRate: 29.3 },
 *     { year: 2025, elderlyRate: 30.9 },
 *     { year: 2030, elderlyRate: 32.3 },
 *   ]}
 * />
 */
export default function ElderlyRateTrendChart({ data }: Props) {
  if (!data || data.length === 0) return null;

  const NATIONAL_AVERAGE = 29.3; // 全国平均高齢化率（2020年）

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-center heading-gothic text-[var(--color-logo-dark-green)]">
        高齢化率の推移
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorElderlyRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-logo-dark-green)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="var(--color-logo-dark-green)" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            stroke="#6b7280"
            style={{ fontSize: '0.875rem' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '0.875rem' }}
            domain={[25, 35]}
            label={{ value: '高齢化率（%）', angle: -90, position: 'insideLeft' }}
          />
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
            labelFormatter={(label) => `${label}年`}
          />
          <ReferenceLine
            y={NATIONAL_AVERAGE}
            stroke="#ef4444"
            strokeDasharray="5 5"
            label={{
              value: `全国平均 ${NATIONAL_AVERAGE}%`,
              position: 'right',
              fill: '#ef4444',
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="elderlyRate"
            stroke="var(--color-logo-dark-green)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorElderlyRate)"
            name="高齢化率"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
