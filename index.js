const express = require('express')
const app = express();
const port = 8080;
//Estou informando para o Express usar o EJS como View Engine
app.set('view engine','ejs');
app.use(express.static('public'))

app.get('/',function(req, res){
    res.render('home');

});

app.get('/pergunta',function(req, res) {
    res.render('pergunta');
});

app.listen(port,function(error) {
    if(error){
        console.log('Houve um ERRO na hora de iniciar o servidor');

    }
    console.log('Servidor funcionando corretamente');
});