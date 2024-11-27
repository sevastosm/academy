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
  ],
}
