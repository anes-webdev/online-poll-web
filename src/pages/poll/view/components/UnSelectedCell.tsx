import CloseIcon from '@mui/icons-material/Close';
const UnSelectedCell = () => {
  return (
    <td className="text-center text-gray-700">
      <div className="m-0.5 py-2 bg-red-200 rounded-md">
        <CloseIcon className="text-red-600" />
      </div>
    </td>
  );
};
export default UnSelectedCell;
