import connectdb from "../database/dbconn.database.js";

const GetProgramInfo=async(req,res)=>
{
try {
    const {id}=req.body;
    const thedb=await connectdb();
console.log(id);
const query="SELECT program_name FROM PROGRAMS WHERE PROGRAM_ID=?";
const [row]=await thedb.query(query,id)
console.log(row);
res.json({
    program:row

})
} catch (error) {
    console.log("error in getting Program data",error);
}
}

const submitCourses=async(req,res)=>
{
    try {
        const thedb=await connectdb();
        const query="INSERT INTO COURSES (PROGRAM_ID,COURSE_NAME,CREDIT_HR) VALUES (?,?,?)";


        const courses=req.body;
        // console.log(courses);
      for ( const course of courses)
      {
        // console.log("Course is ",course.textareaValue, "program id ",course.programid, "credithr", course.credithr);
      const [row]=await thedb.query(query,[course.programid,course.textareaValue,course.credithr]);

      console.log(row);
    res.json({
        message:"Courses added",
        success:true
    })
    
    }
       
    } catch (error) {
        console.log("error in saving courses",error);
    }
}


const GetCoursesList=async(req,res)=>
{
    try {
        const {id}=req.body;
        console.log(id);
        const thedb=await connectdb();
const query="SELECT * FROM courses WHERE PROGRAM_ID=?";
const [row]=await thedb.query(query,[id]);
console.log(row);        
res.json(row)
    } catch (error) {
        console.log("error in getting courses",error);
    }
}

const DeleteCourse=async(req,res)=>
{
    try {
        const {courseid}=req.body;
        console.log(courseid);
        const thedb=await connectdb();
const query="DELETE FROM courses WHERE course_id = ?;";
const [row]=await thedb.query(query,[courseid]);
console.log(row);        
res.json({
    message:"Course Deleted",
    success:true
})
    } catch (error) {
        console.log("error in deleting courses",error);
    }
}
export {GetProgramInfo,submitCourses,GetCoursesList,DeleteCourse}