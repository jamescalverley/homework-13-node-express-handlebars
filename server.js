
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
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('./public'));

// render index.html
app.get('/', async (req,res) => {
    res.sendFile('./public/index.html');
})

//get burger list
app.get('/api/burgerlist', async (req,res) => {
    console.log("API call >>> get burger list");
    const result = await orm.getBurgerList();
    res.send(result)
})

// //handlebars render
// app.get('/api/burgerdisplay', async (req,res) => {
//     const result = await orm.displayBurgerList();
//     data = { 
//         burgers: []
//     };
//     result.forEach( burger => {
//         data.burgers.push(burger)
//     });
//     console.log("ready to render >>>:", data)
    
//     // res.send(data)
//     //render with handlebars
//     res.render("index", data)
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








app.listen(PORT, function(){
    console.log(`[SERVER RUNNING] listening on PORT: ${PORT}`)
})