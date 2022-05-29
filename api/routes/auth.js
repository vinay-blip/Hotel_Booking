import express from "express"
import { register,login } from "../controllers/auth.js";
const router = express.Router();


// 1 method
// router.get("/register", (req, res) => {
//     res.send("hello,this is auth register endpoint");
// })

// 2 method
router.post("/register",register)
router.post("/login",login)


export default router

