const app = require('express')()
const chalk = require('chalk')
const bodyParser = require('body-parser')
const { List } = require('./db/models/List.model')
const PORT = process.env.PORT || 3000
const { mongoose } = require('./db/mongoose')
const { Task } = require('./db/models/Task.model')
app.use(bodyParser.json())


app.get('/lists', (req, res) => { 
    List
    .find({})
    .then(completeList => res.status(200).send(completeList))
    .catch(e => res.status(404).send(e))
})


app.get('/lists/:listID/tasks', (req, res) => {
    Task
    .find(
        {_listID: req.params.listID}
    )
    .then(tasks => res.send(tasks))
    .catch(e => res.status(404).send(e))
})


app.post('/lists', (req, res) => { 
    const { title } = req.body
    const newList = new List({title})

    newList
    .save()
    .then(completeList =>  res.status(200).send(completeList))
    .catch(e => res.status(404).send(e))
})


app.post('/lists/:listID/tasks', (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        _listID: req.params.listID
    })
    newTask
    .save()
    .then(newDoc => res.send(newDoc))
    .catch(e => res.status(404).send(e))
})


app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body}
    )
    .then(() => res.sendStatus(200))
    .catch(e => res.status(404).send(e))
})


app.delete('/lists/:id', (req, res) => {
    List.findOneAndRemove(
        {_id: req.params.id}
    )
    .then(deletedDoc => res.send(deletedDoc))
    .catch(e => res.status(400).send(e))
})


app.listen(
    PORT, 
    () => console.log(chalk.bgGreenBright.black(`Server running on port ${PORT}`))
)