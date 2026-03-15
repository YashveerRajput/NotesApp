const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validate, createTaskSchema, updateTaskSchema } = require('../middleware/validate.middleware');

// All task routes require authentication
router.use(authMiddleware);

router.get('/', taskController.getTasks);
router.post('/', validate(createTaskSchema), taskController.createTask);
router.put('/:id', validate(updateTaskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
