import mongoose,{Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  verifyOtp: { type: String, default: '' },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: '' },
  resetOtpExpireAt: { type: Number, default: 0 },
  role: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
  
  googleId: { type: String, unique: true, sparse: true }, // Optional for Google users
  
  balance : {type:Number,default :0},

  // Profile Fields
  profile : {type:String,default : ''},
  phone: { type: String, default: '' },
  gender: { type: String, default: '' },
  grade: { type: String, default: '' },
  address: { type: String, default: '' },
  languages: { type: [String], default: [] },
  aboutMe: { type: String, default: '' },
  learningLocation: { type: [String], default: [] },
  
  tutorData: {
    type: Schema.Types.Mixed, // This allows any object to be stored
    default: null,
    validate: {
      validator: function(value) {
        // Conditionally validate tutorData
        if (this.role === 'tutor' && (value === null || typeof value !== 'object')) {
          return false; // If role is 'tutor', tutorData must be an object
        }
        return true;
      },
      message: 'tutorData must be an object when the role is "tutor"',
    },
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
});


const userModel = mongoose.models.User || mongoose.model('User', UserSchema);



export default userModel;