var express = require('express');
var router = express.Router();
var todoHelper = require('../helpers/todo-helpers')


router.get('/', function(req, res, next) {
  todoHelper.getTodo().then((todoContent) => {
    res.render('index', { todoContent });
  })
  .catch((err) => {
    console.error('Error fetching todo content:', err);
    res.status(500).send('Internal Server Error');
});
});

router.post('/submit', (req, res) => {
  todoHelper.addTodo(req.body).then((response) => {
    console.log(response);
    res.redirect('/')
  })
})

router.get('/delete-todo/',(req,res) => {
  let todoId = req.query.id;
  todoHelper.deleteTodo(todoId).then((response) => {
    console.log(response);
    res.redirect('/')
  })
})

router.post('/edit-todo', function(req, res, next) {
  const todoId = req.query.id;
  const todoDetail = req.body;
  todoHelper.editTodo(todoId, todoDetail)
      .then(() => {
          res.redirect('/');
      })
      .catch(error => {
          console.error('Error editing todo:', error);
          res.status(500).send('Internal Server Error');
      });
});

module.exports = router;
