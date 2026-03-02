const AppError = require('../errors/AppError');
const {protect} = require('./auth.middleware');

exports.authorize = (...allowedRoles)=>{
    return async (request)=>{
        const user = await protect(request);
        if(!allowedRoles.includes(user.role)){
            throw new AppError('Forbidden: Permission not granted', 403);
        }
        return user;
    }
}