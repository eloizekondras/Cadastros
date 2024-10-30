//npm install express express-handlebars mysql2 nodemon sequelize

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const conn = require('./db/conn')
const Handlebars = require('handlebars');
//Rotas
const produtosRoutes = require('./routes/produtosRoutes')

// Função para formatar o valor como moeda
Handlebars.registerHelper('formatCurrency', function(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
});

app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')

app.use(
    express.urlencoded({
        extended : true
    })
)

app.use(express.json())
app.use(express.static('public'))
app.use('/produtos',produtosRoutes)

conn
    .sync()
    .then(()=> {
        app.listen(3000)
    })
    .catch((err) => console.log(err))