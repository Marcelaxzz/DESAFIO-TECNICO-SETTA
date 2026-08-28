import "../styles/AvisoErroApi.css";

export default function AvisoErroApi({ mensagem, aoTentarNovamente }) {
  if (!mensagem) return null;

  return (
    <div className="aviso-erro">
      <span>{mensagem}</span>
      <button onClick={aoTentarNovamente}>Tentar novamente</button>
    </div>
  );
}
