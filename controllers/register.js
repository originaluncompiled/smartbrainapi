const handleRegister = async (request, response, supabase, bcrypt) => {
    const { email, name, password } = request.body;
    if (!email || !name || !password) {
        return response.status(400).json('Invalid Details');
    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    try {
        // Insert into 'login' table
        const { data: loginData, error: loginError } = await supabase
            .from('login')
            .insert([{ hash: hash, email: email }])
            .select('email');

        if (loginError) throw loginError;

        // Insert into 'users' table
        const { data: userData, error: userError } = await supabase
            .from('users')
            .insert([{ email: loginData[0].email, name: name, joined: new Date() }])
            .select('*');

        if (userError) throw userError;

        response.json(userData[0]);
    } catch (error) {
        response.status(400).json('Cannot register account');
    }
}

export default handleRegister;


// const handleRegister = (request, response, supabase, bcrypt) => {
//     const { email, name, password } = request.body;
//     if (!email || !name || !password) {
//         return response.status(400).json('Invalid Details');
//     }
//     let salt = bcrypt.genSaltSync(10);
//     let hash = bcrypt.hashSync(password, salt);
//     supabase.transaction(trx => {
//         trx.insert({
//             hash: hash,
//             email: email
//         })
//         .into('login')
//         .returning('email')
//         .then(loginEmail => {
//             return trx('users')
//                 .returning('*')
//                 .insert({
//                     email: loginEmail[0].email,
//                     name: name,
//                     joined: new Date()
//                 })
//                 .then(user => {
//                     response.json(user[0]);
//                 })
//         })
//         .then(trx.commit)
//         .catch(trx.rollback)
//     })
//     .catch(err => response.status(400).json('Cannot register account'))
// }

// export default handleRegister;