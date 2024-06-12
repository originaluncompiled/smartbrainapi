import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleProfile from './controllers/profile.js';
import handleSignIn from './controllers/signin.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const { RENDER_DB_HOST, RENDER_DB_USER, RENDER_DB_PASSWORD,RENDER_DB_NAME, PORT } = process.env;

const db = knex({
    client: 'pg',
    connection: {
        host: RENDER_DB_HOST,
        port: 5432,
        user: RENDER_DB_USER,
        password: RENDER_DB_PASSWORD,
        database: RENDER_DB_NAME
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => { response.send('everything works boss')}) //database.users
app.post('/signin', (request, response) => { handleSignIn(request, response, db, bcrypt) })
app.post('/register', (request, response) => { handleRegister(request, response, db, bcrypt) })
app.get('/profile/:id', (request, response) => { handleProfile(request, response, db) })
app.put('/image', (request, response) => { handleImage(request, response, db) })
app.post('/imageurl', (request, response) => { handleApiCall(request, response) })

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
