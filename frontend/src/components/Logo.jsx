import "../styles/Logo.css";


export default function Logo({ tamanho = 64, className = "" }) {
  const altura = tamanho;
  const largura = tamanho * 3.4;

  return (
    <svg
      className={`setta-logo ${className}`}
      width={largura}
      height={altura}
      viewBox="0 0 340 100"
      role="img"
      aria-label="Setta"
    >
      <defs>
        <linearGradient id="settaGradiente" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#FFD23F" />
        </linearGradient>
      </defs>

      <text x="0" y="72" className="setta-logo__texto">
        Se
      </text>

      <g transform="translate(108, 8)">
        <polygon points="18,72 18,38 4,38 26,4 48,38 34,38 34,72" fill="url(#settaGradiente)" />
      </g>
      <g transform="translate(148, 20)">
        <polygon points="16,60 16,32 4,32 24,4 44,32 32,32 32,60" fill="url(#settaGradiente)" />
      </g>

      <text x="205" y="72" className="setta-logo__texto">
        a
      </text>
    </svg>
  );
}
