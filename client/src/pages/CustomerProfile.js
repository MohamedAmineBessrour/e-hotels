import React, { useState } from "react";
import "./UserProfile.css";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState({
    Customer_ID: 1,
    Name: "Kristy Oneal",
    SSN: "119-46-9037",
    Age: 33,
    Address: "91325 Hector Corners, West Matthew, OK 53993",
    Card_Number: "4393191058526589",
    Registration_Date: "2023-05-07"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Updating customer: ${JSON.stringify(customer)}`);
  };

  return (
    <div className="profile-container">
      <h2>👤 Customer Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        {Object.keys(customer).map((key) => (
          <div key={key}>
            <label className="input-label">{key.replace(/_/g, " ")}</label>
            <input
              type="text"
              name={key}
              value={customer[key]}
              onChange={handleChange}
              disabled={key === "Customer_ID" || key === "Registration_Date"}
            />
          </div>
        ))}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default CustomerProfile;
