import categoryModel from "../models/categoryModel.js";
export const createCategoryController = async (req, res) => {
    try {
        const { category } = req.body;

        // Validation
        if (!category) {
            return res.status(400).send({
                success: false,
                message: "Category is required"
            });
        }

        await categoryModel.create({ category });

        return res.status(201).send({
            success: true,
            message: `${category} Category Created Successfully`
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in category API",
            error: error.message
        });
    }
}


/////================================================================

export const getAllCategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "Get All category API  Successfully",
            totalCategory: categories.length,
            categories

        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error Get All Controller API"
        })
    }
}

///=====================================================================

export const getSingleCategoryController = async (req, res) => {

    try {
        const getSingle = await categoryModel.findById(req.params.id)
        res.status(200).send({
            success: true,
            message: "Get Single category API Successfully",
            // totalCategory : getSingle.length,
            getSingle
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: true,
            message: "Error Get Single Category API"

        })
    }
}

///===================================================================

export const deleteCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id)
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category Not Found "
            })
        };

        await category.deleteOne();
        return res.status(200).send({
            success: true,
            message: " Delete Category  Successfully ",

        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error Delete Category API "
        })
    }

}

//=======================================================================

export const updateCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id)
        if (!category) {
            console.log(error)
            return res.status(404).send({
                success: false,
                message: "Category Not Found"
            })
        };
            const  { category : updateCategory } = req.body
            if (updateCategory)
                { category.category = updateCategory;
                }

            await category.save();
            return res.status(200).send({
                success: true,
                message: "category Updated SucceessFully ",
                category
            })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error Update Category API"

        })
    }
}

///========================================================================


