import {CourseModel,PrerequisiteModel} from "../Collections/CoursePrerequisite";
import { Course } from "../Types/Types";

import * as fs from 'fs';
import csv from 'csv-parser';

export const readCSVFile  = async <T>(filepath:string): Promise<T[]> => {
    return new Promise((resolve,reject) => {
        const results:T[] = [];
        const stream = fs.createReadStream(filepath)
        stream.pipe(csv()).on('data',(data:any)=>results.push(data))
                          .on('end',()=>resolve(results))
                          .on('error',(error:string)=>reject(error))
         })       
}

export const insertCourses = async(data: Course[]) => {
    await CourseModel.deleteMany();
    const courses: Course[] = await CourseModel.find();
    console.log(courses)
    await CourseModel.insertMany(data);
    console.log("data Inserted succesfully");
}

export const insertPrerequsite = async(data:any) => {
    try{
        const result = await PrerequisiteModel.deleteMany();
        console.log("Deleted all")
        const courses: Course[] = await CourseModel.find();
        if(!courses){
            console.log("Courses are empty");
        }
        for(let item of data){
            if(item.p_level ==='null' && item.p_name==='null'){
                // console.log("hi")
            }else{
                const cid = await CourseModel.findOne({course_level:item.course_level,name:item.name},{_id:1});
                const pid = await CourseModel.findOne({course_level:item.p_level,name:item.p_name},{_id:1});
                if(cid && pid){
                    const prerequisite = await PrerequisiteModel.findOne({_id:cid});
                    if(!prerequisite){
                        const doc={
                            courseId:cid._id,
                            prerequisiteIds:[pid._id]
                        }
                        const result = await PrerequisiteModel.insertMany([doc]);
                         console.log(`Inserted prerequisite: ${result}`);
                    }
                    else{
                        prerequisite.prerequisiteIds.push(pid._id)
                    }
                }
            }
        }
    }
    catch(e){
        console.log("error:",e)
    }

}