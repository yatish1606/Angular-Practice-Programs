const app = require('express')()
const chalk = require('chalk')
const bodyParser = require('body-parser')
const { List } = require('./db/models/List.model')
const PORT = process.env.PORT || 3000
const { mongoose } = require('./db/mongoose')
app.use(bodyParser.json())


app.get('/lists', (req, res) => {
    
    List
    .find({})
    .then(completeList => res.status(200).send(completeList))
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

app.patch('/lists/:id', (req, res) => {

    List.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body}
    )
    .then(() => res.sendStatus(200))
    .catch(e => res.status(404).send(e))
})

app.delete('/lists:id', (req, res) => {

})

app.listen(
    PORT, 
    () => console.log(chalk.bgGreenBright.black(`Server running on port ${PORT}`))
)