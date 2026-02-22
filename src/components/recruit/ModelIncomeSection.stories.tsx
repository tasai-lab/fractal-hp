import type { Meta, StoryObj } from "@storybook/react";
import ModelIncomeSection from "./ModelIncomeSection";

const meta = {
  title: "Components/Recruit/ModelIncomeSection",
  component: ModelIncomeSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          background: "linear-gradient(135deg, #f5f0e8 0%, #e8f0eb 100%)",
          padding: "2rem",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ModelIncomeSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Nurse: Story = {
  args: {
    isNurse: true,
  },
};

export const Therapist: Story = {
  args: {
    isNurse: false,
  },
};
