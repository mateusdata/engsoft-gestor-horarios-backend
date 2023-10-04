var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send({name:"Projeto de engenharia do sofware", version:"6° semestre"})
})

app.listen(3001, ()=>{
    console.log("Servidor rodando na porta 3000")
});