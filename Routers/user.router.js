const express = require('express');
const router = express.Router();
const {createUser,getAllUsers, getUserById, updateUser, deleteUser} = require('../Controllers/user.controller');
const validate=require('../Middlewares/validation.middleware');
const {createUserSchema,updateUserSchema} = require('../validations/user.validation');
const protect = require('../Middlewares/auth.middleware');

const allowTo = require('../Middlewares/role.middelwar');

router.post('/',validate(createUserSchema),createUser);

router.get('/',    protect, allowTo('admin'), getAllUsers);

router.get('/:id',protect, getUserById);

router.put('/:id',protect, validate(updateUserSchema), updateUser);

router.delete('/:id', protect, allowTo('admin'), deleteUser);

module.exports=router;