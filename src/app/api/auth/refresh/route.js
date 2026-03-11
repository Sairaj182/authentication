const {refreshToken} = require('@/controllers/auth.controller');
const {NextResponse} = require('next/server');
const ratelimit = require('@/utils/rateLimiter');


exports.POST = async (req) => {
	try{
		const ip =
			req.headers.get("x-forwarded-for") ||
			req.headers.get("x-real-ip") ||
			"anonymous";
		const {success} = await ratelimit.limit(ip);

		if(!success){
			return Response.json(
				{
					success: false,
					message: "Too many requests"
				},
				{status: 429}
			);
		}

	    return refreshToken(req);

	}catch(error){

		return Response.json(
			{
				success: false,
				message: error.message
			},
			{status: 500}
		);
	}
};