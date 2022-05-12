const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const https = require('https');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { type } = require('express/lib/response');
const { isBuffer } = require('util');

mongoose.connect("const uri = mongodb+srv://akamizuna:Mizuna1992@cluster0.bfw2e.mongodb.net/2537?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
);

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

const pokemonModel = mongoose.model('pokemon', pokemonSchema);
const typeModel = mongoose.model('ability', typeSchema);

app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.listen(process.env.PORT || 5005, err => {
    if(err) throw err;
    console.log("Listening", process.env.PORT || 5005);
})

app.get('/', (req, res) => {
    pokemonModel.find({ name: "bulbasaur" }, (err, pokemon) => {
        if (err) throw err;
        console.log(pokemon)
        res.send(pokemon)
    })
})

app.get("/pokemon/:id", (req, res) => {
    pokemonModel.find({
        id: req.params.id}, (err, body) => {
            if (err) throw err;
            res.send(body);
    })
})

app.get("/pokemon/:name", (req, res) => {
    pokemonModel.find(({ name: req.params.name} , (err,body) => {
        if (err) throw err;
        res.send(body);
    }))
})

app.get("/ability/:")