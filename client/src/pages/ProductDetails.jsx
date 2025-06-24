import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import { useCart } from "../context/Cart";
import axios from 'axios';
import toast from 'react-hot-toast';

function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart([]);

  useEffect(() => {
    if (params?.id) getProduct();
  }, [params?.id]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/product/get-product/${params.id}`);
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
        <br /><br />
      <div className="container mt-5">
        <div className='row mt-5'>
          <div className='col-md-6'>
            {product.image?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                className="card-img-top mb-2"
                alt={`Product ${product.name} - ${i + 1}`}
              />
            ))}
          </div>
          <div className='col-md-6'>
            <h1>Product Details</h1>
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>Price: ₹{product.price}</h6>

            <button
              className="btn btn-primary mt-3"
              onClick={() => {
                setCart([...cart, product]);
                toast.success('Item Added to Cart');
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>

        <div className='row'>
          <h4>Similar Products</h4>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
