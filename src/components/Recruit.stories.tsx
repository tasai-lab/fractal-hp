import type { Meta, StoryObj } from "@storybook/react";
import Recruit from "./Recruit";

const meta = {
  title: "Components/Recruit",
  component: Recruit,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Recruit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
