// import { Users } from "../models/user.js"

// export const getAllUser = async (req, res)=>{
//     const users = await Users.find({})
//     console.log(req.query)
//     // const category = req.query.category
//     console.log(req.query.category)
//     res.json({
//         success: true,
//         users
//     })
// }

// export const getNewUser = async (req, res)=>{
//     const {name, email, password} = req.body    
//     await Users.create({
//         name,
//         email,
//         password
//     })

//     res.status(201).cookie("token","lol").json({
//         success: true,
//         messgae: "Successfully saved."
//     })
// }

// export const getSpecialUser = (req, res)=>{
//     res.json({
//         success: true,
//         message: "just like that."
//     })
// }

// export const getDynamicRoute = async (req, res)=>{
//     const {id} = req.params
//     // const {id} = req.query

//     const users = await Users.findById(id)

//     res.json({
//         success: true,
//         users 
//     })

// }
// export const updateUser = async (req, res)=>{
//     const {id} = req.params
//     // const {id} = req.query

//     const users = await Users.findById(id)

//     res.json({
//         success: true,
//         message: "updated successfully" 
//     })

// }
// export const deleteUser = async (req, res)=>{
//     const {id} = req.params
//     // const {id} = req.query

//     const users = await Users.findById(id)


//     res.json({
//         success: true,
//         message: "Deleted User Sucessfully" 
//     })

// }

// ===============Authentication project=========================
import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js"
import ErrorHandler from "../middleware/error.js"


export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User Already Exist", 400))

        const hashedPasswd = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hashedPasswd })

        sendCookie(user, res, "Registered Successfully", 201)
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select("+password")

        if (!user) return next(new ErrorHandler("Invalid Email or Password", 400))

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400))

        sendCookie(user, res, `Welcome back, ${user.name}`, 200)
    } catch (error) {
        next(error)
    }
}

export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    })

}

export const logout = (req, res) => {

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success: true,
        user: req.user
    })

}