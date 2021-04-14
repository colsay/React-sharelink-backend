const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: process.env.db_name,
        user: process.env.db_username,
        password: process.env.db_password,
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    let links = knex
        .select('id', 'title', 'url', 'vvid').from('sharelink')
    console.log(links)
    return links;

})

app.post('/', (req, res) => {

    const item = req.body
    knex('sharelink')
        .insert({ title: item.name, url: item.url, tags: item.tags, vvid: item.id })
        .then(() => {
            console.log('inserted')
        })


})

app.delete('/', (req, res) => {

    const item = req.body
    return knex('sharelink')
        .where('vvid', item.id).del()
        .then(() => {
            console.log('deleted')
        })
})


app.listen(8000, () => {
    console.log(`Application listening to port 8000`);
});
