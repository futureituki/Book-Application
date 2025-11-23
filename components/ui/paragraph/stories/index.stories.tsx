import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Paragraph } from "..";

const meta = {
  title: "コンポーネント/Paragraph",
  component: Paragraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "テキストのサイズ",
    },
    weight: {
      control: "select",
      options: ["default", "medium", "bold"],
      description: "フォントの太さ",
    },
    children: {
      control: "text",
      description: "テキストの内容",
    },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "これはデフォルトの段落テキストです。可読性を考慮した行間と色設定が適用されています。",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children:
      "これは小さいサイズの段落テキストです。補足情報などに適しています。",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children:
      "これは大きいサイズの段落テキストです。導入文や強調したい文章に適しています。",
  },
};

export const Bold: Story = {
  args: {
    weight: "bold",
    children:
      "これは太字の段落テキストです。重要な情報を強調する場合に使用します。",
  },
};

export const LongText: Story = {
  args: {
    children:
      "これは長いテキストの例です。段落コンポーネントは適切な行間（leading-relaxed）が設定されているため、複数行にわたる文章でも読みやすくなっています。stone-600の色を使用することで、真っ黒ではなく目に優しい色合いになっています。",
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <div className="max-w-md">
      <Paragraph {...args} />
    </div>
  ),
};
