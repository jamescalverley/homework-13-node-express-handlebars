
//! TO-DO LIST

//* COMPLETE Get mysql and database running
//? Build front end
//? API calls 
//? handlebars

//! look at MVC model for structuring files

require('dotenv').config(); // --> process.env

const express = require('express');
const exphbs = require("express-handlebars");
const orm = require('./config/orm.js');
// const connection = require('./config/connection.js');

const app = express();

const PORT = process.env.PORT || 3000;

//handlebars
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));

// app.engine('handlebars', handlebars({
//     layoutsDir: __dirname + '/views/layouts',
//     xtname: 'handlebars'
//     }));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(express.static('./public'));

const burgerList = [
    {
        burger_name: "hamburger"
    },
    {
        burger_name: "cheeseburger"
    }
]


app.get('/', async (req,res) => {

    const resultBurgers = burgerList;

    res.render('burger', {burgers: resultBurgers })
})

//get burger list
// app.get('/api/burgerlist', async (req,res) => {
//     console.log("API call >>> get burger list");
//     const result = await orm.getBurgerList();
//     res.send(result)
// })

//* HANDLEBARS
// app.get('/api/burgerlist', async (req,res) => {
//     console.log("[API CALL] >> handlebars");
//     const result = await orm.getBurgerList();
//     console.log("result>>>>", result)
    
//     res.render( 'burger', { burgers: result } );
// })



// get devour list
app.get('/api/burgerdevourlist', async (req,res) => {
    console.log("API call >>>> get devour list");
    const result = await orm.getDevourList();
    res.send(result)
})

// add new burger
app.post('/api/addburger', async (req,res) => {
    const result = await orm.addBurger(req.body);
    console.log("[SERVER - Burger to add:]", req.body)
    console.log("[SERVER RESULT]", result)
    res.json({response:"Added burger", result})
})

// devour burger 
app.post('/api/devour', async (req,res) => {
    const result = await orm.devourBurger(req.body);
    console.log("[SERVER - devour burger]", result)
    res.json({ response: "devoured burger", result})
})

//reset
app.delete('/api/reset', async (req,res) => {
    const result = await orm.reset(req.body);
    res.json({ response: "burger reset", result})
})






app.listen(PORT, function(){
    console.log(`[SERVER RUNNING] listening on PORT: ${PORT}`)
})