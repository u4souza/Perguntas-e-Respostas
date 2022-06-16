const express = require('express');
const app = express ();
const bodyParser = require ('body-parser');
const connection = require ('./database/database')
const perguntaModel = require('./database/Pergunta');

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
    res.render('index');});

app.get('/perguntar', (req, res) => {
    res.render ('perguntar');
});

app.post('/salvarpergunta',(req, res) => {
    var titulo = req.body.titulo;
    var descricao= req.body.descricao;
    res.send('FORMULÁRIO RECEBIDO!' + ' Título ' + titulo + ' ' + 'Descrição ' + descricao);
});





app.listen (8000, () => {
    console.log ('App Iniciado!');

});