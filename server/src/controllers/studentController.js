const Student = require("../models/Student");

exports.registerStudent = async (req, res) => {
  const { fullname, matricNo } = req.body;
  try {
    const isExist = await Student.findOne({ matricNo });

    if (isExist) {
      res.status(400);
      throw new Error("Student already registered");
    }

    if (fullname === "" && matricNo === "") {
      return res
        .status(400)
        .json({ message: "Please fill all the field required" });
    }

    if (fullname.length < 4) {
      return res.status(400).json({ message: "Name is too short" });
    }
    if (matricNo.length < 13) {
      return res
        .status(400)
        .json({ message: "Matric number must be 13 character long" });
    }

    // CHECK MATRIC PREFIX
    const isMatchMatricNo = matricNo.startsWith("FPN2026");
    if (!isMatchMatricNo) {
      return res.status(400).json({
        message: "Matric number format must be like FPN2026CS0001",
      });
    }

    //creating/registering new student
    const student = await Student.create({
      fullname,
      matricNo,
    });

    return res
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
