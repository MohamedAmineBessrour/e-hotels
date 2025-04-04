import React, { useState } from "react";
import "./UserProfile.css";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState({
    Employee_ID: 70,
    Hotel_ID: 70,
    SSN: "197-49-5383",
    Age: 30,
    Name: "Scott Mcbride",
    Address: "928 Amy Ridges Apt. 990, Jacksonborough, NC 38457"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Updating employee: ${JSON.stringify(employee)}`);
    // Add backend API call here
  };

  return (
    <div className="profile-container">
      <h2>🧑‍💼 Employee Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        {Object.keys(employee).map((key) => (
          <div key={key}>
            <label className="input-label">{key.replace(/_/g, " ")}</label>
            {key !== "Employee_ID" ? (
              <input
                type="text"
                name={key}
                value={employee[key]}
                onChange={handleChange}
                placeholder={key.replace(/_/g, " ")}
              />
            ) : (
              <input
                type="text"
                value={employee[key]}
                disabled
                placeholder="Employee ID"
              />
            )}
          </div>
        ))}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EmployeeProfile;
