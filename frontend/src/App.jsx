import { useState } from "react";
import TelaBoasVindas from "./components/TelaBoasVindas.jsx";
import PainelEficiencia from "./components/PainelEficiencia.jsx";

export default function App() {
  const [iniciado, setIniciado] = useState(false);

  if (!iniciado) {
    return <TelaBoasVindas aoIniciar={() => setIniciado(true)} />;
  }

  return <PainelEficiencia aoVoltar={() => setIniciado(false)} />;
}
