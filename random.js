console.log("1 : Before calling Db ... ");  

function getMovieDataFromDb() { 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2 : Reading movie data from our db ... ")
            let dbData = { id: 30, name: ' Avengers : End Game' }
            resolve(dbData.name);
        }, 4000);
    });   
}

async function printMovieDetails() {
    let movieDataFromDB = await getMovieDataFromDb();
    //let secondFucntion = await getActorDetailsFromImDB();
    console.log("3 : Movie data : " + movieDataFromDB);
}
printMovieDetails();



/* -- using resolved promise

getMovieDataFromDb().then((result) => {
    let movieDataFromDB = result;
    console.log("3 : Movie data :" + movieDataFromDB);
}).then((rr) => {
    hetActorDetailsFromImDb()
}).then((rr) => {
    console.log("ssss");
})*/


console.log("4 : Doing some other work now ... ");  


/*console.log("1 : Before calling Db ... ");  //synchronous

function getMovieDataFromDb() { //asynchronous
    setTimeout(() => {
        console.log("2 : Reading movie data from our db ... ")
        return { id: 30, name: 'Avengers : End Game' }
    }, 4000);
}

let movieDataFromDB = getMovieDataFromDb();
console.log("3 : Movie data :" + movieDataFromDB)

console.log("4 : Doing some other work now ... ");  //synchronous
*/