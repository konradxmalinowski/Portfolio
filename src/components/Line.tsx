export type LineType = 'input' | 'output' | 'error' | 'info';

interface LineProps {
  type: LineType;
  content: string;
}

interface Token {
  text: string;
  cls?: string;
}

function tokenizeJson(src: string): Token[] {
  const tokens: Token[] = [];
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false|null)\b/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(src)) !== null) {
    if (m.index > last) tokens.push({ text: src.slice(last, m.index) });

    if (m[1] !== undefined) {
      if (m[2] !== undefined) {
        tokens.push({ text: m[1], cls: 'hl-key' });
        tokens.push({ text: m[2] });
      } else {
        tokens.push({ text: m[1], cls: 'hl-str' });
      }
    } else if (m[3] !== undefined) {
      tokens.push({ text: m[3], cls: 'hl-num' });
    } else {
      tokens.push({ text: m[4], cls: 'hl-lit' });
    }

    last = m.index + m[0].length;
  }

  if (last < src.length) tokens.push({ text: src.slice(last) });
  return tokens;
}

export function Line({ type, content }: LineProps) {
  if (type === 'input') {
    return (
      <div className="line line-input">
        <span className="prompt">$</span>
        <span>{content}</span>
      </div>
    );
  }

  if (type === 'output') {
    const tokens = tokenizeJson(content);
    return (
      <pre className="line line-output">
        {tokens.map((t, i) =>
          t.cls ? <span key={i} className={t.cls}>{t.text}</span> : t.text
        )}
      </pre>
    );
  }

  if (type === 'error') {
    return <pre className="line line-error">{content}</pre>;
  }

  return <div className="line line-info">{content}</div>;
}
