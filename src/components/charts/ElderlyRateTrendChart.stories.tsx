import type { Meta, StoryObj } from "@storybook/react";
import ElderlyRateTrendChart from "./ElderlyRateTrendChart";

const mockTrendData = [
  { year: 2015, elderlyRate: 22.1 },
  { year: 2016, elderlyRate: 22.8 },
  { year: 2017, elderlyRate: 23.4 },
  { year: 2018, elderlyRate: 23.9 },
  { year: 2019, elderlyRate: 24.5 },
  { year: 2020, elderlyRate: 25.0 },
  { year: 2021, elderlyRate: 25.6 },
  { year: 2022, elderlyRate: 26.1 },
  { year: 2023, elderlyRate: 26.7 },
];

const meta = {
  title: "Components/Charts/ElderlyRateTrendChart",
  component: ElderlyRateTrendChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "600px", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ElderlyRateTrendChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockTrendData,
  },
};

export const CustomColor: Story = {
  args: {
    data: mockTrendData,
    primaryColor: "#7FC5A0",
    gradientId: "colorElderlyRateCustom",
  },
};

export const AboveNationalAverage: Story = {
  args: {
    data: [
      { year: 2015, elderlyRate: 28.5 },
      { year: 2016, elderlyRate: 29.1 },
      { year: 2017, elderlyRate: 29.8 },
      { year: 2018, elderlyRate: 30.4 },
      { year: 2019, elderlyRate: 31.0 },
      { year: 2020, elderlyRate: 31.5 },
      { year: 2021, elderlyRate: 32.1 },
      { year: 2022, elderlyRate: 32.6 },
      { year: 2023, elderlyRate: 33.2 },
    ],
  },
};
