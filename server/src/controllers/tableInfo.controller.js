import connectdb from "../database/dbconn.database.js";

const GetProgramInfo = async (req, res) => {
  try {
    const { id } = req.body;
    const thedb = await connectdb();
    console.log(id);
    const query = "SELECT program_name FROM PROGRAMS WHERE PROGRAM_ID=?";
    const [row] = await thedb.query(query, id);
    console.log(row);
    res.json({
      program: row,
    });
  } catch (error) {
    console.log("error in getting Program data", error);
  }
};

const submitCourses = async (req, res) => {
  try {
    const thedb = await connectdb();
    const query =
      "INSERT INTO COURSES (PROGRAM_ID,COURSE_NAME,CREDIT_HR) VALUES (?,?,?)";

    const courses = req.body;
    // console.log(courses);
    for (const course of courses) {
      // console.log("Course is ",course.textareaValue, "program id ",course.programid, "credithr", course.credithr);
      const [row] = await thedb.query(query, [
        course.programid,
        course.textareaValue,
        course.credithr,
      ]);
      console.log(row);
    }
    res.json({
      message: "Courses added",
      success: true,
    });

  }
  catch (error) {
    console.log("error in saving courses", error);
  }
};

const GetCoursesList = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const thedb = await connectdb();
    const query = "SELECT * FROM courses WHERE PROGRAM_ID=?";
    const [row] = await thedb.query(query, [id]);
    console.log(row);
    res.json(row);
  } catch (error) {
    console.log("error in getting courses", error);
  }
};

const DeleteCourse = async (req, res) => {
  try {
    const { courseid } = req.body;
    console.log(courseid);
    const thedb = await connectdb();
    const query = "DELETE FROM courses WHERE course_id = ?;";
    const [row] = await thedb.query(query, [courseid]);
    console.log(row);
    res.json({
      message: "Course Deleted",
      success: true,
    });
  } catch (error) {
    console.log("error in deleting courses", error);
  }
};

const AddVenu = async (req, res) => {
  try {
    const rows = req.body;
    const thedb = await connectdb();
    await rows.forEach(async (element) => {
      console.log(element);
      const sql = `INSERT INTO Venu (location) VALUES (?)`;
      const [success] = await thedb.query(sql, [element.venu]);
      console.log(success);
    });

    // console.log(rows);
  } catch (error) {
    console.log("error ins sending data", error);
  }
};

const GetVenu = async (req, res) => {
  try {
    const thedb = await connectdb();
    const query = "SELECT * FROM Venu ";
    const [row] = await thedb.query(query);
    console.log(row);
    res.json(row);
  } catch (error) {
    console.log("error getting venu list", error);
  }
};

import PDFDocument from "pdfkit";
import fs from "fs";






// Generate time slots
const generateTimeSlots = (start, end) => {
  const timeSlots = [];
  let current = start;

  while (current < end) {
    timeSlots.push(current);
    current = addOneHour(current);
  }

  return timeSlots;
};

const addOneHour = (time) => {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  const newHour = hours + 1;
  return newHour * 100 + minutes;
};

