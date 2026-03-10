const userController = require('@/controllers/user.controller');

exports.GET = async (request,{params})=>{
	return userController.getUserById(request, params.id);
};

exports.PATCH = async (request,{params})=>{
	return userController.updateUserByAdmin(request, params.id);
};

exports.DELETE = async (request,{params})=>{
	return userController.deleteUser(request, params.id);
};