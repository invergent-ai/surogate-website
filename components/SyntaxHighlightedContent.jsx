'use client';

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Clipboard } from 'lucide-react';

const SyntaxHighlightedContent = ({ language, content }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex justify-between items-center">
      <SyntaxHighlighter
        language={language}
        style={a11yDark}
        useInlineStyles={true}
        customStyle={{ fontSize: "14px" }}
      >
        {content}
      </SyntaxHighlighter>
      <div className="p-[0.5em] text-white hover:text-white/50 cursor-pointer">
        <Clipboard onClick={handleCopy} size="18"/>
      </div>
    </div>
  );
};

export default SyntaxHighlightedContent;
