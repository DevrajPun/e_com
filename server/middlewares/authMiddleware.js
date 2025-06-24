import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
const JWT_SECRET = "ecom"

// USER AUTH
// / Adjust path as needed

export const isAuth = async (req, res, next) => {
  console.log("Middleware is running");

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Missing or invalid auth header");
      return res.status(401).send({ success: false, message: "Unauthorized User" });
    }


    
    const token = authHeader.split(" ")[1];
    const decoded = JWT.verify(token, JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    const user = await userModel.findById(decoded._id); // Change _id if necessary
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};



// ADMIN AUTH
// export const isAdmin = async (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(401).send({
//       success: false,
//       message: "admin only",
//     });
//   }
//   next();
// };

////////////////////////

//Protected Routes token base

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "No token provided or invalid format",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.status(401).send({
      success: false,
      message: "Unauthorized",
      error: error.message,
    });
  }
};


//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
     const user =   await userModel.findByIdAndUpdate( req.user._id, { role: 1 });

    //  console.log(user)

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    console.log("User Role:", user.role); // Debug

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};




