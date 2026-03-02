const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/user.model');
const AppError = require('../errors/AppError');

exports.protect = async (request) => {
	const authHeader = request.headers.get('authorization');
	if (!authHeader || !authHeader.startsWith('Bearer '))
		throw new AppError('Unauthorized', 401);
	const token = authHeader.split(' ')[1];
	const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
	const user = await User.findByPk(decoded.id);
	if (!user)
		throw new AppError('Unauthorized', 401);
	if (decoded.tokenVersion !== user.tokenVersion)
		throw new AppError('Session expired. Please login again.', 401);
	return {
		id: user.id,
		role: user.role,
		tokenVersion: user.tokenVersion,
	};
};