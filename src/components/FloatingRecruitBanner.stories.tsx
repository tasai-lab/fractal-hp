import type { Meta, StoryObj } from "@storybook/react";
import FloatingRecruitBanner from "./FloatingRecruitBanner";

const meta = {
  title: "Components/FloatingRecruitBanner",
  component: FloatingRecruitBanner,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "200vh" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FloatingRecruitBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
