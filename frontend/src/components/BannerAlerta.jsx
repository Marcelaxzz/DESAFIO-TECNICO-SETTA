import "../styles/BannerAlerta.css";

function contarCriticas(historico) {
  return historico.filter((item) => item.status === "critico").length;
}

export default function BannerAlerta({ leitura, historico }) {
  if (!leitura || leitura.status === "normal") return null;

  const critico = leitura.status === "critico";
  const ocorrencias = contarCriticas(historico);

  return (
    <div className={`banner-alerta ${critico ? "banner-alerta--critico" : "banner-alerta--atencao"}`}>
      <div className="banner-alerta__icone" aria-hidden="true">
        {critico ? "⚠" : "!"}
      </div>
      <div className="banner-alerta__texto">
        <strong>{critico ? "Eficiência crítica" : "Eficiência abaixo do ideal"}</strong>
        <span>
          {critico
            ? `A leitura atual está em nível crítico. Isso já ocorreu ${ocorrencias}x no histórico carregado.`
            : "A temperatura ambiente está reduzindo o rendimento da máquina."}
        </span>
      </div>
    </div>
  );
}
