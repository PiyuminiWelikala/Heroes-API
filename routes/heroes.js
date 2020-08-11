const express = require('express');
const Hero = require('../models/hero');
const router = express.Router();

/*let heroesArray = [
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
];*/

/*router.get('/',(req, res) => {
    res.send(heroesArray);
});*/

router.get('/', async (req, res) => {
                //filtering
    /*let heroes = await Hero.find( {deceased: true }); 
    let heroes = await Hero.find()
                            .or([{ likeCount: 3000 }, { likeCount: 5000}])
                            .sort({ name: 'asc' })
                            .select({ name: 1 , deceased: 1 })
                            .countDocuments();*/
    let heroes = await Hero.find()
    res.send(heroes);
});

/*router.get('/:heroId', (req, res) => {
    let heroId = parseInt(req.params.heroId); //request parameter
    let hero = heroesArray.find(h => h.id === heroId);

    if (!hero) {
        res.status(404).send("The given Id does not exist on our server");
    }

    res.send(hero);
});*/

router.get('/:heroId', async (req, res) => {
    let hero = await Hero.findById(req.params.heroId);

    if (!hero) {
        res.status(404).send("The given Id does not exist on our server");
    }

    res.send(hero);

    //let optionalValue = req.query.showMore; //query parameter
    //res.send("You Requested for hero Id:" + heroId);
});

/*router.post('/', (req, res) => {

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

});*/

router.post('/', async (req, res) => {

    if (!req.body.heroName) {
        return res.status(400).send("Not all mandatory values have been set!");
    }

    try {
        let heroToBrAddedToDb = new Hero({
            name: req.body.heroName,
            birthname: req.body.birthName,
            movies: req.body.movies,
            likeCount: req.body.likeCount,
            imgUrl: req.body.imgUrl,
            deceased: req.body.deceased

        });

        heroToBrAddedToDb = await heroToBrAddedToDb.save();
        res.send(heroToBrAddedToDb);
    } catch (e) {
        return res.status(500).send(e.message);
    }

});

/*router.put('/:heroId', (req, res) => {
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

});*/

/*router.put('/:heroId', async (req, res) => { //first method
    let hero = await Hero.findById(req.params.heroId);

    if (!hero) {
        return res.status(404).send("The given Id does not exist on our server");
    }

    if (!req.body.heroName) {
        return res.status(400).send("Not all mandatory values have been set!");
    }

    hero.set({name : req.body.heroName});
    hero = await hero.save();
    res.send(hero);

});*/

router.put('/:heroId', async (req, res) =>{ //second method
    Hero.findByIdAndUpdate(
        { _id: req.params.heroId },
        { $set: { name: req.params.heroId } },
        { new: true, userFindAndModify: false}
    );
    res.send(hero);
});

/*router.delete('/:heroId', (req, res) => {
    let heroId = parseInt(req.params.heroId);
    let hero = heroesArray.find(h => h.id === heroId);

    if (!hero) {
        return res.status(404).send("The given Id does not exist on our server");
    }

    let indexOfHero = heroesArray.indexOf(hero);
    heroesArray.splice(indexOfHero, 1);
    res.send(hero);
});*/

router.delete('/:heroId', async (req, res) => {
    let hero = await Hero.findOneAndDelete({ _id: req.params.heroId});

    if (!hero) {
        return res.status(404).send("The given Id does not exist on our server");
    }

    res.send(hero);
});

module.exports = router;