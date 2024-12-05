const mongoose = require('mongoose');
const requests = require('../models/requests');

mongoose.connect('mongodb://localhost:27017/GK', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


const seedRequests = [
    {
        resolved: false,
        subject: "Sub_1",
        body: "Bod_1",
        club_name: "Hike n Trek",
        upvote: 10
    },
    {
        resolved: false,
        subject: "Sub_2",
        body: "Bod_2",
        club_name: "Drama",
        upvote: 10
    },
    {
        resolved: false,
        subject: "Sub_3",
        body: "Bod_3",
        club_name: "Literary",
        upvote: 10
    },
    {
        resolved: false,
        subject: "Sub_4",
        body: "Bod_4",
        club_name: "Music",
        upvote: 10
    },
    {
        resolved: false,
        subject: "Sub_5",
        body: "Bod_5",
        club_name: "Technical",
        upvote: 10
    },
    {
        subject: "Sub_6",
        body: "Bod_6",
        club_name: "Sports",
    },
    {
        resolved: true,
        subject: "Sub_7",
        body: "Bod_7",
        club_name: "Sports",
        upvote: 10
    },
]



const ret = async () => {
    await requests.deleteMany({});
    await requests.insertMany(seedRequests)
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