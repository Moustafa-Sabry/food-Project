const express = require('express');
const router = express.Router();
const {signUp,signIn} = require('../controllers/auth.controller');
const validate=require('../Middlewares/validation.middleware');
const {signInSchema,signUpSchema} = require('../validations/auth.validation');

router.post('/',validate(signUpSchema),signUp);
router.get('/',validate(signInSchema),signIn);

module.exports=router;