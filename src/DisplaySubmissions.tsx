import React, { useEffect, useState } from "react";
import { client } from "./sanity.client";
import { Printer } from "@mynaui/icons-react";

interface Submission {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  ocupation: string;
  topic: string;
  message: string;
}

const DisplaySubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`*[_type == "registration"] | order(submittedAt desc) {
        _id,
        name,
        surname,
        email,
        phone,
        ocupation,
        topic,
        message
      }`);
      setSubmissions(data);
    };

    fetchData();
  }, []);

  const printDetails = (submission: Submission) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Create the print content with styling
    const printContent = `
      <html>
        <head>
          <title>Στοιχεία Αίτησης</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .detail-row {
              margin-bottom: 15px;
            }
            .label {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Στοιχεία Αίτησης</h2>
          </div>
          <div class="detail-row">
            <span class="label">Όνομα:</span> ${submission.name}
          </div>
          <div class="detail-row">
            <span class="label">Επίθετο:</span> ${submission.surname}
          </div>
          <div class="detail-row">
            <span class="label">Email:</span> ${submission.email}
          </div>
          <div class="detail-row">
            <span class="label">Τηλέφωνο:</span> ${submission.phone}
          </div>
          <div class="detail-row">
            <span class="label">Ιδιότητα:</span> ${submission.ocupation}
          </div>
          <div class="detail-row">
            <span class="label">Θεματολογία Εκπαίδευσης:</span> ${submission.topic}
          </div>
          <div class="detail-row">
            <span class="label">Μήνυμα:</span> ${submission.message}
          </div>
        </body>
      </html>
    `;

    // Write the content and trigger print
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Αιτήσεις ακαδημίας</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">ΟΝΟΜΑ</th>
            <th className="border border-gray-200 px-4 py-2">ΕΠΙΘΕΤΟ</th>
            <th className="border border-gray-200 px-4 py-2">EMAIL</th>
            <th className="border border-gray-200 px-4 py-2">ΤΗΛΕΦΩΝΟ</th>
            <th className="border border-gray-200 px-4 py-2">ΙΔΙΟΤΗΤΑ</th>
            <th className="border border-gray-200 px-4 py-2">ΘΕΜΑΤΟΛΟΓΙΑ ΕΚΠΑΙΔΕΥΣΗΣ</th>
            <th className="border border-gray-200 px-4 py-2">ΜΗΝΥΜΑ</th>
            <th className="border border-gray-200 px-4 py-2">ΕΝΕΡΓΕΙΕΣ</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{submission.name}</td>
              <td className="border border-gray-200 px-4 py-2">{submission.surname}</td>
              <td className="border border-gray-200 px-4 py-2">{submission.email}</td>
              <td className="border border-gray-200 px-4 py-2">{submission.phone}</td>
              <td className="border border-gray-200 px-4 py-2">{submission.ocupation}</td>
              <td className="border border-gray-200 px-4 py-2">{submission.topic}</td>
              <td className="border border-gray-200 px-4 py-2">{submission.message}</td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                <button 
                  onClick={() => printDetails(submission)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Printer />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplaySubmissions;
