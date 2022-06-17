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
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC'] //ORDEM DECRESCENTE
    ]}).then(perguntas =>{
        res.render('index', {
            perguntas: perguntas
        });
    });
});
   

app.get('/perguntar', (req, res) => {
    res.render ('perguntar');
});


// RECEBER OS DADOS E DIRECIONAR PARA HOME
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


//ENCONTRAR A PERGUNTA PELO ID E DIRECIONAR PARRA PERGUNTA
app.get ('/pergunta/:id', (req, res) =>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined){
            res.render('pergunta', {
                pergunta: pergunta
            });
        }else {
            res.redirect('/');
        }
    });
});



app.listen (8000, () => {
    console.log ('App Iniciado!');

});