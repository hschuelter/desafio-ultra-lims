const express = require("express");
const path = require('path');
const bodyParser = require('body-parser')
let cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

var data = {
    'enderecos' : [
        {
            "cep" : '89203070',
            "logradouro" : "Rua Jacob Eisenhuth",
            "cidade" : "Joinville",
            "estado" : "SC",
            "bairro" : "Atiradores"
        },
        {
            "cep" : "80240060",
            "logradouro" : "Rua Brasílio Itiberê",
            "cidade" : "Curitiba ",
            "estado" : "PR",
            "bairro" : "Água Verde"
        }
    ]
}

app.use(cors());

app.get("/api/enderecos", (req, res) => {
    res.json(data);
});

app.post("/api/post", (req, res) => {
    const { cep, logradouro, cidade, estado, bairro } = req.body;
    if (cep === undefined) return;

    const novo_endereco = {
        cep, 
        logradouro,
        cidade,
        estado,
        bairro
    };
    data.enderecos.push(novo_endereco);
    res.send({ status: 'SUCCESS' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
