using Setta.Api.Data;
using Setta.Api.Services;

var builder = WebApplication.CreateBuilder(args);

const string OrigemFrontend = "frontend-local";

var hostMysql = Environment.GetEnvironmentVariable("MYSQLHOST");
if (!string.IsNullOrWhiteSpace(hostMysql))
{
    var portaMysql = Environment.GetEnvironmentVariable("MYSQLPORT") ?? "3306";
    var usuarioMysql = Environment.GetEnvironmentVariable("MYSQLUSER");
    var senhaMysql = Environment.GetEnvironmentVariable("MYSQLPASSWORD");
    var bancoMysql = Environment.GetEnvironmentVariable("MYSQLDATABASE");

    builder.Configuration["ConnectionStrings:MySql"] =
        $"Server={hostMysql};Port={portaMysql};Database={bancoMysql};User={usuarioMysql};Password={senhaMysql};";
}

var origensAdicionais = (builder.Configuration["Cors:OrigensAdicionais"] ?? "")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opcoes =>
{
    opcoes.AddPolicy(OrigemFrontend, politica =>
    {
        politica.SetIsOriginAllowed(origem =>
                    new Uri(origem).Host == "localhost" || origensAdicionais.Contains(origem))
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});

builder.Services.AddHttpClient<ServicoClima>(cliente =>
{
    cliente.BaseAddress = new Uri("https://api.openweathermap.org/");
    cliente.Timeout = TimeSpan.FromSeconds(8);
});

builder.Services.AddSingleton<RepositorioLeituras>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

var porta = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrWhiteSpace(porta))
{
    app.Urls.Add($"http://0.0.0.0:{porta}");
}

app.UseCors(OrigemFrontend);
app.MapControllers();

app.Run();
