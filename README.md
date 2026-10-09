# Plataforma Gestor

Portal web gerencial para centralizar consultas, dashboards, alertas e atalhos operacionais de fontes corporativas, reduzindo a alternância entre aplicações e aumentando a rastreabilidade das informações.

> Status: em levantamento e definição da baseline. A arquitetura, o stack, as metas técnicas e o roadmap descritos neste repositório são propostas sujeitas à aprovação da governança do projeto.

## Objetivo

A Plataforma Gestor oferece uma visão única, segura e configurável para gerentes e coordenadores acompanharem e-mails, finanças, monitoração, chamados e projetos. Os sistemas integrados continuam sendo as fontes oficiais dos dados e das operações especializadas.

## Escopo do MVP

- Autenticação corporativa por SSO e autorização por perfil e escopo.
- Home gerencial com indicadores, alertas, pendências e saúde das integrações.
- E-mail inteligente com contas autorizadas, pastas temáticas, regras, classificação assistida por IA, resumo, busca e acesso à mensagem original.
- Financeiro com consolidação de faturas, alertas para prazos inferiores a 15 dias e consulta da situação de pagamento no ERP.
- Administração de integrações, parâmetros, regras, perfis e taxonomias.
- Auditoria de autenticações, consultas sensíveis, alterações, exportações e ações de escrita.
- Identificação de dados desatualizados, falhas de integração e reprocessamento autorizado.

Monitoração via Grafana e visão consolidada de projetos via Planner, Excel ou SharePoint fazem parte da baseline completa. Teams e Zabbix são evoluções previstas, após delimitação dos casos de uso e permissões.

## Módulos

| Módulo | Finalidade | Prioridade |
|---|---|---|
| Home gerencial | Indicadores, alertas, favoritos, pendências e estado das integrações | Alta |
| E-mail inteligente | Organização temática, regras, IA, resumo, busca e resposta ou abertura no Outlook | Alta |
| Financeiro | Faturas, fornecedores, datas, valores, alertas, lançamento e pagamento | Alta |
| Administração | Usuários, perfis, fontes, regras, parâmetros e auditoria | Alta |
| Monitoração | Links, filiais, chamados, filtros, séries e indicadores do Grafana | Média |
| Assistente IA | Busca em linguagem natural, resumo, classificação e explicação com fontes | Média |
| Projetos | Portfólio, objetivo, custo, prazo, status e acesso ao Planner | Baixa |

## Arquitetura proposta

A solução deve ser organizada como arquitetura modular por domínios, com uma camada web, APIs/BFF, serviços de integração e processamento assíncrono.

```text
Usuário
  -> Aplicação web
  -> API/BFF
       -> Domínios: Identidade, E-mail, Financeiro, Monitoração, Projetos, Administração
       -> Banco de dados e cache
       -> Filas e workers
       -> Auditoria e observabilidade
       -> Adaptadores de integração
            -> Microsoft Graph / Outlook / Planner / Teams
            -> SharePoint / Excel
            -> Grafana
            -> Protheus / ERP
            -> Zabbix, em evolução futura
```

### Stack recomendada

| Camada | Tecnologia proposta |
|---|---|
| Frontend | React, TypeScript, Next.js, Fluent UI e TanStack Query |
| Backend | ASP.NET Core, .NET 8 ou superior, APIs REST e OpenAPI |
| Identidade | Microsoft Entra ID, MSAL e autorização por políticas |
| Dados | Azure Database for PostgreSQL ou Azure SQL, conforme decisão interna |
| Cache | Azure Cache for Redis, quando necessário |
| Mensageria | Azure Service Bus |
| Arquivos | Azure Blob Storage |
| Busca | Azure AI Search com filtros de permissão |
| IA | Azure OpenAI com grounding, filtros de conteúdo, rastreabilidade e revisão humana |
| Hospedagem | Azure App Service ou Azure Container Apps |
| API management | Azure API Management |
| Segredos | Azure Key Vault e managed identities |
| Observabilidade | Application Insights, Azure Monitor e Log Analytics |
| DevOps | GitHub Actions para CI/CD; Ansible para configurar o host Linux on-premises |

