# ADR 0002: Hospedagem de DEV/HML em VM Linux on-premises

- Status: Aceita
- Data: 2026-10-09

## Contexto

O projeto precisa disponibilizar DEV e HML na VM Linux existente sem interferir no `painel_viagem`, que usa a porta 8080. O host é on-premises; Bicep não provisiona esse recurso. Acesso temporário será por IP e porta na rede interna/VPN.

## Decisão

- GitHub Actions é a plataforma oficial de CI/CD.
- Ansible valida os pré-requisitos Docker/Compose e prepara o runtime na VM existente; a equipe de infraestrutura permanece responsável pelo host e seu provisionamento.
- DEV e HML usam Docker Compose com containers/projetos isolados.
- DEV publica web/API em `192.168.97.221:8081/5080`; HML publica em `192.168.97.221:8082/5081`. Os bindings não escutam nas demais interfaces.
- Deploy em DEV ocorre após gates aprovados em `main`; HML é acionado manualmente e exige aprovação do ambiente no GitHub.
- O repositório é público. O runner self-hosted reside na VM atual, usa o label `plataforma-gestor-deploy` e o workflow atual o seleciona somente nos jobs de deploy de `main`; os jobs de pull request usam runners hospedados pelo GitHub.
- O branch principal exige pull request e checks aprovados, sem aprovação obrigatória de outro usuário, pois há um único colaborador.
- SAST, SCA e secret scan são gates para Critical/High. O Next.js permanece na versão 16; `eslint-config-next` é substituído por ESLint genérico, TypeScript ESLint e React Hooks devido a cinco alertas HIGH na cadeia `fast-glob`/`micromatch`/`braces`, sem versão corrigida publicada.

## Consequências

- `painel_viagem` e o daemon Docker compartilhado não serão reinstalados, reiniciados nem removidos pelo deploy da Plataforma Gestor.
- O serviço do runner executa como `rafael`, com acesso ao daemon Docker compartilhado, equivalente a controle administrativo do host. Como o repositório é público e o runner tem escopo de repositório, um pull request pode alterar o workflow para solicitar esse runner; a configuração atual do YAML não é uma barreira de segurança. Código não confiável executado nele pode comprometer a VM e o `painel_viagem`. O mantenedor autorizou prosseguir com esse risco para DEV/HML; migrar para um runner/host isolado antes de aceitar contribuições externas não confiáveis ou hospedar workloads sensíveis.
- A exposição é temporariamente por HTTP em IP:porta, na interface interna `eth2` e restrita à rede interna/VPN. O firewall local UFW está inativo; as regras externas da rede devem manter o acesso limitado. DNS, TLS e autenticação Entra ID não fazem parte desta etapa e continuam pendentes.
- Nenhum recurso Azure será criado por este ADR. IaC Bicep sem recursos é removida da solução para não sugerir provisionamento inexistente.
