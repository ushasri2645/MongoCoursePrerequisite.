import { Schema } from 'mongoose';
type objectId = Schema.Types.ObjectId;
enum CourseLevel {
    SSC = "ssc",
    Inter = 'inter',
    Diploma = 'diploma',
    Engineering = 'engineering',
    Degree = 'degree',
    Medical = 'medical',
}
const validNames = {
    [CourseLevel.SSC]: [ 'Maths','Science','English' ],
    [CourseLevel.Inter] : ['MPC','BiPC','CEC','MEC'],
    [CourseLevel.Diploma] : ['IT','ECE','EEE'],
    [CourseLevel.Degree] : ['BCom','BSc','BE'],
    [CourseLevel.Engineering] : ['CSE','ECE','EEE'],
    [CourseLevel.Medical] : ['MBBS', 'DENTAL','BPharm'],
}
interface Course{
    name : string,
    course_level : CourseLevel,
}

interface Prerequisite{
    courseId : Schema.Types.ObjectId,
    prerequisiteIds: Schema.Types.ObjectId[];
}

export {objectId,CourseLevel,Course,Prerequisite,validNames}