GitHub Actions é a plataforma oficial de CI/CD. Pull requests executam build, testes e verificações de segurança em runners hospedados pelo GitHub. Deploys de DEV são automáticos após a aprovação dos gates em `main`; HML é manual e requer aprovação do ambiente no GitHub. O deploy usa um runner self-hosted restrito à branch `main`, em host Linux on-premises, com containers e portas próprias. O `azure-pipelines.yml` é legado e não participa do fluxo oficial.
| Testes | xUnit, Playwright, testes de contrato, SAST, SCA e DAST |

## Integrações

- Microsoft Graph / Outlook: leitura autorizada, busca, sincronização incremental, abertura e eventual envio ou resposta.
- Microsoft Graph / Planner: planos, tarefas e progresso para visão consolidada.
- Microsoft Graph / Teams: agenda ou conversas somente após definição do caso de uso e das permissões.
- SharePoint / Excel: dados financeiros e de projetos, com validação de esquema.
- Grafana: dados de monitoração por API ou conta de serviço restrita.
- Protheus / ERP: consulta de títulos, lançamento, baixa e pagamento por API homologada.
- Zabbix: fonte futura ou complementar de monitoração.

As integrações devem aplicar OAuth 2.0/OIDC, menor privilégio, idempotência, paginação, retry com backoff, controle de throttling, reconciliação e rastreabilidade da sincronização.

## Regras essenciais

- Apenas identidades corporativas ativas e autorizadas podem acessar a plataforma.
- Cada usuário visualiza somente dados associados ao seu escopo.
- A fonte integrada permanece como sistema oficial de registro.
- Toda informação exibida deve identificar origem e data/hora da última sincronização.
- Regras determinísticas podem ter precedência sobre a classificação por IA.
- Resultados de IA devem manter fonte, modelo ou versão, confiança e correção humana quando aplicável.
- Pagamentos só são confirmados após confirmação da fonte oficial do ERP.
- Ações de escrita, configurações e exportações devem ser auditadas.
- Falhas de integração devem sinalizar dados potencialmente desatualizados.

## Segurança e privacidade

- SSO, MFA conforme política, RBAC, escopo e princípio de menor privilégio.
- Negação por padrão e revisão periódica de acessos.
- TLS em trânsito e criptografia gerenciada em repouso.
- Segredos exclusivamente em cofre seguro, nunca no código, logs ou arquivos versionados.
- Proteções OWASP, validação de entrada, CSRF, XSS, headers seguros e rate limiting.
- Classificação, minimização, mascaramento, retenção e segregação de dados por ambiente.
- Logs de auditoria protegidos contra alteração por usuários comuns.
- IA com isolamento por usuário, grounding, filtros e confirmação humana para ações relevantes.
- Conteúdo corporativo não deve ser usado para treinamento não autorizado.

## Qualidade e Definition of Done

Uma entrega somente pode ser considerada concluída quando:

- os critérios de aceite estão automatizados ou evidenciados;
- o código foi revisado e os testes afetados estão aprovados;
- não há vulnerabilidade bloqueadora sem tratamento conforme a política;
- autorização, acessibilidade, logs, métricas e alertas foram verificados;
- a documentação técnica, operacional e de API foi atualizada;
- dados de teste não contêm conteúdo produtivo indevido;
- rollback e feature flag foram considerados quando aplicáveis.

A estratégia inclui testes unitários, integração, contrato, E2E, segurança, desempenho, resiliência, IA e UAT. QA deve permanecer integrado a cada sprint.

## Fluxo de desenvolvimento

1. Selecione um item priorizado e confirme seus IDs de requisito, WBS, sprint e módulo.
2. Refine critérios de aceite, dependências, riscos e evidências esperadas.
3. Implemente em uma branch curta, seguindo o padrão de desenvolvimento adotado pelo repositório.
4. Abra um pull request com rastreabilidade para os requisitos atendidos.
5. Execute build, lint, testes, verificações de segurança e validações de autorização.
6. Promova entre ambientes somente após os gates e aprovações aplicáveis.
7. Atualize documentação, evidências e o Microsoft Planner, que é o quadro oficial de execução.

Fluxo Kanban do projeto:

```text
Backlog -> Refinamento -> Em desenvolvimento -> QA / Validação
        -> Bloqueado -> Aceite / Review -> Concluído
```

## Configuração local

