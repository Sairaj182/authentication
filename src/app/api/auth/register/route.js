const {register} = require('@/controllers/auth.controller');
const authorize = require('@/middleware/authorize.middleware');

exports.POST = async(request)=>{
	return register(request);
};