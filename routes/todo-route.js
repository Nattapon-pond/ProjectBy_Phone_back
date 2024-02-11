const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const todoController = require('../controllers/todo-controller')

router.get('/', authenticate, todoController.getByUser)
router.get('/all-status', authenticate, todoController.getAllStatus)
router.post('/', authenticate, todoController.createTodo)
router.put('/:id', authenticate, todoController.updateTodo)
router.delete('/:id', authenticate, todoController.deleteTodo )

module.exports = router