O scaffold organiza a aplicação web em `src/frontend`, a API em `src/backend`, os testes em `tests`, a infraestrutura em `infra` e a documentação em `docs`. Requer Node.js/npm e .NET SDK 8 ou superior. Para instalar as dependências e iniciar os serviços:

```bash
cp .env.example .env
cp src/frontend/.env.example src/frontend/.env.local
cp src/backend/PlataformaGestor.Api/appsettings.Example.json src/backend/PlataformaGestor.Api/appsettings.Development.json
npm install
npm run install:all
npm run dev
```

O comando `npm run dev` inicia o frontend e a API em paralelo. Também podem ser iniciados separadamente:

```bash
npm run dev:frontend
npm run dev:backend
```

O frontend da Plataforma Gestor fica disponível na porta `8081`, distinta da porta `8080` usada pelo `painel_viagem`. A API deste projeto usa a porta `5080`.

Nos ambientes implantados na VM, DEV usa `http://192.168.97.221:8081` (web) e `http://192.168.97.221:5080` (API); HML usa `http://192.168.97.221:8082` (web) e `http://192.168.97.221:5081` (API). As portas são vinculadas somente à interface interna `eth2`. O `painel_viagem` e sua porta `8080` não fazem parte deste deploy. SSO Entra ID e DNS/TLS ainda precisam ser implementados.

Para validar o projeto:

```bash
npm run lint
npm run test
npm run build
```

Os arquivos de exemplo não contêm credenciais. Configure valores locais apenas em arquivos ignorados pelo Git e use um cofre autorizado nos ambientes compartilhados.

As configurações de integração ainda dependem das decisões de governança:

- identidade do Microsoft Entra ID;
- endpoints e permissões das integrações;
- conexão com banco e cache;
- filas e armazenamento;
- observabilidade;
- feature flags;
- configuração de Azure OpenAI e busca.

Os seguintes comandos .NET também podem ser usados diretamente:

```bash
dotnet restore
dotnet build
dotnet test
```

## Ambientes e entrega

- Desenvolvimento, homologação e produção devem ter identidades, configurações e dados segregados.
- CI deve executar build, lint, testes, SAST, SCA, secret scan e gerar artefato imutável.
- CD deve promover o mesmo artefato com aprovações, infraestrutura como código e rollback.
- Releases devem incluir migração versionada, smoke test, notas e monitoramento pós-publicação.

## Roadmap resumido

1. Descoberta e baseline.
2. Fundação técnica, identidade, autorização, API/BFF, auditoria e observabilidade.
3. E-mail inteligente.
4. Financeiro e integração com ERP.
5. Monitoração via Grafana.
6. Projetos via Planner, Excel ou SharePoint.
7. Validação, UAT, runbook, treinamento e go-live.

As datas do cronograma são premissas de planejamento e não devem ser tratadas como compromisso sem aprovação.

## Documentos oficiais

- `Projeto_Completo_PRJ_Plataforma_Gestor.docx`: escopo, requisitos, regras, arquitetura, integrações, backlog e critérios de aceite.
- `Cronograma_Implementacao_PRJ_Plataforma_Gestor.xlsx`: cronograma, WBS, sprints, dependências, QA, gates e marcos.
- `Formulario_PRJ_Plataforma_Gestor.xlsx`: levantamento original.
- `comandos importantes.txt`: regras para atualização operacional do Microsoft Planner.

Em divergências, registre a inconsistência e solicite decisão de governança. Não invente datas, responsáveis, percentuais, dependências ou conclusões.

## Contribuição

- Relacione mudanças aos IDs `RF`, `RN`, `RNF`, `INT`, `CA`, `REQ`, `D` e WBS aplicáveis.
- Prefira alterações pequenas, testáveis e reversíveis.
- Preserve compatibilidade de contratos ou versione mudanças incompatíveis.
- Inclua testes e documentação no mesmo pull request da implementação.
- Não misture refatorações amplas com mudanças funcionais sem justificativa.
- Não inclua segredos, dados pessoais reais ou conteúdo corporativo sensível em código, testes ou exemplos.

## Licença

A licença e as regras de distribuição ainda não foram definidas. Não publique ou reutilize o conteúdo fora dos ambientes autorizados até decisão formal.
