
import express from "express";
import {  createCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController, updateCategoryController }  from "../controllers/categoryController.js";

const router = express.Router()

// creatr
router.post("/create", createCategoryController);
// get ALL
router.get("/get-all", getAllCategoryController)

// get single
router.get("/:id" , getSingleCategoryController)

// delete Category
router.delete("/delete/:id" ,deleteCategoryController )

// update Category 
router.put ("/update/:id",updateCategoryController )

export default router;


