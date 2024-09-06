import connectdb from "../database/dbconn.database.js";


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
                    program_id INT AUTO_INCREMENT PRIMARY KEY,
                    subject VARCHAR(255),
                    teacher_name VARCHAR(255),
                    start_time VARCHAR(255),
                    end_time VARCHAR(255)
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
}



const getprogram=async(req,res)=>
{
    try {
        const thedb = await connectdb();
        // // console.log(thedb);
        const [rows] = await thedb.query(`SELECT * FROM programs`);
        //  console.log(rows);
        res.json(rows);
      } catch (error) {
        console.log("error in getting programs", error);
      }
}

export {addprogram,
    getprogram
}