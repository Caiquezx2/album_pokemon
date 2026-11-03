let grid = document.getElementById("gridPokemons");
let busca = document.getElementById("buscaPokemon");
let filtro = document.getElementById("filtroTipo");
let carregando = document.getElementById("carregando");
let totalTime = document.getElementById("totalTime");
let pokemons = [];

function traduzirTipo(tipo) {
    let tipos = {
        fire: "Fogo", water: "Água", grass: "Planta", electric: "Elétrico",
        normal: "Normal", bug: "Inseto", poison: "Veneno", flying: "Voador",
        ground: "Terrestre", rock: "Pedra", fairy: "Fada", fighting: "Lutador",
        psychic: "Psíquico", ghost: "Fantasma", ice: "Gelo", dragon: "Dragão",
        dark: "Sombrio", steel: "Aço"
    };
    return tipos[tipo] || tipo;
}

function atualizarContador() {
    let time = JSON.parse(localStorage.getItem("meuTimePokemon")) || [];
    totalTime.textContent = time.length + " / 6";
}

function adicionarAoTime(pokemon) {
    let time = JSON.parse(localStorage.getItem("meuTimePokemon")) || [];

    if (time.length >= 6) {
        alert("Seu time já está completo! Você pode ter até 6 Pokémon.");
        return;
    }

    let existe = time.some(function(item) {
        return item.id === pokemon.id;
    });

    if (existe) {
        alert("Esse Pokémon já está no seu time!");
        return;
    }

    let amizade = prompt("Qual é o nível de amizade? Digite um valor de 1 a 10:");

    if (amizade === null) return;

    amizade = Number(amizade);

    if (amizade < 1 || amizade > 10 || !Number.isInteger(amizade)) {
        alert("Digite um número inteiro entre 1 e 10.");
        return;
    }

    let imagem = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    let novoPokemon = {
        id: pokemon.id,
        nome: pokemon.name,
        imagem: imagem,
        sprite: pokemon.sprites.front_default,
        tipos: pokemon.types.map(function(item) {
            return item.type.name;
        }),
        amizade: amizade
    };

    time.push(novoPokemon);
    localStorage.setItem("meuTimePokemon", JSON.stringify(time));
    atualizarContador();
    alert(pokemon.name.toUpperCase() + " entrou para sua equipe!");
}

function mostrarPokemon(pokemon) {
    let card = document.createElement("article");
    let tipos = pokemon.types.map(function(item) {
        return item.type.name;
    });

    card.className = "pokemon-card";
    card.dataset.nome = pokemon.name.toLowerCase();
    card.dataset.tipos = tipos.join(" ");

    let numero = document.createElement("span");
    numero.className = "pokemon-numero";
    numero.textContent = "#" + String(pokemon.id).padStart(3, "0");

    let imagem = document.createElement("img");
    imagem.src = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    imagem.alt = pokemon.name;
    imagem.loading = "lazy";

    let nome = document.createElement("h3");
    nome.textContent = pokemon.name;

    let tiposBox = document.createElement("div");
    tiposBox.className = "tipos";
    tipos.forEach(function(tipo) {
        let tag = document.createElement("span");
        tag.className = "tipo tipo-" + tipo;
        tag.textContent = traduzirTipo(tipo);
        tiposBox.appendChild(tag);
    });

    let botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-adicionar";
    botao.textContent = "＋ Adicionar ao time";
    botao.addEventListener("click", function() {
        adicionarAoTime(pokemon);
    });

    card.appendChild(numero);
    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(tiposBox);
    card.appendChild(botao);

    grid.appendChild(card);
    pokemons.push(card);
}


