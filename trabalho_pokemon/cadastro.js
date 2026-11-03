let formPesquisa = document.getElementById("formPesquisa");
let pesquisaApi = document.getElementById("pesquisaApi");
let erroPesquisa = document.getElementById("erroPesquisa");
let estadoApi = document.getElementById("estadoApi");
let resultadoApi = document.getElementById("resultadoApi");
let formPokemon = document.getElementById("formPokemon");
let listaCadastrados = document.getElementById("listaCadastrados");
let listaVazia = document.getElementById("listaVazia");
let mensagemFormulario = document.getElementById("mensagemFormulario");
let campos = ["nomePokemon", "tipoPokemon", "regiaoPokemon", "nivelPokemon", "descricaoPokemon", "imagemPokemon"];

function pegarCadastro() {
    return JSON.parse(localStorage.getItem("pokemonCadastrados")) || [];
}

function traduzirTipo(tipo) {
    let tipos = {normal:"Normal", fire:"Fogo", water:"Água", grass:"Planta", electric:"Elétrico", ice:"Gelo", fighting:"Lutador", poison:"Veneno", ground:"Terrestre", flying:"Voador", psychic:"Psíquico", bug:"Inseto", rock:"Pedra", ghost:"Fantasma", dragon:"Dragão", dark:"Sombrio", steel:"Aço", fairy:"Fada"};
    return tipos[tipo] || tipo;
}

function mostrarResultado(pokemon) {
    resultadoApi.innerHTML = "";
    let card = document.createElement("article");
    card.className = "resultado-card";
    let imagem = document.createElement("img");
    imagem.src = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    imagem.alt = pokemon.name;
    let info = document.createElement("div");
    let nome = document.createElement("h3");
    nome.textContent = "#" + String(pokemon.id).padStart(3, "0") + " - " + pokemon.name;
    let tipo = document.createElement("p");
    tipo.textContent = "Tipo: " + pokemon.types.map(function(item) { return traduzirTipo(item.type.name); }).join(" / ");
    let botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-adicionar";
    botao.textContent = "Usar no cadastro";
    botao.addEventListener("click", function() { preencherComApi(pokemon); });
    info.appendChild(nome);
    info.appendChild(tipo);
    info.appendChild(botao);
    card.appendChild(imagem);
    card.appendChild(info);
    resultadoApi.appendChild(card);
}

function preencherComApi(pokemon) {
    document.getElementById("nomePokemon").value = pokemon.name;
    document.getElementById("tipoPokemon").value = traduzirTipo(pokemon.types[0].type.name);
    let geracao = pokemon.id <= 151 ? "Kanto" : pokemon.id <= 251 ? "Johto" : pokemon.id <= 386 ? "Hoenn" : pokemon.id <= 493 ? "Sinnoh" : pokemon.id <= 649 ? "Unova" : pokemon.id <= 721 ? "Kalos" : pokemon.id <= 809 ? "Alola" : pokemon.id <= 905 ? "Galar" : "Paldea";
    document.getElementById("regiaoPokemon").value = geracao;
    document.getElementById("nivelPokemon").value = 5;
    document.getElementById("descricaoPokemon").value = "Pokémon pesquisado na PokéAPI. Número: " + pokemon.id;
    document.getElementById("imagemPokemon").value = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default || "";
    document.getElementById("pokemonId").value = "";
    document.getElementById("pokemonApiId").value = pokemon.id;
    document.getElementById("tituloFormulario").textContent = "Cadastrar Pokémon";
    mensagemFormulario.textContent = "Dados preenchidos. Revise e salve o cadastro.";
    document.getElementById("nomePokemon").focus();
}

formPesquisa.addEventListener("submit", async function(event) {
    event.preventDefault();
    let termo = String(pesquisaApi.value).trim().toLowerCase();
    resultadoApi.innerHTML = "";
    erroPesquisa.textContent = "";
    estadoApi.textContent = "";
    if (termo === "") {
        erroPesquisa.textContent = "Digite o nome ou número de um Pokémon.";
        return;
    }
    if (!/^[a-zA-Z0-9-]+$/.test(termo)) {
        erroPesquisa.textContent = "Use apenas letras, números ou hífen.";
        return;
    }
    estadoApi.textContent = "Pesquisando na PokéAPI...";
    try {
        let resposta = await fetch("https://pokeapi.co/api/v2/pokemon/" + encodeURIComponent(termo));
        if (!resposta.ok) throw new Error("Pokémon não encontrado");
        let pokemon = await resposta.json();
        mostrarResultado(pokemon);
        estadoApi.textContent = "Pokémon encontrado!";
    } catch (erro) {
        estadoApi.textContent = "Não encontramos esse Pokémon. Confira o nome ou número e tente novamente.";
    }
});

