const {validate} = require('../middleware/validate.middleware');
const {authSchema, loginSchema} = require('../validations/auth.validation');
const authService = require('../services/auth.service');
const env = require('../config/env');
const {NextResponse} = require('next/server');
const {protect} = require('../middleware/auth.middleware');
const initDb = require('../initDb');

exports.login = async (request)=>{
    try {
		const body = await request.json();
		const validated = loginSchema.parse(body);
		const result = await authService.login(validated);
		const response = NextResponse.json({success: true,message: 'Login successful',accessToken: result.accessToken,},{status: 200});
		response.cookies.set('refreshToken', result.refreshToken, env.COOKIE_OPTIONS);
		return response;
	} catch(error){
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: error.statusCode || 500 }
		);
	}    
};

exports.refreshToken = async (request) => {
	try {
		const refreshToken = request.cookies.get('refreshToken')?.value;

		const result = await authService.refreshToken({ refreshToken });

		return NextResponse.json(
			{
				success: true,
				message: 'Token refreshed successfully',
				accessToken: result.accessToken,
			},
			{ status: 200 }
		);

	} catch (error) {
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: error.statusCode || 500 }
		);
	}
};

exports.register = async (request) => {
	try {
		await initDb();
		const body = await request.json();
		const validatedData = authSchema.parse(body);
		let creator = null;
		try {
			creator = await protect(request);
		} catch (err) {
			if (validatedData.role && validatedData.role !== 'USER') {
                throw new AppError('Forbidden: Cannot assign elevated role', 403);
            }
		}
		const result = await authService.register(validatedData,creator);

		const response = NextResponse.json(
			{
				success: true,
				message: 'User registered successfully',
				user: result.user,
				accessToken: result.accessToken,
			},
			{status: 201}
		);

		if (result.refreshToken) {
			response.cookies.set(
				'refreshToken',
				result.refreshToken,
				env.COOKIE_OPTIONS
			);
		}

		return response;

	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: error.message || 'Internal Server Error',
			},
			{ status: error.statusCode || 500 }
		);
	}
};

exports.logout = async (request) => {
	try {
		const user = await protect(request);
		await authService.logout(user.id);
		const response = NextResponse.json(
			{ success: true, message: 'Logout successful' },
			{ status: 200 }
		);
		response.cookies.set('refreshToken', '', {
			...env.COOKIE_OPTIONS,
			maxAge: 0,
		});
		return response;
	}catch(error){
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: error.statusCode || 500 }
		);
	}
};