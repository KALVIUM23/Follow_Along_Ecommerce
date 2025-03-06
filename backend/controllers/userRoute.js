const express = require("express");
const { UserModel } = require("../model/userModel");
const ErrorHandler = require("../utils/Errorhandler");
const catchAsyncErrors = require("../middelware/catchAsyncError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });

const userRoute = express.Router();

userRoute.post("/signup", catchAsyncErrors(async (req, res, next) => {
    
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        next(new ErrorHandler("name, email and password are required", 400));
    }

    let user = await UserModel.findOne({ email: email });
    if (user) {
        next(new ErrorHandler("user is already registered, please login", 400));
    }

    bcrypt.hash(password, 5, async (error, hash) => {
        if (error) {
            next(new ErrorHandler("internal server error", 500));
        }

        let newUser = new UserModel({ name, email, password: hash });

        let token = jwt.sign({ id: newUser._id }, process.env.ACCESS);

        let activation_url = `http://localhost:8052/user/activation/${token}`;

        try {
            await sendMail({
                email: newUser.email,
                subject: "Activate your account",
                message: `Hello ${newUser.name}, please click on the link to activate your account: ${activation_url}`,
            });
            await newUser.save();
            res.status(200).json({ status: true, message: "registration successful, please activate your account" });
        } catch (error) {
            next(new ErrorHandler("internal server error nodemailer", 500));
            console.log(error);
        }
    });
}));

userRoute.get("/activation/:token", catchAsyncErrors(async (req, res, next) => {
    let token = req.params.token;
    if (!token) {
        next(new ErrorHandler("token not found", 404));
    }
    jwt.verify(token, process.env.ACCESS, async (err, decoded) => {
        if (err) {
            next(new ErrorHandler("token is not valid", 400));
        }

        let id = decoded.id;
        await UserModel.findByIdAndUpdate(id, { isActivated: true });

        res.status(200).json({ status: true, message: "activation is completed" });
    });
}));

userRoute.post("/login", catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next(new ErrorHandler("email and password are required", 400));
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
        next(new ErrorHandler("please signup before login", 400));
    }

    if (!user.isActivated) {
        next(new ErrorHandler("please activate your account before login", 400));
    }

    let isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
        next(new ErrorHandler("password is incorrect", 400));
    }

    let token = jwt.sign({ id: user._id }, process.env.ACCESS, { expiresIn: '30d' });

    res.cookie("accesstoken", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({ status: true, message: "login successful" });
}));

userRoute.post("/upload", upload.single("photo"), catchAsyncErrors(async (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    if (!req.file) {
        return next(new ErrorHandler("File not found", 400));
    }

    res.status(200).json({ message: "File uploaded successfully", filePath: `/upload/${req.file.filename}` });
}));

module.exports = { userRoute };