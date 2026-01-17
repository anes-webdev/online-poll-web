import DoneIcon from '@mui/icons-material/Done';

const SelectedCell = () => {
  return (
    <td className="text-center text-gray-700">
      <div className="m-0.5 py-2 bg-green-200 rounded-md">
        <DoneIcon className="text-green-600" />
      </div>
    </td>
  );
};
export default SelectedCell;
