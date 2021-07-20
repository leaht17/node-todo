// load the todo model
const Todo = require('./models/todo')

function getTodos(res) {
  Todo.find((err, todos) => {
    if (err) return res.send(err)
    res.json(todos)
  })
}

// expose the routes to our app with module.exports
module.exports = (app) => {
  // get all todos
  app.get('/api/todos', (req, res) => {
    getTodos(res)
  })

  // create todo, send back all todos after creation
  app.post('/api/todos', (req, res) => {
    Todo.create({
      text: req.body.text,
      done: false
    }, (err, todo) => {
      if (err) return res.send(err)
      getTodos(res)
    })
  })

  // delete a todo
  app.delete('/api/todos/:todo_id', (req, res) => {
    Todo.remove({
      _id: req.params.todo_id
    }, (err, todo) => {
      if (err) return res.send(err)
      getTodos(res)
    })
  })

  app.get('*', (req, res) => {
    res.sendFile(require('path').resolve('./public/index.html')) // load the single view file
  })
}
