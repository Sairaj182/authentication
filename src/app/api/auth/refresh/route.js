const {refreshToken} = require('@/controllers/auth.controller');
const {NextResponse} = require('next/server');
const { authLimiter } = require("@/middleware/rateLimiter.middleware");

exports.POST = async (req) => {
    await authLimiter(request);
    return refreshToken(req);
}