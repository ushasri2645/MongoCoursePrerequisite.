import { CourseModel, PrerequisiteModel } from "../Collections/CoursePrerequisite";
import { Course } from "../Types/Types";
import mongoose from 'mongoose';

// Function to get and print prerequisites for a given course name using aggregation
export const getCoursePrerequisitesUsingAggregation = async (courseName: string) => {
    try {
        // Step 1: Find the course ID for the given course name
        const course = await CourseModel.findOne({ name: courseName }, { _id: 1 });

        if (!course) {
            console.log(`Course with name ${courseName} not found`);
            return;
        }

        // Step 2: Use aggregation to find prerequisites
        const result = await PrerequisiteModel.aggregate([
            {
                $match: { courseId: course._id }
            },
            {
                $lookup: {
                    from: 'courses', // Name of the courses collection
                    localField: 'prerequisiteIds',
                    foreignField: '_id',
                    as: 'prerequisites'
                }
            },
            {
                $unwind: '$prerequisites'
            },
            {
                $project: {
                    'prerequisites.name': 1,
                    'prerequisites.course_level': 1
                }
            }
        ]);

        if (result.length === 0) {
            console.log(`No prerequisites found for the course: ${courseName}`);
            return;
        }

        // Print the prerequisites
        console.log(`Prerequisites for ${courseName}:`);
        console.log(`Prerequisites for ${courseName}:`);
        result.forEach((entry: any) => {
            console.log(`${entry.prerequisites.course_level}: ${entry.prerequisites.name}`);
        });
    } catch (error) {
        console.error("Error fetching prerequisites:", error);
    }
};

// Example usage
getCoursePrerequisitesUsingAggregation("CSE").then(() => {
    console.log("Prerequisite query complete");
});
