const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const https = require('https');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');



mongoose.connect("mongodb+srv://akamizuna:Mizuna1992@cluster0.bfw2e.mongodb.net/2537?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Listening", process.env.PORT || 5000);
})

pokemonurl = "http://localhost:5001/";

const pokemonSchema = new mongoose.Schema({
    id: Number,
    name: String,
    abilities: [Object],
    stats: [Object],
    sprites: Object,
    types: [Object],
    weight: Number
}, { collection: 'pokemon' });

const typeSchema = new mongoose.Schema ({
    name: String,
    id: Number,
    pokemon: [Object],
}, { collection: 'ability'});

const eventSchema = new mongoose.Schema({
    text: String,
    hits: Number,
    time: String,
});

const pokemonModel = mongoose.model('pokemon', pokemonSchema);
const typeModel = mongoose.model('ability', typeSchema);
const eventModel = mongoose.model("timeline", eventSchema);

app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/profile/:id", function (req, res) {
    const url = pokeapiUrl + `pokemon/${req.params.id}`;
    data = "";

    http.get(url, function (https_res) {
      https_res.on("data", function (chunk) {
        data += chunk;
      });
      https_res.on("end", function () {
        res.render("profile.ejs", getPokemonData(data));
      });
    });
  });


function getPokemonData (data) {
    data = JSON.parse(data);
    pokemonData = {
        name: data.name[0],
        img: data.sprites.other["official-artwork"].front_default,
        stats:stats,
    };
    return pokemonData;
}


app.get('/', (req, res) => {
    res.redirect('/index.html');
})

app.get('/pokemon/:name', (req, res) => {
    let queryobject = isNaN(req.params.name) ? {name: req.params.name} : {id: req.params.name};
    pokemonModel.find(queryobject, (err, body) => {
            if (err) throw err;
            res.send(body);
    })
})


app.get('/ability/:name', (req, res) => {
    typeModel.find({ name:req.params.name}, (err,body) => {
        if (err) throw err;
        res.send(body);
    })
})

app.get("/timeline/remove/:id", function (req,res) {
    eventModel
})
