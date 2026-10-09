# Infraestrutura

O destino aprovado para DEV/HML é a VM Linux on-premises existente. `infra/ansible/site.yml` valida os pré-requisitos locais de Docker/Compose e prepara o diretório de runtime sem reinstalar ou reiniciar o daemon Docker compartilhado. As aplicações são implantadas por `compose.yaml`, cada ambiente com projeto Compose, containers e portas distintos.

O runner self-hosted do GitHub está registrado no escopo de `Rafael-Pashal/plataforma_gestor` com o label `plataforma-gestor-deploy`. O serviço executa como `rafael`, com acesso ao daemon Docker e a `ansible-core`; esses privilégios equivalem a controle administrativo do host. Embora os jobs de pull request atuais usem runners hospedados, este repositório é público e um pull request pode alterar o workflow para solicitar o runner; o YAML não é uma barreira de segurança. Código não confiável executado nele pode comprometer a VM e o `painel_viagem`. Esse risco foi aceito para DEV/HML; migre para um runner/host isolado antes de aceitar contribuições externas não confiáveis ou workloads sensíveis. Não grave token de registro, credenciais ou chaves no repositório.

Antes da primeira implantação, instale `ansible-core` conforme `infra/ansible/requirements.txt` e execute `ansible-playbook --inventory infra/ansible/inventory.ini infra/ansible/site.yml`. O pipeline repete esse preflight sem reinstalar nem reiniciar Docker.

DEV publica web/API em `8081/5080`; HML em `8082/5081`, vinculadas somente ao IP interno `192.168.97.221` (`eth2`). Portas, daemon Docker e containers do `painel_viagem` não devem ser alterados. O acesso é apenas pela rede interna/VPN. DNS, TLS e SSO Entra ID seguem pendentes.
