
//! TO-DO LIST

//* COMPLETE Get mysql and database running
//? Build front end
//? API calls 
//? handlebars

//! look at MVC model for structuring files

require('dotenv').config(); // --> process.env

const express = require('express');
const orm = require('./config/orm.js');
// const connection = require('./config/connection.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('./public'));




// get burger list
app.get('/api/burgerdisplay', async (req,res) => {
    console.log("API call >>> get burger list");
    const result = await orm.displayBurgerList();
    res.json(result)
})
// get devour list
app.get('/api/burgerdevour', async (req,res) => {
    console.log("API call >>>> get devour list");
    const result = await orm.displayDevourList();
    res.json(result)
})


// add new burger
app.post('/api/addburger', async (req,res) => {
    
    const result = await orm.addBurger(req.body);
    console.log("[SERVER - Burger to add:]", req.body)
    res.json({response:"Added burger"})
})

// devour burger 








app.listen(PORT, function(){
    console.log(`[SERVER RUNNING] listening on PORT: ${PORT}`)
})