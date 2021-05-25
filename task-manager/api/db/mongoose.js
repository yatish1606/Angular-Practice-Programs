const chalk = require('chalk')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(
    'mongodb://localhost:27017/AngularTaskManager', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }
)
.then(() => console.log(chalk.bgGreenBright.black('Connected to database')))
.catch(e => console.log(chalk.bgRedBright.black('Error while connecting to database', e)))

module.exports = {
    mongoose
}