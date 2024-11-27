import React, { useEffect, useState } from "react";
import { client } from "./sanity.client";
import DisplaySubmissions from "./DisplaySubmissions";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a new document in Sanity
      await client.create({
        _type: "registration", // Ensure this matches your schema type in Sanity
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
      });
      setSuccess(true);
      setFormData({ name: "", surname: "", email: "", phone: "" }); // Reset form
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (document.getElementById("admin-only-section")) {
      setShow(true);
    }
  }, []);

  return (
    <div>
      <h1>Αίτηση Εκπαίδευσης</h1>
      <form onSubmit={handleSubmit} className='registration'>
        <div className='field'>
          <label>ΟΝΟΜΑ</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='field'>
          <label>ΕΠΙΘΕΤΟ</label>
          <input
            type='text'
            name='surname'
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className='field'>
          <label>EMAIL</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='field'>
          <label>ΤΗΛΕΦΩΝΟ</label>
          <input
            name='phone'
            type='text'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? "Αποστολή ..." : "Αποστολή"}
          </button>
        </div>
      </form>
      {success && <p>Η αίτηση σας εστάλει επιτυχώς!</p>}
      {show && <DisplaySubmissions />}
    </div>
  );
};

export default RegistrationForm;
