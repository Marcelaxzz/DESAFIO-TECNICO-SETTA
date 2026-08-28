using Microsoft.AspNetCore.Mvc;
using Setta.Api.Data;
using Setta.Api.Models;
using Setta.Api.Rules;
using Setta.Api.Services;

namespace Setta.Api.Controllers;

[ApiController]
[Route("api/leituras")]
public class LeiturasController : ControllerBase
{
    private readonly ServicoClima _servicoClima;
    private readonly RepositorioLeituras _repositorio;

    public LeiturasController(ServicoClima servicoClima, RepositorioLeituras repositorio)
    {
        _servicoClima = servicoClima;
        _repositorio = repositorio;
    }

    [HttpPost("atualizar")]
    public async Task<ActionResult<AtualizarLeituraResposta>> Atualizar(CancellationToken ct)
    {
        var clima = await _servicoClima.ObterTemperaturaAtualAsync(ct);

        if (!clima.Sucesso)
        {
            return Ok(new AtualizarLeituraResposta
            {
                Sucesso = false,
                Mensagem = clima.Mensagem
            });
        }

        var eficiencia = CalculadoraEficiencia.Calcular(clima.Temperatura);
        var status = CalculadoraEficiencia.ClassificarStatus(eficiencia);

        var leitura = new Leitura
        {
            DataHora = DateTime.Now,
            Temperatura = clima.Temperatura,
            Eficiencia = eficiencia,
            Status = status
        };

        await _repositorio.InserirAsync(leitura);

        return Ok(new AtualizarLeituraResposta
        {
            Sucesso = true,
            Leitura = leitura
        });
    }

    [HttpGet("historico")]
    public async Task<ActionResult<IEnumerable<Leitura>>> Historico([FromQuery] int limite = 50)
    {
        var historico = await _repositorio.ObterHistoricoAsync(limite);
        return Ok(historico);
    }
}
