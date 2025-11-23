import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "..";
import { SearchIcon, BookIcon } from "../../icons";

const meta = {
  title: "コンポーネント/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "amber",
        "stone",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
    className: "text-primary-600",
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <SearchIcon className="stroke-white" />
      検索する
    </Button>
  ),
  args: {
    variant: "amber",
  },
};

export const IconOnly: Story = {
  render: (args) => (
    <Button {...args} size="icon">
      <SearchIcon className="stroke-white" />
    </Button>
  ),
  args: {
    variant: "amber",
  },
};

export const IconOnlyPadding: Story = {
  render: (args) => (
    <Button {...args} className="h-auto w-auto p-2">
      <BookIcon />
    </Button>
  ),
  args: {
    variant: "stone",
  },
  parameters: {
    docs: {
      description: {
        story: "size='icon'を使用せず、paddingのみでサイズを決定する例",
      },
    },
  },
};

