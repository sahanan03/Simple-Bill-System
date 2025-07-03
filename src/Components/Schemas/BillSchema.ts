// components/schemas/billSchema.ts

export const billFields = [
  { name: 'clientName', label: 'Client Name', type: 'text'as const },
  { name: 'amount', label: 'Amount', type: 'text'as const },
  { name: 'currency', label: 'Currency', type: 'select'as const, options: [
    { label: 'INR', value: 'INR' },
    { label: 'USD', value: 'USD' },
    { label: 'AED', value: 'AED' },
  ]},
  { name: 'billDate', label: 'Bill Date', type: 'date' as const},
];

export const billColumns = [
  { title: 'Client', dataIndex: 'clientName' },
  { title: 'Amount', dataIndex: 'amount' },
  { title: 'Currency', dataIndex: 'currency' },
  { title: 'Date', dataIndex: 'billDate' },
];
