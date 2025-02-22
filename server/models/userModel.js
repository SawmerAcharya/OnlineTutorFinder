import mongoose,{Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOtp: { type: String, default: '' },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: '' },
  resetOtpExpireAt: { type: Number, default: 0 },
  role: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
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
});


const userModel = mongoose.models.User || mongoose.model('User', UserSchema);



export default userModel;
