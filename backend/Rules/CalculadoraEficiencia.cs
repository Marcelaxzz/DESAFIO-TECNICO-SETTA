namespace Setta.Api.Rules;

public static class CalculadoraEficiencia
{
    private const decimal TemperaturaMinima = 21m;
    private const decimal TemperaturaMaxima = 32m;
    private const decimal EficienciaMinima = 23m;
    private const decimal EficienciaMaxima = 100m;

    public static decimal Calcular(decimal temperaturaC)
    {
        if (temperaturaC >= TemperaturaMaxima)
        {
            return EficienciaMaxima;
        }

        if (temperaturaC < TemperaturaMinima)
        {
            return EficienciaMinima;
        }

        var faixaTemperatura = TemperaturaMaxima - TemperaturaMinima;
        var faixaEficiencia = EficienciaMaxima - EficienciaMinima;
        var proporcao = (temperaturaC - TemperaturaMinima) / faixaTemperatura;

        var eficiencia = EficienciaMinima + proporcao * faixaEficiencia;
        return Math.Round(eficiencia, 2);
    }

    public static string ClassificarStatus(decimal eficiencia)
    {
        if (eficiencia >= 70m)
        {
            return "normal";
        }

        if (eficiencia >= 40m)
        {
            return "atencao";
        }

        return "critico";
    }
}
