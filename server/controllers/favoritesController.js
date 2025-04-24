import userModel from "../models/userModel.js";

// GET /favorites
// export const getFavorites = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);
//     const { userId } = req.body; // assuming userId is provided by your auth middleware
//     const user = await userModel.findById(userId).populate("favorites", "name email tutorData");
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }
//     return res.status(200).json({ success: true, favorites: user.favorites });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



// export const getFavorites = async (req, res) => {
//   try {
//     const { userId } = req.query;
//     if (!userId) {
//       return res.status(400).json({ success: false, message: "User ID is required" });
//     }

//     const user = await userModel.findById(userId).populate("favorites", "_id name email profile tutorData");
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // Ensure favorites is always an array of objects
//     const favorites = user.favorites.map(fav => ({
//       _id: fav._id,
//       name: fav.name,
//       email: fav.email,
//       profile: fav.profile,
//       tutorData: fav.tutorData
//     }));

//     return res.status(200).json({ success: true, favorites });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };


// // POST /favorites
// export const addFavorite = async (req, res) => {
//   try {
//     const { userId, tutorId } = req.body;
//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }
//     // Prevent adding the same tutor more than once
//     if (user.favorites && user.favorites.includes(tutorId)) {
//       return res.status(400).json({ success: false, message: "Tutor already in favorites" });
//     }
//     user.favorites = user.favorites || [];
//     user.favorites.push(tutorId);
//     await user.save();
//     return res.status(200).json({ success: true, message: "Tutor added to favorites", favorites: user.favorites });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // DELETE /favorites/:tutorId
// export const removeFavorite = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const { tutorId } = req.params;
//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }
//     if (!user.favorites || !user.favorites.includes(tutorId)) {
//       return res.status(404).json({ success: false, message: "Tutor not found in favorites" });
//     }
//     user.favorites = user.favorites.filter((fav) => fav.toString() !== tutorId);
//     await user.save();
//     return res.status(200).json({ success: true, message: "Tutor removed from favorites", favorites: user.favorites });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };


// export const checkFavorite = async (req, res) => {
//   try {
//     const { userId, tutorId } = req.query;
//     console.log("checkFavorite called with:", { userId, tutorId });

//     if (!userId || !tutorId) {
//       return res.status(400).json({ success: false, message: "User ID and Tutor ID are required" });
//     }

//     const user = await userModel.findById(userId);
//     if (!user) {
//       console.log("User not found for ID:", userId);
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const isFavorite = user.favorites.some(fav => fav.toString() === tutorId);
//     console.log("isFavorite:", isFavorite);

//     return res.status(200).json({ success: true, isFavorite });
//   } catch (error) {
//     console.error("Error in checkFavorite:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };
