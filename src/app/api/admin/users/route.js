const { authorize } = require('@/middleware/authorize.middleware');
const { NextResponse } = require('next/server');
const authService = require('@/services/auth.service');

exports.GET = async (request) => {
	try {

		await authorize('SUPER_ADMIN')(request);

		const users = await authService.listUsers();

		return NextResponse.json({
			success: true,
			users,
		});

	} catch (error) {
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: error.statusCode || 500 }
		);
	}
};