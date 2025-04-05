import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    try {
      const parsedUser = JSON.parse(storedUser);
      const customerId = parsedUser.customer_id;

      axios.get(`http://localhost:5001/api/customers/${customerId}`)
        .then((res) => {
          const data = res.data;
          const formattedCustomer = {
            customer_id: data.customer_id,
            name: data.name || "",
            ssn: data.ssn || "",
            age: data.age || "",
            address: data.address || "",
            card_number: data.card_number || "",
            registration_date: data.registration_date 
              ? data.registration_date.split("T")[0] 
              : ""
          };
          setCustomer(formattedCustomer);
        })
        .catch((err) => {
          console.error("❌ Failed to fetch customer:", err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("❌ Could not parse localStorage user", error);
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5001/api/customers/${customer.customer_id}`, customer)
      .then((res) => {
        alert("✅ Profile updated successfully.");
        const updated = {
          ...res.data,
          registration_date: res.data.registration_date.split("T")[0]
        };
        setCustomer(updated);
      })
      .catch((err) => {
        console.error("❌ Update failed:", err);
        alert("❌ Could not update customer.");
      });
  };

  if (loading) return <p>Loading profile...</p>;
  if (!customer) return <p>No customer found.</p>;

  return (
    <div className="profile-container">
      <h2>👤 Customer Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div>
          <label className="input-label">Customer ID</label>
          <input type="text" name="customer_id" value={customer.customer_id} disabled />
        </div>
        <div>
          <label className="input-label">Name</label>
          <input type="text" name="name" value={customer.name} onChange={handleChange} />
        </div>
        <div>
          <label className="input-label">SSN</label>
          <input type="text" name="ssn" value={customer.ssn} onChange={handleChange} />
        </div>
        <div>
          <label className="input-label">Age</label>
          <input type="number" name="age" value={customer.age} onChange={handleChange} />
        </div>
        <div>
          <label className="input-label">Address</label>
          <input type="text" name="address" value={customer.address} onChange={handleChange} />
        </div>
        <div>
          <label className="input-label">Card Number</label>
          <input type="text" name="card_number" value={customer.card_number} onChange={handleChange} />
        </div>
        <div>
          <label className="input-label">Registration Date</label>
          <input type="text" name="registration_date" value={customer.registration_date} disabled />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default CustomerProfile;
