/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { baseImgUrl, baseVideoUrl, url } from "@/routes";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { useAppDispatch } from "@/redux/store";
import { addToastMessage } from "@/redux/toast/toastSlice";
import { Spinner } from ".";

type UploadProps<T> = {
  multiple?: boolean;
  imgTitle: string;
  accept: string;
  fieldName: keyof T;
  existingImg?: string[];
  setForm?: React.Dispatch<React.SetStateAction<T>>;
  showImage?: boolean;
  noBaseUrl?: boolean;
  isVideo?: boolean;
  form?: any;
};

type ResponseData = {
  name: string;
  success: boolean;
};

const Upload = <T,>({
  multiple,
  accept,
  setForm,
  imgTitle,
  existingImg,
  showImage = true,
  fieldName,
  noBaseUrl,
  isVideo = false,
  form,
}: UploadProps<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    const { files } = event.target;
    if (files && files.length > 0) {
      const formData = new FormData();
      const newFiles: File[] = [];

      formData.append("imageTitle", imgTitle);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (isVideoFile(file)) {
          if (file.size <= 100 * 1024 * 1024) {
            formData.append("video", file);
            newFiles.push(file);
          } else {
            dispatch(
              addToastMessage({
                id: Date.now().toString(),
                msg: "Video file size should not exceed 100MB",
                theme: "warn",
              })
            );
            setLoading(false);
            return;
          }
        } else {
          if (file.size <= 2 * 1024 * 1024) {
            formData.append("files", file);
            newFiles.push(file);
          } else {
            dispatch(
              addToastMessage({
                id: Date.now().toString(),
                msg: "File size is too big",
                theme: "warn",
              })
            );
            setLoading(false);
            return;
          }
        }
      }

      let uploadUrl = `${url}/imageUpload/upload`;
      if (newFiles.some((file) => isVideoFile(file))) {
        uploadUrl = `${url}/imageUpload/upload/video`;
      }

      try {
        const res = await axios.post(uploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const responseData: ResponseData[] = res.data;

        if (setForm)
          if (responseData.length > 1) {
            const imgName = responseData?.map((item) => item.name);
            setForm((prevForm) => ({
              ...prevForm,
              [fieldName]: imgName,
            }));
          } else {
            setForm((prevForm) => ({
              ...prevForm,
              [fieldName]: isVideo ? res.data.name : responseData[0]?.name,
            }));
          }
        setFiles(newFiles);
      } catch (error: any) {
        console.log(error);
        console.error("An error occurred while uploading the file:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const isVideoFile = (file: File): boolean => {
    return file.type.startsWith("video/");
  };

  // console.log(form[fieldName]);

  return (
    <>
      <main
        className={`flex h-full gap-5 flex-wrap ${isVideo ? "flex-col" : null}`}
      >
        <div
          className={`border border-dashed border-[#1475cf] min-h-[120px] min-w-[120px] max-h-[120px] max-w-[120px] cursor-pointer`}
          onClick={() => inputRef.current?.click()}
        >
          <input
            type="file"
            name="file"
            id="file"
            accept={accept}
            className="input-field"
            hidden
            ref={inputRef}
            multiple={multiple}
            onChange={handleFileChange}
            required
          />
          <div
            className={`flex flex-col justify-center items-center w-full h-full ${
              isVideo ? "mt-1" : null
            }`}
          >
            {loading ? (
              <Spinner btn />
            ) : (
              <>
                <MdCloudUpload color="#1475cf" size={30} />
                <p className="text-[12px] text-center">
                  {isVideo ? "(Max 300MB)" : "(Max 2MB)"}
                </p>
              </>
            )}
          </div>
        </div>
        <AnimatePresence>
          {showImage && files.length > 0
            ? files.map((file, index) => (
                <motion.div
                  key={`${file.name}..${index}`}
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative flex items-center justify-center border-gray-200 border min-h-[120px] min-w-[120px] max-h-[120px] max-w-[120px] cursor-pointer`}
                >
                  {file.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(file)}
                      className={`object-cover w-full h-full p-1`}
                      alt={file.name}
                    />
                  )}
                  {hoveredIndex === index && (
                    <MdDelete
                      className="absolute cursor-pointer text-gray-800 hover:text-red-600 transition duration-300"
                      size={20}
                      onClick={() => removeFile(index)}
                    />
                  )}
                </motion.div>
              ))
            : existingImg?.map((img) => (
                <img
                  key={img}
                  src={noBaseUrl ? `${img}` : `${baseImgUrl}/${img}`}
                  alt={imgTitle as string}
                  className="w-[120px] h-[120px] object-cover"
                />
              ))}
        </AnimatePresence>
        {isVideo && fieldName && form[fieldName] && (
          <div className="w-full h-full">
            <video
              src={`${baseVideoUrl}/${form[fieldName]}`}
              controls
              width={400}
              height={300}
              autoPlay
            />
          </div>
        )}
      </main>
    </>
  );
};

export default Upload;
