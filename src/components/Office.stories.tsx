import type { Meta, StoryObj } from "@storybook/react";
import Office from "./Office";

const meta = {
  title: "Components/Office",
  component: Office,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Office>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
