import { createClient } from '@supabase/supabase-js';
import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
// import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleProfile from './controllers/profile.js';
import handleSignIn from './controllers/signin.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const supabaseUrl = process.env.SUPABASE_URL
const serviceKey = process.env.SERVICE_KEY

const supabase = createClient(supabaseUrl, serviceKey)

const app = express();

app.use(express.json());
app.use(cors());

// const db = knex({
//     client: 'pg',
//     connection: 'postgres://postgres.yxrcjejgusfnklhyewbl:yw35!9NsvT6MBLN@aws-0-eu-central-1.pooler.supabase.com:6543/postgres'
// });

app.get('/', (request, response) => { response.send('its working boss')}) //database.users
app.post('/signin', (request, response) => { handleSignIn(request, response, supabase, bcrypt) })
app.post('/register', (request, response) => { handleRegister(request, response, supabase, bcrypt) })
app.get('/profile/:id', (request, response) => { handleProfile(request, response, supabase) })
app.put('/image', (request, response) => { handleImage(request, response, supabase) })
app.post('/imageurl', (request, response) => { handleApiCall(request, response) })

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});
