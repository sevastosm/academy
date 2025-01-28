// {
//   "_createdAt": "2024-11-29T13:50:35Z",
//   "_id": "bHUa1D59E2wN39gzUmJIZy",
//   "_rev": "bHUa1D59E2wN39gzUmJIVa",
//   "_type": "registration",
//   "_updatedAt": "2024-11-29T13:50:35Z",
//   "city": "test",
//   "country": "test",
//   "email": "test@mail.com",
//   "message": "test",
//   "name": "test",
//   "ocupation": "Κατασκευαστική Εταιρεία",
//   "phone": "4533253245435",
//   "surname": "test",
//   "topic": "Το εκπαιδευτικό πρόγραμμα «Τεχνικός Κουφωμάτων Αλουμινίου»"
// }

export default {
  name: 'registration',
  title: 'Registration',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'surname',
      title: 'Surname',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^[^@]+@[^@]+\.[^@]+$/, {
          name: 'email', // Error message name
          invert: false, // Allow emails that match this pattern
        }).error('Please enter a valid email address.'),
    },
    {
      name: 'phone',
      title: 'phone',
      type: 'text',
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'ocupation',
      title: 'Ocupation',
      type: 'string',
    },
    {
      name: 'topic',
      title: 'Topic',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    },
  ],
}
