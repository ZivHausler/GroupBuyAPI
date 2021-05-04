const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('this is working')
})


app.post('/register', async (req, res) => {
    const { email, firstName, lastName } = req.body;
    console.log(email, firstName, lastName)
    if (email && firstName && lastName) {
        db('users')
            .returning('*')
            .insert({
                lastName: lastName,
                email: email,
                joined: new Date()
            })
            .catch(err => res.status(400).json('insert error'))
            .then(user => { res.json(users[0]); })
            .catch(err => res.status(400).json('returning error'))
    }
    else {
        res.status(400).json('Error creating new user');
    }
})

app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})