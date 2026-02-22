import type { Meta, StoryObj } from "@storybook/react";
import Staff from "./Staff";

const meta = {
  title: "Components/Staff",
  component: Staff,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Staff>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
