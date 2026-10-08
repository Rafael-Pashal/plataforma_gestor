# GitHub Copilot Instructions - Plataforma Gestor

Estas instruções orientam o GitHub Copilot e demais assistentes de código no repositório da Plataforma Gestor.

## 1. Contexto do produto

A Plataforma Gestor é um portal web gerencial que agrega dados de Outlook, Planner, SharePoint/Excel, Grafana e Protheus/ERP. O objetivo é oferecer consultas, dashboards, alertas e navegação para as fontes oficiais sem substituir os sistemas de origem.

Prioridades do MVP:

1. identidade corporativa, autorização e segregação por escopo;
2. Home gerencial e saúde das integrações;
3. e-mail inteligente;
4. acompanhamento financeiro e alerta de prazo inferior a 15 dias;
5. auditoria, observabilidade, administração e tratamento de falhas.

Monitoração e projetos fazem parte da baseline completa. Teams e Zabbix devem ser tratados como evolução até que os respectivos casos de uso sejam aprovados.

## 2. Fontes de verdade

Consulte e preserve a rastreabilidade com:

- `Projeto_Completo_PRJ_Plataforma_Gestor.docx` para escopo, RFs, RNs, RNFs, integrações, arquitetura, backlog e critérios de aceite;
- `Cronograma_Implementacao_PRJ_Plataforma_Gestor.xlsx` para WBS, fases, sprints, datas, dependências, QA, gates e marcos;
- `Formulario_PRJ_Plataforma_Gestor.xlsx` para o levantamento original;
- Microsoft Planner para o acompanhamento oficial da execução.

Não invente requisitos, datas, responsáveis, dependências, percentuais, SLAs ou decisões. Quando algo não estiver definido, use `TODO(decision):` e descreva a decisão necessária.

## 3. Princípios obrigatórios

- Preserve os sistemas integrados como fontes oficiais.
- Exiba origem, horário de atualização e estado de sincronização dos dados.
- Use menor privilégio e negação por padrão.
- Nunca contorne autorização por conveniência técnica.
- Solicite confirmação para ações de escrita relevantes e registre auditoria.
- Mantenha intervenção humana em decisões críticas e resultados de IA.
- Prefira integrações oficiais e sustentáveis por API.
- Modele falhas, throttling, timeout, repetição, duplicidade e indisponibilidade.
- Produza mudanças pequenas, testáveis, observáveis e reversíveis.

## 4. Arquitetura e organização

Siga arquitetura modular por domínios. Evite dependências diretas entre módulos funcionais.

Domínios esperados:

- Identity e Access;
- Home;
- Email;
- Finance;
- Monitoring;
- Projects;
- Administration;
- Audit;
- Integrations;
- AI Assistance.

Regras de organização:

- domínio não deve depender de detalhes do adaptador externo;
- contratos de integração devem ficar atrás de interfaces;
- DTOs externos não devem vazar para o modelo de domínio;
- persistência, mensageria, IA e APIs externas são detalhes de infraestrutura;
- operações longas devem ser assíncronas quando apropriado;
- handlers e serviços devem ser idempotentes quando puderem ser repetidos;
- dependências entre módulos devem ser explícitas e unidirecionais;
- decisões arquiteturais relevantes devem ser registradas em ADR.

## 5. Backend .NET

Ao gerar C# e ASP.NET Core:

- use recursos compatíveis com .NET 8 ou superior, conforme versão fixada no repositório;
- habilite nullable reference types;
- prefira código assíncrono e propague `CancellationToken`;
- use injeção de dependência e opções tipadas validadas no início da aplicação;
- use APIs REST com OpenAPI e respostas de erro padronizadas;
- valide entradas na fronteira e invariantes no domínio;
- não capture `Exception` sem tratamento, contexto ou relançamento apropriado;
- não registre tokens, segredos, conteúdo de e-mail, dados financeiros ou dados pessoais;
- use logs estruturados, sem interpolar dados sensíveis;
- inclua correlation ID e identificadores técnicos autorizados;
- implemente health checks para dependências críticas;
- aplique timeout, retry com jitter e circuit breaker somente quando semanticamente seguros;
- respeite `Retry-After` e limites das APIs externas;
- use migrações versionadas para alterações de banco;
- forneça testes xUnit para regras, autorização, transformações e falhas.

Exemplo de resultado explícito:

```csharp
public sealed record OperationResult<T>(
    bool IsSuccess,
    T? Value,
    string? ErrorCode,
    string? ErrorMessage);
```

Adapte-se aos padrões já existentes no repositório. Não introduza um segundo padrão concorrente sem justificativa.

