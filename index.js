const express = require('express');
const app = express ();
const bodyParser = require ('body-parser');
const connection = require ('./database/database')
const Pergunta = require('./database/Pergunta');

//DATABASE
connection
.authenticate()
.then(() => {
console.log('Conexão feita com sucesso!');
})
.catch((msgErro) =>{
    console.log(msgErro);
})


// ULTILIZANDO O EJS VIEW ENGINE
app.set ('view engine', 'ejs');

// ARQUIVOS ESTÁTICOS
app.use(express.static('public'));

//VAI DECODIFICAR OS VALORES DO FORMULARIO
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ROTAS
app.get ('/', (req, res) => {
    Pergunta.findAll({raw: true}).then(perguntas =>{
        res.render('index', {
            perguntas: perguntas
        });
    });
});
   

app.get('/perguntar', (req, res) => {
    res.render ('perguntar');
});

app.post('/salvarpergunta',(req, res) => {
    var titulo = req.body.titulo;
    var descricao= req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() =>{ 
        res.redirect('/');
    });
});





app.listen (8000, () => {
    console.log ('App Iniciado!');

});