import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleProfile from './controllers/profile.js';
import handleSignIn from './controllers/signin.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'Gr00ts3unDB',
        database: 'SmartBrainDB'
    },
});

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (request, response) => { response.send(database.users)})
app.post('/signin', (request, response) => { handleSignIn(request, response, db, bcrypt) })
app.post('/register', (request, response) => { handleRegister(request, response, db, bcrypt) })
app.get('/profile/:id', (request, response) => { handleProfile(request, response, db) })
app.put('/image', (request, response) => { handleImage(request, response, db) })
app.post('/imageurl', (request, response) => { handleApiCall(request, response) })

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});
