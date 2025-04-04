import userModel from "../models/userModel.js"

export const getUserData = async (req, res)=>{
  try{
    const {userId} = req.body;

    const user = await userModel.findById(userId);

    if(!user){
     
      return res.status(400).json({success: false, message: 'User not found'});
    }
    
   return res.status(200).json({
    success: true,
    userData: {
      _id:user._id,
      name: user.name,
      role:user.role,
      tutorData:user.tutorData,
      isAccountVerified: user.isAccountVerified
    }     
  });


  }catch(error){
    return res.status(400).json({ success: false, message: error.message });
  }

}

export const getAllStudents = async (req, res) => {
  try {
    const students = await userModel.find({ role: "student" }); // Finds all users with the role 'student'

    if (!students.length) {  // Check if no students are found
      return res.status(404).json({ success: false, message: "No students found" });
    }

    // Map the student data into a cleaner response structure
    const studentData = students.map((student) => ({
      id: student._id, // Ensure id is included in the response
      name: student.name,
      email: student.email,
     
    }));

    return res.status(200).json({ success: true, students: studentData });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const setUserRole = async (req, res) => {
  try {
    const { role, tutorFields } = req.body;
    const userId = req.body.userId;

    if (!['student', 'tutor'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role. Allowed values are "student" or "tutor".' });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    user.role = role;

    if (role === 'tutor') {
      // Ensure tutorFields has the default status as "pending" if not already set
      user.tutorData = {
        ...tutorFields, // Spread the existing tutorFields data
        status: tutorFields.status || 'pending', // Default to "pending" if status is not provided
      };
      user.isApproved = false; // Admin needs to approve tutor
    } else {
      user.tutorData = null;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      userData: {
        name: user.name,
        role: user.role,
        isAccountVerified: user.isAccountVerified,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};


export const getAllTutors = async (req, res) => {
  try {
    const tutors = await userModel.find({ role: 'tutor' }).select('-password');

    

    if (tutors.length === 0) {
      console.log("No tutors found in DB!");
    }

    return res.status(200).json({
      success: true,
      tutors,
    });
  } catch (error) {
    console.error("Error fetching tutors:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getTutorById = async (req, res) => {
  console.log("Fetching tutor with ID:", req.params.id); // Debugging log
  try {
    const tutor = await userModel.findById(req.params.id).select('-password');
    if (!tutor) {
      return res.status(404).json({ success: false, message: "Tutor not found" });
    }
    return res.status(200).json({ success: true, tutor });
  } catch (error) {
    console.error("Error fetching tutor by ID:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getTutorInfo = async (req, res) => {
  try {
    const tutor = await userModel.findById(req.params.tutorId).select('name tutorData');
    console.log("Backend Tutor Data:", tutor);

    if (!tutor) {
      return res.status(404).json({ success: false, message: "Tutor not found" });
    }

    const tutorInfo = {
      name: tutor.name,
      subject: tutor.tutorData?.CurrentSubject || "N/A",
    };

    return res.status(200).json({
      success: true,
      tutorInfo,
    });
  } catch (error) {
    console.error("Error fetching tutor info:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



export const updateTutorStatus = async (req, res) => {
  const { tutorId } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected", "pending"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value. Allowed values are 'approved', 'rejected', 'pending'."
    });
  }

  try {
    let tutor = await userModel.findById(tutorId);
    
    if (!tutor) {
      return res.status(404).json({ success: false, message: "Tutor not found." });
    }

    if (!tutor.tutorData) {
      tutor.tutorData = {}; 
    }

    // console.log("Tutor Details:", tutor)
    tutor.tutorData = {
      ...tutor.tutorData,
      "status":status,
    };
    await tutor.save();

    console.log(`Tutor ID: ${tutorId}, Status updated to: ${status}`);

    return res.json({
      success: true,
      message: `Tutor status successfully updated to ${status}.`,
      data: {
        tutorId: tutor._id,
        status: tutor.tutorData.status 
      }
    });
  } catch (error) {
    console.error("Error updating tutor status:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Unable to update tutor status."
    });
  }
};
export const getAllApproveTutors = async (req, res) => {
  try {
    const tutors = await userModel
      .find({ role: 'tutor', 'tutorData.status': 'approved' })
      .select('-password');

    if (tutors.length === 0) {
      console.log("No tutors found in DB!");
    }

    return res.status(200).json({
      success: true,
      tutors,
    });
  } catch (error) {
    console.error("Error fetching tutors:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};


