import React, { useState } from "react";
import "./createEventModal.css";

export default function CreateEventModal({ isOpen, onClose, onEventCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    totalTickets: 0,
    availableTickets: 0
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch("http://localhost:3000/api/event/create", {
        method: "POST",
        headers: {
          "auth-token": token
          // ⚠️ Don't set "Content-Type" when using FormData!
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert("Event Created!");
        onEventCreated(data);
        onClose();
      } else {
        alert("Failed to create event.");
        console.error(data.errors);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>Create New Event</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="title" placeholder="Title" required onChange={handleChange} />
          <textarea name="description" placeholder="Description" required onChange={handleChange}></textarea>
          <input type="datetime-local" name="date" required onChange={handleChange} />
          <input type="text" name="location" placeholder="Location" required onChange={handleChange} />
          <input type="number" name="totalTickets" placeholder="Total Tickets" min="1" required onChange={handleChange} />
          <input type="number" name="availableTickets" placeholder="Available Tickets" min="0" required onChange={handleChange} />
          
          {/* Image upload input */}
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />

          <div className="modal-actions">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
