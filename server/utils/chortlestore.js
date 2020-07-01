const fs = require('fs');
let chortles = { nextid: 0 };

if(fs.existsSync('chortles.json')) {
    chortles = JSON.parse(fs.readFileSync('chortles.json'));
}

let getChortles = () => {
    return Object.assign({}, chortles); //create a copy and return it
}

let getChortle = id => {
    return Object.assign({}, chortles[id]); //create a copy and return it
}

let createChortle = (chortle) => {
    chortles[chortles.nextid++] = chortle;
    writeChortles();
};

let updateChortle = (id, chortle) => {
    chortles[id] = chortle;
    writeChortles();
}

let deleteChortle = id => {
    delete chortles[id];
    writeChortles();
}

let writeChortles = () => {
    fs.writeFileSync('chortles.json', JSON.stringify(chortles));
};

module.exports = {
    CreateChortle: createChortle,
    DeleteChortle: deleteChortle,
    GetChortles: getChortles,
    GetChortle: getChortle,
    UpdateChortle: updateChortle
}