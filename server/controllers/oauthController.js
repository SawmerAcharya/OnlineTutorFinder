import passport from "passport";

// Function to initiate Google OAuth
export const googleAuth = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

// Callback function after Google OAuth
export const googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/auth/failed' })(req, res, () => {
        if (req.user) {
            console.log("User ID:", req.user.id);
            console.log("User Email:", req.user.email);
        }

        res.redirect('http://localhost:3000/'); // Redirect to frontend home page
    });
};

// Function to get the current authenticated user
export const getCurrentUser = (req, res) => {
  console.log("Session:", req.session); // Debugging session data
  console.log("User from session:", req.user); // Debugging user data

  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // Send only necessary user details
  res.json({ id: req.user.id, email: req.user.email });
};

// Function to log out
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.redirect("/"); // Redirect to home page after logout
  });
};
