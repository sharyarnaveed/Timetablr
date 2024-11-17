import connectdb from "../database/dbconn.database.js";


const GetCoursesListForTeacher=async(req,res)=>
    {
        try {
            const {program_id}=req.body;
            console.log(program_id);

if(program_id=="")
{
   console.log("no programid");
}

            const thedb=await connectdb();
    const query="SELECT * FROM courses WHERE PROGRAM_ID=?";
    const [row]=await thedb.query(query,[program_id]);
    // console.log(row);        
    res.json(row)
        } catch (error) {
            console.log("error in getting courses",error);
        }
    }

    export {GetCoursesListForTeacher}
    