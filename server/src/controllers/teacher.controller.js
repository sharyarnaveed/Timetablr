import connectdb from "../database/dbconn.database.js";

const GetCoursesListForTeacher = async (req, res) => {
  try {
    const { program_id } = req.body;
    console.log(program_id);

    if (program_id == "") {
      console.log("no programid");
    }

    const thedb = await connectdb();
    const query = "SELECT * FROM courses WHERE PROGRAM_ID=?";
    const [row] = await thedb.query(query, [program_id]);
    // console.log(row);
    res.json(row);
  } catch (error) {
    console.log("error in getting courses", error);
  }
};

const saveteacher = async (req, res) => {
  try {
    const data = req.body; // Assuming `rows` is an array of data to insert
    const thedb = await connectdb();
    const query =
      " INSERT INTO teacher (teacher_name, program,course) VALUES (?, ?, ?)";
    const [rows] = await thedb.query(query, [
      data.textareaValue,
      data.programname,
      data.coursename,
    ]);
    console.log(rows);
    res.json({
      sucess: true,
      message: "teacher saved successfully",
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error inserting data", error });
  }
};


const getteacher=async(req,res)=>
{
try {
const query="SELECT * FROM teacher INNER JOIN programs ON teacher.program = programs.program_id INNER JOIN courses ON teacher.course = courses.course_id  ";
const thedb = await connectdb();
const [rows]=await thedb.query(query)
res.json(rows)

  
} catch (error) {
  console.log("Error Getting Teachers",error);
}
}

const deleteatcher=async(req,res)=>
{
  try {
    

const id=req.body.id
console.log(id);
const thedb = await connectdb();
    const query = "DELETE FROM teacher WHERE teacher_id = ?;";
    const [row] = await thedb.query(query, [id]);
    console.log(row);
    res.json({
      message: "Teacher Deleted",
      success: true,
    });

  } catch (error) {
    console.log("Error Deleting Teacher",error);
  }
}





export { GetCoursesListForTeacher, saveteacher,getteacher,deleteatcher };
