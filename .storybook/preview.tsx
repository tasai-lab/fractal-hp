import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            fontFamily: "sans-serif",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
