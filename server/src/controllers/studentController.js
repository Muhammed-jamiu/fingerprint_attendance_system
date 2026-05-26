const Student = require("../models/Student");

exports.registerStudent = async (req, res) => {
  const { fullname, matricNo } = req.body;
  try {
    const isExist = await Student.findOne({ matricNo });

    if (isExist) {
      res.status(400);
      throw new Error("Student already registered");
    }

    if (fullname.length < 4) {
      return res.status(400).json({ message: "Name is too short" });
    }

    //IsmatchMatric number
    const isMatchMatricNum = () => {
      const matchMatricNo = ["FPN2026"];
      if (matchMatricNo.includes(matricNo)) {
        return res
          .status(400)
          .json({ message: "Invalid Matric number entered" });
      }
    };

    //creating/registering new student
    const student = await Student.create({
      fullname,
      matricNo: isMatchMatricNum(),
    });

    // await student.save();
    res
      .status(200)
      .json({ message: "Student registered sucessfully", data: student });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      message: "Students retrieved successfully",
      data: students,
      count: students.length,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
