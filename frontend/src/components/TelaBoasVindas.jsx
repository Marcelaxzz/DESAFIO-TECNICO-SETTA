import Logo from "./Logo.jsx";
import MarcaDagua from "./MarcaDagua.jsx";
import "../styles/TelaBoasVindas.css";

export default function TelaBoasVindas({ aoIniciar }) {
  return (
    <div className="boas-vindas">
      <div className="boas-vindas__trilho" aria-hidden="true" />

      <div className="boas-vindas__conteudo">
        <Logo tamanho={72} className="boas-vindas__logo" />

        <h1 className="boas-vindas__titulo">Painel de Eficiência</h1>
        <p className="boas-vindas__texto">
          Acompanhe em tempo real a temperatura da planta e a eficiência da
          máquina, com o histórico das últimas leituras.
        </p>

        <button className="boas-vindas__botao" onClick={aoIniciar}>
          Iniciar
        </button>
      </div>

      <div className="boas-vindas__rodape">
        <MarcaDagua />
      </div>

      <div className="boas-vindas__trilho boas-vindas__trilho--inferior" aria-hidden="true" />
    </div>
  );
}
