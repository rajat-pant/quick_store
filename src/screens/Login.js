import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    const response = await fetch("http://localhost:5001/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    
    <div style={{ backgroundImage: 'url("https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm348-nunny-11_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=205d496fd6100cc13148d4c81b6966b2")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>

      <p style={{ fontSize: "45px", marginLeft: "580px" }}>
        Login</p>
    <div className="container">
        <form
          onSubmit={handleSubmit}
          style={{ width: "700px", marginLeft: "220px" }}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange} />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange} />
          </div>
          <button type="submit" className=" m-3 btn btn-success">
            Submit
          </button>
          <Link to="/creatuser" className="m-3 btn btn-danger">
            I'm a new User
          </Link>
        </form>
      </div>
    </div>
    
  )
}
