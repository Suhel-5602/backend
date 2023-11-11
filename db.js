const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://suhelkhan062002:Suhelsuhel1@suhel.mhxwkhi.mongodb.net/personal-task?retryWrites=true&w=majority")


.then((response)=>{
    console.log("Connected to Database");
})
.catch((error)=>{
    console.log(error);
});