## 6. Frontend React e TypeScript

Ao gerar React, TypeScript e Next.js:

- mantenha `strict` habilitado;
- evite `any`; use tipos explícitos, `unknown` e validação na fronteira;
- prefira componentes pequenos, acessíveis e orientados a composição;
- diferencie estados de carregamento, vazio, erro, parcial e desatualizado;
- mostre fonte e última sincronização ao exibir dados integrados;
- use TanStack Query ou o padrão adotado no repositório para estado remoto;
- não replique dados remotos em estado local sem necessidade;
- preserve contexto ao direcionar o usuário para o sistema de origem;
- não use apenas cor para comunicar severidade ou status;
- confirme ações de escrita e mostre seu resultado;
- não exponha tokens ou segredos no cliente;
- inclua testes para jornadas e componentes críticos;
- preserve responsividade e navegação por teclado.

Não crie dashboards com números simulados em produção. Mocks devem ser identificados e limitados a desenvolvimento e testes.

## 7. Identidade e autorização

- Autentique com Microsoft Entra ID e MSAL conforme configuração aprovada.
- Autorize por política, papel e escopo de dados.
- Valide autorização no backend, mesmo quando a interface ocultar a ação.
- Nunca confie em tenant, usuário, unidade, time ou projeto enviados pelo cliente sem validação.
- Prefira permissões delegadas quando a ação depender do usuário.
- Permissões de aplicação exigem justificativa e aprovação.
- Não use contas compartilhadas ou credenciais fixas.
- Teste acessos permitidos, negados, cruzamento de escopo e usuário inativo.

## 8. Integrações

Para cada integração, implemente e documente:

- proprietário funcional e técnico;
- autenticação e permissões;
- esquema e identificador único;
- paginação e limites;
- timezone e tratamento de nulos;
- frequência, latência e atualização incremental;
- timeout, retry, backoff e circuit breaker;
- idempotência, reconciliação e exclusões;
- classificação, retenção e logs permitidos;
- códigos de erro, monitoramento e contingência;
- critérios de homologação.

### Microsoft Graph

- prefira delta query e subscriptions quando suportadas;
- respeite throttling e `Retry-After`;
- preserve IDs e links para os itens originais;
- não armazene conteúdo além do necessário;
- confirme a permissão antes de ler ou enviar em nome do usuário.

### SharePoint e Excel

- valide esquema, tipos, colunas obrigatórias e versão;
- rejeite ou coloque em quarentena registros inválidos;
- não assuma que a posição de colunas permanecerá fixa;
- registre a origem do arquivo, lista ou item.

### Grafana

- use API ou conta de serviço restrita e aprovada;
- não replique funções administrativas do Grafana;
- indique quando dados estiverem indisponíveis ou desatualizados.

### Protheus ou ERP

- trate o ERP como fonte oficial do estado de pagamento;
- não confirme pagamento somente com base em dados locais;
- mantenha reconciliação e trilha da consulta;
- não implemente escrita financeira sem aprovação explícita.

## 9. Dados e regras de negócio

- Uma mensagem pode aparecer em várias pastas temáticas sem duplicação do conteúdo original.
- Regras determinísticas podem preceder a classificação por IA.
- O alerta financeiro é aplicado quando a diferença entre vencimento e recebimento for inferior a 15 dias corridos.
- Registros financeiros sem fornecedor, vencimento ou valor válido devem ir para quarentena.
- Alertas repetidos precisam de deduplicação configurável.
- Exportações, configurações e ações de escrita precisam de auditoria.
- Quando uma integração falhar, sinalize quais dados podem estar desatualizados.

Use tipos adequados:

- dinheiro: decimal e moeda explícita;
- datas de negócio: tipo de data sem horário quando aplicável;
- instantes: UTC na persistência, com conversão explícita na interface;
- identificadores externos: preserve o valor original e a fonte;
- status: enum ou value object, não strings livres espalhadas.

## 10. IA responsável

Ao gerar funcionalidades de IA:

- faça grounding somente em fontes autorizadas;
- aplique filtros de permissão antes da recuperação e antes da resposta;
- mantenha referências à origem do conteúdo;
- registre modelo ou versão, confiança e feedback quando aplicável;
- diferencie claramente fato recuperado, resumo e sugestão;
- permita correção humana;
- teste prompt injection, vazamento entre usuários, conteúdo malicioso e regressão de prompts;
- não envie segredos ou dados além do necessário ao modelo;
- não use conteúdo corporativo para treinamento não autorizado;
- não execute automaticamente ações críticas sugeridas pelo modelo;
- forneça fallback seguro quando a resposta não estiver fundamentada.

