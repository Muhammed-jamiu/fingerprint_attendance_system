const Student = require("../models/Student");

exports.registerStudent = async (req, res) => {
  // const { fullname, matricNo } = req.body;
  try {
    const isExist = await Student.findOne({ matricNo: req.body.matricNo });

    if (isExist) {
      res.status(400);
      throw new Error("Student already registered");
    }

    //creating/registering new student
    const student = await Student.create({
      fullname: req.body.fullname,
      matricNo: req.body.matricNo,
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
