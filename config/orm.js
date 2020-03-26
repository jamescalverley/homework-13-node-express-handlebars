const connection = require('./connection.js');
// const db = require('./connection.js')

// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

//! from connection.js =================
const mysql = require('mysql');

class Database {
    constructor( config ) {
        if (process.env.JAWSDB_URL) {
            // Database is JawsDB on Heroku
            this.connection = mysql.createConnection(process.env.JAWSDB_URL);
            console.log("db connection: jawsDB");

        } else {
            this.connection = mysql.createConnection( config );
            console.log("db connection: config");
        }
        
        this.connection ? console.log('db connection established'):process.exit(0);
    }
    query( sql, args=[] ) {
        return new Promise( ( resolve, reject ) => {
            
            this.connection.query( sql, args, ( error, results,fields ) => {
                if ( error ) {
                    resolve (error.code);
                } else
                //     console.log('returning error!');
                //     return reject( err );
                resolve( results );
            } );
        
        // catch (error){
        //     throw (error);
        //     // console.log('logging error from catch...',error);
        //     reject (error);
        // }
        } ).catch(error=>{
            console.log(error.code);
        });
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
  }

const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "burgers_db"
  });
//! from connection.js =================

async function getBurgerList(data){
  const burgerList = await db.query(`SELECT * FROM burgers WHERE devoured=false`);
  console.log("[burger list ORM]", burgerList)
  return burgerList
}

async function getDevourList(data){
  const devourList = await db.query('SELECT * FROM burgers WHERE devoured=true');
  console.log("[devour list ORM]", devourList)
  return devourList
}

async function addBurger(data){
  let test = [ data.burger_name, false ]
  console.log("[ORM -test- Burger to add: ]", test)
  const newBurger = await db.query( 'INSERT INTO burgers (burger_name,devoured) VALUES (?, false)', [ data.burger_name]);

  console.log("[ORM added burger to db]", newBurger)
  return newBurger
}

async function devourBurger(data){
  console.log("[ORM - devour]", data)
  const devourBurger = await db.query('UPDATE burgers SET devoured=true WHERE id=?', [ data.id ])
  return devourBurger
}

async function reset(){
  const reset = await db.query('DELETE FROM burgers WHERE id>0')
  console.log("[ORM - RESET]")
  return reset
}

module.exports = {
  getBurgerList,
  getDevourList,
  addBurger,
  devourBurger,
  reset
}

