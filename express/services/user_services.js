const User = require('../models/user.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../helpers/jwt.js');


async function login({ username, password }, res) {
    // const user = await User.findOne({username});
    User.findOne({ username })
    .then((user) => {
      //* Check if the user exists
      if (!user) return res.status(401).json({ error: 'User not found' })
      console.log(user)
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          //* If the password is correct return the user with the token else return invalid password
          if (!valid) return res.status(401).json({ error: 'Invalid password' })
          res.status(200).json({
            token: auth.generateAccessToken(user._id),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

async function register(params){
    // instantiate a user modal and save to mongoDB
    const user = new User(params)
    await user.save();
}

async function getById(token) {

    try {
        const decodedToken = jwt.verify(token, auth.SECRET)
        const id = decodedToken.id
        const user = await User.findOne({ _id: id });
        return user;
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' })
    }
}

async function updateByID({username, email, password},token) {
    try {
        let userUpdate;
        const decodedToken = jwt.verify(token, auth.SECRET);
        const id = decodedToken.id;
        const user = await User.findOne({ _id: id });
        
        if (user) {            
            if(bcrypt.compareSync(password, user.password)){
                userUpdate = User.findByIdAndUpdate(id,{'username': username, 'email': email}, {upsert: true});
                return userUpdate;
            } else  return 'Not Same Password'
        
        } else return 'User do not Exist'
    
    } catch (error) {
        console.log(error);
    }
}

async function updatePassword({password, new_password},token) {
    try {
        let userUpdate;
        const decodedToken = jwt.verify(token, auth.SECRET);
        const id = decodedToken.id;
        const user = await User.findOne({ _id: id });
        if (user) {
            if(bcrypt.compareSync(password, user.password)){
                const salt = bcrypt.genSaltSync();
                new_password = bcrypt.hashSync(new_password, salt);
                userUpdate = User.findByIdAndUpdate(id,{'password': new_password}, {upsert: true});
                return userUpdate;
            } else return 'Not Same Password'
        } else return 'User do not Exist'
    } catch (error) {
        console.log(error);
    }
}

async function getAll() {

    const user = await User.find();
    // call toJSON method applied during model instantiation
    return user;
}

module.exports = {
    login,
    register,
    getById,
    getAll,
    updateByID,
    updatePassword
};