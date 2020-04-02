const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator');
const gravatar=require('gravatar');
const bycript=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');

const User=require('../../models/User');


// @route Post api/users
// @desc Register USer
// @access Public
router.post('/',[
    check('name','Name is Required!').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters ').isLength({min:6})
    ],
    async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    
    const {name,email,password}=req.body;

    try {
        // See if user exists
        let user=await User.findOne({email});
        if (user) {
            return res.status(400).json({errors:[{msg:'User already exists!'}]});
        }       

        //Get User gravatar
        const avatar=gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        })

        user=new User({
            name,
            email,
            avatar,
            password
        })

        // Encript Password
        const salt=await bycript.genSalt(10);
        user.password=await bycript.hash(password,salt);
        await user.save();
        
        const payload={
            user:{
                id:user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            }
            );

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }



})

module.exports=router;