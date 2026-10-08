# GitHub Copilot Instructions - Plataforma Gestor

- Responda em português nas explicações.
- Preserve rastreabilidade com IDs RF, RN, RNF, INT, CA, REQ, D e WBS.
- Não invente requisitos, datas, SLAs, responsáveis ou decisões. Use `TODO(decision):`.
- Siga arquitetura modular por domínios e mantenha adaptadores externos atrás de interfaces.
- Backend: .NET 8+, nullable habilitado, async, CancellationToken, OpenAPI, logs estruturados e testes xUnit.
- Frontend: TypeScript strict, sem `any`, componentes acessíveis e estados loading, empty, error e stale.
- Autorize no backend por política, papel e escopo. Use deny by default e menor privilégio.
- Nunca registre tokens, segredos, conteúdo integral de e-mail, dados financeiros ou dados pessoais.
- Toda informação integrada deve expor fonte, última sincronização e estado de atualização.
- Ações de escrita relevantes exigem confirmação e auditoria.
- IA deve respeitar permissões, usar grounding, indicar fontes, aceitar correção humana e não executar ações críticas automaticamente.
- Inclua testes unitários, integração, contrato, E2E, segurança e resiliência conforme a mudança.
- Não declare uma entrega concluída sem critérios de aceite, revisão, testes, segurança, documentação, observabilidade e rollback avaliados.
