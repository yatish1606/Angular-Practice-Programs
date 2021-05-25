const { mongoose } = require("../mongoose");


const List = mongoose.model(
    'List', 
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
            minLength: 1,
            trim: true
        }
    })
)

module.exports = {
    List
}