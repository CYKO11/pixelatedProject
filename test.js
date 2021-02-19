require('dotenv').config();

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DB
    },
    pool: { min: 0, max: 10}
});

knex('users').select('email').then((users) => {
    console.log(users);
})