import express from 'express'
import {createBlog, deleteBlog, getAllBlog, getMyBlog, updateBlog, viewBlog } from '../controllers/blog.controller.js';
import { verifyJwt } from '../middleware/verifyJwt.js';
const router = express.Router();


router.route("/create-blog").post(verifyJwt,createBlog);
router.route("/delete-blog/:id").delete(verifyJwt,deleteBlog);
router.route("/get-all-blog").get(getAllBlog);
router.route("/view-blog/:id").get(viewBlog)
router.route("/get-my-blog").get(verifyJwt,getMyBlog)
router.route("/update-blog/:id").put(verifyJwt,updateBlog)


// router.post("/create-blog" , verifyJwt,createBlog);
// router.g
export default router;