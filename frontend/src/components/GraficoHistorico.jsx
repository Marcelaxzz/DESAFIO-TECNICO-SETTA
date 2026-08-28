import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import "../styles/GraficoHistorico.css";

function formatarHora(valor) {
  return new Date(valor).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export default function GraficoHistorico({ historico }) {
  if (historico.length === 0) {
    return (
      <div className="grafico-historico grafico-historico--vazio">
        <p>O histórico aparece aqui assim que houver leituras registradas.</p>
      </div>
    );
  }

  const dados = historico.map((item) => ({
    ...item,
    horaFormatada: formatarHora(item.dataHora)
  }));

  return (
    <div className="grafico-historico">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dados} margin={{ top: 10, right: 24, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" />
          <XAxis dataKey="horaFormatada" stroke="#8a8a8a" fontSize={12} />
          <YAxis stroke="#8a8a8a" fontSize={12} domain={[0, 105]} />
          <Tooltip
            contentStyle={{ background: "#1b1b1b", border: "1px solid #2a2a2a", borderRadius: 8 }}
            labelStyle={{ color: "#f2f2f2" }}
          />
          <Legend wrapperStyle={{ fontSize: 13 }} />
          <Line
            type="monotone"
            dataKey="eficiencia"
            name="Eficiência (%)"
            stroke="#f5a623"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="temperatura"
            name="Temperatura (°C)"
            stroke="#5a9fd4"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
