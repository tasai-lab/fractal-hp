import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import BackgroundTriangles from "./BackgroundTriangles";

const meta = {
  title: "Components/BackgroundTriangles",
  component: BackgroundTriangles,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: "400px",
          backgroundColor: "#f9fafb",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BackgroundTriangles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const About: Story = {
  args: {
    pattern: "about",
  },
};

export const Features: Story = {
  args: {
    pattern: "features",
  },
};

export const Office: Story = {
  args: {
    pattern: "office",
  },
};

export const ServiceArea: Story = {
  args: {
    pattern: "serviceArea",
  },
};

export const Flow: Story = {
  args: {
    pattern: "flow",
  },
};

export const Staff: Story = {
  args: {
    pattern: "staff",
  },
};

export const Recruit: Story = {
  args: {
    pattern: "recruit",
  },
};

export const Contact: Story = {
  args: {
    pattern: "contact",
  },
};

export const Company: Story = {
  args: {
    pattern: "company",
  },
};

export const FAQ: Story = {
  args: {
    pattern: "faq",
  },
};
