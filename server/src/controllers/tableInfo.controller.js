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
        const query="SELECT program_name FROM PROGRAMS WHERE PROGRAM_ID=?";


        const courses=req.body;
      for ( const course of courses)
      {
        console.log("Course is ",course.textareaValue, "program id ",course.programid);
      }
       
    } catch (error) {
        console.log("error in saving courses",error);
    }
}


export {GetProgramInfo,submitCourses}