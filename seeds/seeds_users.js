const mongoose = require('mongoose');
const clubs = require('../models/users');
const users = require('../models/users');

mongoose.connect('mongodb://localhost:27017/GK', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


const seedUsers = [
    {
        name: 'b22001',
        password: 'b22001@gk'
    },
    {
        name: 'b22002',
        password: 'b22002@gk'
    },
    {
        name: 'b22003',
        password: 'b22003@gk'
    },
    {
        name: 'b22004',
        password: 'b22004@gk'
    },
    {
        name: 'b22005',
        password: 'b22005@gk'
    },
]



const ret = async () => {
    await users.deleteMany({});
    await users.insertMany(seedUsers)
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