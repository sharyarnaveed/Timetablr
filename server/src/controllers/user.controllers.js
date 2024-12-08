import connectdb from "../database/dbconn.database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signupuser = async (req, res) => {
  try {
    const { username, department, program, password } = req.body;

    if (!username || !department || !program || !password) {
      res.json({
        message: "All fields Required",
      });
    } else {
      // check if username already exisit or not
      const thedb = await connectdb();

      const checkusername = `SELECT username from  user where username= ?`;
      const [rows] = await thedb.query(checkusername, [username]);
      // console.log(rows);

      if (rows.length > 0) {
        res.json({
          message: "username already exsists",
        });
      } else {
        // if userndoes not exsist create account

        const hashedpassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO user (username,password,department,program) VALUES (?,?,?,?)`;
        const [rows] = await thedb.query(sql, [
          username,
          hashedpassword,
          department,
          program,
        ]);
        res.status(200).json({
          message: "Account Created",
          success: true,
        });
      }
    }
  } catch (error) {
    console.log("error in sign up", error);
    throw error;
  }
};

const signinuser = async (req, res) => {
  try {
    const thedb = await connectdb();
    const { username, password } = req.body;
    if (!username || !password) {
      res.json({
        message: "username and password are required",
        success: false,
      });
    } else {
      const checkusernamequery = "SELECT * FROM user WHERE username= ?";
      const [responce] = await thedb.query(checkusernamequery, [username]);
      // console.log(responce);
      if (responce.length > 0) {
        const hashedpassword = responce[0].password;
        // console.log(hashedpassword);
        const comparepassword = await bcrypt.compare(password, hashedpassword);
        if (comparepassword) {
          const user_id = responce[0].user_id;
          const userprogram = responce[0].program;
          // generate access token
          const accesstoken = await jwt.sign(
            { id: user_id, program: userprogram },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: process.env.ACCESS_TIME }
          );
          // generatae refresh token
          const refreshtoken = await jwt.sign(
            { id: user_id, program: userprogram },
            process.env.REFRESH_TOKEN_KEY,
            { expiresIn: process.env.REFRESH_TIME }
          );

          // update refresh token in database
          await thedb.query(
            "UPDATE user SET refreshtoken =? WHERE user_id= ?",
            [refreshtoken, user_id]
          );

          // sending cookies
          const options = {
            httpOnly: true,
            secure: true,
          };
          res

            .cookie("accessToken", accesstoken, options)
            .cookie("refreshToken", refreshtoken, options)

            .json({
              message: "Login Successfull",
              success: true,
            });
        } else {
          res.json({
            message: "wrong password",
            success: false,
          });
        }
      } else {
        res.json({
          message: "User Not found",
          success: false,
        });
      }
    }
  } catch (error) {
    console.log("error in signin ", error);
  }
};



const getusername = async (user) => {
  try {

    const userID = user.id
    console.log(user);

    const thedb = await connectdb();
    const query = "SELECT username FROM USER WHERE USER_ID =?"
    const [getUserName] = await thedb.query(query, [userID]);

    return getUserName

  } catch (error) {
    res.json({
      message: "Error In getting User Name"
    })
  }
}


const gethomedata = async (req, res) => {
  try {
    const user = req.user;
    console.log(user.program);
    const { day } = req.body;
console.log(day);
    // // get user program
    const thedb = await connectdb();

    const TimetableQuery = `SELECT * 
FROM timetable 
INNER JOIN courses ON timetable.course_id = courses.course_id 
INNER JOIN venu ON timetable.venue_id = venu.venu_id 
INNER JOIN teacher ON timetable.teacher_id = teacher.teacher_id 
INNER JOIN programs ON timetable.program_id = programs.program_id 
WHERE programs.program_name = ? AND timetable.day = ?;
`;
    const [GetTimeTable] = await thedb.query(TimetableQuery, [user.program,day]);

    console.log(GetTimeTable);
    const username = await getusername(req.user)
    console.log(username);
    res.json({
      timetable: GetTimeTable,
      username: username
    });




  } catch (error) {
    console.log("error Getting timetable data", error);
  }
};





const changepassowrd = async (req, res) => {
  try {
    const thedb = await connectdb();
    const user_id = req.user.id;
    console.log(user_id);
    const { oldpassword, newpassword } = req.body;
    const hashednewpass = await bcrypt.hash(newpassword, 10);


    // compare old password first
    const oldpasscheck = "SELECT password from user WHERE user_id=?"
    const [check] = await thedb.query(oldpasscheck, [user_id])
    if (check.length > 0) {
      // console.log(check[0].password);
      const hashedpassword = check[0].password
      const comparepassword = await bcrypt.compare(oldpassword, hashedpassword)

      if (comparepassword) {
        const query = "UPDATE user SET password=? WHERE user_id=?";
        const [update] = await thedb.query(query, [hashednewpass, user_id]);
        console.log(update);

        res.json({
          message: "Password Changed Successfully",
        })
      }
      else {
        res.json({
          message: "Old Password is Incorrect",
        })
      }


      console.log(comparepassword);

    }


  } catch (error) {
    res.json({
      message: "Error in Changing Password",
    })
  }
}


const changeusername = async (req, res) => {
  try {
    const { username } = req.body;
    const user_id = req.user.id;
    console.log(user_id);
    const thedb = await connectdb();
    const checkusernamequery = "SELECT USERNAME FROM USER WHERE username=?";
    const [checkusername] = await thedb.query(checkusernamequery, [username]);
    if (checkusername.length > 0) {
      res.json({
        message: "Username ALready Taken"
      })
    }
    else {
      const changenamequery = "UPDATE user SET username=? WHERE user_id=?";
      const [change] = await thedb.query(changenamequery, [username, user_id])
      console.log(change);

      res.json({
        message: "UserName Changed"
      })

    }
    console.log(checkusername);


  } catch (error) {
    console.log(error);
    res.json({
      message: "Error In Changing Password"
    })
  }
}




const logout = async (req, res) => {
  try {
    const thedb = await connectdb();
    const user_id = req.user.id;
    const rf = "undefined";
    await thedb.query("UPDATE user SET refreshtoken =? WHERE user_id= ?", [
      rf,
      user_id,
    ]);

    const options = {
      httpOnly: true,
      secure: true,
    };

    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);
    res.json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("error in logout");
  }
};

export { signupuser, signinuser, gethomedata, logout, changepassowrd, changeusername, getusername };
