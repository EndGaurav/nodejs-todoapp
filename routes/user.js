// import express from "express"
// import { deleteUser, getAllUser, getDynamicRoute, getNewUser, getSpecialUser, updateUser } from "../controllers/user.js"


// const router = express.Router()

// router.get("/all", getAllUser)

// router.post("/new", getNewUser)

// router.get("/userid/special", getSpecialUser)

// // when we have simmilar route then we can chain the multiple methods on it route function of router. 
// router.route("/userid/:id").get(getDynamicRoute).put(updateUser).delete(deleteUser)

// // same as below

// // router.get("/userid/:id", getDynamicRoute)

// // router.put("/userid/:id", updateUser)

// // router.delete("/userid/:id", deleteUser)

// export default router;

// ==========================Authentication project==================

import express from "express"
import { getMyProfile, login, logout, register } from "../controllers/user.js"
import { isAuthenticated } from "../middleware/auth.js"

const router = express.Router()

router.post("/new", register)

router.post("/login", login)

router.get("/logout", logout)

router.get("/me", isAuthenticated ,getMyProfile)


export default router;