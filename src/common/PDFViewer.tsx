import { useState } from "react";
import { PdfComponent } from "./PdfComponent";
import { FaEye } from "react-icons/fa";
import { FcDocument } from "react-icons/fc";
import { Modal } from ".";

const PDFViewer = ({ src }: { src: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="relative my-4">
      <div className="relative group min-h-[120px] min-w-[120px] max-h-[120px] max-w-[120px] border-[#1475cf] border-[1px] border-dashed flex items-center justify-center">
        <div className="flex flex-col justify-center items-center w-full h-full overflow-auto">
          <FcDocument size={40} />
          <FaEye
            size={24}
            className="hidden cursor-pointer absolute group-hover:block"
            onClick={openModal}
          />
          <h1 className="text-[7px]">{src}</h1>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          maxWidth="max-w-fit"
        >
          <PdfComponent src={src} />
        </Modal>
      )}
    </div>
  );
};

export default PDFViewer;
