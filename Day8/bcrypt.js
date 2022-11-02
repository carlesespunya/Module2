const bcrypt = require("bcryptjs")
const saltRounds = 10

const password1 = "123123"
const password2 = "123123"

const salt = bcrypt.genSaltSync(saltRounds)
const salt2 = bcrypt.genSaltSync(saltRounds)

// console.log(salt)

const hash1 = bcrypt.hashSync(password1, salt)
const hash2 = bcrypt.hashSync(password2, salt2)
console.log(hash1)
console.log(hash2)

const verify = bcrypt.compareSync("123123", hash1)
console.log(verify)
