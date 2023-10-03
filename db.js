const mysql = require('mysql');



//MySQL details
// var mysqlConnection = mysql.createConnection({
//     host: 'angacinemas.com',
//     user: 'angacinemas_anga',
//     password: '!UhYUfs!h&jw',
//     database: 'angacinemas_anga',
//     multipleStatements: true
//     });


   
var mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'ikiota_db',
    multipleStatements: true
    });

    // var mysqlConnection = mysql.createConnection({
    //     host: '127.0.0.1',
    //     user: 'admin',
    //     password: 'p@55Admin',
    //     database: 'shopiadatabase',
    //     port: 3306,
    //     multipleStatements: true
    //     });
    mysqlConnection.connect((err)=> {
        if(!err)
        console.log('Connection Established Successfully');
        else console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
        });

        module.exports = mysqlConnection;
