import type { Meta, StoryObj } from "@storybook/react";
import AgeDistributionChart from "./AgeDistributionChart";

const meta = {
  title: "Components/Charts/AgeDistributionChart",
  component: AgeDistributionChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "400px", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AgeDistributionChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      young: 11.8,
      working: 63.2,
      elderly: 25.0,
    },
  },
};

export const HighElderlyRate: Story = {
  args: {
    data: {
      young: 9.5,
      working: 58.0,
      elderly: 32.5,
    },
  },
};

export const CustomColors: Story = {
  args: {
    data: {
      young: 11.8,
      working: 63.2,
      elderly: 25.0,
    },
    primaryColor: "#7FC5A0",
    secondaryColor: "#0D5643",
    accentColor: "#F4E951",
  },
};
