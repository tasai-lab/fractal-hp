import type { Meta, StoryObj } from "@storybook/react";
import About from "./About";

const meta = {
  title: "Components/About",
  component: About,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
