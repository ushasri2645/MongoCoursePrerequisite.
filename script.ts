import { config } from "./Config/config";
import { Course, Prerequisite } from "./Types/Types";
import { insertCourses, insertPrerequsite, readCSVFile } from "./Insertion/insertion";
import {router} from './Routes/router'
import express from 'express'

const app = express();
app.use(express.json());
app.use('/',router);



config;
let courses: Course[]
let prerequisites : any =[]
const LoadInsert = async() =>{
    try{
        courses = await readCSVFile<Course>('Data/courses.csv');
        prerequisites = await readCSVFile<Prerequisite>('Data/prerequisite.csv');
        console.log(courses)
        if(courses){
            await insertCourses(courses);
        }
        if(prerequisites){
            await insertPrerequsite(prerequisites);
        }
    }
    catch(e){
        console.log("Error fetching or Inserting:", e);
    } 
}

LoadInsert();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





