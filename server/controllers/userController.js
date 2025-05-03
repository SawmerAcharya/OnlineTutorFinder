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
      _id: user._id,
      name: user.name,
      role:user.role,
      profile:user.profile,
      tutorData:user.tutorData,
      paymentInfo:user.paymentInfo,
      isAccountVerified: user.isAccountVerified
    }     
  });


  }catch(error){
    return res.status(400).json({ success: false, message: error.message });
  }

}



// export const setUserRole = async (req, res) => {
//   try {
//     const { role, tutorFields } = req.body;
//     const userId = req.body.userId;

//     if (!['student', 'tutor'].includes(role)) {
//       return res.status(400).json({ success: false, message: 'Invalid role. Allowed values are "student" or "tutor".' });
//     }

//     const user = await userModel.findById(userId);

//     if (!user) {
//       return res.status(400).json({ success: false, message: 'User not found' });
//     }

//     user.role = role;

//     if (role === 'tutor') {
//       user.tutorData = tutorFields;
//       user.isApproved = false; // Admin needs to approve tutor
//     } else {
//       user.tutorData = null;
//     }

//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: 'Role updated successfully',
//       userData: {
//         name: user.name,
//         role: user.role,
//         isAccountVerified: user.isAccountVerified,
//         isApproved: user.isApproved,
//       },
//     });
//   } catch (error) {
//     return res.status(400).json({ success: false, message: error.message });
//   }
// };


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
      // userId: tutor._id,
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


// export const getStudentInfo = async (req, res) => {
//   try {
//     console.log("Request Params:", req.params);
//     // Use 'id' since your route is defined as '/student/:id'
//     const { id } = req.params;
//     console.log("Student ID from URL:", id);

//     if (!id) {
//       return res.status(400).json({ success: false, message: "Student ID is required" });
//     }

//     const student = await userModel.findById(id).select('name email role isAccountVerified');
//     console.log("Backend Student Data:", student);

//     if (!student || student.role !== 'student') {
//       return res.status(404).json({ success: false, message: "Student not found or not a student" });
//     }

//     const studentInfo = {
//       name: student.name,
//       email: student.email,
//       isAccountVerified: student.isAccountVerified,
//       role: student.role
//     };

//     return res.status(200).json({
//       success: true,
//       studentInfo,
//     });
//   } catch (error) {
//     console.error("Error fetching student info:", error.message);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };


export const getStudentInfo = async (req, res) => {
  try {
    console.log("Request Params:", req.params);
    const { id } = req.params;
    console.log("Student ID from URL:", id);

    if (!id) {
      return res.status(400).json({ success: false, message: "Student ID is required" });
    }

    const student = await userModel.findById(id);
    console.log("Backend Student Data:", student);

    if (!student || student.role !== 'student') {
      return res.status(404).json({ success: false, message: "Student not found or not a student" });
    }
    return res.status(200).json({
      success: true,
      studentInfo: student,  
    });
  } catch (error) {
    console.error("Error fetching student info:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


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
      profile: student.profile,
      address: student.address
     
    }));

    return res.status(200).json({ success: true, students: studentData });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//Delete the student 
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params; // Extract student ID from request parameters

    const deletedStudent = await userModel.findByIdAndDelete(id); // Find and delete student by ID

    if (!deletedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Student ${deletedStudent.name} deleted successfully`,
      student: {
        id: deletedStudent._id,
        name: deletedStudent.name,
        email: deletedStudent.email,
      },
    });
  } catch (error) {
    console.error("Error deleting student:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteTutor = async (req, res) => {
  try {
    const { id } = req.params; // Extract tutor ID from request parameters

    // Find and delete the tutor by ID
    const deletedTutor = await userModel.findByIdAndDelete(id); 

    if (!deletedTutor) {
      return res.status(404).json({ success: false, message: "Tutor not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Tutor ${deletedTutor.name} deleted successfully`,
      tutor: {
        id: deletedTutor._id,
        name: deletedTutor.name,
        email: deletedTutor.email,
      },
    });
  } catch (error) {
    console.error("Error deleting tutor:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateTutorProfile = async (req, res) => {
  const tutorId = req.params.id;
  const updatedData = req.body;  // Get the updated data from the request body
  
  try {
    // Assume `Tutors` is your database model
    const updatedTutor = await userModel.findByIdAndUpdate(tutorId, updatedData, { new: true });

    if (!updatedTutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    res.status(200).json({ tutor: updatedTutor });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update tutor profile', error });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const users = await userModel.find();

    const totalUsers = users.length;
    const totalTutors = users.filter(user => user.role === 'tutor').length;
    const totalStudents = users.filter(user => user.role === 'student').length;
    const pendingTutors = users.filter(
      user => user.role === 'tutor' && user.tutorData?.status === 'pending'
    ).length;

    res.status(200).json({
      totalUsers,
      totalTutors,
      totalStudents,
      pendingTutors,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const saveUserProfile = async (req, res) => {
  try {
    const { userId, phone, gender, grade, address, languages, aboutMe, learningLocation } = req.body;

    // Use userId from the request body, or fallback to the authenticated user's id (if available)
    const id = userId || (req.user && req.user.id);
    
    if (!id) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Find the user profile by the provided id
    const userProfile = await userModel.findById(id);

    if (!userProfile) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update the user profile with the provided data
    userProfile.phone = phone || userProfile.phone;
    userProfile.gender = gender || userProfile.gender;
    userProfile.grade = grade || userProfile.grade;
    userProfile.address = address || userProfile.address;
    userProfile.languages = languages || userProfile.languages;
    userProfile.aboutMe = aboutMe || userProfile.aboutMe;
    userProfile.learningLocation = learningLocation || userProfile.learningLocation;

    // Save the updated user profile to the database
    await userProfile.save();

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: userProfile,
    });
  } catch (error) {
    console.error("Error saving profile:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while saving the profile",
    });
  }
};
export const savePaymentInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountHolderName, bankName, accountNumber } = req.body;

    if (!accountHolderName || !bankName || !accountNumber) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (accountHolderName, bankName, accountNumber) are required.",
      });
    }

    const tutor = await userModel.findById(id);
    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found.",
      });
    }

    if (tutor.role !== "tutor") {
      return res.status(400).json({
        success: false,
        message: "This operation is only allowed for tutors.",
      });
    }

    // ✅ Save to root-level paymentInfo field
    tutor.paymentInfo = {
      accountHolderName,
      bankName,
      accountNumber,
    };

    await tutor.save();

    const maskedAccountNumber = "**" + accountNumber.slice(-4);

    return res.status(200).json({
      success: true,
      message: "Payment information saved successfully.",
      data: {
        accountHolderName,
        bankName,
        accountNumber: maskedAccountNumber,
      },
    });
  } catch (error) {
    console.error("Error saving payment info:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while saving payment information.",
    });
  }
};
