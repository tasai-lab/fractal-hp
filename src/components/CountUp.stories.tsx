import type { Meta, StoryObj } from "@storybook/react";
import { CountUp } from "./CountUp";

const meta = {
  title: "Components/CountUp",
  component: CountUp,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CountUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    end: 100,
    duration: 2000,
    suffix: "",
  },
};

export const LargeNumber: Story = {
  args: {
    end: 1000000,
    duration: 2000,
    suffix: "人",
  },
};

export const WithSuffix: Story = {
  args: {
    end: 30,
    duration: 2000,
    suffix: "万円",
  },
};
