# Threat model inicial

## Ativos
Identidade, escopos de autorização, e-mails, informações financeiras, configurações, logs de auditoria e credenciais de integração.

## Ameaças prioritárias
Acesso indevido entre escopos, permissões excessivas, vazamento em logs, segredo versionado, conteúdo desatualizado sem aviso, prompt injection e execução indevida de ações.

## Controles esperados
SSO, MFA conforme política, RBAC e escopo, deny by default, managed identity, Key Vault, auditoria, minimização, validação, testes de autorização e confirmação humana.
