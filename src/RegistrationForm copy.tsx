import React, { useEffect, useState } from "react";
import { client } from "./sanity.client";
import DisplaySubmissions from "./DisplaySubmissions";
import Select, { Items } from "./ui/Select";
import { Checkbox } from "./ui/Checkbox";

const ocupations: Items = [
  {
    value: "Κατασκευαστής Αρχιτεκτονικών Συστημάτων Αλουμινίου",
    label: "Κατασκευαστής Αρχιτεκτονικών Συστημάτων Αλουμινίου",
  },
  { value: "Αρχιτεκτονικό Γραφείο", label: "Αρχιτεκτονικό Γραφείο" },
  { value: "Μηχανικός", label: "Μηχανικός" },
  { value: "Κατασκευαστική Εταιρεία", label: "Κατασκευαστική Εταιρεία" },
  { value: "Ιδιώτης", label: "Ιδιώτης" },
  { value: "Άλλο", label: "Άλλο" },
];

const topic: Items = [
  {
    value: "Τεχνική Υποστήριξη σε συστήματα της ALFA",
    label: "Τεχνική Υποστήριξη σε συστήματα της ALFA",
  },
  {
    value: "Σεμινάρια για Μηχανικούς",
    label: "Σεμινάρια για Μηχανικούς",
  },
  {
    value: "Το εκπαιδευτικό πρόγραμμα «Τεχνικός Κουφωμάτων Αλουμινίου»",
    label: "Το εκπαιδευτικό πρόγραμμα «Τεχνικός Κουφωμάτων Αλουμινίου»",
  },
  {
    value:
      "Το επιμορφωτικό σεμινάριο «Προετοιμασία Πιστοποίησης Κατασκευαστών Αλουμινίου»",
    label:
      "Το επιμορφωτικό σεμινάριο «Προετοιμασία Πιστοποίησης Κατασκευαστών Αλουμινίου»",
  },
  {
    value: "Συμβουλευτική Επιχειρήσεων",
    label: "Συμβουλευτική Επιχειρήσεων",
  },
  {
    value: "Coaching",
    label: "Coaching",
  },
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    ocupation: "",
    topic: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [checked, setCheked] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.body.classList.add("academy");
  }, []);

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
        country: formData.country,
        city: formData.city,
        ocupation: formData.ocupation,
        topic: formData.topic,
        message: formData.message,
      });
      setSuccess(true);
      setFormData({
        name: "",
        surname: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        ocupation: "",
        topic: "",
        message: "",
      }); // Reset form
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

  console.log("formdata", formData);

  return (
    <div>
      {/* <div>
        <img
          className='w-full h-[400px] object-cover'
          src='https://alfa-press.gr/wp-content/uploads/2024/11/academy-2.jpeg'
          alt='Alfa academy'
        />
      </div> */}

      <h1 className='mb-4'>Αίτηση Εκπαίδευσης</h1>
      <form onSubmit={handleSubmit} className='flex flex-wrap gap-10'>
        <div className='flex gap-2 flex-col'>
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
          <div className='field'>
            <label>ΙΔΙΟΤΗΤΑ</label>
            <Select
              items={ocupations}
              value={formData.ocupation}
              onValueChange={(value: string) => {
                handleChange({ target: { name: "ocupation", value: value } });
              }}
            />
          </div>
        </div>
        <div className='flex gap-2 flex-col'>
          <div className='field'>
            <label>ΧΩΡΑ</label>
            <input
              name='country'
              type='text'
              value={formData.country}
              onChange={handleChange}
        
            />
          </div>
          <div className='field'>
            <label>ΠΟΛΗ</label>
            <input
              name='city'
              type='text'
              value={formData.city}
              onChange={handleChange}
              
            />
          </div>
          <div className='field'>
            <label>ΘΕΜΑΤΟΛΟΓΙΑ ΕΚΠΑΙΔΕΥΣΗΣ</label>
            <Select
              items={topic}
              value={formData.topic}
              onValueChange={(value: string) => {
                handleChange({ target: { name: "topic", value: value } });
              }}
            />
          </div>
        </div>
        <div className='w-full flex flex-col gap-4 items-start'>
          <div className='field'>
            <label>ΤΟ ΜΗΝΥΜΑ ΣΑΣ</label>
            <input
              name='message'
              type='text'
              value={formData.message}
              onChange={handleChange}
              
            />
          </div>
          <div className='items-top flex space-x-2'>
            <Checkbox
              onCheckedChange={() => {
                setCheked(!checked);
              }}
              id='terms'
            />
            <div className='grid gap-1.5 leading-none'>
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Συμφωνώ με τη χρήση των προσωπικών μου δεδομένων όπως
                περιγράφεται στους Όρους Χρήσης. Απαιτείται η συγκατάθεσή σας.
              </label>
            </div>
          </div>
          <button disabled={!checked || isSubmitting} type='submit'>
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
