import React, { useEffect } from "react";
import Prism from "prismjs";
import "./SyntaxFormatter.scss";

// @ts-ignore
Prism.manual = true;

export interface SyntaxFormatterProps {
  code: string;
  lang: "markup" | "json";
}

/* eslint-disable react/no-danger */

export default function SyntaxFormatter({ code, lang }: SyntaxFormatterProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!code || !ref.current) {
      return;
    }
    Prism.highlightElement(ref.current);
  }, [code, ref.current]);

  return (
    <pre className="rc-syntax-formatter">
      <code ref={ref} className={`language-${lang}`}>
        {code}
      </code>
    </pre>
  );
}
