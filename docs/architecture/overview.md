# Visão de arquitetura

A solução é um portal agregador. O frontend consome uma API/BFF. Domínios não dependem diretamente de SDKs externos; adaptadores ficam na infraestrutura. Operações longas podem usar filas e workers após aprovação da arquitetura de mensageria.

## Domínios previstos
Identity & Access, Home, Email, Finance, Monitoring, Projects, Administration, Audit, Integrations e AI Assistance.
