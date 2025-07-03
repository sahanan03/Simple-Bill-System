import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Button, Form, Table, Modal, Input, Select,DatePicker} from 'antd';
import currencyConverter from '../hooks/useCurrencyConverter';
import dayjs from 'dayjs';
interface Field {
    name:string,
    label:string,
    type:'text'|'select'|'date' //kind of input
    options?:{label:string,value:string}[] //select
}

interface CrudManagerProps<T> {
    title:string;
    fields:Field[]; // form structure
    columns:ColumnsType<T>;
    api:{
        getAll:()=>Promise<T[]>;
        create:(item:T) => Promise<void>;
        update:(id:string,item:T) => Promise<void>;
        delete:(id:string) => Promise<void>;

    };

}

function CrudManager<T extends {id:string}>({title,fields,columns,api}:CrudManagerProps<T>) {
            const [data,setData]=useState<T[]>([]); //ex-clients array of obj
            const [loading,setLoading]=useState(true);
            const [modalOpen,setModalOpen]=useState(false);
            const [editingItem,setEditingItem]=useState<T|null>(null); //reate one object
            const [form] = Form.useForm(); //react-hook-form

            const [currency, setCurrency] = useState('');
            const [amount, setAmount] = useState(0);
            let convertedAmount = null;
            if (title === 'Bills' && currency && amount > 0) {
                    try {
                    convertedAmount = currencyConverter(amount, currency, 'USD');
                    } catch (err) {
                    console.warn(err);
                    }
            }

            const fetchData = async () => {
                    setLoading(true);
                    const items= await api.getAll();
                    setData(items);
                    setLoading(false);   
            }

            useEffect (()=>{
                fetchData();
            },[]);


            const handleSubmit =async()=>{
                const values = await form.validateFields(); // waits for validation (promise)
                console.log(values);
                if(editingItem){
                    await api.update(editingItem.id,values); 
                } else {
                    api.create(values);
                }
                setModalOpen(false);
                setEditingItem(null);
                fetchData();
            };

             const handleEdit = (item: T) => {
                    console.log("editing item");
                    setModalOpen(true);
                    setEditingItem(item);
                    
                    const patchedItem = { ...item };
                    fields.forEach((field) => {
                        const key = field.name as keyof T;

                        if (field.type === 'date' && item[key]) {
                        // Convert string to dayjs for AntD DatePicker
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
                    await api.delete(id);
                    fetchData();
                };

              return(
                <div>
                    <h2 className='text-xl font-semibold mb-4'>{title}</h2>
                    <Button type='primary' onClick={()=>{form.resetFields(),setModalOpen(true)}}>Add {title}</Button>
                    <Table
                      rowKey={'id'}
                      columns={[
                        ...columns,
                        {
                            title:'Actions',
                            render:(_, record:T) => (          // '-' : ignoring,   record : enire row
                                <>
                                        <Button size='small' onClick={() => handleEdit(record)}>Edit</Button>
                                        <Button size='small' danger onClick={() => handleDelete(record.id)}>Delete</Button> 
                                </>
                            )                                   // adds this for each row
                        }     
                      ]}
                      dataSource={data}
                      loading={loading}
                      className='mt-4'
                    />

                     <Modal                                       // for pop ups
                            title={editingItem ? `Edit ${title}` : `Add ${title}`}
                            open={modalOpen}
                            onCancel={() => { setModalOpen(false); setEditingItem(null); }} //only currently editing item
                            onOk={handleSubmit}
                        >
                            <Form form={form} layout="vertical">
                            {fields.map(field => (
                                <Form.Item key={field.name} name={field.name} label={field.label} rules={[{ required: true }]}>
                                {field.type === 'text' && <Input onChange={field.name==='amount'? (e) => setAmount(parseFloat(e.target.value || '0')) : undefined}/>}
                                {field.type === 'select' && <Select options={field.options} onChange={field.name==='currency'? (e) => setCurrency(e) : undefined} />}
                                {field.type === 'date' && <DatePicker />}
                                </Form.Item>
                            ))}
                            {title === 'Bills' && convertedAmount !== null && (
                                    <Form.Item label="💱 Amount in USD">
                                        <div style={{ fontWeight: 'bold', color: 'green' }}>
                                            ${convertedAmount}
                                        </div>
                                    </Form.Item>
                                )}
                         </Form>
                     </Modal>
                </div>
            )

               

}

export default CrudManager
