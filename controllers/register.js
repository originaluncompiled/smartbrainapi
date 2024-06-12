const handleRegister = (request, response, supabase, bcrypt) => {
    const { email, name, password } = request.body;

    if (!email || !name || !password) {
        return response.status(400).json('Invalid Details');
    }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    supabase.transaction(async (tx) => {
        await tx
            .from('login')
            .insert({
                email: email,
                hash: hash
            })
            .returning('email')
            .then(console.log)
            .then(loginEmail => {
                return supabase
                    .from('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date()
                    })
                    .then(console.log)
                    .then(user => {
                        response.json(user[0]);
                    })
                    .then(console.log)
            })
    })
    .catch(err => response.status(400).json('Cannot register account'))
}

export default handleRegister;
