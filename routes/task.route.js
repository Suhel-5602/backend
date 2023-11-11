const router = require('express').Router();
const Task = require('../models/Task');

router.post("/", async (req, res) => {
    const data = req.body;

    try {
        const createdTask = new Task(data);
        await createdTask.save()
        res.send("Created Task")
    } catch (error) {
        res.send(error);
    }

});

router.get("/",async(req,res)=>{
    try{
        const taskList = await Task.find();
        res.send(taskList);

    }catch (error){
        res.send(error);
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const task = await Task.findOne({_id: req.params.id});
        res.send(task);

    }catch (error){
        res.send(error);
    }
});

router.put("/:id", async (req,res)=>{
    try{
        const data = req.body;
        await Task.updateOne({_id:req.params.id},{$set:data});
        res.send("Task updated");
    }catch(error){
        res.send(error);
    }
});

router.delete("/:id", async (req,res)=>{
    try{
        await Task.deleteOne({_id:req.params.id});
        res.send("Task deleted");
    }catch(error){
        alert(error);
    }
});




module.exports = router;