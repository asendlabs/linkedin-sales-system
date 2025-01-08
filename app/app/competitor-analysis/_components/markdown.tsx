import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'github-markdown-css/github-markdown.css';
import Markdown from 'react-markdown';

export const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <div className="px-5 pb-4 max-w-4xl mx-auto">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Add syntax highlighting for code blocks
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // Customize heading styles
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-medium mb-4 mt-6" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-medium mb-3 mt-5" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-medium mb-3 mt-4" {...props} />
          ),
          // Customize link styles
          a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
          ),
          // Customize list styles
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-4" {...props} />
          ),
          // Customize blockquote styles
          blockquote: ({ node, ...props }) => (
            <blockquote 
              className="border-l-4 border-gray-200 pl-4 italic my-4" 
              {...props} 
            />
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};