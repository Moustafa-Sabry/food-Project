const express = require('express');
const router = express.Router();
const {createUser,getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/user.controller');
const validate=require('../Middlewares/validation.middleware');
const {createUserSchema,updateUserSchema} = require('../validations/user.validation');
router.post('/',validate(createUserSchema),createUser);

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.put('/:id',validate(updateUserSchema), updateUser);

router.delete('/:id', deleteUser);

module.exports=router;