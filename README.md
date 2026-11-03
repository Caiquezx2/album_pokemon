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


## Servidor Node.js (Express)

1. Abra o terminal na pasta do projeto.
2. Execute `npm.cmd install` para instalar as dependências.
3. Execute `node server.js` para iniciar o servidor.
4. Mantenha o terminal aberto enquanto utiliza a página Cadastro.
5. A API do projeto fica em `http://localhost:3000/pokemons`.

A página Cadastro envia as operações de cadastro, consulta, edição e exclusão para o servidor usando GET, POST, PUT e DELETE. O navegador também mantém uma cópia no `localStorage`.

**Observação:** neste primeiro passo, os dados do servidor ficam em memória e são apagados quando o servidor é reiniciado. Os cadastros do navegador continuam no `localStorage` e são enviados novamente quando a página Cadastro é aberta com o servidor ligado.
