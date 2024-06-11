import { createClient } from '@supabase/supabase-js';
import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleProfile from './controllers/profile.js';
import handleSignIn from './controllers/signin.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const supabaseUrl = 'https://yxrcjejgusfnklhyewbl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cmNqZWpndXNmbmtsaHlld2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxMTQxNDYsImV4cCI6MjAzMzY5MDE0Nn0.-NjOTI3MjhQZmurEGecYvP1dXjV3uxCrQ9FTMrEeogY';
const supabaseSecret = 'FETVAxVZhMKi++qq2TrjRoTduFChWxY0dBqhSTLJYyGJY10h8H01it74d8rVBicEfhqTw3efA+ppuSq4cXGDDw==';

const supabase = createClient(supabaseUrl, supabaseKey, supabaseSecret);

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
