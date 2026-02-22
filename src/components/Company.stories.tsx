import type { Meta, StoryObj } from "@storybook/react";
import Company from "./Company";

const meta = {
  title: "Components/Company",
  component: Company,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Company>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