function mostrarCadastrados() {
    let cadastrados = JSON.parse(localStorage.getItem("pokemonCadastrados")) || [];

    cadastrados.forEach(function(pokemon) {
        let card = document.createElement("article");
        card.className = "pokemon-card pokemon-cadastrado";
        card.dataset.nome = pokemon.nome.toLowerCase();
        let tiposFiltro = {
            "fogo": "fire", "água": "water", "planta": "grass", "elétrico": "electric",
            "normal": "normal", "inseto": "bug", "veneno": "poison", "voador": "flying",
            "terrestre": "ground", "pedra": "rock", "fada": "fairy", "lutador": "fighting",
            "psíquico": "psychic", "fantasma": "ghost", "gelo": "ice", "dragão": "dragon",
            "sombrio": "dark", "aço": "steel"
        };
        card.dataset.tipos = tiposFiltro[(pokemon.tipo || "").toLowerCase()] || (pokemon.tipo || "").toLowerCase();

        let numero = document.createElement("span");
        numero.className = "pokemon-numero";
        numero.textContent = pokemon.apiId
            ? "#" + String(pokemon.apiId).padStart(3, "0")
            : "PERSONALIZADO";

        let imagem = document.createElement("img");
        let numeroApi = Number(pokemon.apiId) || Number((pokemon.descricao || "").match(/Número:\\s*(\\d+)/)?.[1]) || 0;
        imagem.src = pokemon.imagem || (numeroApi ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + numeroApi + ".png" : "");
        imagem.alt = pokemon.nome;
        imagem.loading = "lazy";
        imagem.onerror = function() {
            if (numeroApi) {
                imagem.onerror = null;
                imagem.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + numeroApi + ".png";
            } else {
                imagem.style.display = "none";
            }
        };

        let nome = document.createElement("h3");
        nome.textContent = pokemon.nome;

        let tiposBox = document.createElement("div");
        tiposBox.className = "tipos";
        let tag = document.createElement("span");
        let classeTipo = {
            "fogo": "fire", "água": "water", "planta": "grass", "elétrico": "electric",
            "normal": "normal", "inseto": "bug", "veneno": "poison", "voador": "flying",
            "terrestre": "ground", "pedra": "rock", "fada": "fairy", "lutador": "fighting",
            "psíquico": "psychic", "fantasma": "ghost", "gelo": "ice", "dragão": "dragon",
            "sombrio": "dark", "aço": "steel"
        };
        let tipoOriginal = (pokemon.tipo || "").toLowerCase();
        tag.className = "tipo tipo-" + (classeTipo[tipoOriginal] || "normal");
        tag.textContent = pokemon.tipo || "Sem tipo";
        tiposBox.appendChild(tag);

        let botao = document.createElement("button");
        botao.type = "button";
        botao.className = "botao-adicionar";
        botao.textContent = "＋ Adicionar ao time";
        botao.addEventListener("click", function() {
            adicionarCadastroAoTime(pokemon);
        });

        card.appendChild(numero);
        card.appendChild(imagem);
        card.appendChild(nome);
        card.appendChild(tiposBox);
        card.appendChild(botao);
        grid.appendChild(card);
        pokemons.push(card);
    });
}

function adicionarCadastroAoTime(pokemon) {
    let time = JSON.parse(localStorage.getItem("meuTimePokemon")) || [];
    let idTime = "cadastro-" + pokemon.id;

    if (time.length >= 6) {
        alert("Seu time já está completo! Você pode ter até 6 Pokémon.");
        return;
    }

    if (time.some(function(item) { return item.id === idTime; })) {
        alert("Esse Pokémon já está no seu time!");
        return;
    }

    let amizade = prompt("Qual é o nível de amizade? Digite um valor de 1 a 10:");
    if (amizade === null) return;
    amizade = Number(amizade);

    if (!Number.isInteger(amizade) || amizade < 1 || amizade > 10) {
        alert("Digite um número inteiro entre 1 e 10.");
        return;
    }

    time.push({
        id: idTime,
        nome: pokemon.nome,
        imagem: pokemon.imagem,
        sprite: pokemon.imagem,
        tipos: [pokemon.tipo || "Normal"],
        amizade: amizade
    });

    localStorage.setItem("meuTimePokemon", JSON.stringify(time));
    atualizarContador();
    alert(pokemon.nome + " entrou para sua equipe!");
}

async function carregarAlbum() {
    try {
        let resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        if (!resposta.ok) throw new Error("Falha na PokéAPI");

        let dados = await resposta.json();

        for (let i = 0; i < dados.results.length; i += 20) {
            let grupo = dados.results.slice(i, i + 20);
            let respostas = await Promise.all(grupo.map(function(item) {
                return fetch(item.url);
            }));
            let detalhes = await Promise.all(respostas.map(function(item) {
                return item.json();
            }));
            detalhes.forEach(mostrarPokemon);
        }
        mostrarCadastrados();
    } catch (erro) {
        carregando.textContent = "Não foi possível carregar os Pokémon da API. Seus Pokémon cadastrados continuam disponíveis.";
        mostrarCadastrados();
        filtrarPokemons();
        console.log(erro);
        return;
    }

    carregando.style.display = "none";
    filtrarPokemons();
}

function filtrarPokemons() {
    let nome = busca.value.toLowerCase().trim();
    let tipo = filtro.value;

    pokemons.forEach(function(card) {
        let combinaNome = card.dataset.nome.includes(nome);
        let combinaTipo = tipo === "" || card.dataset.tipos.includes(tipo);
        card.style.display = combinaNome && combinaTipo ? "" : "none";
    });
}

busca.addEventListener("input", filtrarPokemons);
filtro.addEventListener("change", filtrarPokemons);
window.addEventListener("storage", atualizarContador);
atualizarContador();
carregarAlbum();
