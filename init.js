const tables = require('./api/database/tables.json');
const mysql = require('mysql');

require('dotenv').config();

async function init(){
    const conn = mysql.createConnection({
        host: process.env.HOST,
        port : process.env.DBPORT,
        user: process.env.DBUSER,
        password: process.env.PASS
    });
    await connectPromise(conn);

    // resetting db
    await req(conn, "DROP DATABASE " + process.env.DB);
    await req(conn, "CREATE DATABASE " + process.env.DB);

    // connecting to new db
    const newConn = mysql.createConnection({
        host: process.env.HOST,
        port : process.env.DBPORT,
        user: process.env.DBUSER,
        password: process.env.PASS,
        database: process.env.DB
    });
    await connectPromise(newConn);
    await build_tables(newConn, tables);
}

function connectPromise(conn){
    return new Promise((resolve) => {
        conn.connect((err) => {
            if (err) {
                console.log(["Cannot aquire senpai's attention", err.code, err.address + ':' + err.port]);
                process.exit(-3);
            }
            resolve('connected');
        })
    })
}

function build_tables(senpai, tables){
    var arr = [];
    tables.forEach(element => {
        arr.push(req(senpai, "CREATE TABLE " + build_table(element)));
        console.log();
        console.log("CREATE TABLE " + build_table(element));
        console.log();
    });
    return Promise.all(arr);
}

function build_table(table){
    var schema = "(";
    var columns = Object.keys(table.schema);
    columns.forEach((element,i) => {
        schema += " `" + element + "` " + table.schema[element];
        if (i != columns.length - 1)
            schema += ','; 
    })
    if (table.constraint)
        schema += ", " + table.constraint + " )";
    else
        schema += ")";
    return (table.name + schema);
}

function req(senpai, query){
    return new Promise((resolve) => {
        senpai.query(query, (err, res) => {
            if (err) {
                console.log(['Error','Error :' + err['sqlMessage']]);
            }
            resolve('connected');
        })
    })
}

init().then((res) => { console.log('done');process.exit(1); });