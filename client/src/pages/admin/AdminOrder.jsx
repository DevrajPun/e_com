import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/order/my-orders", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      
      if (Array.isArray(data)) {
        setOrders(data); 
      } else if (Array.isArray(data.orders)) {
        setOrders(data.orders); 
      } else {
        setOrders([]); 
        toast.error("Invalid orders response format");
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `http://localhost:5000/api/order/order-status/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      toast.success("Order status updated");
      getOrders();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((order, index) => (
              <div className="border shadow mb-4 p-3" key={order._id}>
                <h5>Order #{index + 1}</h5>
                <p><strong>Status:</strong> {order.orderStatus}</p>
                {/* <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Payment Status:</strong> {order.paymentInfo?.status || "Not Paid"}</p> */}
                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p><strong>Ordered At:</strong> {moment(order.createdAt).format("LLL")}</p>
                <p><strong>Shipping To:</strong> {order.shippingInfo?.address}, {order.shippingInfo?.city}, {order.shippingInfo?.country}</p>

                <h6>Items:</h6>
                {order.orderItems?.map((item) => (
                  <div className="row mb-2 p-2 border" key={item.product}>
                    <div className="col-md-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-9">
                      <p><strong>{item.name}</strong></p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
