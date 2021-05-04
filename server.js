const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const knex = require('knex');
var cors = require('cors')

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('this is working')
})

// GET Users List
app.get('/users', (req, res) => {
    db.select('*').from('users').then(data => {
        res.send(data);
    });
})

// app.post('/signin', (req, res) => {
//     database.users.forEach(user => {
//         if (req.body.email == user.email) {
//             if (user.password == req.body.password) {
//                 res.json('Welcome back ' + user.name)
//             }
//             else res.status(400).json('wrong password')
//         }
//     });
//     res.status(400).json('No such email in database');
// })

app.post('/register', (req, res) => {
    const { Email, FirstName, LastName } = req.body;
    if (Email && FirstName && LastName) {
       db('users').returning('*')
       .insert(
           {
            email: Email,
            firstName: FirstName,
            lastName: LastName,
            joined: new Date()}
            )
       .catch(err => res.status(401).json('insert error'))
       .then(user =>{res.json(users[0]);})
       .catch(err => res.status(400).json('Unable to register'))
    }
    else {
        res.status(400).json('Error creating new user');
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})

//CORS:
app.use(cors());
// app.use(function (req, res, next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