function validarFormulario() {
    let valido = true;
    let nome = String(document.getElementById("nomePokemon").value).trim();
    let tipo = document.getElementById("tipoPokemon").value;
    let regiao = document.getElementById("regiaoPokemon").value;
    let nivel = Number(document.getElementById("nivelPokemon").value);
    let imagem = String(document.getElementById("imagemPokemon").value).trim();
    document.querySelectorAll(".mensagem-erro").forEach(function(item) { if (item.id !== "erroPesquisa") item.textContent = ""; });
    if (nome.length < 2) { document.getElementById("erroNome").textContent = "Informe um nome com pelo menos 2 letras."; valido = false; }
    if (tipo === "") { document.getElementById("erroTipo").textContent = "Selecione um tipo."; valido = false; }
    if (regiao === "") { document.getElementById("erroRegiao").textContent = "Selecione uma região."; valido = false; }
    if (!Number.isInteger(nivel) || nivel < 1 || nivel > 100) { document.getElementById("erroNivel").textContent = "O nível deve ser um número de 1 a 100."; valido = false; }
    if (imagem !== "" && !/^https?:\/\//i.test(imagem)) { document.getElementById("erroImagem").textContent = "Informe uma URL começando com http:// ou https://."; valido = false; }
    return valido;
}

function limparFormulario() {
    formPokemon.reset();
    document.getElementById("pokemonId").value = "";
    document.getElementById("tituloFormulario").textContent = "Cadastrar Pokémon";
    document.getElementById("salvarPokemon").textContent = "Salvar Pokémon";
    document.getElementById("cancelarEdicao").hidden = true;
    document.querySelectorAll(".mensagem-erro").forEach(function(item) { item.textContent = ""; });
}

function listarCadastrados() {
    let lista = pegarCadastro();
    listaCadastrados.innerHTML = "";
    document.getElementById("totalCadastrados").textContent = lista.length + (lista.length === 1 ? " Pokémon cadastrado" : " Pokémon cadastrados");
    listaVazia.style.display = lista.length === 0 ? "block" : "none";
    lista.forEach(function(pokemon) {
        let card = document.createElement("article");
        card.className = "cadastro-card";
        if (pokemon.imagem) {
            let img = document.createElement("img");
            img.src = pokemon.imagem;
            img.alt = pokemon.nome;
            card.appendChild(img);
        }
        let info = document.createElement("div");
        info.className = "cadastro-card-info";
        let nome = document.createElement("h3");
        nome.textContent = pokemon.nome;
        let dados = document.createElement("p");
        dados.textContent = pokemon.tipo + " • " + pokemon.regiao + " • Nível " + pokemon.nivel;
        let descricao = document.createElement("small");
        descricao.textContent = pokemon.descricao || "Sem descrição.";
        let data = document.createElement("small");
        data.textContent = "Cadastrado em: " + pokemon.data;
        info.appendChild(nome); info.appendChild(dados); info.appendChild(descricao); info.appendChild(data);
        let acoes = document.createElement("div");
        acoes.className = "acoes-card";
        let editar = document.createElement("button");
        editar.type = "button"; editar.className = "botao-editar"; editar.textContent = "Editar";
        editar.addEventListener("click", function() { editarPokemon(pokemon.id); });
        let excluir = document.createElement("button");
        excluir.type = "button"; excluir.className = "botao-excluir"; excluir.textContent = "Excluir";
        excluir.addEventListener("click", function() { excluirPokemon(pokemon.id); });
        acoes.appendChild(editar); acoes.appendChild(excluir);
        card.appendChild(info); card.appendChild(acoes);
        listaCadastrados.appendChild(card);
    });
}

formPokemon.addEventListener("submit", function(event) {
    event.preventDefault();
    mensagemFormulario.textContent = "";
    if (!validarFormulario()) { mensagemFormulario.textContent = "Confira os campos destacados."; return; }
    let lista = pegarCadastro();
    let id = document.getElementById("pokemonId").value;
    let atual = lista.find(function(item) { return item.id === id; });
    let nome = String(document.getElementById("nomePokemon").value).trim();
    let novo = {
        id: id || String(Date.now()), nome: nome.charAt(0).toUpperCase() + nome.slice(1),
        tipo: document.getElementById("tipoPokemon").value,
        regiao: document.getElementById("regiaoPokemon").value,
        nivel: Math.max(1, Math.min(100, Number(document.getElementById("nivelPokemon").value))),
        descricao: String(document.getElementById("descricaoPokemon").value).trim(),
        imagem: String(document.getElementById("imagemPokemon").value).trim(),
        apiId: Number(document.getElementById("pokemonApiId").value) || (atual ? atual.apiId : 0),
        data: atual ? atual.data : new Date().toLocaleDateString("pt-BR")
    };
    if (id) {
        lista = lista.map(function(item) { return item.id === id ? novo : item; });
        mensagemFormulario.textContent = "Pokémon atualizado com sucesso!";
    } else {
        lista.push(novo);
        mensagemFormulario.textContent = "Pokémon cadastrado com sucesso!";
    }
    localStorage.setItem("pokemonCadastrados", JSON.stringify(lista));
    limparFormulario();
    listarCadastrados();
});

function editarPokemon(id) {
    let pokemon = pegarCadastro().find(function(item) { return item.id === id; });
    if (!pokemon) return;
    document.getElementById("pokemonId").value = pokemon.id;
    document.getElementById("nomePokemon").value = pokemon.nome;
    document.getElementById("tipoPokemon").value = pokemon.tipo;
    document.getElementById("regiaoPokemon").value = pokemon.regiao;
    document.getElementById("nivelPokemon").value = pokemon.nivel;
    document.getElementById("descricaoPokemon").value = pokemon.descricao;
    document.getElementById("imagemPokemon").value = pokemon.imagem;
    document.getElementById("pokemonApiId").value = pokemon.apiId || "";
    document.getElementById("tituloFormulario").textContent = "Editar Pokémon";
    document.getElementById("salvarPokemon").textContent = "Salvar alterações";
    document.getElementById("cancelarEdicao").hidden = false;
    mensagemFormulario.textContent = "Altere os campos e salve as modificações.";
    document.getElementById("nomePokemon").focus();
}

function excluirPokemon(id) {
    let lista = pegarCadastro().filter(function(item) { return item.id !== id; });
    localStorage.setItem("pokemonCadastrados", JSON.stringify(lista));
    listarCadastrados();
}

document.getElementById("cancelarEdicao").addEventListener("click", limparFormulario);
listarCadastrados();
