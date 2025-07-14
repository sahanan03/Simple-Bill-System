import { Form, Input, Select, DatePicker } from 'antd';
import type { Field } from './types';
import dayjs from 'dayjs';

const CrudForm = ({
  form,
  fields,
  title,
  convertedAmount,
  setCurrency,
  setAmount
}: any) => (
  <>
    <Form form={form} layout="vertical">
      {fields.map((field: Field) => (
        <Form.Item key={field.name} name={field.name} label={field.label} rules={[{ required: true }]}>
          {field.type === 'text' && (
            <Input
              onChange={
                field.name === 'amount' ? (e) => setAmount(parseFloat(e.target.value || '0')) : undefined
              }
            />
          )}
          {field.type === 'select' && (
            <Select options={field.options} onChange={field.name === 'currency' ? setCurrency : undefined} />
          )}
          {field.type === 'date' && <DatePicker />}
        </Form.Item>
      ))}

      {title === 'Bills' && convertedAmount !== null && (
        <div className="bg-green-50 border border-green-300 text-green-700 rounded-md px-4 py-2 mt-4">
          💱 Converted Amount (USD): <strong>${convertedAmount}</strong>
        </div>
      )}
    </Form>
  </>
);

export default CrudForm;
