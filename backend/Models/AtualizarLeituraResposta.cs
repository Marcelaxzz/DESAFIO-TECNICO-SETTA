namespace Setta.Api.Models;

public class AtualizarLeituraResposta
{
    public bool Sucesso { get; set; }
    public string? Mensagem { get; set; }
    public Leitura? Leitura { get; set; }
}
