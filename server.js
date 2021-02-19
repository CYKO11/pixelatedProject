require('dotenv').config();

const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
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

// set global var for daatabse connection pool
app.set('db', knex);

// for backend request body
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

//api / webhost
app.use('/api', require('./api/api'));

// start the server
app.listen(process.env.WEBHOSTPORT, function() {
	console.log("App started on port: "+ process.env.WEBHOSTPORT);
});