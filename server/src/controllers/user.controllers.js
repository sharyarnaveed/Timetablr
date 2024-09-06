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
          program,
          department,
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

/*
check if fields are empty
compare pass and username
generate jwt token
send token back to user


*/

const signinuser=async(req,res)=>
{
  try {
    const thedb=await connectdb();
    const {username,password}=req.body;
    if(!username||!password)
    {
      res.json({
        message:"username and password are required",
        success:false
      })
    }
    else
    {
      const checkusernamequery="SELECT * FROM user WHERE username= ?";
      const [responce]=await thedb.query(checkusernamequery,[username]);
      // console.log(responce);
      if(responce.length>0)
        {
          const hashedpassword=responce[0].password;
          // console.log(hashedpassword);
          const comparepassword=await bcrypt.compare(password,hashedpassword);
          if(comparepassword)
            {
          

            const user_id=responce[0].user_id
            const userprogram=responce[0].program;
// generate access token
            const accesstoken = await jwt.sign(
              { id: user_id,
                program:userprogram
               },
              process.env.ACCESS_TOKEN_KEY,
              { expiresIn: process.env.ACCESS_TIME }
            );
// generatae refresh token
            const refreshtoken = await jwt.sign(
              { id: user_id,
                program:userprogram
               },
              process.env.REFRESH_TOKEN_KEY,
              { expiresIn: process.env.REFRESH_TIME }
            );


            // update refresh token in database
            await thedb.query("UPDATE user SET refreshtoken =? WHERE user_id= ?", [
              refreshtoken,
              user_id,
            ]);

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
        success:true
      });







        }


            else{
              res.json({
                message:"wrong password",
                success:false
                })
            }
                
    }
    else
    {
      res.json({
        message:"Username Not found",
        success:false
      })
    }

  } 
  
}


  catch (error) {
    console.log("error in signin ", error);
  }
}


const gethomedata=async(req,res)=>
{
  try {
    // res.json("helo")

const user=req.user
res.json(user)

  } catch (error) {
    
  }
}


const logout=async(req,res)=>
{
  try {
    const thedb = await connectdb();
    const user_id = req.user.user_id;
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
      success:true
     });



  } catch (error) {
    console.log("error in logout");
  }
}


export { signupuser,
  signinuser,
  gethomedata,
  logout
 };
