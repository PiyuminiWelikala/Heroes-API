const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
    let heroes = heroesArray;
    res.send(heroes);
});

router.get('/:heroId', (req, res) => {
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

router.post('/', (req, res) => {

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

router.put('/:heroId', (req, res) => {
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

router.delete('/:heroId', (req, res) => {
    let heroId = parseInt(req.params.heroId);
    let hero = heroesArray.find(h => h.id === heroId);

    if(!hero){
        return res.status(404).send("The given Id does not exist on our server");
    }
    
    let indexOfHero = heroesArray.indexOf(hero);
    heroesArray.splice(indexOfHero, 1);
    res.send(hero);
});

module.exports = router;