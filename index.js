import express from 'express';
import bodyParser from 'body-parser';
import connection from './database/database.js';
import question from './database/Questions.js';
const app = express();
const port = 8080;  

connection
    .authenticate()
    .then(() =>{
            console.log('Conexão feita com sucesso')
    })
    .catch((msgErro)=>{
        console.log(msgErro)
    })
//Estou informando para o Express usar o EJS como View Engine
app.set('view engine','ejs');
app.use(express.static('public'))
//Utilizando o BodyParse
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get('/',function(req, res){
    //.findAll é o mesmo que SELECT * FROM formulario.question.....
    question.findAll({raw: false, order:[
        ['id','DESC']
    ]}).then(questions => {
        res.render('home',{
            questions:questions
        });

    })
});

app.get('/question',function(req, res) {
    res.render('pergunta');
});
app.get('/question/:id', function(req, res){
    var id = req.params.id;
    question.findOne({
        where: {id: id}
    }).then(question => {
        if(question != undefined){//Nessa logica o valor e encontrado
            res.render('question',{
                question:question
            });
        }else{// Nessa logica o valor não e encontrado 
            res.redirect('/');
        }
    });
})



app.post('/answerMyquestion',function(req,res){
    var tittle = req.body.tittle
    var description = req.body.description
    
    //O mesmo que INSERT INTO formulario.question...
    question.create({
        tittle: tittle,     
        description: description
    }).then(() => {
        res.redirect('/')
    })
});

app.listen(port,function(error) {
    if(error){
        console.log('Houve um ERRO na hora de iniciar o servidor');

    }
    console.log('Servidor funcionando corretamente');
});