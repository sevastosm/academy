import React, { useEffect, useState } from "react";
import { client } from "./sanity.client";

const DisplaySubmissions = () => {
  const [submissions, setSubmissions] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data =
        await client.fetch(`*[_type == "registration"] | order(submittedAt desc) {
        _id,
        name,
        surname,
        email,
        phone
      }`);
      setSubmissions(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Αιτήσεις ακαδημίας</h2>
      <table>
        <tr>
          <th>ΟΝΟΜΑ</th>
          <th>ΕΠΙΘΕΤΟ</th>
          <th>EMAIL</th>
          <th>ΤΗΛΕΦΩΝΟ</th>
        </tr>
        {submissions.map((submission: any) => (
          <tr key={submission._id}>
            <td>{submission.name}</td>
            <td>{submission.surname}</td>
            <td>{submission.email}</td>
            <td>{submission.phone}</td>
            {/* <small>{new Date(submission.submittedAt).toLocaleString()}</small> */}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default DisplaySubmissions;
