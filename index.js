const express = require('express');
const app = express ();

// ULTILIZANDO O EJS VIEW ENGINE
app.set ('view engine', 'ejs');
// ARQUIVOS ESTÁTICOS
app.use(express.static('public'));

app.get ('/', (req, res) => {
    res.render('index');

});










app.listen (8000, () => {
    console.log ('APP RODANDO');

});