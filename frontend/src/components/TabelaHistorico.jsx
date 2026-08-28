import "../styles/TabelaHistorico.css";

const TEXTO_STATUS = {
  normal: "Normal",
  atencao: "Atenção",
  critico: "Crítico"
};

export default function TabelaHistorico({ historico }) {
  const recentes = [...historico].reverse().slice(0, 12);

  if (recentes.length === 0) return null;

  return (
    <div className="tabela-historico">
      <table>
        <thead>
          <tr>
            <th>Data/hora</th>
            <th>Temperatura</th>
            <th>Eficiência</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentes.map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.dataHora).toLocaleString("pt-BR")}</td>
              <td>{item.temperatura.toFixed(1)}°C</td>
              <td>{item.eficiencia.toFixed(1)}%</td>
              <td>
                <span className={`tabela-historico__pilula tabela-historico__pilula--${item.status}`}>
                  {TEXTO_STATUS[item.status] ?? item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
