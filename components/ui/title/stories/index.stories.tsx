import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Title } from "..";

const meta = {
  title: "コンポーネント/Title",
  component: Title,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "タイトルのサイズ",
    },
    children: {
      control: "text",
      description: "タイトルのテキスト",
    },
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "タイトル",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    children: "Small Title",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Title",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    children: "Large Title",
    size: "lg",
  },
};

export const CustomColor: Story = {
  args: {
    children: "Custom Color Title",
    size: "lg",
    className: "text-primary-600",
  },
};
