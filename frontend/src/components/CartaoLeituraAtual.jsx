import "../styles/CartaoLeituraAtual.css";

const RUBRICAS = {
  normal: { texto: "Normal", classe: "cartao-status--normal" },
  atencao: { texto: "Atenção", classe: "cartao-status--atencao" },
  critico: { texto: "Crítico", classe: "cartao-status--critico" }
};

function formatarDataHora(valor) {
  const data = new Date(valor);
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function CartaoLeituraAtual({ leitura, carregando }) {
  if (!leitura) {
    return (
      <div className="cartao-atual cartao-atual--vazio">
        <p>Nenhuma leitura registrada ainda. Clique em "Atualizar" pra buscar a primeira.</p>
      </div>
    );
  }

  const rubrica = RUBRICAS[leitura.status] ?? RUBRICAS.normal;

  return (
    <div className={`cartao-atual ${carregando ? "cartao-atual--carregando" : ""}`}>
      <div className="cartao-atual__bloco">
        <span className="cartao-atual__rotulo">Temperatura</span>
        <strong className="cartao-atual__valor">{leitura.temperatura.toFixed(1)}°C</strong>
      </div>

      <div className="cartao-atual__divisor" aria-hidden="true" />

      <div className="cartao-atual__bloco">
        <span className="cartao-atual__rotulo">Eficiência</span>
        <strong className="cartao-atual__valor">{leitura.eficiencia.toFixed(1)}%</strong>
      </div>

      <div className={`cartao-atual__status ${rubrica.classe}`}>{rubrica.texto}</div>

      <span className="cartao-atual__data">Atualizado às {formatarDataHora(leitura.dataHora)}</span>
    </div>
  );
}
