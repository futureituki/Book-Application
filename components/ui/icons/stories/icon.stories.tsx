import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchIcon, BookIcon } from "..";

const meta = {
  title: "コンポーネント/Icons/Icon",
  component: SearchIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SearchIcon className=" stroke-primary-600" />,
};

export const Book: Story = {
  render: () => <BookIcon className="stroke-primary-600" />,
};