const formatTime = (time) => {
  const hours = Math.floor(time / 100)
  const minutes = String(time % 100).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const generateTimetable = async () => {
  try {
    const thedb = await connectdb();

    // Fetch data
    const [programs] = await thedb.query("SELECT * FROM programs");
    const [courses] = await thedb.query("SELECT * FROM courses");
    const [venues] = await thedb.query("SELECT * FROM venu");
    const [teachers] = await thedb.query("SELECT * FROM teacher");
    await thedb.query("TRUNCATE TABLE timetable");

    const timeSlots = generateTimeSlots(900, 1300);
    const timetable = {};
    const venueAvailability = {};
    const programSchedule = {}; // Tracks program schedules

    // Initialize timetable and availability
    const DAYS_LIST = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    DAYS_LIST.forEach((day) => {
      timetable[day] = {};
      venueAvailability[day] = {};
      programSchedule[day] = {};
      timeSlots.forEach((slot) => {
        timetable[day][slot] = {};
        venueAvailability[day][slot] = new Set(); // Track occupied venues
        programSchedule[day][slot] = new Set(); // Track scheduled programs
      });
    });

    const courseHoursRemaining = courses.reduce((map, course) => {
      map[course.course_id] = course.credit_hr;
      return map;
    }, {});

    // Allocate courses to slots
    for (const day of DAYS_LIST) {
      for (const slot of timeSlots) {
        for (const venue of venues) {
          for (const program of programs) {
            const programCourses = courses.filter((c) => c.program_id === program.program_id);

            for (const course of programCourses) {
              if (courseHoursRemaining[course.course_id] > 0) {
                const courseTeachers = teachers.filter(
                  (t) => t.course === course.course_id && t.program === program.program_id
                );

                if (courseTeachers.length === 0) {
                  console.error(`No teachers found for course: ${course.course_name}`);
                  continue;
                }

                const teacher = courseTeachers[Math.floor(Math.random() * courseTeachers.length)];

                // Check if the program already has a class scheduled in this time slot
                if (programSchedule[day][slot].has(program.program_id)) {
                  continue;
                }

                // Check if venue is available
                if (!venueAvailability[day][slot].has(venue.venu_id)) {
                  // Assign the course to the slot
                  timetable[day][slot][venue.venu_id] = {
                    course: course.course_name,
                    teacher: teacher.teacher_name,
                    venue: venue.location,
                    program: program.program_name,
                  };

                  venueAvailability[day][slot].add(venue.venu_id); // Mark venue as occupied
                  programSchedule[day][slot].add(program.program_id); // Mark program as scheduled
                  courseHoursRemaining[course.course_id] -= 1;

                  // Save in the timetable table
                  await thedb.query(
                    "INSERT INTO timetable (day, start_time, end_time, program_id, course_id, teacher_id, venue_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [
                      day,
                      slot,
                      addOneHour(slot),
                      program.program_id,
                      course.course_id,
                      teacher.teacher_id,
                      venue.venu_id,
                    ]
                  );

                  if (courseHoursRemaining[course.course_id] <= 0) break;
                }
              }
            }
          }
        }
      }
    }

    await thedb.end();

    // Generate a PDF
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("timetable.pdf"));

    for (const day of DAYS_LIST) {
      doc.addPage().fontSize(18).text(day, { underline: true });

      for (const slot of timeSlots) {
        const timeRange = `${formatTime(slot)} - ${formatTime(addOneHour(slot))}`;
        doc.fontSize(14).text(`\n${timeRange}`);
        const slotEntries = timetable[day][slot];
        for (const [venueId, entry] of Object.entries(slotEntries)) {
          doc
            .fontSize(12)
            .text(
              `Venue ${venueId} (${entry.venue}): ${entry.course} by ${entry.teacher} for Program ${entry.program}`
            );
        }
      }
    }

    doc.end();
    console.log("Timetable generated and saved as timetable.pdf");
  } catch (error) {
    console.error("Error generating timetable:", error);
  }
};

// generate timetable endpoint
const generate = async (req, res) => {
  try {
    await generateTimetable();
    res.status(200).json({ message: "Timetable generated successfully!" });
  } catch (error) {
    console.error("Error in generating timetable:", error);
    res.status(500).json({ error: "Error generating timetable" });
  }
};





const gettable = async (req, res) => {
  try {
    const thedb = await connectdb();
    const query =
      "SELECT * FROM timetable INNER JOIN programs ON timetable.program_id = programs.program_id INNER JOIN courses ON timetable.course_id = courses.course_id INNER JOIN venu ON timetable.venue_id=venu.venu_id INNER JOIN teacher ON timetable.teacher_id=teacher.teacher_id ;";
    const [result] = await thedb.query(query);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log("Cant get data", error);
  }
};

export {
  GetProgramInfo,
  submitCourses,
  GetCoursesList,
  DeleteCourse,
  AddVenu,
  GetVenu,
  generate,
  gettable,
};
