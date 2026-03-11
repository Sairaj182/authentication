const userController = require('@/controllers/user.controller');
const { authorize } = require('@/middleware/authorize.middleware');

exports.GET = async (request, context) => {
	await authorize('ADMIN','SUPER_ADMIN')(request);
	const { id } = await context.params;
	return userController.getUserById(request, id);
};

exports.PATCH = async (request, context) => {
	await authorize('ADMIN','SUPER_ADMIN')(request);
	const { id } = await context.params;
	return userController.updateUserByAdmin(request, id);
};

exports.DELETE = async (request, context) => {
	await authorize('ADMIN','SUPER_ADMIN')(request);
	const { id } = await context.params;
	return userController.deleteUser(request, id);
};