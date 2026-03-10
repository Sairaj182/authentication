const User = require('../models/user.model');

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({where: {email} });
    }

    async create(userData) {
        return await User.create(userData);
    }

    async getAll() {
        return await User.findAll({ attributes: ['id', 'email', 'role'] });
    }

    async findById(id) {
        return await User.findByPk(id);
    }

    async updateProfile(userId, data){
        return await User.update(data, {
            where: {id: userId},
        })
    }

    async getProfile(userId){
        return await User.findByPk(userId, {
            attributes: ["id", "name", "email", "bio", "contact", "role"],
        })
    }
}

module.exports = new UserRepository();
