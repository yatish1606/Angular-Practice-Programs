const app = require('express')()
const chalk = require('chalk')
const bodyParser = require('body-parser')
const { List } = require('./db/models/List.model')
const PORT = process.env.PORT || 3000
const { mongoose } = require('./db/mongoose')
const { Task } = require('./db/models/Task.model')
const cors = require('cors')
const { User } = require('./db/models/User.model')
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200")
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(cors())

// Get requests
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

app.get('/lists/:listID/tasks/:taskID', (req, res) => {
    const { listID, taskID } = req.params
    Task
    .find({
        _id: taskID, 
        _listID: listID
    })
    .then(tasks => res.send(tasks))
    .catch(e => res.status(404).send(e))
})


// Post requests
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


// Patch requests
app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body}
    )
    .then(() => res.sendStatus(200))
    .catch(e => res.status(404).send(e))
})

app.patch('/lists/:listID/tasks/:taskID', (req, res) => {
    console.log(req.params)
    const { listID, taskID } = req.params
    Task.findOneAndUpdate(
        {
            _id: taskID,
            _listID: listID
        },
        {
            $set: req.body   
        }
    )
    .then((patchedTask) => res.status(200).send(patchedTask))
    .catch(e => res.status(404).send(e))
})


// Delete requests
app.delete('/lists/:id', (req, res) => {
    List.findOneAndRemove(
        {_id: req.params.id}
    )
    .then(deletedDoc => res.send(deletedDoc))
    .catch(e => res.status(400).send(e))
})

app.delete('/lists/:listID/tasks/:taskID', (req, res) => {
    const { listID, taskID } = req.params
    Task.findOneAndRemove(
        {
            _id: taskID,
            _listID: listID
        }
    )
    .then(deletedDoc => res.send(deletedDoc))
    .catch(e => res.status(400).send(e))
})


app.post('/users', (req, res) => {
    const newUser = new User(req.body)
    newUser
    .save()
    .then(() => {
        return newUser.createSession()
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        })
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


app.post('/users/login', (req, res) => {
    const { email, password } = req.body
    User.findByCredentials(email, password)
    .then(user => user.createSession())
    .then(refreshToken => user.generateAccessAuthToken().then(accessToken => {accessToken, refreshToken}))
    .then(authTokens => {
        res
        .header('x-refresh-token', authTokens.refreshToken)
        .header('x-access-token', authTokens.accessToken)
        .send(newUser)
    })
    .catch(e => res.status(400).send(e))
})


app.listen(
    PORT, 
    () => console.log(chalk.bgGreenBright.black(`Server running on port ${PORT}`))
)