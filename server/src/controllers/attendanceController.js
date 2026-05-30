const Student = require("../models/Student");

//
exports.verifyStudent = async (req, res) => {
  try {
    const { matricNo } = req.body;

    if (matricNo === "" || matricNo < 13) {
      return res.status(400).json({ message: "Fill the field required" });
    }

    //
    const isMatchMatricNo = matricNo.startsWith("FPN2026");
    if (!isMatchMatricNo) {
      return res.status(400).json({
        message: "Matric number format must be like FPN2026CS0001",
      });
    }

    const isStudentExist = await Student.findOne({ matricNo });

    if (!isStudentExist) {
      return res.status(400).json({ message: "Student not found" });
    }

    if (isStudentExist) {
      isStudentExist.attendanceStatus = "present";
    }

    isStudentExist.save();
    res
      .status(201)
      .json({ message: "update Sucessfully", data: isStudentExist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
