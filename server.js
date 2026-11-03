const express = require("express");

const app = express();
const porta = 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

let pokemons = [];
let proximoId = 1;

app.get("/", (req, res) => {
    res.send("Servidor da Pokedex funcionando!");
});

// GET: listar todos
app.get("/pokemons", (req, res) => {
    res.json(pokemons);
});

// POST: cadastrar
app.post("/pokemons", (req, res) => {
    const pokemon = { ...req.body, id: proximoId };
    proximoId++;
    pokemons.push(pokemon);
    res.status(201).json(pokemon);
});

// PUT: editar
app.put("/pokemons/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = pokemons.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Pokemon nao encontrado." });
    }

    pokemons[indice] = { ...pokemons[indice], ...req.body, id: id };
    res.json(pokemons[indice]);
});

// DELETE: excluir
app.delete("/pokemons/:id", (req, res) => {
    const id = Number(req.params.id);
    const tamanhoAntes = pokemons.length;
    pokemons = pokemons.filter(p => p.id !== id);

    if (pokemons.length === tamanhoAntes) {
        return res.status(404).json({ mensagem: "Pokemon nao encontrado." });
    }

    res.json({ mensagem: "Pokemon excluido com sucesso!" });
});

app.listen(porta, () => {
    console.log("Servidor iniciado na porta " + porta);
});
