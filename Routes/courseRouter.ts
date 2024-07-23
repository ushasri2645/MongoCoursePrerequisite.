import express from 'express'
import { CourseModel } from '../Collections/CoursePrerequisite';

export const courseRouter = express.Router();

courseRouter.get('/allCourses',async(req,res)=>{
    try{
        const courses = await CourseModel.find();
        res.send(courses)
    }
    catch(e){
        console.log("Error:",e);
    }
})

courseRouter.get('/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const course = await CourseModel.findById({_id:id})
        res.send(course);
    }
    catch(e){
        res.send("error")
        console.log("Error:",e);
    }

})

courseRouter.put('/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const course = await CourseModel.findByIdAndUpdate({_id:id},req.body)
        res.send(course);
    }
    catch(e){
        res.send("error")
        console.log("Error:",e);
    }

})

courseRouter.delete('/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const course = await CourseModel.findByIdAndDelete({_id:id})
        res.send(course);
    }
    catch(e){
        res.send("error")
        console.log("Error:",e);
    }

})
