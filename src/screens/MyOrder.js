import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await fetch("http://localhost:5001/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });
      const data = await response.json();
      setOrderData(data.orderData.order_data);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="mt-5">
          {/* <img src={cart} style={{ width: "100px", height: "100px" }}></img> */}
        </div>
        {orderData.length === 0 ? (
          <p>No past orders found.</p>
        ) : (
          orderData
            .slice(0)
            .reverse()
            .map((orderGroup, index) => (
              <div key={index}>
                <h4 className="mt-5 text-info" style={{ marginLeft: "300px" }}>
                  <p>Order#</p>
                  Date of Order: {orderGroup[0].Order_data}
                </h4>
                <hr style={{ marginLeft: "300px", marginRight: "250px" }} />
                <div className="row">
                  {orderGroup.map((order, itemIndex) => (
                    <div key={itemIndex} className="col-12 col-md-6 col-lg-3">
                      {itemIndex !== 0 ? (
                        <div
                          className="card mt-3"
                          style={{ width: "16rem", maxHeight: "360px" }}
                        >
                          <div className="card-body">
                            <h5 className="card-title">{order.name}</h5>
                            <div
                              className="container w-100 p-0"
                              style={{ height: "78px" }}
                            >
                              <div>
                                <span className="m-1">
                                  Quantity (qty): {order.qty}
                                </span>
                              </div>
                              <div>
                                <span className="m-1">Size: {order.size}</span>
                              </div>
                              <div className="d-inline m-1 h-100 w-20 fs-5">
                                Price: ₹{order.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>
      <div>
        <Footer />
      </div>
      </>
  );
}