## 11. Segurança e privacidade

Nunca gere ou aceite código que:

- inclua segredos em código, repositório, imagens, logs ou arquivos de exemplo;
- desabilite validação TLS;
- ignore autorização ou validação de escopo;
- concatene entrada do usuário em SQL, comandos, HTML ou consultas sem tratamento;
- registre corpo completo de e-mail, token, documento financeiro ou dado pessoal;
- use dados reais de produção em testes;
- exponha stack trace ou detalhes internos ao usuário final.

Aplique:

- Key Vault e managed identities;
- criptografia em trânsito e repouso;
- validação de entrada e saída;
- proteção CSRF, XSS, SSRF e injeções;
- rate limiting;
- SAST, SCA, secret scan, IaC scan e DAST;
- retenção e minimização;
- logs de auditoria protegidos;
- segregação entre desenvolvimento, homologação e produção.

## 12. Observabilidade e confiabilidade

- Use logs estruturados com níveis adequados.
- Inclua métricas de latência, erro, throughput, throttling, fila e sincronização.
- Implemente tracing distribuído para fluxos entre API, fila, worker e adaptador.
- Não exponha conteúdo sensível em telemetria.
- Forneça health e readiness checks.
- Registre última execução, resultado, erro, tentativas e próxima ação de cada integração.
- Use dead-letter e reprocessamento autorizado para mensagens não processadas.
- Evite retries em operações não idempotentes sem chave de idempotência.

## 13. Testes

Toda mudança funcional deve incluir os testes aplicáveis:

- unitários para regras, validações, autorização e transformações;
- integração para banco, filas, storage, autenticação e APIs;
- contrato para schemas de consumidores e provedores;
- E2E para jornadas críticas;
- segurança para segregação, OWASP e permissões;
- resiliência para timeout, throttling, duplicidade e indisponibilidade;
- IA para grounding, permissão, prompt injection e regressão;
- UAT com evidências para critérios de aceite.

Jornadas mínimas prioritárias:

- login e acesso conforme perfil e escopo;
- criação e consulta de pasta temática de e-mail;
- abertura da mensagem na origem;
- alerta financeiro de prazo inferior a 15 dias;
- confirmação do estado de pagamento pelo ERP;
- indicação de dados desatualizados após falha de integração;
- auditoria de ação de escrita e exportação.

Evite testes que apenas reproduzem a implementação. Teste comportamento, contrato e autorização.

## 14. Pull requests e rastreabilidade

Ao sugerir título, descrição ou código para um pull request:

- informe os IDs de requisito e WBS aplicáveis;
- descreva problema, solução, impacto e risco;
- liste testes e evidências;
- informe alterações de banco, configuração, permissões ou contrato;
- informe rollback e feature flag quando aplicáveis;
- não marque a tarefa como concluída sem atender à Definition of Done;
- preserve histórico, comentários, anexos e evidências no Planner.

Modelo recomendado:

```markdown
## Contexto
Requisitos: RF-___, RN-___, RNF-___, INT-___, CA-___
WBS/Sprint: ___

## Alteração
- ...

## Segurança e dados
- ...

## Testes e evidências
- ...

## Implantação e rollback
- ...

## Pendências ou decisões
- ...
```

## 15. Definition of Done

Antes de sugerir que uma entrega está pronta, confirme:

- critérios de aceite atendidos e evidenciados;
- revisão de código concluída;
- build, lint e testes aprovados;
- contrato de API e migração atualizados;
- autorização e segregação testadas;
- segurança sem bloqueadores não tratados;
- logs, métricas, health e alertas disponíveis;
- documentação atualizada;
- acessibilidade verificada;
- rollback e feature flag avaliados;
- Planner atualizado sem duplicar cards.

Se alguma condição não puder ser confirmada, declare explicitamente a pendência. Nunca informe que uma entrega está concluída apenas porque o código foi gerado.

## 16. Comportamento esperado do Copilot

- Primeiro, examine o código e os padrões existentes.
- Reutilize convenções, bibliotecas e abstrações já adotadas.
- Faça perguntas somente quando a ausência de decisão impedir uma implementação segura.
- Caso contrário, implemente a alternativa de menor risco e registre as suposições.
- Não faça refatoração ampla fora do escopo solicitado.
- Não crie novos frameworks internos sem necessidade.
- Não produza dados, usuários, métricas ou resultados fictícios como se fossem reais.
- Ao encontrar divergência entre código, Planner e documentos oficiais, interrompa a conclusão e registre a divergência.
- Responda em português nas explicações e mantenha nomes técnicos e identificadores conforme o padrão do código.
