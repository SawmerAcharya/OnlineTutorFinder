import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserData,setUserRole } from '../controllers/userController.js';
import { getAllTutors, getTutorById, updateTutorStatus, getTutorInfo,getAllApproveTutors , getAllStudents} from '../controllers/userController.js';


const userRouter = express.Router();
userRouter.get('/Approvedtutors', getAllApproveTutors);
userRouter.get('/data', userAuth, getUserData);

userRouter.post("/setRole",userAuth,setUserRole)

userRouter.get('/tutors', userAuth, getAllTutors);
userRouter.get('/tutors/:id', getTutorById);


userRouter.put("/tutor/status/:tutorId", userAuth, updateTutorStatus);

userRouter.get("/tutor/status/:tutorId", getTutorInfo);

userRouter.get('/students', getAllStudents);

export default userRouter; 