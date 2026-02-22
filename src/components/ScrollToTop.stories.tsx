import type { Meta, StoryObj } from "@storybook/react";
import ScrollToTop from "./ScrollToTop";

const meta = {
  title: "Components/ScrollToTop",
  component: ScrollToTop,
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
} satisfies Meta<typeof ScrollToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
