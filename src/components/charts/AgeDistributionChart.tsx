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
  young: number;
  working: number;
  elderly: number;
};

type Props = {
  data: AgeDistributionData;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
};

export default function AgeDistributionChart({
  data,
  primaryColor = "#0D5643",
  secondaryColor = "#7FC5A0",
  accentColor = "#F4E951"
}: Props) {
  const chartData = [
    { name: '年少人口（0-14歳）', value: data.young },
    { name: '生産年齢人口（15-64歳）', value: data.working },
    { name: '高齢者人口（65歳以上）', value: data.elderly },
  ];

  const COLORS = [accentColor, secondaryColor, primaryColor];

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
            label={({ value }) => `${value.toFixed(1)}%`}
            labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
          >
            {chartData.map((_, index) => (
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
            wrapperStyle={{ fontSize: '0.7rem' }}
            verticalAlign="bottom"
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
