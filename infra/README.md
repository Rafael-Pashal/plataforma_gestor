# Infraestrutura

O destino aprovado para DEV/HML é a VM Linux on-premises existente. `infra/ansible/site.yml` valida os pré-requisitos locais de Docker/Compose e prepara o diretório de runtime sem reinstalar ou reiniciar o daemon Docker compartilhado. As aplicações são implantadas por `compose.yaml`, cada ambiente com projeto Compose, containers e portas distintos.

O runner self-hosted do GitHub deve ser registrado manualmente na VM com token temporário gerado pelo GitHub. Restrinja-o ao repositório `Rafael-Pashal/plataforma_gestor`, com o label `plataforma-gestor-deploy`; workflows de pull request não podem usar esse runner. O usuário do serviço precisa acessar o daemon Docker e executar `ansible-core`; esses privilégios equivalem a controle administrativo do daemon. Não grave token de registro, credenciais ou chaves no repositório.

Antes da primeira implantação, instale `ansible-core` conforme `infra/ansible/requirements.txt` e execute `ansible-playbook --inventory infra/ansible/inventory.ini infra/ansible/site.yml`. O pipeline repete esse preflight sem reinstalar nem reiniciar Docker.

DEV publica web/API em `8081/5080`; HML em `8082/5081`, vinculadas somente ao IP interno `192.168.97.221` (`eth2`). Portas, daemon Docker e containers do `painel_viagem` não devem ser alterados. O acesso é apenas pela rede interna/VPN. DNS, TLS e SSO Entra ID seguem pendentes.
