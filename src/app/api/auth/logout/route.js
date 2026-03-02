const {logout} = require('@/controllers/auth.controller');
const {NextResponse} = require('next/server');

exports.POST = async (req) => {
    return logout(req);
}