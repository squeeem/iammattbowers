// Renders Lexical JSON rich-text to React. Handles paragraphs, headings, lists,
// formatting, links, quotes, code — the full set enabled in our Posts schema.

interface LexicalNode {
  type: string;
  text?: string;
  format?: number;
  style?: string;
  tag?: string;
  children?: LexicalNode[];
  url?: string;
  target?: string;
  rel?: string;
  [key: string]: unknown;
}

interface LexicalDoc {
  root: LexicalNode;
}

// Format bitmask values
const FORMAT = {
  BOLD: 1,
  ITALIC: 2,
  STRIKETHROUGH: 4,
  UNDERLINE: 8,
  CODE: 16,
  SUBSCRIPT: 32,
  SUPERSCRIPT: 64,
};

function hasFormat(format: number | undefined, flag: number): boolean {
  return !!format && (format & flag) !== 0;
}

function renderTextNode(node: LexicalNode): React.ReactNode {
  let text = node.text || "";
  const format = node.format || 0;

  let element: React.ReactNode = text;

  if (hasFormat(format, FORMAT.BOLD)) {
    element = <strong>{element}</strong>;
  }
  if (hasFormat(format, FORMAT.ITALIC)) {
    element = <em>{element}</em>;
  }
  if (hasFormat(format, FORMAT.UNDERLINE)) {
    element = <u>{element}</u>;
  }
  if (hasFormat(format, FORMAT.STRIKETHROUGH)) {
    element = <s>{element}</s>;
  }
  if (hasFormat(format, FORMAT.CODE)) {
    element = <code className="bg-sand px-1 rounded text-sm font-mono">{element}</code>;
  }
  if (hasFormat(format, FORMAT.SUBSCRIPT)) {
    element = <sub>{element}</sub>;
  }
  if (hasFormat(format, FORMAT.SUPERSCRIPT)) {
    element = <sup>{element}</sup>;
  }

  return element;
}

function renderChildren(children: LexicalNode[] | undefined): React.ReactNode[] {
  if (!children) return [];
  return children.map((child, i) => renderNode(child, i));
}

function renderNode(node: LexicalNode, key: number | string): React.ReactNode {
  const { type } = node;

  switch (type) {
    case "text":
      return <span key={key}>{renderTextNode(node)}</span>;

    case "paragraph":
      return (
        <p key={key} className="mb-4 text-ink leading-relaxed">
          {renderChildren(node.children)}
        </p>
      );

    case "heading": {
      const tag = (node.tag || "h2") as keyof React.JSX.IntrinsicElements;
      const headingClasses: Record<string, string> = {
        h1: "text-3xl font-bold mb-6 mt-8",
        h2: "text-2xl font-bold mb-4 mt-6",
        h3: "text-xl font-bold mb-3 mt-4",
        h4: "text-lg font-bold mb-2 mt-3",
        h5: "font-bold mb-2 mt-2",
        h6: "font-bold mb-2 mt-2 text-sm",
      };
      const HeadingTag = tag;
      return (
        <HeadingTag
          key={key}
          className={`text-ink ${headingClasses[tag] || headingClasses.h2}`}
        >
          {renderChildren(node.children)}
        </HeadingTag>
      );
    }

    case "list":
      const ListTag = node.tag === "ol" ? "ol" : "ul";
      const listClasses =
        node.tag === "ol"
          ? "list-decimal list-inside mb-4 ml-4 space-y-1"
          : "list-disc list-inside mb-4 ml-4 space-y-1";
      return (
        <ListTag key={key} className={listClasses}>
          {renderChildren(node.children)}
        </ListTag>
      );

    case "listitem":
      return (
        <li key={key} className="text-ink">
          {renderChildren(node.children)}
        </li>
      );

    case "quote":
      return (
        <blockquote
          key={key}
          className="border-l-4 border-accent-deep pl-4 italic text-ink-soft mb-4 py-2"
        >
          {renderChildren(node.children)}
        </blockquote>
      );

    case "code":
      return (
        <pre
          key={key}
          className="bg-sand rounded p-4 overflow-x-auto mb-4 text-sm font-mono"
        >
          <code>{renderChildren(node.children)}</code>
        </pre>
      );

    case "link":
      return (
        <a
          key={key}
          href={node.url as string}
          target={node.target}
          rel={node.rel}
          className="text-accent-deep hover:underline"
        >
          {renderChildren(node.children)}
        </a>
      );

    case "horizontalrule":
      return <hr key={key} className="border-line my-8" />;

    default:
      // Unknown node type — render children anyway
      return <>{renderChildren(node.children)}</>;
  }
}

export function LexicalRenderer({ body }: { body: LexicalDoc | undefined }) {
  if (!body?.root?.children) {
    return null;
  }

  return (
    <div className="prose prose-stone max-w-none">
      {renderChildren(body.root.children)}
    </div>
  );
}
