import type { Meta, StoryObj } from "@storybook/react";
import PopulationChart from "./PopulationChart";

const mockPopulationData = [
  { year: 2019, total: 620000, elderly: 136400, elderlyRate: 22.0 },
  { year: 2020, total: 635000, elderly: 143900, elderlyRate: 22.7 },
  { year: 2021, total: 641000, elderly: 150000, elderlyRate: 23.4 },
  { year: 2022, total: 648000, elderly: 157000, elderlyRate: 24.2 },
  { year: 2023, total: 652000, elderly: 163000, elderlyRate: 25.0 },
];

const meta = {
  title: "Components/Charts/PopulationChart",
  component: PopulationChart,
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
} satisfies Meta<typeof PopulationChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockPopulationData,
    areaName: "船橋市",
  },
};

export const CustomColors: Story = {
  args: {
    data: mockPopulationData,
    areaName: "習志野市",
    primaryColor: "#7FC5A0",
    secondaryColor: "#F4E951",
  },
};

export const SmallArea: Story = {
  args: {
    data: [
      { year: 2019, total: 175000, elderly: 40250, elderlyRate: 23.0 },
      { year: 2020, total: 176000, elderly: 41536, elderlyRate: 23.6 },
      { year: 2021, total: 177000, elderly: 42934, elderlyRate: 24.3 },
      { year: 2022, total: 178000, elderly: 44322, elderlyRate: 24.9 },
      { year: 2023, total: 179000, elderly: 45683, elderlyRate: 25.5 },
    ],
    areaName: "八千代市",
  },
};
