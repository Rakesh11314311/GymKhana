const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const Clubs = require('./models/clubs');
const Users = require('./models/users');
const Requests = require('./models/requests');
const methodOverride = require('method-override');
const users = require('./models/users');



mongoose.connect('mongodb://localhost:27017/GK', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const db = mongoose.connection;

/*
Both 'on' and 'once' are event listeners for mongoose.connection :
db.on:    Listens to an event continuously and will execute the provided callback function every time the event occurs.
db.once:    Listens to an event only once and then automatically removes the listener after the first time the event occurs.
*/

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/', async (req, res) => {
    //await console.log(req.body);
    const tempUser = new Users(req.body);
    //console.log(tempUser)
    const tempoUser = await Users.find({ name: tempUser.name })
    //console.log(tempoUser)
    if (tempUser.length != 0) {
        if (tempoUser[0].password == tempUser.password) {
            res.redirect(`/gymkhanaclubs`)
        }
        else {
            res.redirect(`/`)
        }
    }
    else {
        res.redirect(`/`)
    }

})

app.get('/register', async (req, res) => {
    res.render('newregis')
})

app.post('/newregis', async (req, res) => {
    const tempUser = new Users(req.body);
    tempUser.save();

    res.redirect('/login');
})

app.get('/gymkhanaclubs', async (req, res) => {
    const club_lst = await Clubs.find({});
    res.render('gymkhana', { club_lst })
})

app.post('/gymkhanaclubs', async (req, res) => {
    const newReq = new Requests(req.body);
    await newReq.save();
    const clubby = await Clubs.find({ name: newReq.club_name });
    res.redirect(`/gymkhanaclubs/${clubby[0]._id}/unresolved`)
})

app.get('/gymkhanaclubs/:id', async (req, res,) => {
    const club = await Clubs.findById(req.params.id)
    res.render('club_page', { club });
});

app.get('/gymkhanaclubs/:id/new', async (req, res,) => {
    const club = await Clubs.findById(req.params.id)
    res.render('add_req', { club });
});

app.get('/gymkhanaclubs/:id/unresolved', async (req, res,) => {
    const club = await Clubs.findById(req.params.id)
    //console.log(club);
    const unresolveds = await Requests.find({ club_name: club.name, resolved: false });
    //console.log(unresolveds);
    // const { club_name } = req.params;
    // //console.log(club_name);
    if (unresolveds.length > 0) {
        res.render('unresolved', { name: club.name, unresolveds });
    }
    else {
        res.render('invalid');
    }


});



app.get('/gymkhanaclubs/:id/resolved', async (req, res,) => {
    const club = await Clubs.findById(req.params.id)
    //console.log(club);
    const resolveds = await Requests.find({ club_name: club.name, resolved: true });
    //console.log(unresolveds);
    // const { club_name } = req.params;
    // //console.log(club_name);
    if (resolveds.length > 0) {
        res.render('resolved', { name: club.name, resolveds });
    }
    else {
        res.render('invalid');
    }


});





app.listen(4040, () => {
    console.log('Serving on port 4040')
})