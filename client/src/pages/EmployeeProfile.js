import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
import ManagePage from "./ManagePage"; 

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser);
    const employeeId = parsedUser.employee_id;

    axios.get(`http://localhost:5001/api/employees/${employeeId}`)
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load employee:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5001/api/employees/${employee.employee_id}`, employee)
      .then((res) => {
        alert("✅ Profile updated!");
        setEmployee(res.data);
      })
      .catch((err) => {
        console.error("❌ Update failed:", err);
        alert("❌ Update failed.");
      });
  };

  if (loading) return <p>Loading profile...</p>;
  if (!employee) return <p>No employee found.</p>;

  return (
    <>
      <div className="profile-container">
        <h2>🧑‍💼 Employee Profile</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
          {Object.keys(employee).map((key) => (
            <div key={key}>
              <label className="input-label">{key.replace(/_/g, " ").toLowerCase()}</label>
              <input
                type="text"
                name={key}
                value={employee[key] || ""}
                onChange={handleChange}
                disabled={key === "employee_id"}
              />
            </div>
          ))}
          <button type="submit">Save Changes</button>
        </form>
      </div>

      {/* ✅ Embed ManagePage below the profile */}
      <ManagePage />
    </>
  );
};

export default EmployeeProfile;
