import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserData,setUserRole } from '../controllers/userController.js';
import { getAllTutors, getTutorById, updateTutorStatus, getTutorInfo, getAllStudents, deleteStudent,savePaymentInfo, deleteTutor, getAllApproveTutors, updateTutorProfile, saveUserProfile, getStudentInfo ,getDashboardStats} from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);

userRouter.post("/setRole",userAuth,setUserRole)

// userRouter.get('/tutors', userAuth, getAllTutors);
userRouter.get('/tutors', getAllTutors);

userRouter.get('/Approvedtutors', getAllApproveTutors);
userRouter.get('/tutors/:id', getTutorById);


userRouter.put("/tutor/status/:tutorId", userAuth, updateTutorStatus);

userRouter.get("/tutor/status/:tutorId", getTutorInfo);
userRouter.delete("/tutors/:id", deleteTutor); 
userRouter.put('/tutors/:id', updateTutorProfile);

userRouter.get('/dashboard/stats', getDashboardStats);


// Adding the route for fetching student information
userRouter.get('/student/:id', getStudentInfo);
userRouter.post('/tutors/:id/payment-info', userAuth, savePaymentInfo);

// Route to get all students
userRouter.get('/students', getAllStudents);
userRouter.delete("/students/:id", deleteStudent);

userRouter.post("/profile", saveUserProfile);

export default userRouter; 