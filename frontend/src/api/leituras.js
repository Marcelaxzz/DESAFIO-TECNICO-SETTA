const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5227/api";

export async function atualizarLeitura() {
  try {
    const resposta = await fetch(`${BASE_URL}/leituras/atualizar`, { method: "POST" });

    if (!resposta.ok) {
      return { sucesso: false, mensagem: "O servidor da Setta não respondeu como esperado." };
    }

    return await resposta.json();
  } catch (erro) {
    return { sucesso: false, mensagem: "Não foi possível falar com o servidor local. Ele está rodando?" };
  }
}

export async function buscarHistorico(limite = 50) {
  try {
    const resposta = await fetch(`${BASE_URL}/leituras/historico?limite=${limite}`);
    if (!resposta.ok) return [];
    return await resposta.json();
  } catch (erro) {
    return [];
  }
}
