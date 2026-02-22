import type { Meta, StoryObj } from "@storybook/react";
import { JobDetails } from "./JobDetails";
import { jobPositions } from "@/lib/recruit-data";

const meta = {
  title: "Components/recruit/JobDetails",
  component: JobDetails,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof JobDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Nurse: Story = {
  args: {
    job: jobPositions[0],
  },
};

export const Therapist: Story = {
  args: {
    job: jobPositions[1],
  },
};
