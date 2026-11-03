# Pokédex Album

Projeto desenvolvido em HTML, CSS e JavaScript para consultar Pokémon, montar uma equipe e manter um catálogo próprio.

## Funcionalidades
- Pokédex principal com os 151 Pokémon de Kanto carregados pela PokéAPI.
- Pesquisa por nome ou número na página Cadastro, consultando Pokémon de todas as gerações sem exibir todos automaticamente.
- Preenchimento do formulário a partir do resultado da API.
- Cadastro, listagem, edição e exclusão de Pokémon próprios.
- Armazenamento dos cadastros no `localStorage` do navegador.
- Busca/filtro por nome e tipo na Pokédex principal.
- Equipe com até seis Pokémon.

## Como executar
1. Extraia todos os arquivos para uma mesma pasta.
2. Abra a pasta no Visual Studio Code.
3. Execute `index.html` com a extensão Live Server.
4. Para pesquisar Pokémon de outras gerações, abra **Cadastro** no menu.

É necessária conexão com a internet para consultar a PokéAPI e carregar as imagens/fontes externas.

## Arquivos principais
- `index.html` / `script.js`: Pokédex de Kanto.
- `time.html` / `time.js`: equipe do treinador.
- `cadastro.html` / `cadastro.js`: pesquisa na API e CRUD do catálogo particular.
- `style.css`: estilos e responsividade.
- `login.html`: página visual do treinador.

## Armazenamento
Os cadastros próprios usam a chave `pokemonCadastrados` no `localStorage`. A equipe usa `meuTimePokemon`.
