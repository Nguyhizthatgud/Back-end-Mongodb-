const userModel = require('../models/user.model');

async function getUsers(req, res) {
    const users = await userModel.create({
        name: 'Nguyen Van A',
        email: 'adwad',
        password: '123456',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    })
    res.json(users);
}

module.exports = {
    getUsers,
}