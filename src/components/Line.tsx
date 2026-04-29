export type LineType = 'input' | 'output' | 'error' | 'info';

interface LineProps {
  type: LineType;
  content: string;
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
    return <pre className="line line-output">{content}</pre>;
  }

  if (type === 'error') {
    return <pre className="line line-error">{content}</pre>;
  }

  return <div className="line line-info">{content}</div>;
}
