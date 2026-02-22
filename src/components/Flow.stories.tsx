import type { Meta, StoryObj } from "@storybook/react";
import Flow from "./Flow";

const meta = {
  title: "Components/Flow",
  component: Flow,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Flow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
