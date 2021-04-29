const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '3121',
        database: 'groupbuy'
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
    const { email, name, password, premission } = req.body;
    if (email && password && name &&premission) {
       db('users').returning('*')
       .insert({email, name, password, premission})
       .then(user =>{res.json(user[0]);})
       .catch(err => res.status(400).json('Unable to register'))
    }
    else {
        res.status(400).json('Error creating new user');
    }
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})

app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
