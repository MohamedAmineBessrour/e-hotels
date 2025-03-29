import React, { useState } from "react";
import "./LoginPage.css";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ssn: "",
    dob: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in with Name: ${formData.name}, SSN: ${formData.ssn}`);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const birthYear = new Date(formData.dob).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (age < 18 || age > 120) {
      alert("Age must be between 18 and 120.");
      return;
    }

    alert("Registration submitted for customer: " + JSON.stringify(formData));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isRegistering ? "Customer Registration" : "Login"}</h2>

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
              pattern="[0-9\-]{9,20}"
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
