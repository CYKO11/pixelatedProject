// const mysql = require('mysql');
const QueryBuilder = require('node-querybuilder');

class dbConn{

    constructor(){
        this.connectionPool = new QueryBuilder({
            host: process.env.HOST,
            port: process.env.DBPORT,
            user: process.env.DBUSER,
            password: process.env.DBPASS,
            database: process.env.DB
        }, 'mysql', 'pool');

    }

    getPool(){
        return this.connectionPool;
    }

    getConn(){
        return new Promise(resolve => {
            this.connectionPool.get_connection(dbConnection => {
                resolve(dbConnection);
            })
        })
    }
    // for advanced queries to the database

    request(query){
        return new Promise((resolve) => {
            this.connectionPool.get_connection(db => {
                db.query(query, (err, res) => {
                    db.release();
                    // resolves with a status 'error' if there is any and places sql error in data field
                    if (err) resolve({
                        "status":"error",
                        "data": err
                    })
                    // ressolves with a status success and places the raw result in the data field
                    resolve({
                        "status":"success",
                        "data": res
                    });
                })
            })
        })
    }
}

module.exports = { dbConn };