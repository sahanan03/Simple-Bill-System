// components/schemas/paymentSchema.ts
export const paymentFields = [
  { name: 'clientName', label: 'Client Name', type: 'text' as const},
  { name: 'billId', label: 'Bill ID', type: 'text'as const },
  { name: 'amountPaid', label: 'Amount Paid', type: 'text' as const},
  { name: 'status', label: 'Payment Status', type: 'select' as const, options: [
    { label: 'Paid', value: 'Paid' },
    { label: 'Pending', value: 'Pending' },
  ]},
  { name: 'paymentDate', label: 'Payment Date', type: 'date' },
];

export const paymentColumns = [
  { title: 'Client', dataIndex: 'clientName' },
  { title: 'Bill ID', dataIndex: 'billId' },
  { title: 'Amount', dataIndex: 'amountPaid' },
  { title: 'Status', dataIndex: 'status' },
  { title: 'Date', dataIndex: 'paymentDate' },
];
