import Buttons from "@/common/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Content_Dashboard({
  button,
  buttonText,
  btnPath,
  deleteBtn = "Delete All",
  onClick,
  isDeleteBtn,
}: {
  button: boolean;
  buttonText?: string;
  btnPath?: string;
  deleteBtn?: string;
  onClick?: () => void;
  isDeleteBtn?: boolean;
}) {
  const isAuthorized = localStorage.getItem("authorized") === "true" || false;
  
  return (
    <>
      <div className="flex justify-end mt-16 mb-4 mx-6 gap-2">
        {button && buttonText && btnPath && isAuthorized && (
          <Link to={btnPath}>
            <Buttons className="flex items-center justify-center gap-2">
              <AiOutlinePlus className="text-white" />
              <p>{buttonText}</p>
            </Buttons>
          </Link>
        )}
        {isDeleteBtn && (
          <Buttons onClick={onClick} variant="destructive">
            {deleteBtn}
          </Buttons>
        )}
      </div>
    </>
  );
}
