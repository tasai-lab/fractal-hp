import type { Meta, StoryObj } from "@storybook/react";
import Contact from "./Contact";

const meta = {
  title: "Components/Contact",
  component: Contact,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Embedded: Story = {
  args: {
    embedded: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithInitialType: Story = {
  args: {
    initialContactType: "求人・採用について",
  },
};

export const EmbeddedHideTitle: Story = {
  args: {
    embedded: true,
    hideTitle: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};
