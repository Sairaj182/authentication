const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateAccessToken = (payload) => jwt.sign(
    payload, 
    env.JWT_ACCESS_SECRET, 
    {
        expiresIn: env.ACCESS_TOKEN_EXPIRES,
    }
);

const generateRefreshToken = (payload) => jwt.sign(
    payload, 
    env.JWT_REFRESH_SECRET, 
    {
        expiresIn: env.REFRESH_TOKEN_EXPIRES,
    }
);

const verifyAccessToken = (token) => jwt.verify(token, env.JWT_ACCESS_SECRET);

const verifyRefreshToken = (token) => jwt.verify(token, env.JWT_REFRESH_SECRET);


module.exports = {
    generateAccessToken, generateRefreshToken,
    verifyAccessToken, verifyRefreshToken,
}