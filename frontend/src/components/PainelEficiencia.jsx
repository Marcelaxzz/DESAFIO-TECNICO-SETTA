import { useCallback, useEffect, useState } from "react";
import { atualizarLeitura, buscarHistorico } from "../api/leituras.js";
import { useAutoAtualizacao } from "../hooks/useAutoAtualizacao.js";
import Logo from "./Logo.jsx";
import CartaoLeituraAtual from "./CartaoLeituraAtual.jsx";
import BannerAlerta from "./BannerAlerta.jsx";
import GraficoHistorico from "./GraficoHistorico.jsx";
import TabelaHistorico from "./TabelaHistorico.jsx";
import AvisoErroApi from "./AvisoErroApi.jsx";
import MarcaDagua from "./MarcaDagua.jsx";
import "../styles/PainelEficiencia.css";

export default function PainelEficiencia({ aoVoltar }) {
  const [leituraAtual, setLeituraAtual] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [autoAtivo, setAutoAtivo] = useState(true);

  const executarFluxo = useCallback(async () => {
    setCarregando(true);

    const resposta = await atualizarLeitura();

    if (resposta.sucesso) {
      setLeituraAtual(resposta.leitura);
      setErro(null);
      setHistorico(await buscarHistorico());
    } else {
      setErro(resposta.mensagem ?? "Não foi possível atualizar a leitura.");
    }

    setCarregando(false);
  }, []);

  useEffect(() => {
    executarFluxo();
  }, [executarFluxo]);

  useAutoAtualizacao(executarFluxo, autoAtivo);

  return (
    <div className="painel">
      <header className="painel__cabecalho">
        <div className="painel__marca">
          <button className="painel__botao-voltar" onClick={aoVoltar} aria-label="Voltar para o início" title="Voltar">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <Logo tamanho={34} className="painel__logo" />
        </div>

        <div className="painel__acoes">
          <label className="painel__toggle">
            <input
              type="checkbox"
              checked={autoAtivo}
              onChange={(evento) => setAutoAtivo(evento.target.checked)}
            />
            Atualização automática (30s)
          </label>

          <button className="painel__botao-atualizar" onClick={executarFluxo} disabled={carregando}>
            {carregando ? "Atualizando..." : "Atualizar"}
          </button>
        </div>
      </header>

      <main className="painel__corpo">
        <AvisoErroApi mensagem={erro} aoTentarNovamente={executarFluxo} />

        <CartaoLeituraAtual leitura={leituraAtual} carregando={carregando} />

        <BannerAlerta leitura={leituraAtual} historico={historico} />

        <section className="painel__secao">
          <h2>Histórico</h2>
          <GraficoHistorico historico={historico} />
        </section>

        <TabelaHistorico historico={historico} />

        <MarcaDagua />
      </main>
    </div>
  );
}
