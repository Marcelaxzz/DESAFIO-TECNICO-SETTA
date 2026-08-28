# Setta-Painel de Eficiência da Máquina
# Nome: Marcela Luiza Gonçalves Marques 

Desafio de estágio. Painel que busca a temperatura atual, calcula a eficiência da máquina e guarda o histórico das leituras.

**desafio hospedado:** (https://desafio-setta-marcela.vercel.app) 

## PARTE 2: Documentação básica

### Como rodar local

Precisa de: .NET 10 SDK, Node.js 18+, MySQL local.

1. Execute `database/schema.sql` no MySQL Workbench (ou `mysql -u root -p < database/schema.sql`). Cria o banco `setta_eficiencia` e a tabela `leituras`.
2. Em `backend/appsettings.json`, troca a senha do MySQL em `ConnectionStrings:MySql`. A key da OpenWeather já está configurada via `dotnet user-secrets` para não ficar exposta. Depois:
   ```
   cd backend
   dotnet run
   ```
   Sobe em `http://localhost:5227`.
3. Frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```
   Abre em `http://localhost:5173`.

### Deploy

Backend + MySQL no Railway, front na Vercel.

### Tecnologias e por quê

C# com ASP.NET Core, MySQL e React (Vite). Escolhi essas tecnologias principalmente por ter maior facilidade e tempo de trabalho com elas. 
Atualmente o React/React Native são as minhas principais tecnologias e o C# é a linguagem na qual desenvolvo o backend/APIs em geral para todos os projetos de PI da faculdade. O banco MYSQL foi escolhido por afinidade, também utilizo bastante nos projetos da faculdade. 
O backend e banco no railway foi utilizado pela praticidade em hospedar banco e back em um serviço só. o vercel é simples de utilizar através do github, todas minhas hospedagens de front end são feitas por ele.

### Dados

Uma tabela, `leituras`: `id`, `data_hora`, `temperatura`, `eficiencia`, `status` (normal/atencao/critico) e `criado_em`. Cada atualização grava uma linha nova.

### API de temperatura

Utilizei a API da OpenWeather, cidade fixa em Patos de Minas.

### O que poderia melhorar

- Não tem login, qualquer um que abra o front mexe no sistema. (colocaria pelo menos um JWT para validação por e-mail)
- Histórico não pagina, só traz as últimas 50 leituras.
- Cidade fixa no código; o ideal seria configurável.

## PARTE 3: Raciocínio e visão

**Com 100 máquinas mandando leitura a cada 5 minutos, o que travaria?**

A API de clima seria chamada em excesso atoa (várias máquinas na mesma cidade batendo nela). Eu separaria a busca de temperatura do registro da leitura, com um cache por região, e adicionaria um `maquina_id` na tabela, hoje não existe porque só tem uma máquina.

**Que dado histórico vale a pena guardar já, pensando em prever falha?**

O horário de cada leitura. Com isso dá pra saber se a máquina costuma ficar crítica sempre no mesmo período do dia.
Se for sempre de tarde, por exemplo, já aponta pra um padrão mais específico que merece atençao e não pra um problema aleatório.

**Uma melhoria com mais tempo**

Eu adicionaria relatórios com o objetivo de obter maior precisão das temperaturas e da eficiência ao longo de períodos maiores, tipo semana ou mês, hoje a tela só mostra as leituras recentes.

Também colocaria um alerta por e-mail com um alerta sonoro, quando a eficiência cair pra crítico, em vez do aviso ficar só na tela. Hoje, se ninguém estiver com o painel aberto na hora, o alerta passa batido.
