const Show = require('./Show')
const User = require('./User')

//defining relationships between the models/tables
Show.belongsTo(User)
User.hasMany(Show)

module.exports = {
    Show, 
    User
}
