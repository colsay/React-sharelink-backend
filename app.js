const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const CovidService = require('./CovidService')


const app = express();
app.use(bodyParser.json());
app.use(cors());

// const covidservice = new CovidService();

app.get('/', (req, res) => {
    res.send('hello back')

})

// app.use('', new CovidRouter(covidservice).router());


app.listen(3000, () => {
    console.log(`Application listening to port 3000`);
});
