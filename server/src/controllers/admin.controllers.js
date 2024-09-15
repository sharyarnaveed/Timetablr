import connectdb from "../database/dbconn.database.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const adminsigin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const thedb = await connectdb();
    const query = "SELECT * FROM admin WHERE admin_username = ?";
    const [rows] = await thedb.query(query, [username]);
    // console.log(rows);
    if (rows.length > 0) {
      const hashedPassword = rows[0].admin_password;
      const isValid = await bcrypt.compare(password, hashedPassword);
      if (isValid) {
        const admin_id = rows[0].admin_id;
        // generatge access tooken
        const accesstoken = await jwt.sign(
          { id: admin_id },
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: process.env.ACCESS_TIME }
        );
        // generate refresh token

        const refreshtoken = await jwt.sign(
          { id: admin_id },
          process.env.REFRESH_TOKEN_KEY,
          { expiresIn: process.env.REFRESH_TIME }
        );

        // update refresh token in database
        await thedb.query("UPDATE admin SET refreshtoken =? WHERE admin_id= ?", [
          refreshtoken,
          admin_id,
        ]);

        const options = {
          httpOnly: true,
          secure: true,
        };
        res

          .cookie("adminaccessToken", accesstoken, options)
          .cookie("adminrefreshToken", refreshtoken, options)
          .json({
            message: "Login Successfull",
            success: true,
          });
      } else {
        res.json({ message: "Wrong Credentials", status: 401, success: false });
      }
    } else {
      res.json({
        message: "User Not Found",
        success: false,
      });
    }
  } catch (error) {
    console.log("error in sign in", error);
  }
};

const addprogram = async (req, res) => {
  try {
    const { programname } = req.body;
    const thedb = await connectdb();

    // Insert program into the programs table
    const sql = `INSERT INTO programs (program_name) VALUES (?)`;
    const [rows] = await thedb.query(sql, [programname]);

    if (rows.affectedRows > 0) {
      // Create table only if program insertion is successful
      const tablesql = `
                CREATE TABLE ${programname} (
                    class_id INT AUTO_INCREMENT PRIMARY KEY,
                    subject VARCHAR(255),
                    teacher_name VARCHAR(255),
                    day VARCHAR(255),
                    time VARCHAR(255),
                    venu VARCHAR(255)
                )
            `;
      // Create the table
      await thedb.query(tablesql);

      res.status(200).json({
        message: "Program added and table created",
        success: true,
      });
    } else {
      res.status(500).json({
        message: "Failed to add program",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
      success: false,
    });
  }
};

const getprogram = async (req, res) => {
  try {
    const thedb = await connectdb();
    // // console.log(thedb);
    const [rows] = await thedb.query(`SELECT * FROM programs`);
    //  console.log(rows);
    res.json(rows);
  } catch (error) {
    console.log("error in getting programs", error);
  }
};

const logout=async(req,res)=>
{
    try{
    const thedb = await connectdb();
    const admin_id = req.user.admin_id;
    const rf = "undefined";
    await thedb.query("UPDATE admin SET refreshtoken =? WHERE admin_id= ?", [
      rf,
      admin_id,
    ]);
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    res.clearCookie("adminaccessToken", options);
    res.clearCookie("adminrefreshToken", options);
    res.json({ 
      message: "Logged out successfully",
      success:true
     });



  } catch (error) {
    console.log("error in logout",error);
  }
}

const timatble=async(req,res)=>
{
  try {
    const rows=req.body;
    const thedb = await connectdb();
await rows.forEach(async element => {
  console.log(element);
  const sql = `INSERT INTO SE22_RED (SUBJECT,TEACHER_NAME,DAY,TIME,VENU) VALUES (?,?,?,?,?)`;
  const [success] = await thedb.query(sql, [element.subject,element.teacher,element.days,element.time,element.venu]);
console.log(success);
});
    
// console.log(rows);

  } catch (error) {
    console.log("error ins sending data",error);
  }
}




export { addprogram, getprogram, adminsigin, logout, timatble };
