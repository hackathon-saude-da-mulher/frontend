import { FaExternalLinkAlt } from "react-icons/fa";

interface SourceCitationProps {
  source: string;
  href?: string;
}

export const SourceCitation = ({ source, href }: SourceCitationProps) => {
  const content = (
    <span className="inline-flex items-center gap-1.5 text-xs text-foreground-muted">
      <span>
        Fonte: <span className="font-semibold text-foreground">{source}</span>
      </span>
      <FaExternalLinkAlt size={10} />
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
};

export default SourceCitation;
