import mongoose, { Schema,mongo,model } from "mongoose";
import { config } from "../Config/config";
import {CourseLevel,Course,Prerequisite,validNames} from '../Types/Types'

const courseSchema = new Schema<Course>({
    name: { 
        type:String,
        required: true,
        validate: {
            validator: function(value: string) {
                const courseLevel = this.course_level as CourseLevel;
                return validNames[courseLevel] ? validNames[courseLevel].includes(value) : false;
            },
            message: 'Invalid course name for the selected level.',
        }
    },
    course_level: { 
        type:String,
        required: true, 
        enum: Object.values(CourseLevel)
    }, 
});

const prerequisiteSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true, 
    },
    prerequisiteIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true, 
    }],
});

const CourseModel = config.model<Course>('Course', courseSchema);
console.log("Course Model Created");
const PrerequisiteModel = config.model('Prerequisite',prerequisiteSchema)
console.log("Prerequisite Model Created");

export {CourseModel,PrerequisiteModel}