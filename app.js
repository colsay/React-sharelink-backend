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
    knex
        .select('id', 'title', 'url', 'tags', 'vvid').from('sharelink')
        .then((obj) => {
            res.json(obj)
            console.log(obj, 'this is get request')
        })

})

app.post('/', (req, res) => {
    console.log(req.body)
    const item = req.body
    knex('sharelink')
        .insert({ title: item.name, url: item.url, tags: item.tags, vvid: item.id })
        .then(() => {
            console.log('inserted')
            knex.select('id', 'title', 'url', 'tags', 'vvid').from('sharelink')
                .then((obj) => {
                    res.json(obj)
                    console.log(obj)
                })
        })

})

app.delete('/', (req, res) => {
    console.log(req.body, 'deleting this')
    const item = req.body
    return knex('sharelink')
        .where('vvid', item.vvid).del()
        .then(() => {
            console.log('deleted')
            // knex.select('id', 'title', 'url', 'tags', 'vvid').from('sharelink')
            //     .then((obj) => {
            //         res.json(obj)
            //         console.log(obj, 'after delete')
            //     })
        })


})


app.listen(8000, () => {
    console.log(`Application listening to port 8000`);
});
