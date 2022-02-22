const bcrypt = require("bcryptjs")

function hashPassword(password){
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
}

function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}