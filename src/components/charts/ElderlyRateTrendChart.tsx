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
  primaryColor?: string;
  gradientId?: string;
};

export default function ElderlyRateTrendChart({
  data,
  primaryColor = "#0D5643",
  gradientId = "colorElderlyRate"
}: Props) {
  if (!data || data.length === 0) return null;

  const NATIONAL_AVERAGE = 29.3;
  const uniqueGradientId = `${gradientId}-${primaryColor.replace('#', '')}`;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <defs>
            <linearGradient id={uniqueGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={primaryColor} stopOpacity={0.6}/>
              <stop offset="95%" stopColor={primaryColor} stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            stroke="#6b7280"
            style={{ fontSize: '0.75rem' }}
            tickFormatter={(value) => `${value}年`}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '0.75rem' }}
            domain={[20, 40]}
            tickFormatter={(value) => `${value}%`}
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
            stroke="#94a3b8"
            strokeDasharray="5 5"
            label={{
              value: `全国平均`,
              position: 'right',
              fill: '#94a3b8',
              fontSize: 10,
            }}
          />
          <Area
            type="monotone"
            dataKey="elderlyRate"
            stroke={primaryColor}
            strokeWidth={2.5}
            fillOpacity={1}
            fill={`url(#${uniqueGradientId})`}
            name="高齢化率"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
