const { mongoose } = require("../mongoose");


const Task = mongoose.model(
    'Task', 
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
            minLength: 1,
            trim: true
        },
        _listID: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    })
)

module.exports = {
    Task
}