
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart([])


  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/category/get-all");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);

    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);


  // Fetch all products 

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/product/get-all");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };


  /// filter by cat 
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }

    setChecked(all)
  }


  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row ">
          <div className="col-md-2 mt-3">
            <h5 className="text-center">Filter By Category</h5>

            <div className="d-flex flex-column" >

              {categories?.map((c) => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.category}

                </Checkbox>
              ))}

            </div>

            <h5 className="text-center mt-4 ">Filter By Price</h5>

            <div className="d-flex flex-column">
              <Radio.Group onChange={e => setRadio(e.target.value)}>
                {Prices?.map(p => (
                  <div key={p._id}>
                    <Radio value={p.array} > {p.name} </Radio>
                    {p.name}
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>


          </div>
          <div className="col-md-9 mt-3">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                  {p.image?.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      height={"200px"}
                      className="card-img-top mb-2"
                      alt={`Product ${p.name} - ${i + 1}`}
                    />
                  ))}
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">$ {p.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p._id}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        toast.success("Item Added to Cart");
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default HomePage;








