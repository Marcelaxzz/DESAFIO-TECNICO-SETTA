namespace Setta.Api.Models;

public class Leitura
{
    public int Id { get; set; }
    public DateTime DataHora { get; set; }
    public decimal Temperatura { get; set; }
    public decimal Eficiencia { get; set; }
    public string Status { get; set; } = string.Empty;
}
