const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.post("/", async (req, res) => {
    const data = req.body;

    const isEmailExists = await User.findOne({email: data.email});
    if(isEmailExists){
        return res.send("Email is exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    try {
        const createdUser = new User({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
        });
        await createdUser.save();
        res.send("User created");
    } catch (error) {
        console.log(error);
        res.send(error);
    }

});

router.post('/login',async(req,res) =>{
const data = req.body;
const userData = await User.findOne({email: data.email});
if(!userData){
    return  res.send({
        message:"user is not required",
        data :[],
        status :"error",
    });
}
const validatepassword = await bcrypt.compare(data.password,userData.password);
if(!validatepassword){
    return res.send("email or password does not match!..");
    }
res.send({
    message: "login successfull",
    data:userData,
    status:"success",
});
});


module.exports = router;