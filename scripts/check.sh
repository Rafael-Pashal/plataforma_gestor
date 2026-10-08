#!/usr/bin/env sh
set -eu
dotnet build PlataformaGestor.sln --configuration Release
dotnet test PlataformaGestor.sln --configuration Release
npm --prefix src/frontend run lint
npm --prefix src/frontend run test
npm --prefix src/frontend run build
