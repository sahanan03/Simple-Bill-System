export const clientFields = [
  { name: 'name', label: 'Name', type: 'text' as const },
  { name: 'email', label: 'Email', type: 'text'as const },
  { name: 'currency', label: 'Preferred Currency', type: 'select' as const, options: [
    { label: 'INR', value: 'INR' },                                 
    { label: 'USD', value: 'USD' },
    { label: 'AED', value: 'AED' },
  ]}
];

export const clientColumns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Email', dataIndex: 'email' },
  { title: 'Currency', dataIndex: 'currency' },
];
