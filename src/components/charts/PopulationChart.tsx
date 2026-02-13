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
  primaryColor?: string;
  secondaryColor?: string;
};

export default function PopulationChart({
  data,
  areaName,
  primaryColor = "#0D5643",
  secondaryColor = "#fb923c"
}: Props) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
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
            tickFormatter={(value) => `${value / 1000}万`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
            formatter={(value: number | undefined) =>
              value !== undefined ? `${(value / 1000).toFixed(1)}万人` : ''
            }
            labelFormatter={(label) => `${label}年`}
          />
          <Legend
            wrapperStyle={{ fontSize: '0.75rem' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke={primaryColor}
            strokeWidth={2.5}
            name="総人口"
            dot={{ r: 4, fill: primaryColor }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="elderly"
            stroke={secondaryColor}
            strokeWidth={2.5}
            name="高齢者人口"
            dot={{ r: 4, fill: secondaryColor }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
