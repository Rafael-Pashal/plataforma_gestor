targetScope = 'resourceGroup'
@description('Nome curto do ambiente.')
param environmentName string
@description('Localização dos recursos.')
param location string = resourceGroup().location

// TODO(decision): confirmar App Service ou Container Apps, banco, mensageria e observabilidade.
output environment string = environmentName
output deploymentLocation string = location
