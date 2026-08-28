using Dapper;
using MySqlConnector;
using Setta.Api.Models;

namespace Setta.Api.Data;

public class RepositorioLeituras
{
    private readonly string _connectionString;

    public RepositorioLeituras(IConfiguration configuracao)
    {
        _connectionString = configuracao.GetConnectionString("MySql")
            ?? throw new InvalidOperationException("Connection string 'MySql' não configurada.");
    }

    private MySqlConnection AbrirConexao() => new(_connectionString);

    public async Task<Leitura> InserirAsync(Leitura leitura)
    {
        const string sql = """
            INSERT INTO leituras (data_hora, temperatura, eficiencia, status)
            VALUES (@DataHora, @Temperatura, @Eficiencia, @Status);
            SELECT LAST_INSERT_ID();
            """;

        using var conexao = AbrirConexao();
        var id = await conexao.ExecuteScalarAsync<int>(sql, leitura);
        leitura.Id = id;
        return leitura;
    }

    public async Task<IEnumerable<Leitura>> ObterHistoricoAsync(int limite)
    {
        const string sql = """
            SELECT id, data_hora AS DataHora, temperatura, eficiencia, status
            FROM leituras
            ORDER BY data_hora DESC
            LIMIT @Limite;
            """;

        using var conexao = AbrirConexao();
        var leituras = await conexao.QueryAsync<Leitura>(sql, new { Limite = limite });
        return leituras.OrderBy(l => l.DataHora);
    }
}
