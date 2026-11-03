let gridTime = document.getElementById("gridTime");
let contadorTime = document.getElementById("contadorTime");
let timeVazio = document.getElementById("timeVazio");

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

function carregarTime() {
    let time = JSON.parse(localStorage.getItem("meuTimePokemon")) || [];
    gridTime.innerHTML = "";
    contadorTime.textContent = time.length + " / 6";

    if (time.length === 0) {
        timeVazio.style.display = "block";
    } else {
        timeVazio.style.display = "none";
    }

    for (let i = 0; i < 6; i++) {
        let espaco = document.createElement("article");
        espaco.className = "slot-time";

        if (time[i]) {
            let pokemon = time[i];
            espaco.classList.add("slot-ocupado");

            let numero = document.createElement("span");
            numero.className = "slot-numero";
            numero.textContent = "MEMBRO 0" + (i + 1);

            let imagem = document.createElement("img");
            imagem.src = pokemon.sprite || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png";
            imagem.alt = pokemon.nome;

            let nome = document.createElement("h2");
            nome.textContent = pokemon.nome;

            let tipos = document.createElement("p");
            tipos.className = "slot-tipos";
            tipos.textContent = pokemon.tipos.map(traduzirTipo).join(" / ");

            let amizade = document.createElement("div");
            amizade.className = "amizade";
            amizade.textContent = "AMIZADE " + pokemon.amizade + "/10";

            let barra = document.createElement("div");
            barra.className = "amizade-barra";
            let progresso = document.createElement("span");
            progresso.style.width = (pokemon.amizade * 10) + "%";
            barra.appendChild(progresso);

            let botao = document.createElement("button");
            botao.type = "button";
            botao.className = "remover-time";
            botao.textContent = "Remover";
            botao.addEventListener("click", function() {
                removerPokemon(pokemon.id);
            });

            espaco.appendChild(numero);
            espaco.appendChild(imagem);
            espaco.appendChild(nome);
            espaco.appendChild(tipos);
            espaco.appendChild(amizade);
            espaco.appendChild(barra);
            espaco.appendChild(botao);
        } else {
            espaco.classList.add("slot-vazio");
            let icone = document.createElement("span");
            icone.className = "slot-pokebola";
            icone.textContent = "＋";
            let texto = document.createElement("p");
            texto.textContent = "ESPAÇO DISPONÍVEL";
            espaco.appendChild(icone);
            espaco.appendChild(texto);
        }

        gridTime.appendChild(espaco);
    }
}

function removerPokemon(id) {
    let time = JSON.parse(localStorage.getItem("meuTimePokemon")) || [];
    time = time.filter(function(pokemon) {
        return pokemon.id !== id;
    });
    localStorage.setItem("meuTimePokemon", JSON.stringify(time));
    carregarTime();
}

carregarTime();
