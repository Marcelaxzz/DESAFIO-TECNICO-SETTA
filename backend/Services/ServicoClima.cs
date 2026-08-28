using System.Text.Json;

namespace Setta.Api.Services;

public record ResultadoClima(bool Sucesso, decimal Temperatura, string? Mensagem);

public class ServicoClima
{
    private const string Cidade = "Patos de Minas,BR";

    private readonly HttpClient _http;
    private readonly string? _apiKey;
    private readonly ILogger<ServicoClima> _logger;

    public ServicoClima(HttpClient http, IConfiguration configuracao, ILogger<ServicoClima> logger)
    {
        _http = http;
        _apiKey = configuracao["OpenWeather:ApiKey"];
        _logger = logger;
    }

    public async Task<ResultadoClima> ObterTemperaturaAtualAsync(CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(_apiKey))
        {
            return new ResultadoClima(false, 0, "Chave da API de clima não configurada no servidor.");
        }

        var url = $"data/2.5/weather?q={Uri.EscapeDataString(Cidade)}&units=metric&appid={_apiKey}";

        try
        {
            using var resposta = await _http.GetAsync(url, ct);

            if (resposta.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                return new ResultadoClima(false, 0, "Chave da API de clima inválida ou ainda não ativada.");
            }

            if (!resposta.IsSuccessStatusCode)
            {
                _logger.LogWarning("OpenWeather respondeu {Status}", resposta.StatusCode);
                return new ResultadoClima(false, 0, $"Serviço de clima indisponível no momento ({(int)resposta.StatusCode}).");
            }

            await using var conteudo = await resposta.Content.ReadAsStreamAsync(ct);
            using var json = await JsonDocument.ParseAsync(conteudo, cancellationToken: ct);

            var temperatura = json.RootElement.GetProperty("main").GetProperty("temp").GetDecimal();
            return new ResultadoClima(true, temperatura, null);
        }
        catch (TaskCanceledException)
        {
            return new ResultadoClima(false, 0, "Tempo de resposta da API de clima esgotado.");
        }
        catch (HttpRequestException ex)
        {
            _logger.LogWarning(ex, "Falha de rede ao buscar temperatura");
            return new ResultadoClima(false, 0, "Não foi possível conectar à API de clima.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro inesperado ao buscar temperatura");
            return new ResultadoClima(false, 0, "Erro inesperado ao ler a resposta da API de clima.");
        }
    }
}
