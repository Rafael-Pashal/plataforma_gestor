# Plataforma Gestor

Scaffold inicial do portal web gerencial. A solução usa frontend Next.js/TypeScript, API ASP.NET Core, testes, documentação arquitetural, infraestrutura como código e pipelines de CI.

## Estrutura

- `src/frontend`: aplicação web.
- `src/backend`: API/BFF e módulos de domínio.
- `tests`: testes backend, frontend, integração e E2E.
- `infra`: Bicep e parâmetros por ambiente.
- `docs`: ADRs, arquitetura e runbooks.
- `scripts`: validações locais.

## Pré-requisitos

- Node.js e npm compatíveis com o projeto frontend.
- .NET SDK 8 ou superior.
- Docker, opcional, para dependências locais.

## Execução local

```bash
cp .env.example .env
cp src/frontend/.env.example src/frontend/.env.local
cp src/backend/PlataformaGestor.Api/appsettings.Example.json src/backend/PlataformaGestor.Api/appsettings.Development.json
npm run install:all
npm run dev
```

Em terminais separados:

```bash
npm run dev:frontend
npm run dev:backend
```

## Validação

```bash
npm run lint
npm run test
npm run build
```

## Decisões pendentes

- Provedor final do banco: PostgreSQL ou Azure SQL.
- Plataforma de CI/CD: GitHub Enterprise ou Azure DevOps.
- Hospedagem: App Service ou Container Apps.
- IDs, permissões e consentimentos das integrações.
- SLAs, volumes, retenção, RPO e RTO.

Não inclua segredos no repositório. Use arquivos de exemplo e um cofre autorizado nos ambientes compartilhados.
