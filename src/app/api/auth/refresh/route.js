const {refreshToken} = require('@/controllers/auth.controller');
const {NextResponse} = require('next/server');

exports.POST = async (req) => {
    return refreshToken(req);
}