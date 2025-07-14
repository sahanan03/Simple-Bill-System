import { useEffect, useMemo, useState } from 'react';
import { Button, Modal, Table, Form } from 'antd';
import type { CrudManagerProps } from './types';
import CrudForm from './CrudForm'
import ActionButtons from './ActionsButtons';
import currencyConverter from '../hooks/useCurrencyConverter';
import dayjs from 'dayjs';

function CrudManager<T extends { id: string }>({
  title,
  fields,
  columns,
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  useDeleteMutation
}: CrudManagerProps<T>) {
  const { data = [], isLoading } = useGetQuery();
  const [addItem] = useAddMutation();
 const [updateItem] = useUpdateMutation();
  const [deleteItem] = useDeleteMutation();


  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [form] = Form.useForm();

  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState(0);

  const convertedAmount = useMemo(() => {
    if (title === 'Bills' && currency && amount > 0) {
      try {
        return currencyConverter(amount, currency, 'USD');
      } catch (err) {
        console.warn(err);
      }
    }
    return null;
  }, [title, currency, amount]);

 

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editingItem) {
      await updateItem({id:editingItem.id, ...values});
    } else {
      await addItem(values);
    }
    setModalOpen(false);
    setEditingItem(null);
  
  };

  const handleEdit = (item: T) => {
    setModalOpen(true);
    setEditingItem(item);
    
    const patchedItem = { ...item };
    fields.forEach((field) => {
      const key = field.name as keyof T;
      if (field.type === 'date' && item[key]) {
        patchedItem[key] = dayjs(item[key] as string) as any;
      }
      if (title === 'Bills') {
        if (field.name === 'amount') setAmount(Number(item[key]) || 0);
        if (field.name === 'currency') setCurrency(String(item[key]) || '');
      }
    });

    form.setFieldsValue(patchedItem);
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
  };

  return (
        <div className="bg-white p-6 rounded-xl shadow-md mt-6 ml-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            <Button
            type="primary"
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => {
                form.resetFields();
                setModalOpen(true);
            }}
            >
            + Add {title}
            </Button>
        </div>

        <Table
        rowKey="id"
        columns={[
            ...columns,
            {
            title: 'Actions',
            render: (_, record: T) => (
                <ActionButtons   onEdit={() => handleEdit(record)}
                   onDelete={() => handleDelete(record.id)}/>
            )
            }
        ]}
        dataSource={data}
        loading={isLoading}
        className="rounded-xl shadow-md border border-gray-200"
        pagination={{ pageSize: 5 }}
        />

      <Modal
        title={<span className="text-xl font-semibold text-purple-700">{editingItem ? `Edit ${title}` : `Add ${title}`}</span>}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingItem(null);
        }}
        onOk={handleSubmit}
        okButtonProps={{ className: 'bg-purple-600 hover:bg-purple-700' }}
      >
        <CrudForm
          form={form}
          fields={fields}
          title={title}
          convertedAmount={convertedAmount}
          setCurrency={setCurrency}
          setAmount={setAmount}
        />
      </Modal>
    </div>
  );
}

export default CrudManager;
