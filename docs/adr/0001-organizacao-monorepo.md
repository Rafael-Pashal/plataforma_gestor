# ADR-0001: Organização inicial em monorepo

- Status: proposto
- Requisitos relacionados: RNF-013, RNF-014

## Contexto
O produto possui frontend, backend, testes, documentação e infraestrutura relacionados.

## Decisão
Adotar monorepo inicial com diretórios independentes e pipelines compartilhados.

## Consequências
A decisão simplifica rastreabilidade inicial, mas deve ser revisada se ownership, permissões ou ciclos de release exigirem separação.
