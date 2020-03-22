
//! TO-DO LIST

//? Get mysql and database running
//? run mysql from the command line
//? Build front end
//? API calls 
//? handlebars

require('dotenv').config(); // --> process.env

const express = require('express');
const orm = require('./config/orm.js');
// const connection = require('./config/connection.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('./public'));


app.post('/api/addburger', async (res,req) => {
    const result = await orm.addBurger(req.body);
    res.json({response:"Added burger"})
})






app.listen(PORT, function(){
    console.log(`[SERVER RUNNING] listening on PORT: ${PORT}`)
})