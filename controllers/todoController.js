require('dotenv').config()
var mongoose = require('mongoose')

//connect to mongodb
mongoose.connect(process.env.URI)

// Create a schema - this is like a blue print. This schema is what Mongodb expects from our todo data
// todoSchema - an object with one property which is item and that is a string.
var todoSchema = new mongoose.Schema({
    item: String
})

// todo model
var Todo = mongoose.model('Todo', todoSchema)

module.exports = (app) => {

    app.get('/todo', (req, res) => {
        // get data from mongodb and pass it to the view 
        Todo.find({})
        .then(function (data) {
            res.render('todo', {todos: data})
        })
        .catch(function (err) {
            throw err;
        });
    })

    app.post('/todo', (req, res) => {
        // get data from the view and add it to mongodb
        Todo(req.body)
        .save()
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            throw err;
        });
    })

    app.delete('/todo/:item', (req, res) => {
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne()
        .then(function (data) {
            res.json(data)
        })
        .catch(function (err) {
            throw err;
        });
    })

}