const Student = require("../models/Student");

//
exports.verifyStudent = async (req, res) => {
  try {
    const { matricNo } = req.body;

    if (!matricNo) {
      return res.status(400).json({
        message: "Fill the field required",
      });
    } else if (matricNo.length < 13 || matricNo.length > 14) {
      return res.status(400).json({
        message: "Matric number must be  13  characters",
      });
    }

    const isMatchMatricNo = matricNo.startsWith("FPN2026");

    if (!isMatchMatricNo) {
      return res.status(400).json({
        message: "Matric number format must be like FPN2026CS0001",
      });
    }

    const student = await Student.findOne({ matricNo });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // NEW VALIDATION
    if (student.attendanceStatus === "present") {
      return res.status(400).json({
        message: "Student already marked attendance",
      });
    }

    res.status(200).json({
      message: "Student verified successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
