import { Button } from 'antd';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons = ({ onEdit, onDelete }: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        size="small"
        className="border border-gray-300 text-gray-700"
        onClick={onEdit}
      >
        Edit
      </Button>
      <Button
        size="small"
        danger
        className="rounded"
        onClick={onDelete}
      >
        Delete
      </Button>
    </div>
  );
};

export default ActionButtons;
