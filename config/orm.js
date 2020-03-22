const connection = require('./connection.js');

// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });


async function displayBurgerList(){
  const burgerList = await db.query(`SELECT * FROM burgers WHERE devoured=false`);
  return burgerList
}

async function displayDevourList(){
  const devourList = await db.query('SELECT * FROM burgers WHERE devoured=true');
  return devourList
}

async function addBurger(data){
  const newBurger = await db.query( 'INSERT INTO burgers (burger_name,devoured) VALUES (?,?)', [ data.burgerName, data.devourStatus ]);
  return newBurger
}

async function devourBurger(data){
  const devourBurger = await db.query('UPDATE burgers (burger_name, devoured) V.......', [ data.burgerName, data.devourStatus ])
  return devourBurger
}

module.exports = {
  displayBurgerList,
  displayDevourList,
  addBurger,
  devourBurger
}

