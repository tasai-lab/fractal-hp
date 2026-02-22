import type { Meta, StoryObj } from "@storybook/react";
import Philosophy from "./Philosophy";

const meta = {
  title: "Components/Philosophy",
  component: Philosophy,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Philosophy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
