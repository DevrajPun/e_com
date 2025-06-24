import mongoose from "mongoose";
const productSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product  name is Required']
    },

    description: {
        type: String,
        required: [true, 'Product  description  is Required']
    },

    price: {
        type: Number,
        required: [true, ' Product  Price is Required']
    },

    stock: {
        type: Number,
        required: [true, 'Product Stock is Required ']
    },
    
    //  quantaty: {
    //     type: Number,
    //     required: [true, 'Product quantaty is Required ']
    // },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    image:[{
        public_id: String,
        url: String
    }]
},
{
 timestamps:true });

export const productModel = mongoose.model('Products', productSchema)
export default productModel     