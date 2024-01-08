import { Modal } from "@/common";
import Buttons from "@/common/Button";
import {
  deleteDashData,
  deleteDashDataWithDelete,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const DeleteModal = ({
  api,
  isModalOpen,
  setIsModalOpen,
  title,
  isDeleteMethod = false,
}: {
  api: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  isDeleteMethod?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [titleName, setTitleName] = useState("");

  const { token } = useAppSelector((state: RootState) => state.signin);

  const { selectedItem } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  useEffect(() => {
    if (title && selectedItem) {
      setTitleName(title);
    } else {
      setTitleName(selectedItem?.name);
    }
  }, [selectedItem, title]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (isDeleteMethod) {
      dispatch(
        deleteDashDataWithDelete({
          api: api,
          token: token!,
          body: { tableIds: [`${selectedItem?._id}`] },
        })
      );
      setIsModalOpen(false);
    } else {
      dispatch(
        deleteDashData({
          api: api,
          ids: [`${selectedItem?._id}`],
          token: token!,
        })
      );
      setIsModalOpen(false);
    }
  };

  return (
    <Modal isOpen={isModalOpen} setIsOpen={closeModal}>
      <div className="flex items-center justify-between py-3 px-5 bg-gray-200/30 bg-opacity-80">
        <h1>{`Are you sure want to Delete ${titleName} ?`}</h1>
      </div>
      <div className="flex justify-end gap-5 px-5 my-8">
        <Buttons variant="destructive" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Buttons>
        <Buttons variant="secondary" onClick={handleDelete}>
          Yes
        </Buttons>
      </div>
    </Modal>
  );
};

export default DeleteModal;
