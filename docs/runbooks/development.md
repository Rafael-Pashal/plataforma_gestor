# Runbook de desenvolvimento

1. Copie somente os arquivos de configuração de exemplo.
2. Não use dados produtivos ou segredos locais versionados.
3. Execute build, lint e testes antes do pull request.
4. Registre requisito, WBS, testes, riscos e evidências no pull request.
5. Atualize o Planner sem criar cards duplicados.

## CI, proteção da branch e deploy

- GitHub Actions é o CI/CD oficial. Pull requests e pushes para `main` rodam build, testes, SAST (Semgrep), SCA (npm audit e NuGet Audit) e secret scan (Gitleaks).
- Proteja `main` exigindo pull request e os checks `backend`, `frontend`, `sast`, `secret-scan` e `build-images`. Não exija aprovação obrigatória enquanto houver um único colaborador; mantenha force-push e exclusão da branch bloqueados.
- DEV é implantado automaticamente após todos os gates aprovados em `main`. HML é iniciado em **Actions > ci > Run workflow**, selecionando `main` e `deploy_hml`; a aprovação é aplicada pelo environment `hml`, cujo reviewer autorizado é `Rafael-Pashal`.
- Os jobs de deploy usam somente o runner self-hosted com label `plataforma-gestor-deploy`. Nunca habilite esse runner para jobs de pull request. Configure-o no escopo do repositório, não como runner amplo da organização.
- As imagens são construídas no runner hospedado pelo GitHub, exportadas como artefato da execução e implantadas sem publicar código em um registry externo.
- Ambientes (somente IP interno `192.168.97.221`): DEV web/API `:8081`/`:5080`; HML `:8082`/`:5081`. Execute `bash scripts/smoke.sh 192.168.97.221 8081 5080` para DEV ou `bash scripts/smoke.sh 192.168.97.221 8082 5081` para HML.
- A configuração via Ansible é idempotente e não altera o daemon/container/porta do `painel_viagem` (8080). Acesso é temporariamente HTTP via rede interna/VPN; SSO, DNS e TLS precisam de decisões e implementação antes de uso por dados sensíveis.
