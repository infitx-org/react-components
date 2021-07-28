import Prism from "prismjs";
import "./SyntaxFormatter.scss";

export interface SyntaxFormatterProps {
  code: "markup" | "xml" | "json";
  lang: string;
}

/* eslint-disable react/no-danger */

export default function SyntaxFormatter({ code, lang }: SyntaxFormatterProps) {
  const formatted = Prism.highlight(code, Prism.languages[lang], lang);
  return (
    <pre className="rc-syntax-formatter">
      <code dangerouslySetInnerHTML={{ __html: formatted }} />
    </pre>
  );
}
