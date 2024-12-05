const mongoose = require('mongoose');
const clubs = require('../models/clubs');

mongoose.connect('mongodb://localhost:27017/GK', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


const seedClubs = [
    {
        name: 'Hike n Trek',
        description: 'Lets Touch the Sky',
        founded_year: 2015
    },
    {
        name: 'Sports',
        description: 'Lets Play',
        founded_year: 2010
    },
    {
        name: 'Drama',
        description: 'Lets Act',
        founded_year: 2012
    },
    {
        name: 'Literary',
        description: 'Lets Read',
        founded_year: 2016
    },
    {
        name: 'Music',
        description: 'Lets Sing',
        founded_year: 2011
    },
    {
        name: 'Technical',
        description: 'Lets Build',
        founded_year: 2009
    },
]



const ret = async () => {
    await clubs.deleteMany({});
    await clubs.insertMany(seedClubs)
        .then(res => {
            //console.log(res)
        })
        .catch(e => {
            console.log(e)
        })
}

ret().then(() => {
    mongoose.connection.close();
})