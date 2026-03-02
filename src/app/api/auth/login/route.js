const {login} = require('@/controllers/auth.controller');
const {NextResponse} = require('next/server');

exports.POST = async (req) => {
    return login(req);
}