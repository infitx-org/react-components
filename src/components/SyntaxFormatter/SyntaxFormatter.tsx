import React, { useEffect } from "react";
import Prism from "prismjs";
import "./SyntaxFormatter.scss";

export interface SyntaxFormatterProps {
  code: string;
  lang: "markup" | "json";
}

/* eslint-disable react/no-danger */

export default function SyntaxFormatter({ code, lang }: SyntaxFormatterProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!code) {
      return;
    }
    const formatted = Prism.highlight(code, Prism.languages[lang], lang);
    ref.current!.innerHTML = formatted;
  }, [code]);

  return (
    <div className="rc-syntax-formatter">
      <pre>
        <code ref={ref} />
      </pre>
    </div>
  );
}
