import type { ColumnsType } from 'antd/es/table';

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'select' | 'date';
  options?: { label: string; value: string }[];
}

export interface CrudManagerProps<T> {
  title: string;
  fields: Field[];
  columns: ColumnsType<T>;

  useGetQuery: () =>{data?:T[]; isLoading?: boolean};
  useAddMutation: () =>readonly[mutate: (item:T) => any,any];    //readonly - returend tuple immutable
  useUpdateMutation: () => readonly[mutate: (params:{id:string;updatedData:any}) => any,any];
  useDeleteMutation: () => readonly[mutate: (id:string) => any,any];
}

