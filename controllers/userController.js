import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" });
        }

        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, message: "User Logged In", token });
    } catch (error) {
        res.json({ success: false, message: "Server Error" });
    }
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length  < 8) {
            return res.json({ success: false, message: "Please enter a strong password (min. 8 characters)" });
        }

        const check = await userModel.findOne({ email });
        if (check) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        try {
            const user = await newUser.save();
            const token = createToken(user._id);
            res.json({ success: true, message: "User Registered", token });
        } catch (err) {
            console.error("MongoDB Save Error:", err);
            return res.json({ success: false, message: "Database Save Error", error: err.message });
        }


        
    } catch (error) {
        res.json({ success: false, message: "Server Error" });
    }
};

export { loginUser, registerUser };
