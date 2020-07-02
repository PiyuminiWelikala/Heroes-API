const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let heroesArray = [
    {
        id: 1,
        name: "Captain America"
    },
    {
        id: 2,
        name: "Iron Man"
    },
    {
        id: 3,
        name: "Black Widow"
    }
];

app.get('/', (req, res) => {
    res.send('Avengers Assemble');
})

app.get('/api/heroes', (req, res) => {
    //let heroes = ['Captain America', 'Iron Man', 'Black Widow'];
    let heroes = heroesArray;
    res.send(heroes);
});

app.get('/api/heroes/:heroId', (req, res) => {
    let heroId = parseInt(req.params.heroId); //request parameter
    let hero = heroesArray.find(h => h.id === heroId);

    if (!hero) {
        res.status(404).send("The given Id does not exist on our server");
    }

    res.send(hero);

    //let optionalValue = req.query.showMore; //query parameter
    //res.send("You Requested for hero Id:" + heroId);
});

/*app.get('/api/heroes/1', (req, res) =>{     //hardcorded
    let hero = {id:1, name:'Captain America'};
    res.send(hero);
})*/

app.post('/api/heroes', (req, res) => {

    if (!req.body.heroName) {
        return res.status(400).send("Not all mandatory values have been set!");
    }

    let newHeroObj = {
        id: heroesArray.length + 1,
        name: req.body.heroName
    };
    heroesArray.push(newHeroObj);
    console.log(heroesArray);
    res.send(newHeroObj);
});

app.put('/api/heroes/:heroId', (req, res) => {
    let heroId = parseInt(req.params.heroId);
    let hero = heroesArray.find(h => h.id === heroId);

    if (!hero) {
        return res.status(404).send("The given Id does not exist on our server");
    }

    if (!req.body.heroName) {
        return res.status(400).send("Not all mandatory values have been set!");
    }

    hero.name = req.body.heroName;
    console.log(heroesArray);
    res.send(hero);

});

app.delete('/api/heroes/:heroId', (req, res) => {
    let heroId = parseInt(req.params.heroId);
    let hero = heroesArray.find(h => h.id === heroId);

    if(!hero){
        return res.status(404).send("The given Id does not exist on our server");
    }
    
    let indexOfHero = heroesArray.indexOf(hero);
    heroesArray.splice(indexOfHero, 1);
    res.send(hero);
});

app.listen(PORT, function () {
    console.log("Listening on Port - " + PORT);
});