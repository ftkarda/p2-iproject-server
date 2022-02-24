const jwt = require("jsonwebtoken");
const SECRET_KEY = "s3cr3t";

function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: "1h",
    })
};

function convertTokenToPayLoad(access_token) {
    return jwt.verify(access_token, SECRET_KEY)
}

module.exports = {
    generateToken,
    convertTokenToPayLoad
}