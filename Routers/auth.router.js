const express = require('express');
const router = express.Router();
// const {signUp,signIn,verifyOtp} = require('../controllers/auth.controller');

const {signUp,signIn,verifyOtp} = require('../Controllers/auth.controller');
const validate=require('../Middlewares/validation.middleware');
const {signInSchema,signUpSchema} = require('../validations/auth.validation');

router.post('/',validate(signUpSchema),signUp);
router.get('/',validate(signInSchema),signIn);
router.post('/verify-otp', verifyOtp);
module.exports=router;