const handleSignIn = (request, response, db, bcrypt) => {
    const { password, email } = request.body;
    if (!email || !password) {
        return response.status(400).json('Invalid Details');
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        response.json(user[0])
                    })
                    .catch(err => response.status(400).json('Unable to get user'))
            } else {
                response.status(400).json('Wrong email and password')
            }
        })
        .catch(err => response.status(400).json('Wrong email and password.'))
}

export default handleSignIn;