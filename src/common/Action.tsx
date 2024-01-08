import { AiTwotoneDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { TbEye } from "react-icons/tb";

interface ActionProps {
  width?: number;
  middleRoute?: number;
  onDelete?: () => void;
  onEdit?: () => void;
  onViewDetails?: () => void;
  hideDelete?: boolean;
  hideEdit?: boolean;
  hideView?: boolean;
}

const Action: React.FC<ActionProps> = ({
  width = 100,
  onDelete,
  onEdit,
  onViewDetails,
  hideDelete,
  hideEdit,
  hideView,
}) => {
  const isAuthorized = localStorage.getItem("authorized") === "true" || false;

  return (
    <>
      {isAuthorized && (
        <div className={`w-[${width}%] flex`}>
          <TbEye
            size={20}
            className={`text-green-500 w-fit mx-auto hover:cursor-pointer transition duration-500 ${
              hideView && "hidden"
            }`}
            onClick={onViewDetails}
          />
          <CiEdit
            size={20}
            className={`text-blue-800 w-fit mx-auto hover:cursor-pointer transition duration-500 ${
              hideEdit && "hidden"
            }`}
            onClick={onEdit}
          />
          <AiTwotoneDelete
            onClick={onDelete}
            size={20}
            className={`text-red-400 w-fit mx-auto hover:cursor-pointer transition duration-500 ${
              hideDelete && "hidden"
            }`}
          />
        </div>
      )}
    </>
  );
};

export default Action;
