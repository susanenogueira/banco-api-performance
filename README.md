# Banco API Performance

Projeto de testes de performance de API desenvolvido com **JavaScript** e **Grafana k6**.

Repositório: https://github.com/susanenogueira/banco-api-performance

## 1. Introdução

Este projeto reúne scripts de testes de performance para exercitar endpoints de uma API bancária, observar o comportamento da aplicação sob carga e apoiar a identificação de problemas de tempo de resposta, taxa de erros e capacidade de atendimento.

A execução depende da variável de ambiente **`BASE_URL`**, que indica o endereço da API a ser testada.

## 2. Tecnologias utilizadas

| Tecnologia | Finalidade |
| --- | --- |
| JavaScript | Implementação dos cenários e funções de apoio. |
| Grafana k6 | Execução dos testes, coleta de métricas e geração de relatórios. |
| PowerShell | Configuração das variáveis de ambiente e execução dos comandos no Windows. |
| Git e GitHub | Versionamento e compartilhamento do projeto. |

O k6 executa os scripts JavaScript diretamente. Para os comandos descritos aqui, não é necessário instalar Node.js ou dependências npm.

## 3. Estrutura do repositório

```text
banco-api-performance/
├── config/
├── fixtures/
├── helpers/
├── tests/
├── utils/
├── .gitignore
└── README.md
```

A estrutura acima representa os diretórios e arquivos identificados na raiz do repositório. Os arquivos internos não estão detalhados.

## 4. Objetivo de cada grupo de arquivos

| Diretório ou arquivo | Responsabilidade esperada |
| --- | --- |
| `config/` | Centralizar configurações e parâmetros utilizados pelos cenários de performance. |
| `fixtures/` | Organizar dados de teste e massas utilizadas nas requisições. |
| `helpers/` | Reunir funções auxiliares reutilizáveis pelos testes. |
| `tests/` | Conter os scripts que definem e executam os cenários de performance. |
| `utils/` | Concentrar funções utilitárias compartilhadas. |
| `.gitignore` | Definir arquivos que não devem ser versionados. |
| `README.md` | Documentar a estrutura, os requisitos e as instruções de execução. |

As responsabilidades são descrições de referência, pois não foi possível inspecionar o conteúdo dos diretórios.

## 5. Instalação e preparação

### Pré-requisitos

- Git instalado.
- Grafana k6 instalado e disponível no terminal.
- API de destino acessível pela máquina que executará os testes.
- Windows PowerShell para os exemplos abaixo.

Instale o k6 conforme a [documentação oficial](https://grafana.com/docs/k6/latest/set-up/install-k6/).

### Clonar o repositório

```powershell
git clone https://github.com/susanenogueira/banco-api-performance.git
cd banco-api-performance
```

### Verificar a instalação

```powershell
k6 version
```

### Configurar a URL da API

Defina `BASE_URL` no PowerShell, substituindo o endereço de exemplo pela URL real do ambiente de testes:

```powershell
$env:BASE_URL = "http://localhost:3000"
```

**Importante:** o endereço acima é apenas ilustrativo. Configure a URL correta antes de executar os testes. Não execute testes de carga em ambientes compartilhados ou de produção sem autorização.

## 6. Execução dos testes e relatórios

Execute os comandos a seguir na raiz do projeto, no **PowerShell**. Os exemplos utilizam `tests/login.test.js`; confirme que esse arquivo existe antes de executar.

### Execução básica

A variável `BASE_URL` deve ser passada explicitamente ao k6 com a opção `-e`, para que esteja disponível nos scripts por meio de `__ENV.BASE_URL`:

```powershell
k6 run -e BASE_URL="$env:BASE_URL" .\tests\login.test.js
```

### Acompanhamento do relatório em tempo real

Ative o painel integrado do k6:

```powershell
$env:K6_WEB_DASHBOARD = "true"
k6 run -e BASE_URL="$env:BASE_URL" .\tests\login.test.js
```

Durante a execução, acesse o painel em:

http://localhost:5665

O painel permite acompanhar as métricas disponibilizadas pelo k6 enquanto o teste está em andamento.

### Exportação automática do relatório HTML

Configure as variáveis nativas do k6 para acompanhar a execução e salvar um relatório HTML ao término:

```powershell
$env:K6_WEB_DASHBOARD = "true"
$env:K6_WEB_DASHBOARD_EXPORT = "$PWD\html-report.html"
k6 run -e BASE_URL="$env:BASE_URL" .\tests\login.test.js
Start-Process .\html-report.html
```

O comando `Start-Process` abre o relatório exportado no navegador padrão. Execute-o após a finalização do teste e a criação do arquivo.

Para abrir automaticamente o painel durante o teste, é possível acrescentar:

```powershell
$env:K6_WEB_DASHBOARD_OPEN = "true"
```

**Observação:** `K6_WEB_DASHBOARD` e `K6_WEB_DASHBOARD_EXPORT` são variáveis reconhecidas pelo k6. Já `BASE_URL` é uma variável definida para este projeto, enviada ao script por `-e`.

### Limpeza opcional das configurações do painel

```powershell
Remove-Item Env:K6_WEB_DASHBOARD -ErrorAction SilentlyContinue
Remove-Item Env:K6_WEB_DASHBOARD_EXPORT -ErrorAction SilentlyContinue
Remove-Item Env:K6_WEB_DASHBOARD_OPEN -ErrorAction SilentlyContinue
```

### Referências

- [Documentação oficial do k6](https://grafana.com/docs/k6/latest/)
- [Instalação do k6](https://grafana.com/docs/k6/latest/set-up/install-k6/)
- [Painel web e exportação de relatórios](https://grafana.com/docs/k6/latest/results-output/web-dashboard/)
- [Variáveis de ambiente do k6](https://grafana.com/docs/k6/latest/using-k6/environment-variables/)

---

**Autoria:** Susane Nogueira
