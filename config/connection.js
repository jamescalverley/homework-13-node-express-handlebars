//! need to export to orm.js 


// const mysql = require('mysql');

// class Database {
//     constructor( config ) {
//         if (process.env.JAWSDB_URL) {
//             // Database is JawsDB on Heroku
//             this.connection = mysql.createConnection(process.env.JAWSDB_URL);
//             console.log("db connection: jawsDB");

//         } else {
//             this.connection = mysql.createConnection( config );
//             console.log("db connection: config");
//         }
        
//         this.connection ? console.log('db connection established'):process.exit(0);
//     }
//     query( sql, args=[] ) {
//         return new Promise( ( resolve, reject ) => {
            
//             this.connection.query( sql, args, ( error, results,fields ) => {
//                 if ( error ) {
//                     resolve (error.code);
//                 } else
//                 //     console.log('returning error!');
//                 //     return reject( err );
//                 resolve( results );
//             } );
        
//         // catch (error){
//         //     throw (error);
//         //     // console.log('logging error from catch...',error);
//         //     reject (error);
//         // }
//         } ).catch(error=>{
//             console.log(error.code);
//         });
//     }
//     close() {
//         return new Promise( ( resolve, reject ) => {
//             this.connection.end( err => {
//                 if ( err )
//                     return reject( err );
//                 resolve();
//             } );
//         } );
//     }
//   }

// const db = new Database({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "root",
//     database: "burgers_db"
//   });

  
// //? not needed ???  
// module.exports = {
//       db
//   };



