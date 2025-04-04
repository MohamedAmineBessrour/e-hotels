import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { loginCustomer, loginEmployee, registerCustomer } from "../services/api";
import "./LoginPage.css";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [userType, setUserType] = useState("customer"); // "customer" or "employee"
  const [formData, setFormData] = useState({
    name: "",
    ssn: "",
    dob: "",
    address: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (userType === "customer") {
        res = await loginCustomer({ name: formData.name, ssn: formData.ssn });
        login(res.data, userType);
        navigate("/search");
      } else {
        res = await loginEmployee({ name: formData.name, ssn: formData.ssn });
        login(res.data, userType);
        navigate("/employee-dashboard");
      }

    } catch (err) {
      console.error(err);
      alert("❌ Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const birthYear = new Date(formData.dob).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (age < 18 || age > 120) {
      alert("Age must be between 18 and 120.");
      return;
    }

    try {
      const res = await registerCustomer(formData);
      alert(`✅ Registered successfully as ${res.data.name}`);
      login(res.data, "customer");
      navigate("/search");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Registration failed. Please try again. Error: " + err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isRegistering ? "Customer Registration" : `${userType === "employee" ? "Employee" : "Customer"} Login`}</h2>

        {/* 👇 Login/Register Toggle for Employee or Customer */}
        {!isRegistering && (
          <div className="form-group">
            <label>User Type:</label>
            <select value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        )}

        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>SSN</label>
            <input
              type="text"
              name="ssn"
              value={formData.ssn}
              onChange={handleChange}
              pattern="[0-9\\-]{9,20}"
              title="Enter a valid SSN"
              required
            />
          </div>

          {isRegistering && (
            <>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <button type="submit">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <p className="toggle-link" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering
            ? "Already have an account? Login here."
            : "Don't have an account? Register as a customer."}
        </p>
      </div>
    </div>
  );
}
